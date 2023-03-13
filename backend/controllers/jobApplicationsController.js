const {
  hasCachedData,
  getCachedData,
  storeData,
} = require("../middlewares/cacheMiddleware");

const { getCandidatesData } = require("../API/services/CandidateDataService");

const { writeCsv } = require("../helpers/csvHelper");

async function getJobApplicationsController(req, res, next) {
  try {
    if (!hasCachedData()) {
      const jobApplications = await getCandidatesData();
      storeData(jobApplications);
    }

    return res.status(200).send(getCachedData());
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function downloadDataController(req, res) {
  try {
    if (!hasCachedData()) {
      const candidatesWithApplications = await getCandidatesData();
      storeData(candidatesWithApplications);
    }

    await writeCsv(
      "candidates.csv",
      [
        { id: "candidate_id", title: "Candidate ID" },
        { id: "first_name", title: "First Name" },
        { id: "last_name", title: "Last Name" },
        { id: "email", title: "Email" },
        { id: "job_application_id", title: "Job Application ID" },
        {
          id: "job_application_created_at",
          title: "Job Application Created At",
        },
      ],
      getCachedData()
    );
    res.download("candidates.csv");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

module.exports = { getJobApplicationsController, downloadDataController };
