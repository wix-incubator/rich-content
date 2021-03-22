import { fromHtml } from '../fromHtml';
import richTextContent from './richTextContent.json';
import { compare } from '../../../../comparision/compare';
import { readFileSync } from 'fs';

const htmlContent = readFileSync(`${__dirname}/richTextHtml.html`, 'utf8');

describe('convert from html', () => {
  it('should convert complex content', () => {
    const content = fromHtml(htmlContent);
    expect(
      compare(content, richTextContent, {
        ignoredKeys: ['key', 'createdVersion', 'updatedVersion'],
      })
    ).toEqual({});
  });
});
