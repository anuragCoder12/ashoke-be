const express = require("express");
const router = express.Router();
const { createRegion, getAllRegions, getRegionById, updateRegion, deleteRegion } = require("../controllers/region");

router.post("/create", createRegion);
router.get("/", getAllRegions);
router.get("/:id", getRegionById);
router.put("/:id", updateRegion);
router.delete("/:id", deleteRegion);

module.exports = router;