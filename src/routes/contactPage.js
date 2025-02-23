const express = require("express");
const router = express.Router();
const { getContactPage, createContactPage, updateContactPage } = require("../controllers/contactPage");

router.get("/", getContactPage);
router.post("/create", createContactPage);
router.put("/:id", updateContactPage);

module.exports = router;