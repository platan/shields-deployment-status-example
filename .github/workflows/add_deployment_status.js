const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
    try {
        const context = github.context;

        const pull_request = context.payload.pull_request;
        const repository = context.payload.repository;

        if (context.eventName === 'pull_request'/* && context.payload.action == 'closed'*/) {
            // && pull_request.merged
            // && pull_request.head.ref.slice(0, 11) !== 'dependabot/'
            // && pull_request.base.ref === 'master'
            const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
            await octokit.issues.createComment({
              owner: repository.owner.login,
              repo: repository.name,
              issue_number: pull_request.number,
              body: `This pull request was merged to [${pull_request.base.ref}](${repository.html_url}/tree/${pull_request.base.ref}) branch. This change is now waiting for deployment, which will usually happen within a few days. Stay tuned by joining our \`#ops\` channel on [Discord](https://discordapp.com/invite/HjJCwm5)!

    After deployment, changes are copied to [gh-pages](${repository.html_url}/tree/gh-pages) branch: ![](https://img.shields.io/github/commit-status/${repository.full_name}/gh-pages/${pull_request.merge_commit_sha}.svg?label=deploy%20status)`,
            });
            core.info(
            `Created comment on pull request '${pull_request.number}'.`
          );
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

// on('pull_request.closed')
//   .filter(context => context.payload.pull_request.merged)
//   .filter(
//     context =>
//       context.payload.pull_request.head.ref.slice(0, 11) !== 'dependabot/'
//   )
//   .filter(context => context.payload.pull_request.base.ref === 'master')
//   .comment(`This pull request was merged to [{{ pull_request.base.ref }}]({{ repository.html_url }}/tree/{{ pull_request.base.ref }}) branch. This change is now waiting for deployment, which will usually happen within a few days. Stay tuned by joining our \`#ops\` channel on [Discord](https://discordapp.com/invite/HjJCwm5)!
  
// After deployment, changes are copied to [gh-pages]({{ repository.html_url }}/tree/gh-pages) branch: ![](https://img.shields.io/github/commit-status/{{ repository.full_name }}/gh-pages/{{ pull_request.merge_commit_sha }}.svg?label=deploy%20status)`)
