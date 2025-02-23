const ContactPage = require("../models/contactPage")

const getContactPage = async (req, res) => {
    try {
        const contactPage = await ContactPage.findOne()
        res.status(200).json({ message: 'ContactPage fetched successfully', data: contactPage })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contactPage', error: error.message })
    }
}

const createContactPage = async (req, res) => {
    try {
        let contactPage = await ContactPage.findOne();
        if (contactPage) {
            // Update existing document instead of creating a new one
            contactPage.set(req.body);
        } else {
            contactPage = new ContactPage(req.body);
        }
        await contactPage.save();
        res.status(201).json({ message: "ContactPage saved successfully", data: contactPage });
    } catch (error) {
        res.status(500).json({ message: "Error saving ContactPage", error: error.message });
    }
};

const updateContactPage = async (req, res) => {
    try {
        let contactPage = await ContactPage.findOne();
        if (!contactPage) {
            return res.status(404).json({ message: "No ContactPage found to update" });
        }
        contactPage.set(req.body);
        await contactPage.save();
        res.status(200).json({ message: "ContactPage updated successfully", data: contactPage });
    } catch (error) {
        res.status(500).json({ message: "Error updating ContactPage", error: error.message });
    }
};

module.exports = {
    getContactPage,
    createContactPage,
    updateContactPage
}