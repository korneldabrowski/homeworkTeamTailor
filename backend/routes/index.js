const express = require("express");
const router = express.Router();

const {
  getJobApplicationsController,
  downloadDataController,
} = require("../controllers/jobApplicationsController");

router.get("/data", getJobApplicationsController);
router.get("/download", downloadDataController);

module.exports = router;
