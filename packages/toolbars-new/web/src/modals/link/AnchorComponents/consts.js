import React from 'react';
import {
  ImageIcon,
  VideoIcon,
  GalleryIcon,
  BlockQuoteIcon,
  CodeBlockIcon,
  ParagraphIcon,
  MapIcon,
  ButtonIcon,
  GiphyIcon,
  FileIcon,
  H2Icon,
  H3Icon,
  H4Icon,
  H5Icon,
  H6Icon,
} from '../Icons';

import {
  IMAGE_TYPE,
  VIDEO_TYPE,
  GALLERY_TYPE,
  GIPHY_TYPE,
  HEADER_BLOCK,
  UNSTYLED,
  CODE_BLOCK_TYPE,
  BLOCKQUOTE,
  MAP_TYPE,
  FILE_UPLOAD_TYPE,
} from 'wix-rich-content-common';

export const RADIO_GROUP_VALUES = { EXTERNAL_LINK: 'external-link', ANCHOR: 'anchor' };

export const ANCHORABLE_BLOCKS = Object.freeze({
  [UNSTYLED]: {
    thumbnail: <ParagraphIcon />,
    type: 'LinkTo_Modal_Section_Item_Paragraph',
    filter: 'LinkTo_Modal_Section_Filter_Paragraphs',
  },
  header: {
    [`thumbnail-${HEADER_BLOCK.TWO}`]: <H2Icon />,
    [`thumbnail-${HEADER_BLOCK.THREE}`]: <H3Icon />,
    [`thumbnail-${HEADER_BLOCK.FOUR}`]: <H4Icon />,
    [`thumbnail-${HEADER_BLOCK.FIVE}`]: <H5Icon />,
    [`thumbnail-${HEADER_BLOCK.SIX}`]: <H6Icon />,
    type: 'LinkTo_Modal_Section_Item_Heading',
    filter: 'LinkTo_Modal_Section_Filter_Headings',
  },
  [CODE_BLOCK_TYPE]: {
    thumbnail: <CodeBlockIcon />,
    type: 'LinkTo_Modal_Section_Item_Codeblock',
    filter: 'LinkTo_Modal_Section_Filter_Codeblocks',
  },
  [BLOCKQUOTE]: {
    thumbnail: <BlockQuoteIcon />,
    type: 'LinkTo_Modal_Section_Item_Quote',
    filter: 'LinkTo_Modal_Section_Filter_Quotes',
  },
  [IMAGE_TYPE]: {
    thumbnail: <ImageIcon />,
    preview: true,
    type: 'LinkTo_Modal_Section_Item_Image',
    filter: 'LinkTo_Modal_Section_Filter_Images',
  },
  [GALLERY_TYPE]: {
    thumbnail: <GalleryIcon />,
    preview: true,
    type: 'LinkTo_Modal_Section_Item_Gallery',
    filter: 'LinkTo_Modal_Section_Filter_Galleries',
  },
  [VIDEO_TYPE]: {
    thumbnail: <VideoIcon />,
    preview: true,
    type: 'LinkTo_Modal_Section_Item_Video',
    filter: 'LinkTo_Modal_Section_Filter_Videos',
  },
  [MAP_TYPE]: {
    thumbnail: <MapIcon />,
    type: 'LinkTo_Modal_Section_Item_Map',
    filter: 'LinkTo_Modal_Section_Filter_Maps',
    textPath: 'data.mapSettings.address',
  },
  buttons: {
    thumbnail: <ButtonIcon />,
    type: 'LinkTo_Modal_Section_Item_Button',
    filter: 'LinkTo_Modal_Section_Filter_Buttons',
    textPath: 'data.button.settings.buttonText',
  },
  [GIPHY_TYPE]: {
    thumbnail: <GiphyIcon />,
    preview: true,
    type: 'LinkTo_Modal_Section_Item_GIF',
    filter: 'LinkTo_Modal_Section_Filter_GIFs',
  },
  [FILE_UPLOAD_TYPE]: {
    thumbnail: <FileIcon />,
    type: 'LinkTo_Modal_Section_Item_File',
    filter: 'LinkTo_Modal_Section_Filter_Files',
    textPath: 'data.name',
  },
});
