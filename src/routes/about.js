const router = require("express").Router();
const { getAboutPage, createAboutPage } = require("../controllers/about");
const aboutUpload = require("../middleware/upload/aboutUpload");

router.get("/", getAboutPage);
router.post(
  "/create",
  aboutUpload,
  createAboutPage
);

module.exports = router;
