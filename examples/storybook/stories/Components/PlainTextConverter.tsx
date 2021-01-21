import React, { FunctionComponent, useEffect, useState } from 'react';
import { RichContentEditorBox, Section } from './StoryParts';
import EditorWrapper from './EditorWrapper';
import styles from '../Components/styles.scss';
import sourceCode from '!!raw-loader!./PlainTextConverter';
import { toPlainText } from 'ricos-content/libs/toPlainText';
import { RichContentTheme } from 'wix-rich-content-common';
import { RicosContent } from 'ricos-content';

const PlainTextConverter: FunctionComponent<{
  content: RicosContent;
  theme?: RichContentTheme;
}> = ({ content, theme }) => {
  const [newContent, setContent] = useState(content);
  const [plainText, setText] = useState('');

  useEffect(() => {
    (async () => setText(await toPlainText(newContent)))();
  }, [newContent]);

  return (
    <Section type={Section.Types.COMPARISON}>
      <RichContentEditorBox title={undefined} content={undefined} sourcecode={sourceCode}>
        <EditorWrapper
          content={newContent}
          theme={{ ...theme, parentClass: styles['rce-wrapper'] }}
          onChange={setContent}
        />
      </RichContentEditorBox>
      <div style={{ whiteSpace: 'pre-wrap' }}>{plainText}</div>
    </Section>
  );
};

export default PlainTextConverter;
