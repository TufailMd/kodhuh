import mongoose from "mongoose";

import Repository from "../models/repoModel.js";
import User from "../models/userModel.js";
import Issue from "../models/issueModel.js";

const createRepository = async function (req, res) {
  const { name, owner, description, content, issues, visibility } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Repository name is required" });
  }

  const user = await User.findById(owner);

  if (!user) {
    return res.status(404).json({
      error: "Owner not found",
    });
  }

  try {
    const newRepository = new Repository({
      name,
      description,
      content,
      visibility,
      owner,
      issues,
    });

    const result = await newRepository.save();

    res.status(201).json({
      message: "Repository created",
      repositoryId: result._id,
    });
  } catch (err) {
    console.error("Error during repository creation:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllRepositories = async (req, res) => {
  try {
    const repositories = await Repository.find()
      .populate("owner")
      .populate("issues");

    res.json(repositories);
  } catch (err) {
    console.error("Error during fetching repositories:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchRepositoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const repository = await Repository.findById(id)
      .populate("owner")
      .populate("issues");

    if (!repository)
      return res.status(404).json({
        error: "Repository not found",
      });

    res.json(repository);
  } catch (err) {
    console.error("Error during fetching repository:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchRepositoryByName = async (req, res) => {
  const { name } = req.params;
  try {
    const repository = await Repository.find({ name: name })
      .populate("owner")
      .populate("issues");

    if (!repository) {
      return res.status(404).json({ error: "Repository not found" });
    }

    res.json(repository);
  } catch (err) {
    console.error("Error during fetching repository:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchRepositoriesForCurrentUser = async (req, res) => {
  const userId = req.user;
  try {
    const repository = await Repository.find({ owner: userId });

    if (!repository || repository.length == 0)
      return res.status(404).json({ error: "User repository not found" });
    res.json({ message: "Repository found!", repository });
  } catch (err) {
    console.error("Error during fetching user repository:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateRepositoryById = async (req, res) => {
  const { id } = req.params;
  const { content, description } = req.body;

  try {
    const repository = await Repository.findById(id);

    if (!repository)
      return res.status(404).json({ error: "Repository not found" });

    if (content) {
      repository.content.push(content);
    }
    if (description) {
      repository.description = description;
    }
    const updateRepository = await repository.save();
    res.json({
      message: "Repository updated successfully!",
      repository: updateRepository,
    });
  } catch (err) {
    console.error("Error during fetching repository:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteRepositoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const repository = await Repository.findByIdAndDelete(id);

    if (!repository)
      return res.status(404).json({ error: "Repository not found" });

    res.json({
      message: "Repository deleted successfully!",
    });
  } catch (err) {
    console.error("Error during fetching repository:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const toggleVisibilityById = async (req, res) => {
  const { id } = req.params;

  try {
    const repository = await Repository.findById(id);

    if (!repository)
      return res.status(404).json({ error: "Repository not found" });

    repository.visibility = !repository.visibility;

    const updateRepository = await repository.save();
    res.json({
      message: "Repository visibility updated successfully!",
      repository: updateRepository,
    });
  } catch (err) {
    console.error("Error during fetching repository:", err, err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoriesForCurrentUser,
  updateRepositoryById,
  deleteRepositoryById,
  toggleVisibilityById,
};
