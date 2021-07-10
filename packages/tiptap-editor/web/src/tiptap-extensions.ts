// TODO: dropcursor + gapcursor are required for the drag/drop indication
// currently, there's plugin key collision exception when they are used due to key autogeneration in prose-mirror and possibly dynamic loading. the issue should be resolved by extension implementation that adds unique prosemirror plugin key rather than using autogeneration

// import Dropcursor from '@tiptap/extension-dropcursor';
// import Gapcursor from '@tiptap/extension-gapcursor';
import Document from '@tiptap/extension-document';
import Underline from '@tiptap/extension-underline';
import Text from '@tiptap/extension-text';
import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import CodeBlock from '@tiptap/extension-code-block';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from './extensions/extension-paragraph';
import Link from '@tiptap/extension-link';
import { createImage } from './extensions/extension-image';
import { createBold } from './extensions/extension-bold';
import { LinkData, HeadingData } from 'ricos-schema';
import { MarkConfig, NodeConfig, ExtensionConfig } from '@tiptap/react';
import * as TTR from '@tiptap/react';
import { BaseExtensionComponentHOC } from './components/BaseComponent';
import { CreateTiptapExtension } from 'wix-rich-content-common';

const extendedAttrs = (attrs): Partial<NodeConfig & MarkConfig> => ({
  addAttributes() {
    return {
      ...this.parent?.(),
      ...attrs,
    };
  },
});

const withKey = extendedAttrs({ key: '' });

const tiptapExtensions = [
  Blockquote.extend(withKey),
  Underline,
  BulletList.extend(withKey),
  CodeBlock.extend(withKey),
  Document.extend(extendedAttrs({ metadata: {} })),
  Heading.extend(withKey).extend(extendedAttrs(HeadingData.fromJSON({}))),
  History,
  Italic,
  ListItem.extend(withKey),
  OrderedList.extend(withKey),
  Paragraph.extend(withKey),
  Text,
  Link.extend(extendedAttrs(LinkData.fromJSON({}))),
  createBold(),
  createImage().extend(withKey),
  // Dropcursor,
  // Gapcursor,
];

type Creator = CreateTiptapExtension<NodeConfig | MarkConfig | ExtensionConfig>;

export const createExtensions = (ricosExtensions: ((() => Creator) | undefined)[]) => {
  const creatorCoreUtils = { ...TTR, BaseExtensionComponentHOC };
  const extensions = ricosExtensions
    .map(ext => ext?.()(creatorCoreUtils).extend(withKey))
    .filter(ext => !!ext);
  return [...tiptapExtensions, ...extensions];
};
