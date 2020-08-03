const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
    const context = github.context;

    console.log(context);
}

run();
