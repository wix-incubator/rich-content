/* eslint-disable no-console */
import path from 'path';
import chalk from 'chalk';
import { writeFileSync } from 'fs';
import { fromDraft } from './draft';
import { toPlainText } from './plainText';
import { toHtml } from './html';
import { toProseMirror } from './proseMirror';
import migrationContent from '../../../../../e2e/tests/fixtures/migration-content.json';
import { RichContent } from 'ricos-schema';

const getAbsPath = (relPath: string) => path.resolve(__dirname, relPath);

const RICH_CONTENT_BASELINE = getAbsPath(
  '../../statics/json/migratedFixtures/migration-content.json'
);
const PLAIN_TEXT_BASELINE = getAbsPath('../converters/plainText/toPlainText/complexPlainText.ts');
const HTML_BASELINE = getAbsPath('../converters/html/toHtml/__tests__/complexContentHtml.html');
const PROSE_MIRROR_BASELINE = getAbsPath(
  '../converters/proseMirror/toProseMirror/__tests__/migrationContentProse.json'
);

enum Target {
  RICOS = 'ricos',
  TEXT = 'text',
  HTML = 'html',
  PROSE_MIRROR = 'prose',
}

const convertToRichContent = async () => {
  console.log('Converting to ' + chalk.green('rich content') + '...');
  const richContentJSON = RichContent.toJSON(richContent);
  writeFileSync(RICH_CONTENT_BASELINE, JSON.stringify(richContentJSON, null, 2));
  console.log('Saved rich content baseline 💰\n');
};

const convertToHtml = async () => {
  console.log('Converting to ' + chalk.green('HTML') + '...');
  const html = toHtml(richContent);
  writeFileSync(HTML_BASELINE, html);
  console.log('Saved HTML baseline 🌎\n');
};

const convertToPlainText = async () => {
  const plainTextBaseline = (text: string) =>
    '/* eslint-disable max-len */\nexport const PLAIN_TEXT = `' + text + '`;\n';

  console.log('Converting to ' + chalk.green('plain text') + '...');
  const plainText = await toPlainText(richContent);
  writeFileSync(PLAIN_TEXT_BASELINE, plainTextBaseline(plainText));
  console.log('Saved plain text baseline 📃\n');
};

const convertToProseMirror = async () => {
  console.log('Converting to ' + chalk.green('prose mirror') + '...');
  const proseMirror = toProseMirror(richContent);
  writeFileSync(PROSE_MIRROR_BASELINE, JSON.stringify(proseMirror, null, 2));
  console.log('Saved prose mirror baseline 🦉\n');
};

const target = process.argv[2]?.toLowerCase();
const richContent = fromDraft(migrationContent);

const conversions: Promise<void>[] = [];
switch (target) {
  case Target.RICOS:
    conversions.push(convertToRichContent());
    break;
  case Target.HTML:
    conversions.push(convertToHtml());
    break;
  case Target.PROSE_MIRROR:
    conversions.push(convertToProseMirror());
    break;
  case Target.TEXT:
    conversions.push(convertToPlainText());
    break;
  case undefined:
    conversions.push(
      convertToRichContent(),
      convertToHtml(),
      convertToProseMirror(),
      convertToPlainText()
    );
    break;
  default:
    console.error(chalk.red(`Target "${target}" should be one of ${Object.values(Target)}`));
}

if (conversions.length > 0) {
  Promise.all(conversions).then(() => {
    console.warn(
      chalk.yellow('Please make sure all changes to baselines are required before comitting\n')
    );
  });
}
