const createIssue = (req, res) => {
  res.send("Issue created");
};

const getAllIssues = (req, res) => {
  res.send("All issues fetched");
};

const fetchIssueById = (req, res) => {
  res.send("Issue details fetched");
};

const updateIssueById = (req, res) => {
  res.send("Issue updated");
};

const deleteIssueById = (req, res) => {
  res.send("Issue deleted");
};

export default {
  createIssue,
  getAllIssues,
  fetchIssueById,
  updateIssueById,
  deleteIssueById,
};
