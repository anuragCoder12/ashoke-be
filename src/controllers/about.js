const About = require("../models/about")
const cloudinary = require("cloudinary").v2

const getAboutPage = async (req, res) => {
    try {
        const about = await About.findOne()
        res.status(200).json({ message: "AboutPage fetched successfully", data: about })
    } catch (error) {
      res.status(500).json({ message: "Error fetching testimonialPage", error: error.message })  
    }
}

const createAboutPage = async (req, res) => {
    try {
        const {s1_title, s1_description, since, brands, products, s2_text, s2_desc, s2_img, s3_text, s3_desc, s3_img, mission, vision, partners } = req.body
if(!req.files.s2_img || !req.files.s3_img) {
    return res.status(400).json({ error: "Both in about image and logo files are required" });
  }
const s2Img = req.files.s2_img[0].path;
const s3Img = req.files.s3_img[0].path;
        let about = await About.findOne()
        if(about) {
            const oldS2Img = about.s2_img;
            const oldS3Img = about.s3_img;
            if(oldS2Img) {
                const publicId = oldS2Img.split("/").pop().split(".")[0]; 
                await cloudinary.uploader.destroy(`images/${publicId}`); // Delete old image
            }
            if(oldS3Img) {
                const publicId = oldS3Img.split("/").pop().split(".")[0]; 
                await cloudinary.uploader.destroy(`images/${publicId}`); // Delete old image
            }
            about.set({
                s1_title,
                s1_description,
                since,
                brands,
                products,
                s2_text,
                s2_desc,
                s2_img: s2Img,
                s3_text,
                s3_desc,
                s3_img: s3Img,
                mission,
                vision,
                // partners
            })
        } else{
            about = new About({
                s1_title,
                s1_description,
                since,
                brands,
                products,
                s2_text,
                s2_desc,
                s2_img: s2Img,
                s3_text,
                s3_desc,
                s3_img: s3Img,
                mission,
                vision,
                // partners
            })
        }
        await about.save()
        res.status(200).json({ message: "AboutPage saved successfully", data: about })
    } catch (error) {
       res.status(500).json({ message: "Error posting AbouPage", error: error.message }) 
    }
}

module.exports = {
    getAboutPage,
    createAboutPage
}