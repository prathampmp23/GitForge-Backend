const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // use to create unique commitID
// why uuid version 4 (v4) as it is simple and less time consuming

async function commitRepo(message) {
  const repoPath = path.resolve(process.cwd(), ".gitForge");
  const stagingPath = path.join(repoPath, "staging");
  const commitPath = path.join(repoPath, "commits");

  try {
    const commitID = uuidv4();
    // To create new directory (folder) inside commits with name commitID
    const commitDir = path.join(commitPath, commitID);
    // This create new dir with name commitID inside commits
    await fs.mkdir(commitDir, { recursive: true });

    // Now the files are move from staging to commits folder by reading them
    const files = await fs.readdir(stagingPath);
    // copy all files from staging to commits
    for (const file of files) {
      await fs.copyFile(
        // path.join(intial_Location, final_Location)
        path.join(stagingPath, file),
        path.join(commitDir, file)
      );
    }

    // Now to add json file to track the time and commit info
    await fs.writeFile(
      path.join(commitDir, "commit.json"),
      JSON.stringify({ message, date: new Date().toISOString() }) // this store current time stamp
    );

    console.log(`Commit ${commitID} created with message : ${message}`);
  } catch (error) {
    console.log("Error ehile commit ", error);
  }
}

module.exports = { commitRepo };
