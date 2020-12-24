const { execSync } = require('child_process');

let privateConfig = {};
try {
  privateConfig = require('./applitools.private.config.js');
} catch (e) {}

function getBranchName() {
  return execSync('git rev-parse --abbrev-ref HEAD')
    .toString()
    .trim();
}

module.exports = {
  ...privateConfig,
  concurrency: 200,
  dontCloseBatches: true,
  batchName: `${process.env.APPLITOOLS_BATCH_ID ? '' : 'LOCAL - '}${getBranchName()}`,
  parentBranchName: 'wix/ricos/master',
  branchName: `wix/ricos/${getBranchName()}`,
};
