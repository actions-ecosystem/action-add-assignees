import * as github from '@actions/github';
import * as core from '@actions/core';

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('github_token', { required: true });

    const assignees = core
      .getInput('assignees')
      .split('\n')
      .filter(l => l !== '');
    const [owner, repo] = core.getInput('repo').split('/');
    const number =
      core.getInput('number') === ''
        ? github.context.issue.number
        : parseInt(core.getInput('number'));

    const client = new github.GitHub(githubToken);
    await client.issues.addAssignees({
      assignees,
      owner,
      repo,
      issue_number: number
    });
  } catch (e) {
    core.error(e);
    core.setFailed(e.message);
  }
}

run();
