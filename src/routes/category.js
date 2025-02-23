const router = require("express").Router();
const { createCategory, getCategories,
    deleteCategory
 } = require("../controllers/category");
const baseUpload = require("../middleware/fileUpload");

router.post("/create", baseUpload.fields([
    { name: "image", maxCount: 1 },
    { name: "logo", maxCount: 1 },

  ]), createCategory);

router.get("/", getCategories);

router.delete("/:id", deleteCategory);

module.exports = router;