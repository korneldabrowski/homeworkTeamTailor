const httpClient = require("../httpClient");
const dotenv = require("dotenv");

dotenv.config();

const { BEARER_TOKEN, API_VERSION } = process.env;

async function getCandidate(url) {
  const response = await httpClient.get(url, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
      "x-api-version": API_VERSION,
    },
  });
  return response;
}

module.exports = {
  getCandidate,
};
