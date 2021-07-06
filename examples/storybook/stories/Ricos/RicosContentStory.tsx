import React, { useState, useRef } from 'react';
import { RicosEditor } from 'ricos-editor';
import { RichContentEditorBox, Section, Page } from '../Components/StoryParts';
import { pluginImage } from 'wix-rich-content-plugin-image';
import { pluginGallery } from 'wix-rich-content-plugin-gallery';
import MobileDetect from 'mobile-detect';
import ActionButton from '../Components/ActionButton';

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const plugins = [pluginImage(), pluginGallery()];

export default () => {
  const editorEl = useRef(null);
  const modalSettings = {
    // eslint-disable-next-line no-console
    onModalOpen: () => console.log('modal opened'),
    // eslint-disable-next-line no-console
    onModalClose: () => console.log('modal closed'),
  };
  const isMobile = mobileDetect.mobile() !== null;
  const [content, setContent] = useState('');

  return (
    <Page title="Ricos - getContentPromise">
      <h4>
        See Usage{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://wix.github.io/ricos/docs/ricos/ricos-api/#refgetcontentpromise"
        >
          here
        </a>
      </h4>
      <Section>
        <RichContentEditorBox>
          <RicosEditor
            ref={editorEl}
            isMobile={isMobile}
            plugins={plugins}
            modalSettings={modalSettings}
          />
          <ActionButton
            text={'getContentPromise()'}
            onClick={async () => {
              const editorContent = await editorEl.current.getContentPromise();
              setContent(editorContent);
            }}
          />
          <ActionButton
            text={'getContentPromise({flush: true}))'}
            onClick={async () => {
              const editorContent = await editorEl.current.getContentPromise({ flush: true });
              setContent(editorContent);
            }}
          />
        </RichContentEditorBox>
      </Section>
      <Section title="Returned Content:">
        <i>{JSON.stringify(content)}</i>
      </Section>
    </Page>
  );
};
