const fs = require("fs").promises; // require "fileSystem" from fs
const path = require("path");

async function initRepo() {
  // this create hiden folder in current working directory (CWD) using process
  const repoPath = path.resolve(process.cwd(), ".gitForge");
  // inside ".gitForge" the commits file is need to add
  const commitPath = path.join(repoPath, "commits");

  try {
    // it creates the nested folder inside CWD directory (folder) using {recursive : true }
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitPath, { recursive: true });
    // create config.json file inside commits
    await fs.writeFile(
      path.join(repoPath, "config.json"),
      JSON.stringify({ bucket: process.env.S2_BUCKET })
    );
    console.log("Repository Initialised!")
  } catch (err) {
    console.log("Error in initialising repository", err);
  }
}

module.exports = { initRepo };
