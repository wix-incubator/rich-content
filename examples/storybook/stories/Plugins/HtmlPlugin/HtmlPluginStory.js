import React from 'react';
import { Section, Page, ContentState, RichContentViewerBox } from '../../Components/StoryParts';
import { RicosViewer } from 'ricos-viewer';

import { RichContentViewer } from 'wix-rich-content-viewer';
import { pluginHtml } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import contentState from '../../../../../e2e/tests/fixtures/html-domain-example.json';
import HtmlWithDomainStory from './HtmlWithDomainStory';
import HtmlWithDomainSourceCode from '!!raw-loader!./HtmlWithDomainStory.js';

export default () => (
  <Page title={'HTML Plugin'}>
    <p>HTML plugin enables users to embed content in an iframe (either source code or by URL)</p>
    <p>
      In order for the source code to be rendered in an isolated environment, `sandboxedDomain`
      conifg on viewer & editor must be supplied, and be easily changed by consumer incase of DDOS
      on domain or subdomain
    </p>
    <p>
      Format is:
      <ul>
        <li>https://YOUR_UNIQUE_SUBDOMAIN.filesusr.com </li>
        <li>https://YOUR_UNIQUE_SUBDOMAIN.filesusr.com </li>
      </ul>
    </p>
    <Section type={Section.Types.COMPARISON}>
      <div>
        <h2>Default behavior</h2>
        <RicosViewer plugins={[pluginHtml(), pluginLinkPreview()]} contentState={contentState}>
          <RichContentViewer initialState={contentState} />
        </RicosViewer>
      </div>

      <div>
        <h2>With sandboxedDomain config</h2>
        <RichContentViewerBox sourcecode={HtmlWithDomainSourceCode}>
          <HtmlWithDomainStory contentState={contentState} />
        </RichContentViewerBox>
      </div>
    </Section>
    <ContentState json={contentState} />
  </Page>
);
