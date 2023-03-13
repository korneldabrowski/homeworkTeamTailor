const express = require("express");
const router = express.Router();

const jobApplicationsController = require("../controllers/jobApplicationsController");

router.get("/data", jobApplicationsController.getData);
router.get("/download", jobApplicationsController.downloadData);
router.get("/clear-cache", jobApplicationsController.clearCache);

module.exports = router;
