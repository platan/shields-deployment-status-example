const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
    const context = github.context;
//     console.log(JSON.stringify(context, null, 2));
    console.log(JSON.stringify(context.payload.pull_request, null, 2));
    console.log('repository');
    console.log(JSON.stringify(context.payload.repository, null, 2));
    console.log('owner');
    console.log(JSON.stringify(context.payload.repository.owner, null, 2));
    
    const pull_request = context.payload.pull_request;
    const repository = pull_request.repository;
    
    if (context.eventName === 'pull_request'/* && context.payload.action == 'closed'*/) {
        const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
        const result = await octokit.issues.createComment({
          owner: context.payload.repository.owner.login,
          repo: context.payload.repository.name,
          issue_number: context.payload.pull_request.number,
          body: 'test 1',
        });
        console.log(result);
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
