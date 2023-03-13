const dotenv = require("dotenv");

dotenv.config();

const { BEARER_TOKEN, API_VERSION } = process.env;

function getHeaders() {
  return {
    Authorization: `Bearer ${BEARER_TOKEN}`,
    "X-Api-Version": API_VERSION,
  };
}

module.exports = {
  getHeaders,
};
