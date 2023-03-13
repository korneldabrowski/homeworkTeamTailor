const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const { BEARER_TOKEN, API_VERSION } = process.env;

async function getJobApplications() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${BEARER_TOKEN}`);
  myHeaders.append("x-api-version", API_VERSION);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    "https://api.teamtailor.com/v1/job-applications",
    requestOptions
  );
  const result = await response.json();
  return result.data;
}

async function getCandidatesData() {
  const jobApplications = await getJobApplications();
  const candidatesData = [];
  for (const application of jobApplications) {
    const candidate = await getCandidate(
      application.relationships.candidate.links.related
    );
    const data = {
      candidate_id: candidate.data.id,
      first_name: candidate.data.attributes["first-name"],
      last_name: candidate.data.attributes["last-name"],
      email: candidate.data.attributes.email,
      job_application_id: application.id,
      job_application_created_at: application.attributes["created-at"],
    };
    candidatesData.push(data);
  }
  return candidatesData;
}

async function getCandidate(url) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${BEARER_TOKEN}`);
  myHeaders.append("x-api-version", API_VERSION);
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(url, requestOptions);
  const result = await response.json();
  return result;
}

module.exports = {
  getCandidatesData,
};
