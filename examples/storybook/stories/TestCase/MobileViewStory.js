import React, { useState } from 'react';
import { convertToRaw } from 'wix-rich-content-editor-common';

import ViewerWrapper from '../Components/ViewerWrapper';
import EditorWrapper from '../Components/EditorWrapper';

import { wixPalettes } from '../palettesExample';

import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';

import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../Components/StoryParts';

export default () => {
  const [editorState, setEditorState] = useState(createEmpty());
  const contentState = convertToRaw(editorState.getCurrentContent());
  return (
    <Page title="Mobile Playground">
      <Section title="Editor">
        <RichContentEditorBox preset="blog-preset">
          <EditorWrapper
            onChange={setEditorState}
            contentState={contentState}
            palette={wixPalettes.site1}
          />
        </RichContentEditorBox>
      </Section>
      <Section title="Viewer Mobile">
        <RichContentViewerBox preset="mobile">
          <ViewerWrapper isMobile contentState={contentState} palette={wixPalettes.site1} />
        </RichContentViewerBox>
      </Section>
    </Page>
  );
};
