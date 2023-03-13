const httpClient = require("../httpClient");
const { getHeaders } = require("../getHeaders");

async function getCandidate(url) {
  try {
    const endpoint = url;

    const headers = getHeaders();

    const response = await httpClient.get("", endpoint, { headers });

    return response;
  } catch (error) {
    console.error("Error in CandidateService():", error);
    throw error;
  }
}

module.exports = {
  getCandidate,
};
