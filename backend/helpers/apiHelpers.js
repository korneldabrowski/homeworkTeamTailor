const fetch = require("node-fetch");

async function apiRequest(
  apiUrl,
  path,
  { method, data, headers, queryParams }
) {
  const url = new URL(`${apiUrl}${path}`);

  Object.entries(queryParams).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(url, options);
  const responseData = await response.json();

  if (!response.ok) {
    const error = new Error(
      `API request failed with status ${response.status}: ${responseData.error}`
    );
    error.response = response;
    throw error;
  }

  return responseData;
}

module.exports = {
  apiRequest,
};
