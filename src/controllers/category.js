const Category = require("../models/category");
const cloudinary = require("cloudinary").v2;
const slugify = require('slugify');
const mongoose = require("mongoose");

const createCategory = async (req, res) => {
    try {
        const { name, description, regions } = req.body;
        const imageUrl = req.files.image[0].path;
        let regionIds = [];
        if (regions) {
          let parsedRegions = regions;
          if (typeof regions === "string") {
            parsedRegions = JSON.parse(regions); // Convert from string to array
          }
          if (Array.isArray(parsedRegions)) {
            regionIds = parsedRegions.map(region => new mongoose.Types.ObjectId(region));
          }
        }
    const logo_url = req.files.logo[0].path;
    const slug = slugify(name, { lower: true, strict: true });

        const category = new Category({ name,   regions: regionIds, image: imageUrl,logo: logo_url, description, slug });
        await category.save();
        res.status(201).json({ success: true, message: "Category created successfully", category });
    } catch (error) {
        console.error("Error creating category:", error.message);
        res.status(500).json({ success: false, message: "Error creating category", error: error.message });
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        .populate("regions");
        res.status(200).json({ success: true, message: "Categories fetched successfully", categories });
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        res.status(500).json({ success: false, message: "Error fetching categories", error: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error.message);
        res.status(500).json({ success: false, message: "Error deleting category", error: error.message });
    }
};

module.exports = {
    createCategory,
    getCategories,
    deleteCategory
};