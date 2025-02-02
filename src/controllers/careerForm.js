const CareerForm = require("../models/careerForm");
const cloudinary = require("cloudinary").v2;
// craeting new form
const savedForm = async (req, res) => {
    const { name, email, phone, message } = req.body;
    let fileurl;
    if (req.file) {
        fileurl = req.file.path;
    }
try {
    const savedForm = new CareerForm({
        name,
        email,
        phone,
        message,
        file: fileurl
    })

    const newForm = await savedForm.save()
    res.status(201).json({
        success: true,
        message: "Form saved successfully",
        data: newForm
    })
} catch (error) {
    res.status(500).json({
        success: false,
        message: "Error saving form",
        error: error.message
    })
    console.log("Error saving form", error.message);
}
}

// getting all forms

const getAllForms = async (req, res) => { 
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const totalPages = await CareerForm.countDocuments()
        const forms = await CareerForm.find()
            .skip(skip)
        .limit(limit)
        res.status(200).json({
            success: true,
            message: "Forms fetched successfully",
            data: forms,
            totalPage: totalPages,
            currentPage: page,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching forms",
            error: error.message
        })
        console.log("Error fetching forms", error.message);
    }
}

// deleting a form

const deleteForm = async (req, res) => { 
    try {
        const { id } = req.params;
        const form = await CareerForm.findByIdAndDelete(id);
        console.log("file....", form.file)
        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Form not found",
            });
        }
          if (form.file) {
            const publicId = form.file.split("/").slice(-2, -1)[0]; // Get the public ID from Cloudinary URL
              console.log("public Id...", publicId);
              console.log(first)
        const result = await cloudinary.uploader.destroy(publicId, {
          resource_type: "raw",
        });
        console.log("Cloudinary Response:", result);
        if (result.result !== "ok") {
          return res.status(400).json({
            success: false,
            message: "Error deleting file from Cloudinary",
            error: result,
          });
        }

          }
        await form.deleteOne();
        res.status(200).json({
            success: true,
            message: "Form deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting form",
            error: error.message
        })
        console.log("Error deleting form", error.message);
    }
}



module.exports = { savedForm, getAllForms, deleteForm }