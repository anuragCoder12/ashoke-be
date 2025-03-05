const Form = require('../models/form')
const { sendEmail } = require("../middleware/mailer")
// create form 
const createForm = async (req, res) => {
    try {
        const { firstName, lastName, email, product, message } = req.body   
        const form = await Form.create({
            firstName,
            lastName,
            email,
            product,
            message
        })
        await form.populate('product')
        console.log("ajkd", form)
        const formData = {
            firstName: form.firstName || "N/A",
            lastName: form.lastName || "N/A",
            email: form.email || "N/A",
            product: form.product?.name ? form.product.name.toString() : null, // Convert ObjectId to string
            message: form.message || null,
        };
        sendEmail(form.email, formData)
        res.status(201).json({
            success: true,  
            message: "Form created successfully",
            data: form
        })
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("Error in createForm", error)
    }
}

module.exports = {
    createForm
}