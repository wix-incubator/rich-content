/* eslint-disable no-console, fp/no-loops */

const path = require('path');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const { EXAMPLES_TO_DEPLOY, fqdn, generateSubdomain } = require('./deployUtils');

const exec = cmd => execSync(cmd, { stdio: 'inherit' });

function build({ buildCmd = 'npm run build' }) {
  console.log(chalk.magenta(`Running: "${buildCmd}"`));
  exec('npm run clean');
  exec(buildCmd);
}

function deploy({ name, dist = 'dist' }) {
  console.log(chalk.cyan(`Deploying ${name} example to surge...`));
  const subdomain = generateSubdomain(name);
  const domain = fqdn(subdomain);
  const deployCommand = `npx surge ${dist} ${domain}`;
  try {
    console.log(chalk.magenta(`Running "${deployCommand}`));
    exec(deployCommand);
  } catch (e) {
    console.error(chalk.bold.red(e));
    throw e;
  }
}

function run() {
  let skip;
  const { SURGE_LOGIN, GITHUB_ACTIONS } = process.env;
  if (!GITHUB_ACTIONS) {
    skip = 'Not in CI';
  } else if (!SURGE_LOGIN) {
    skip = 'PR from fork';
  }
  if (skip) {
    console.log(chalk.yellow(`${skip} - skipping deploy`));
    return false;
  }

  for (const example of EXAMPLES_TO_DEPLOY) {
    process.chdir(path.resolve(process.cwd(), example.path));

    console.log(chalk.blue(`\nDeploying ${example.name} example...`));
    build(example);
    deploy(example);

    process.chdir(path.resolve('../..'));
  }
}

run();
