const Testimonial = require("../models/testimonials")
const cloudinary = require("cloudinary").v2
const mongoose = require("mongoose")

const postTestimoanials = async (req, res) => {
    try {
        const { title, description, thumb_image, name, designation, company_name, place, type, link } = req.body;
      
    let thumbUrl = null; // Default to null

    if (type === "file") {
      if (!req.files || !req.files.thumb_image) {
        return res.status(400).json({ error: "Thumbnail image is required for file type testimonials." });
      }
      thumbUrl = req.files.thumb_image[0].path;
    }
          
          const testimonial = new Testimonial({
            title,
            description,
            thumb_image: thumbUrl,
            name,
            designation,
            company_name,
            place,
            link,
            type
          })
          await testimonial.save()
          res.status(201).json({
            success: true,
            message: "Testimonial created successfully",
            data: testimonial
          })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating testimonial",
            error: error.message
        })
        console.log("Error creating testimonial", error.message);
    }
}
const getTestimonials =  async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
    .sort({ createdAt: -1 })
    res.status(200).json({ message: 'Testimonials fetched successfully', data: testimonials })
  } catch (error) {
    res.status(500).json({
        success: false,
        message: "Error creating testimonial",
        error: error.message
    })
    console.log("Error creating testimonial", error.message);
  }
}
const getSingleTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }
    res.status(200).json({ message: "Testimonial fetched successfully", data: testimonial });
  } catch (error) {
    res.status(500).json({ message: "Error fetching testimonial", error: error.message });
  }
}
const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid testimonial ID" });
    }

    // Find the existing testimonial
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }

    let thumb_url = testimonial.thumb_image; // Keep existing image if not updated

    // If a new image is uploaded, delete the old one from Cloudinary
    if (req.files && req.files.thumb_image) {
      const oldPublicId = thumb_url.split("/").pop().split(".")[0];

      try {
        await cloudinary.uploader.destroy(`images/${oldPublicId}`);
        console.log("✅ Old image deleted from Cloudinary");
      } catch (err) {
        console.error("❌ Error deleting old image:", err);
      }

      // Set new image URL
      thumb_url = req.files.thumb_image[0].path;
    }

    // Update the testimonial
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      { ...req.body, thumb_image: thumb_url }, // Ensure thumb_image is updated
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: updatedTestimonial
    });

  } catch (error) {
    console.error("Error updating testimonial:", error.message);
    res.status(500).json({
      success: false,
      message: "Error updating testimonial",
      error: error.message
    });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: "Testimonial not found" });
    }
    if(testimonial.thumb_image){
      let thumb_url = testimonial.thumb_image;
      const publicId = thumb_url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`images/${publicId}`)
      .then(() => console.log("✅ Old image deleted from Cloudinary"))
      .catch(err => console.error("❌ Error deleting old image:", err));
    }
    await Testimonial.deleteOne({ _id: id });
    res.status(200).json({ success: true, message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting testimonial",
      error: error.message
    });
  }
};

module.exports = {
    postTestimoanials,
    getTestimonials,
    updateTestimonial,
    deleteTestimonial,
    getSingleTestimonial
}