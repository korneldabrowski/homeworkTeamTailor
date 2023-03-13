const httpClient = require("../httpClient");
const dotenv = require("dotenv");

dotenv.config();

const { BEARER_TOKEN, API_VERSION } = process.env;

async function getJobApplications() {
  const response = await httpClient.get("/job-applications", {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
      "x-api-version": API_VERSION,
    },
  });
  return response.data;
}

module.exports = {
  getJobApplications,
};
