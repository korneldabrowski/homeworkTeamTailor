const httpClient = require("../httpClient");
const { getHeaders } = require("../getHeaders");

const apiUrl = "https://api.teamtailor.com/v1";

async function getJobApplications() {
  try {
    const endpoint = "/job-applications";

    const headers = getHeaders();

    const response = await httpClient.get(apiUrl, endpoint, { headers });

    return response.data;
  } catch (error) {
    console.error("Error in getJobApplications():", error);
    throw error;
  }
}

module.exports = {
  getJobApplications,
};
