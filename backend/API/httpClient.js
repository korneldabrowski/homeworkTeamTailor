const { apiRequest } = require("../helpers/apiHelpers");

const httpClient = {
  async get(apiUrl, url, config = {}) {
    const response = await apiRequest(apiUrl, url, {
      method: "GET",
      headers: {},
      queryParams: {},
      ...config, // override defaults with user-provided config
    });
    return response;
  },
};

module.exports = httpClient;
