import mongoose from "mongoose";

import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

const createIssue = async function (req, res) {
  const { title, description } = req.body;

  const { id } = req.params;
  try {
    const newIssue = new Issue({
      title,
      description,
      repository: id,
    });

    await newIssue.save();

    res.status(201).json(newIssue);
  } catch (err) {
    console.error("Error during issue creation:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllIssues = async function (req, res) {
  const { id } = req.params;

  try {
    const issues = await Issue.find({ repository: id });

    if (!issues || issues.length === 0) {
      return res
        .status(404)
        .json({ error: "No issues found for this repository" });
    }

    res.status(200).json(issues);
  } catch (err) {
    console.error("Error during issue fetching:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getIssueById = async function (req, res) {
  const { id } = req.params;

  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.json(issue);
  } catch (err) {
    console.error("Error during issue fetching:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateIssueById = async function (req, res) {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    issue.title = title;
    issue.description = description;
    issue.status = status;

    await issue.save();

    res.json({ message: "Issue updated", issue });
  } catch (err) {
    console.error("Error during issue update:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteIssueById = async function (req, res) {
  const { id } = req.params;

  try {
    const issue = await Issue.findByIdAndDelete(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    res.json({ message: "Issue deleted" });
  } catch (err) {
    console.error("Error during issue deletion:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  createIssue,
  getAllIssues,
  fetchIssueById,
  updateIssueById,
  deleteIssueById,
};
