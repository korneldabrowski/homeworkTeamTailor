const { getJobApplications } = require("./JobApplicationService");
const { getCandidate } = require("./CandidateService");

async function getCandidatesData() {
  const jobApplications = await getJobApplications();

  const candidatesData = [];
  for (const application of jobApplications) {
    const candidateId = application.relationships.candidate.links.related;

    const candidate = await getCandidate(candidateId);

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

module.exports = {
  getCandidatesData,
};
