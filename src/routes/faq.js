const express = require("express");
const router = express.Router();
const { getFaq, createFaq, updateFaq, deleteFaq, getOneFaq } = require("../controllers/faq");


router.get("/", getFaq);
router.post("/create", createFaq);
router.put("/:id", updateFaq);
router.delete("/:id", deleteFaq);
router.get("/:id", getOneFaq);

module.exports = router;