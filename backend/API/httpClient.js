const { apiRequest } = require("../helpers/apiHelpers");

const apiUrl = "https://api.teamtailor.com/v1";

const httpClient = {
  async get(url, config = {}) {
    console.log("config: " + config);
    const response = await apiRequest(apiUrl, url, "GET", null, config);
    console.log("response2: " + response);
    return response;
  },
  async post(url, data, config = {}) {
    const response = await apiRequest(apiUrl, url, "POST", data, config);
    return response;
  },
  async put(url, data, config = {}) {
    const response = await apiRequest(apiUrl, url, "PUT", data, config);
    return response;
  },
  async delete(url, config = {}) {
    const response = await apiRequest(apiUrl, url, "DELETE", null, config);
    return response;
  },
};

module.exports = httpClient;
