import React from 'react';
import {
  RichContentEditorBox,
  RichContentViewerBox,
  Section,
  Page,
} from '../../Components/StoryParts';

import { convertFromRaw, createWithContent } from 'wix-rich-content-editor';

import videoContentState from '../../../../../e2e/tests/fixtures/facebook-video.json';
import VideoEditor from './VideoEditor';
import editorSourcecode from '!!raw-loader!./VideoEditor.js';
import VideoViewer from './VideoViewer';
import viewerSourcecode from '!!raw-loader!./VideoViewer.js';
import SyntaxHighlighter from '../../Components/SyntaxHighlighter';
import { createEmpty } from 'wix-rich-content-editor/dist/lib/editorStateConversion';

const editorState = createWithContent(convertFromRaw(videoContentState));

const mockData = {
  url: 'https://www.youtube.com/watch?v=vzKryaN44ss',
};
const handleFileUpload = {
  mock: (files, updateEntity) => {
    setTimeout(() => {
      updateEntity({
        data: mockData,
      });
    }, 1000);
  },
  error: (files, updateEntity) => {
    setTimeout(() => {
      updateEntity({ error: { msg: 'file too large' } });
    }, 2000);
  },
};

const VideoPluginStory = () => (
  <Page title="Video Plugin">
    <Section type={Section.Types.COMPARISON}>
      <RichContentEditorBox sourcecode={editorSourcecode} contentState={videoContentState}>
        <VideoEditor editorState={editorState} handleFileUpload={handleFileUpload.mock} />
      </RichContentEditorBox>
      <RichContentViewerBox sourcecode={viewerSourcecode}>
        <VideoViewer initialState={videoContentState} />
      </RichContentViewerBox>
    </Section>

    <Section title="onFilesChange Error (with UI)">
      <div>With Error Message:</div>
      <SyntaxHighlighter
        code={`handleFileUpload = (files, updateEntity) => updateEntity({ data: [], error: { msg: 'file too large' } });`}
      />
      <RichContentEditorBox>
        <VideoEditor editorState={createEmpty()} handleFileUpload={handleFileUpload.error} />
      </RichContentEditorBox>
    </Section>
  </Page>
);

export default VideoPluginStory;
