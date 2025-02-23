const router = require("express").Router();
const { getHomePage, createHomePage } = require("../controllers/home");
const baseUpload =  require("../middleware/fileUpload");


router.get("/", getHomePage);
router.post(
    "/create",
    baseUpload.fields([
        { name: "s2_image1", maxCount: 1 },
        { name: "s2_image2", maxCount: 1 },
        { name: "s3_video", maxCount: 1 },
        { name: "satisfied_video", maxCount: 1 },
        { name: "s1_video", maxCount: 1 }
      ]),
   createHomePage
);

module.exports = router;