const Home = require("../models/home")
const cloudinary = require("cloudinary").v2;
const getHomePage = async (req, res) => {
    try {
       const home = await Home.findOne().populate('featured_products');
       res.status(200).json({ message: "Home fetched successfully", data: home }) 
    } catch (error) {
       res.status(500).json({ message: "Error fetching testimonialPage", error: error.message }) 
    }
}

const createHomePage = async (req, res) => {
    try {
        let home = await Home.findOne()
                // Get new files if uploaded, otherwise keep existing ones
                const s1_video = req.files?.s1_video?.[0]?.path || home?.s1_video;
                const s2_image1 = req.files?.s2_image1?.[0]?.path || home?.s2_image1;
                const s2_image2 = req.files?.s2_image2?.[0]?.path || home?.s2_image2;
                const s3_video = req.files?.s3_video?.[0]?.path || home?.s3_video;
                const satisfied_video = req.files?.satisfied_video?.[0]?.path || home?.satisfied_video;
        const data = {
            ...req.body,
            featured_products: req.body.featured_products,
            s1_video,
            s2_image1,
            s2_image2,
            s3_video,
            satisfied_video
        }
        if(home) {
            const oldS1Video = home.s1_video;
            const oldS2Image1 = home.s2_image1;
            const oldS2Image2 = home.s2_image2;
            const oldS3Video = home.s3_video; ;
            const oldSatisfiedVideo = home.satisfied_video;
            if(req.files?.s1_video?.[0]?.path && oldS1Video) {
                const publicId = oldS1Video.split("/").pop().split(".")[0];
                console.log("Deleting old video 1:", oldS1Video); 
                await cloudinary.uploader.destroy(`videos/${publicId}`,  { resource_type: "video" }).then(() => console.log("✅ Old video deleted"))
                .catch(err => console.error("❌ Error deleting old video:", err));
            }
            if( req.files?.s2_image1?.[0]?.path && oldS2Image1) {
                const publicId = oldS2Image1.split("/").pop().split(".")[0]; 
                console.log("Deleting old video 1:", publicId); 
                await cloudinary.uploader.destroy(`images/${publicId}`).then(() => console.log("✅ Old video deleted"))
                .catch(err => console.error("❌ Error deleting old video:", err));
            }
            if( req.files?.s2_image2?.[0]?.path && oldS2Image2) {
                const publicId = oldS2Image2.split("/").pop().split(".")[0]; 
                console.log("Deleting old video 1:", publicId); 
                await cloudinary.uploader.destroy(`images/${publicId}`).then(() => console.log("✅ Old video deleted"))
                .catch(err => console.error("❌ Error deleting old video:", err));
            }
            if(req.files?.s3_video?.[0]?.path && oldS3Video) {
                const publicId = oldS3Video.split("/").pop().split(".")[0]; 
                console.log("Deleting old video 1:", publicId); 
                await cloudinary.uploader.destroy(`videos/${publicId}`,  { resource_type: "video" }).then(() => console.log("✅ Old video deleted"))
                .catch(err => console.error("❌ Error deleting old video:", err));
            }
            if(req.files?.satisfied_video?.[0]?.path  && oldSatisfiedVideo) {
                const publicId = oldSatisfiedVideo.split("/").pop().split(".")[0];
                console.log("Deleting old video 1:", publicId);  
                await cloudinary.uploader.destroy(`videos/${publicId}`,  { resource_type: "video" }).then(() => console.log("✅ Old video deleted"))
                .catch(err => console.error("❌ Error deleting old video:", err));
            }
            home.set(data)
        res.status(201).json({ message: "Home updated successfully", data: home })  
        }else{
            console.log("this worked")
            home = new Home(data)

        res.status(201).json({ message: "Home created successfully", data: home })  
        }
        await home.save()
        home = await Home.findById(home._id).populate('featured_products');

    } catch (error) {
        res.status(500).json({ message: "Error fetching Home", error: error.message })
    }
}

module.exports = {
    getHomePage,
    createHomePage
}