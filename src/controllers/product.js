const Product = require("../models/product");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const slugify = require('slugify');
const createProduct  = async (req, res) => {
    try {
    const { name, image, description, category, priority, regions, flag, size, length, grade, type, type_slug } = req.body;
      // Convert `flag` from string to boolean
      const isFlagEnabled = flag === "true";
      const slug = slugify(type, { lower: true, strict: true });
    if (!req.files.image) {
        return res.status(400).json({ error: "Both in product image and logo files are required" });
      }
    const image_url = req.files.image[0].path;
    // const regionData = JSON.parse(regions);
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

     const product = new Product({
        name,
        image: image_url,
        description,
        category,
        priority,
        regions: regionIds,
        flag: isFlagEnabled,
        size,
        length,
        grade,
        type,
        type_slug: slug
     })
     await product.save()
     res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product
     })
    } catch (error) {
        console.log("error creating product", error.message);
        res.status(500).json({
            success: false,
            message: "Error creating product",
            error: error.message,
        });
    }
}

const getAllProducts = async (req, res) => {
    try {
       
        const product = await Product.find()
        .populate("regions")
        .populate("category")
        .populate({
            path: "category",
            populate: {
                path: "regions", // ✅ Deep populating the regions inside category
            },
        })
        .populate("regions") 
       
        .sort({ priority: 1 });
        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            data: product,
        
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching products",
            error: error.message
        })
        console.log("Error fetching products", error.message);
    }
}
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, priority, regions, flag, size, length, grade, type,  } = req.body;
        
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let image_url = product.image;

        // Handle Logo Update
        // if (req.files && req.files.logo) {
        //     const logoPublicId = product.logo.split("/").pop().split(".")[0]; 
        //     await cloudinary.uploader.destroy(`images/${logoPublicId}`);
        //     logo_url = req.files.logo[0].path; 
        // }

        // Handle Image Update
        if (req.files && req.files.image) {
            const imagePublicId = product.image.split("/").pop().split(".")[0]; 
            await cloudinary.uploader.destroy(`images/${imagePublicId}`); // Delete old image
            image_url = req.files.image[0].path; // Upload new image
        }
        let type_slug = product.type_slug; // Keep existing slug if type is unchanged
        if (type && type !== product.type) {
            type_slug = slugify(type, { lower: true, strict: true });
        }
        // Update the product in the database
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, image: image_url, description, category, priority, regions, flag, size, length, grade, type, type_slug },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    } catch (error) {
        console.log("Error updating product", error.message);
        res.status(500).json({
            success: false,
            message: "Error updating product",
            error: error.message,
        });
    }
};

const getFeaturedProducts = async (req, res) => {
    try {
 

        const query = { flag: true };
     

        const products = await Product.find(query)
            .populate("regions")
           
            .sort({ priority: 1 });

        res.status(200).json({
            success: true,
            message: "Featured products fetched successfully",
            data: products,
           
        });
    } catch (error) {
        console.log("Error fetching featured products", error.message);
        res.status(500).json({
            success: false,
            message: "Error fetching featured products",
            error: error.message,
        });
    }
};


const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        .populate("regions");
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product,
        });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching product", error: error.message });
      console.log("Error fetching product", error.message);  
    }
}
const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      // Delete the logo and image from Cloudinary
      const imagePublicId = product.image.split("/").pop().split(".")[0]; // Assuming the image URL format
  
    //   const logoDeleteResult = await cloudinary.uploader.destroy(`images/${logoPublicId}`)
    //   .then(() => console.log("✅ Old image deleted from Cloudinary"))
    //   .catch(() => console.log("❌ Error deleting logo"))
      const imageDeleteResult = await cloudinary.uploader.destroy(`images/${imagePublicId}`)
      .then(() => console.log("✅ Old image deleted from Cloudinary"))
      .catch(() => console.log("❌ Error deleting image:"))
    
  
      // Delete the product from the database
      await Product.deleteOne({ _id: id })
  
      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.log("Error deleting product", error.message);
      res.status(500).json({
        success: false,
        message: "Error deleting product",
        error: error.message,
      });
    }
  };
  

module.exports = {
    createProduct,
    getAllProducts,
    deleteProduct,
    editProduct,
    getFeaturedProducts,
    getSingleProduct
}