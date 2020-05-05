import React from 'react';
import PropTypes from 'prop-types';
import { RichContentWrapper } from 'wix-rich-content-wrapper';
import { RichContentViewer } from 'wix-rich-content-viewer';
import {
  pluginLinkButton,
  pluginActionButton,
} from 'wix-rich-content-plugin-button/dist/module.viewer';
import { pluginCodeBlock } from 'wix-rich-content-plugin-code-block/dist/module.viewer';
import { pluginDivider } from 'wix-rich-content-plugin-divider/dist/module.viewer';
import { pluginEmoji } from 'wix-rich-content-plugin-emoji/dist/module.viewer';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload/dist/module.viewer';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/dist/module.viewer';
import { pluginGiphy } from 'wix-rich-content-plugin-giphy/dist/module.viewer';
import { pluginHashtag } from 'wix-rich-content-plugin-hashtag/dist/module.viewer';
import { pluginHeadersMarkdown } from 'wix-rich-content-plugin-headers-markdown/dist/module.viewer';
import { pluginHtml } from 'wix-rich-content-plugin-html/dist/module.viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/dist/module.viewer';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing/dist/module.viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/dist/module.viewer';
import { pluginMap } from 'wix-rich-content-plugin-map/dist/module.viewer';
import { pluginMentions } from 'wix-rich-content-plugin-mentions/dist/module.viewer';
import { pluginSoundCloud } from 'wix-rich-content-plugin-sound-cloud/dist/module.viewer';
import { pluginVideo } from 'wix-rich-content-plugin-video/dist/module.viewer';
import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import {
  pluginTextColor,
  pluginTextHighlight,
} from 'wix-rich-content-plugin-text-color/dist/module.viewer';

const configs = {
  fileUpload: {
    accept: '*',
    handleFileSelection: updateEntity => {
      const filenames = ['image.jpg', 'document.pdf', 'music.mp3'];
      const multiple = false;
      const count = multiple ? [1, 2, 3] : [1];
      const data = [];
      count.forEach(() => {
        const name = filenames[Math.floor(Math.random() * filenames.length)];
        const filenameParts = name.split('.');
        const type = filenameParts[filenameParts.length - 1];
        data.push({
          name,
          type,
          url: 'http://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf',
        });
      });
      setTimeout(() => updateEntity({ data }), 500);
    },
  },
  giphy: {
    giphySdkApiKey: process.env.GIPHY_API_KEY || 'HXSsAGVNzjeUjhKfhhD9noF8sIbpYDsV',
    sizes: { desktop: 'original', mobile: 'original' }, // original or downsizedSmall are supported
  },
};

const plugins = [
  pluginLinkButton(),
  pluginActionButton(),
  pluginCodeBlock(),
  pluginDivider(),
  pluginEmoji(),
  pluginFileUpload(configs.fileUpload),
  pluginGallery(),
  pluginGiphy(configs.giphy),
  pluginHashtag(),
  pluginHtml(),
  pluginImage(),
  pluginHeadersMarkdown(),
  pluginLineSpacing(),
  pluginLink(),
  pluginMap({ googleMapApiKey: process.env.GOOGLE_MAPS_API_KEY }),
  pluginMentions(),
  pluginSoundCloud(),
  pluginVideo(),
  pluginTextColor(),
  pluginTextHighlight(),
  pluginLinkPreview(),
];

const ViewerWrapper = ({ contentState, palette, isMobile, addAnchors }) => {
  const theme = palette ? { theme: 'Palette', palette } : { theme: 'Default' };
  return (
    <RichContentWrapper plugins={plugins} {...theme}>
      <RichContentViewer initialState={contentState} isMobile={isMobile} addAnchors={addAnchors} />
    </RichContentWrapper>
  );
};

ViewerWrapper.propTypes = {
  contentState: PropTypes.object,
  palette: PropTypes.arrayOf(PropTypes.object),
  isMobile: PropTypes.bool,
  addAnchors: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default ViewerWrapper;
