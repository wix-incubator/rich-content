import React from 'react';
import { RichContentEditorBox, Section, Page } from '../Components/StoryParts';
import { createDividerPlugin } from 'wix-rich-content-plugin-divider';
import { createHashtagPlugin, HASHTAG_TYPE } from 'wix-rich-content-plugin-hashtag';
import { exapmleState } from '../../fixtures/editorStates';
import Palette from '../Components/Palette';
import { wixPalettes } from '../palettesExample';
import { RichContentEditor, convertFromRaw, createWithContent } from 'wix-rich-content-editor';

import { Themes } from '../../src/RceTheme';
import ThemeWrapper from '../../src/ThemeWrapper';

const editorState = createWithContent(convertFromRaw(exapmleState));

const PLUGINS = [createDividerPlugin, createHashtagPlugin];

const config = {
  [HASHTAG_TYPE]: {
    createHref: decoratedText => `/search/posts?query=${encodeURIComponent('#')}${decoratedText}`,
    onClick: event => {
      event.preventDefault();
    },
  },
};

export default () => {
  return (
    <Page title="Themes">
      <Section title="Default Theme">
        <RichContentEditorBox>
          <RichContentEditor config={config} plugins={PLUGINS} editorState={editorState} />
        </RichContentEditorBox>
      </Section>
      <Section title="Live Site Theme 1">
        <Palette palette={wixPalettes.site1} />
        <RichContentEditorBox>
          <ThemeWrapper theme={Themes.PALETTE} palette={wixPalettes.site1}>
            <RichContentEditor config={config} plugins={PLUGINS} editorState={editorState} />
          </ThemeWrapper>
        </RichContentEditorBox>
      </Section>

      <Section title="Live Site Theme 2">
        <Palette palette={wixPalettes.site2} />

        <RichContentEditorBox>
          <ThemeWrapper theme={Themes.PALETTE} palette={wixPalettes.site2}>
            <RichContentEditor config={config} plugins={PLUGINS} editorState={editorState} />
          </ThemeWrapper>
        </RichContentEditorBox>
      </Section>

      <Section title="Live Site Theme 3">
        <Palette palette={wixPalettes.site3} />
        <RichContentEditorBox>
          <ThemeWrapper theme={Themes.PALETTE} palette={wixPalettes.site3}>
            <RichContentEditor config={config} plugins={PLUGINS} editorState={editorState} />
          </ThemeWrapper>
        </RichContentEditorBox>
      </Section>
    </Page>
  );
};
