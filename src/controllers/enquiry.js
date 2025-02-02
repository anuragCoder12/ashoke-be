const Enquiry = require("../models/enquiry");

// posting new enquiry

const createEnquiry = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  try {
    const enquiry = new Enquiry({ firstName, lastName, email, phone, message });
    await enquiry.save();
    res.status(201).json({
      sucess: true,
      message: "Enquiry created successfully",
     data: enquiry,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Error creating enquiry",
      error: error.message,
    });
      console.log("Error creating enquiry", error.message);
  }
};

// getting all enquiries

const getAllEnquiries = async (req, res) => {
    try {
const { page = 1, limit = 10 } = req.query;
        let query = {};
        const skip = (page - 1) * limit;
        const totalPage = await Enquiry.countDocuments(query);
        const enquiries = await Enquiry.find(query)
            .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "Enquiries fetched successfully",
            data:enquiries,
            totalPage,
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching enquiries",
            error: error.message,
        });
        console.log("Error fetching enquiries", error.message);
    }
}
// getting single enquiry
const getEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const enquiry = await Enquiry.findById(id);
        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Enquiry fetched successfully",
            data: enquiry,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching enquiry",
            error: error.message,
        });
        console.log("Error fetching enquiry", error.message);
    }
}
// deleting an enquiry
const deleteEnquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const enquiry = await Enquiry.findByIdAndDelete(id);
        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Enquiry deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting enquiry",
            error: error.message,
        });
        console.log("Error deleting enquiry", error.message);
    }
}

module.exports = { createEnquiry, getAllEnquiries, getEnquiry, deleteEnquiry };
