const { gitPRComment } = require('../gitPRComment');
const { EXAMPLES_TO_DEPLOY, fqdn, generateSubdomain } = require('./deployUtils');
// const core = require('@actions/core');

const generateMessage = () => {
  let message = 'bla bla Click below to open examples:';
  EXAMPLES_TO_DEPLOY.map(example => {
    const domain = fqdn(generateSubdomain(example.name, true));
    return (message = message.concat(`\n${example.name}: https://${domain}`));
  });
  return message;
};

async function run() {
  const message = generateMessage();
  // await core.setOutput('deploy_message', message);
  gitPRComment(message, 'examples');
}

run();
