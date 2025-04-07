const express = require("express");
const router = express.Router();
const Mailjet = require("node-mailjet");

// ✅ Use Mailjet's apiConnect instead of .connect()
const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

// 📌 Define the correct route
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: { Email: process.env.SENDER_EMAIL, Name: "Fashion Trial Support" },
          To: [{ Email: process.env.RECIPIENT_EMAIL, Name: "Admin" }],
          Subject: "New Contact Form Submission",
          TextPart: `You have a new contact message from ${name}. Message: ${message}`,
          HTMLPart: `<h3>New Contact Request</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
        },
      ],
    });

    console.log("📧 Email sent successfully:", request.body);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Mailjet Error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

module.exports = router;
