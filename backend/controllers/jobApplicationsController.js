const { getCandidatesData } = require("../helpers/apiHelper");

const {
  hasCachedData,
  getCachedData,
  storeData,
  clearCache,
} = require("../helpers/cacheHelper");

const csvHelper = require("../helpers/csvHelper");

const jobApplicationsController = {
  async getData(req, res) {
    try {
      if (!hasCachedData()) {
        const candidatesWithApplications = await getCandidatesData();
        storeData(candidatesWithApplications);
      }

      return res.status(200).send(getCachedData());
    } catch (error) {
      console.log(error);
      res.status(500).send(`Internal server error ${error}`);
    }
  },

  async downloadData(req, res) {
    try {
      if (!hasCachedData()) {
        const candidatesWithApplications = await getCandidatesData();
        storeData(candidatesWithApplications);
      }

      await csvHelper.writeCsv(
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
  },

  clearCache(req, res) {
    clearCache();
    res.status(200).send("Cache cleared");
  },
};

module.exports = jobApplicationsController;
