const fs = require("fs").promises;
const path = require("path");

async function addRepo(filePath) {
  const repoPath = path.resolve(process.cwd(), ".gitForge");
  const stagingPath = path.join(repoPath, "staging");

  try {
    // create a new directory inside .gitForge
    await fs.mkdir(stagingPath, { recursive: true });
    // get fileName from filePath to create its copy
    const fileName = path.basename(filePath); 
    // copy file is now added to Staging area
    await fs.copyFile(filePath, path.join(stagingPath, fileName)); 
    console.log(`File ${fileName} added to staging area!`)
  } catch (error) {
    console.log("Error while adding file", error);
  }
}

module.exports = { addRepo };
