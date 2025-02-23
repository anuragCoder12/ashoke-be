const TestimonialPage = require("../models/testimonialPage")
const cloudinary = require("cloudinary").v2;

const getTestimonialPage = async (req, res) => {
    try {
        const testimonialPage = await TestimonialPage.findOne();
        res.status(200).json({ message: "TestimonialPage fetched successfully", data: testimonialPage });
    } catch (error) {
        res.status(500).json({ message: "Error fetching testimonialPage", error: error.message });
    }
}

const createTestimonialPage = async (req, res) => {
    try {
        const { title } = req.body;

        let videoFile = req.files?.video?.[0]?.path; // Get new video if uploaded

        let testimonialPage = await TestimonialPage.findOne();

        if (testimonialPage) {
            // If no new video, retain the existing one
            if (!videoFile) {
                videoFile = testimonialPage.video;
            } else if (testimonialPage.video) {
                // If there's an old video, delete it from Cloudinary
                const oldVideoUrl = testimonialPage.video;
                const publicId = oldVideoUrl.split("/").pop().split(".")[0];
                
                console.log("Deleting old video:", publicId);
                await cloudinary.uploader.destroy(`videos/${publicId}`, { resource_type: "video" })
                    .then(() => console.log("✅ Old video deleted"))
                    .catch(err => console.error("❌ Error deleting old video:", err));
            }

            // Update the existing document
            testimonialPage.set({ title, video: videoFile });

        } else {
            // Create a new document
            testimonialPage = new TestimonialPage({ title, video: videoFile });
        }

        await testimonialPage.save();
        res.status(201).json({ message: "Testimonial Page saved successfully", data: testimonialPage });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error creating Testimonial Page", error: error.message });
    }
};


const upateTestimonialPage = async (req, res) => {
    try {
        let testimonialPage = await TestimonialPage.findOne();
        if(!testimonialPage) {
            res.status(404).json({ message: "TestimonialPage not found" })
        }
        testimonialPage.set(req.body)
        await testimonialPage.save()
        res.status(200).json({ message: "TestimonialPage updated successfully", data: testimonialPage })
    } catch (error) {
       res.status(500).json({ message: "Error updating testimonialPage", error: error.message }) 
    }
}

module.exports = {
    getTestimonialPage,
    createTestimonialPage,
    upateTestimonialPage
}