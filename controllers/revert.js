const fs = require("fs"); //Entire fileSystem
const path = require("path");
const { promisify } = require("util"); // use a wrapper if wrong commitID is pass

// Custom overrided readdir & copyFile
// wrapped inside promisify => if file/dir exist then only take efforts
const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function revertRepo(commitID) {
  const repoPath = path.resolve(process.cwd(), ".gitForge");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitDir = path.join(commitsPath, commitID);
    const files = await readdir(commitDir); // read the provided commitID dose folder exist
    // If found then go to ../ path back to go to backend folder to make revert changes
    const parentDir = path.resolve(repoPath, "..");

    // In this we are copying all files from commitID to parent directory (revert)
    for (const file of files) {
      await copyFile(path.join(commitDir, file), path.join(parentDir, file));
    }

    console.log(`Commit ${commitID} reverted successfully!`);
  } catch (err) {
    console.error("Unable to revert : ", err);
  }
}

module.exports = { revertRepo };
