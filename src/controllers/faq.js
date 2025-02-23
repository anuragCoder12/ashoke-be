const Faq = require("../models/faq")


const createFaq = async(req, res) => {
    try {
        const { question, answer } = req.body
        const faq = new Faq({question, answer})
        await faq.save()
        res.status(201).json({ message: 'Faq created successfully', data: faq })
    } catch (error) {
       res.status(500).json({ message: 'Error creating faq', error: error.message })
    }
}

const getFaq = async(req, res) => {
    try {
        const faq = await Faq.find()
        res.status(200).json({ message: 'Faq fetched successfully', data: faq })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching faq', error: error.message })
    }
}
const getOneFaq = async(req, res) => {
    try {
        const faq = await Faq.findById(req.params.id)
        res.status(200).json({ message: 'Faq fetched successfully', data: faq })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching faq', error: error.message })
    }
}

const updateFaq = async(req, res) => {
    try {
        const { question, answer } = req.body
        const faq = await Faq.findById(req.params.id)
        faq.question = question
        faq.answer = answer
        await faq.save()
        res.status(200).json({ message: 'Faq updated successfully', data: faq })
    } catch (error) {
        res.status(500).json({ message: 'Error updating faq', error: error.message })
    }
}

const deleteFaq = async(req, res) => {
    try {
        const faq = await Faq.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Faq deleted successfully', data: faq })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting faq', error: error.message })
    }
}

module.exports = {
    createFaq,
    getFaq,
    updateFaq,
    deleteFaq,
    getOneFaq
}