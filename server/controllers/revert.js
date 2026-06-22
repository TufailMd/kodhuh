import fs from "fs";
import path from "path";
import { promisify } from "util";
const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);
import { s3, S3_BUCKET } from "../config/aws-config.js";

export async function revertRepo(commitID) {
  const repoPath = path.resolve(process.cwd(), ".kod");
  const commitsPath = path.join(repoPath, "commits");
  const commitDir = path.join(commitsPath, commitID);

  try {
    const files = await readdir(commitDir);
    const parentDir = path.resolve(repoPath, "..");

    for (const file of files) {
      await copyFile(path.join(commitDir, file), path.join(parentDir, file));
    }

    console.log(`Commit ${commitID} reverted successfully.`);
  } catch (error) {
    console.error("Unable to revert", error);
  }
}
