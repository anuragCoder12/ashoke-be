const router = require("express").Router();
const { createForm } = require("../controllers/form");

router.post("/", createForm);

module.exports = router;