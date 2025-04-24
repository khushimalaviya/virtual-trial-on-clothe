const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");
require("dotenv").config();
const path = require("path");

const jwtSecret = process.env.JWT_SECRET;

// Import Routes
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contactRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const aiRoutes = require("./routes/aiRoutes");
const trialRoutes = require("./routes/trialRoutes");
const brandRoutes = require("./routes/brandRoutes");
const ClotheRoutes = require("./routes/ClotheRoutes");
const profileRoutes = require("./routes/profileRoutes");
const sizeRecommendationRoutes = require("./routes/sizeRecommendationRoutes");
const socialSharingRoutes = require("./routes/socialSharingRoutes");
const systemLogRoutes = require("./routes/systemLogRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const ClotheBrandRoutes = require("./routes/ClotheBrandRoutes");
const accountAndBodyRoutes = require("./routes/accountBodyRoutes");
const sizeRoutes = require("./routes/sizeRoutes");
const colorRoutes = require("./routes/colorRoutes");
const brandCategoryRoutes = require('./routes/categoryByBrandRoutes');
const chartMapping = require('./routes/chartMappingRoutes');
const sizeMappingRoutes = require('./routes/sizeByCategoryRoutes');
const colorMappingRoutes = require('./routes/colorBySizeRoutes');
const imageMappingRoutes = require('./routes/imageRoutes');
const virtualTryonRoutes = require('./routes/virtualTryonRoutes');
const userRoutes = require('./routes/userRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
const dashboardRoutes = require("./routes/dashboardRoutes");
const fpasswordRoutes = require('./routes/forgotPasswordRoutes');

// Initialize Express App
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request body
app.use(cors()); // Allow CORS
app.use("/uploads", express.static("uploads")); // Serve uploaded images

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "your-default-mongo-uri";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", contactRoutes);
app.use("/api", uploadRoutes);
app.use("/api", aiRoutes);
app.use("/api/trial", trialRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/Clothe", ClotheRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/sizerecommendations", sizeRecommendationRoutes);
app.use("/api/socialsharing", socialSharingRoutes);
app.use("/api/systemlogs", systemLogRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/Clothebrands", ClotheBrandRoutes);
app.use("/api/accountbodies", accountAndBodyRoutes);
app.use("/api/sizes", sizeRoutes);
app.use("/api/colors", colorRoutes);
app.use("/api/clothes",ClotheRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brandcategories', brandCategoryRoutes);
app.use('/api/chart-mappings', chartMapping);
app.use('/api/size-mappings', sizeMappingRoutes);
app.use('/api/color-mappings', colorMappingRoutes);
app.use('/api/image-mappings', imageMappingRoutes);
app.use("/api/virtual-tryon", virtualTryonRoutes);
app.use("/api/users", userRoutes);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api", userRoutes);
app.use("/api/stats", dashboardRoutes);
app.use('/api/fpassword', fpasswordRoutes);

// Serve static files
app.use(
  "/clothe-images",
  express.static(path.join(__dirname, "../frontend/public/clothe-images"))
);

// app.use(
//   "/clothe-images",
//   express.static(path.resolve(__dirname, "../frontend/public/clothe-images"))
// );


// ✅ Serve Images from Absolute Path
app.get("/api/images", (req, res) => {
  const imagePath = req.query.path;

  if (!imagePath) {
    return res.status(400).json({ error: "Image path is required" });
  }

  // Check if the file exists using absolute path
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ error: "Image not found" });
  }
});

// Test Route
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Multer Setup for File Uploads
const upload = multer({ dest: "uploads/" });

// Virtual Try-On Route
app.post("/try-on", upload.fields([{ name: "person" }, { name: "Clothe" }]), async (req, res) => {
  try {
    console.log("Received request from React");

    if (!req.files || !req.files["person"] || !req.files["Clothe"]) {
      return res.status(400).json({ error: "Missing files" });
    }

    const formData = new FormData();
    formData.append("person", fs.createReadStream(req.files["person"][0].path));
    formData.append("Clothe", fs.createReadStream(req.files["Clothe"][0].path));

    console.log("Forwarding request to Flask API...");

    const response = await axios.post("http://localhost:4000/virtual-tryon", formData, {
      headers: formData.getHeaders(),
      responseType: "arraybuffer",
    });

    console.log("Response received from Flask API");

    res.set("Content-Type", "image/png");
    res.send(response.data);
  } catch (error) {
    console.error("Error in Node.js server:", error);
    res.status(500).json({ error: "Error processing image" });
  }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
      status: 'OK',
      timestamp: new Date()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
      success: false,
      message: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
      success: false,
      message: 'Internal server error'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
