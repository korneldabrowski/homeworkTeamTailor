const { getJobApplications } = require("../API/services/jobApplicationService");
const {
  hasCachedData,
  getCachedData,
  storeData,
} = require("../middlewares/cacheMiddleware");

const { writeCsv } = require("../helpers/csvHelper");

async function getJobApplicationsController(req, res, next) {
  try {
    if (!hasCachedData()) {
      const jobApplications = await getJobApplications();
      storeData(cacheKey, jobApplications);
    }

    return res.json(getCachedData);
  } catch (error) {
    next(error);
  }
}

async function downloadDataController(req, res, next) {
  try {
    const candidatesData = await getCandidatesData();

    // Set the headers to force download as a CSV file
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=data.csv");

    // Write the CSV data to the response
    await writeCsv(
      "data.csv",
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
      candidatesData
    ).pipe(res);
  } catch (error) {
    next(error);
  }
}

module.exports = { getJobApplicationsController, downloadDataController };
