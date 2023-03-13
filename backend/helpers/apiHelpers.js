const fetch = require("node-fetch");

async function apiRequest(
  apiUrl,
  path,
  { method = "GET", data = null, headers = {}, queryParams = {} } = {}
) {
  const url = new URL(`${apiUrl}${path}`);

  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  console.log(headers);

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(url, options);
  // console.log("xd ", response);

  const responseData = await response.json();
  // console.log("xd2 ", responseData);

  if (!response.ok) {
    const error = new Error(
      `API request failed with status ${response.status}`
    );
    error.response = responseData;
    throw error;
  }

  return responseData;
}

module.exports = {
  apiRequest,
};
