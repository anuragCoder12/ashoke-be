const express = require("express");
const router = express.Router();
const { savedForm, getAllForms, deleteForm } = require("../controllers/careerForm");
const fileUpload = require("../middleware/fileUpload");
const { protected } = require("../middleware/authMiddleware");

router.post("/", fileUpload.single("file"), savedForm);
router.get("/", protected, getAllForms)
router.delete("/:id", deleteForm)

module.exports = router