import express from "express";

import issueController from "../controllers/issueController.js";

const issueRouter = express.Router();

issueRouter.get("/issue/all", issueController.getAllIssues);
issueRouter.post("/issue/create", issueController.createIssue);
issueRouter.get("/issue/:id", issueController.fetchIssueById);
issueRouter.put("/issue/update/:id", issueController.updateIssueById);
issueRouter.delete("/issue/delete/:id", issueController.deleteIssueById);

export default issueRouter;
