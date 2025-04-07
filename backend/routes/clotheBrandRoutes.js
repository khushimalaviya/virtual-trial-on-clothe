const express = require("express");
const router = express.Router();
const Clothe = require("../models/Clothe");
const Brand = require("../models/Brand");

// Route to get Clothe with brand names
router.get("/", async (req, res) => {
  try {
    const Clothe = await Clothe.find();
    const brands = await Brand.find();

    // Map Clothe with corresponding brand names
    const ClotheWithBrands = Clothe.map((item) => {
      const brand = brands.find((b) => b.brand_id === item.brand_id);
      return {
        ...item._doc,
        brandName: brand ? brand.brandName : "Unknown",
      };
    });

    res.json(ClotheWithBrands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
