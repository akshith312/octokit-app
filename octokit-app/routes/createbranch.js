const express = require('express');
const octokit = require('../github'); // Import Octokit
const router = express.Router();
router.post('/create/:owner/:repo/:branchName', async (req, res) => {      // Route to create a new branch in a GitHub repository
    const {owner,repo,branchName} = req.params;
    const commits = await octokit.repos.listCommits({
            owner,
            repo
    });
           const latestCommit = commits.data[0].sha;
    const response = await octokit.git.createRef({
        owner,
        repo,
        ref: `refs/heads/${branchName}`,
        sha: latestCommit,
      });
      console.log(response);
      res.json("SuccessFull");
});
module.exports = router;
