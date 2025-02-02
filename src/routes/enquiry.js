const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  getEnquiry,
  deleteEnquiry,
} = require("../controllers/enquiry");
const { protected } = require('../middleware/authMiddleware')

router.post("/", createEnquiry);
router.get("/", protected, getAllEnquiries);
router.get("/:id", getEnquiry);
router.delete("/:id", deleteEnquiry);

module.exports = router;