import React from 'react';
import { EditorPropsContext } from './context';
import Toolbar from './components/Toolbar';
import { JSONContent } from '@tiptap/core';
import * as ttReact from '@tiptap/react';
import {
  draftToTiptap,
  tiptapToDraft,
  draftBlockDataToTiptap,
  TO_RICOS_NODE_TYPE,
} from 'ricos-content/libs/converters';
import { tiptapExtensions } from './tiptap-extensions';
import { capitalize } from 'lodash';
import { TiptapAPI, TiptapConfig } from './types';
import { RICOS_DIVIDER_TYPE, DIVIDER_TYPE } from 'wix-rich-content-common';

const { Editor, EditorContent } = ttReact;

const getEditorCreator = ({ onUpdate, tiptapExtensions: exts }) => (content: JSONContent) => {
  // const extensions = exts.map(ext => ext()(ttReact));
  return new Editor({
    content,
    extensions: tiptapExtensions,
    injectCSS: true,
    onUpdate: ({ editor }) => {
      const newContent = editor.getJSON();
      const convertedContent = tiptapToDraft(newContent as JSONContent);
      onUpdate?.({ content: convertedContent });
    },
  });
};

// missing forceUpdate
//github.com/ueberdosis/tiptap/blob/main/packages/react/src/useEditor.ts#L20
const toTiptapAPI = (editor: ttReact.Editor): TiptapAPI => ({
  Editor: props => (
    <EditorPropsContext.Provider value={props}>
      <div dir="">
        <EditorContent editor={editor} />
      </div>
    </EditorPropsContext.Provider>
  ),
  blur: () => editor.commands.blur(),
  focus: () => editor.commands.focus(true),
  getEditorCommands: () => {
    return {
      ...editor.commands,
      toggleInlineStyle: inlineStyle => {
        const editorCommand = editor.chain().focus();
        const styleName = `toggle${capitalize(inlineStyle)}`;
        editorCommand[styleName]().run();
      },
      insertBlock: (pluginType, data) => {
        if (pluginType === RICOS_DIVIDER_TYPE || pluginType === DIVIDER_TYPE) {
          const attrs = draftBlockDataToTiptap(DIVIDER_TYPE, data);
          editor.commands.insertContent({
            type: TO_RICOS_NODE_TYPE[DIVIDER_TYPE].toLowerCase(),
            attrs,
            content: [],
          });
        }
      },
      // setBlock: (blockKey, pluginType, data) => {
      //   editor.commands.updateAttributes('heading', { level: 1 })
      // },
    };
  },
  getToolbars: () => ({
    MobileToolbar: () => <Toolbar editor={editor} />,
    TextToolbar: () => <Toolbar editor={editor} />,
  }),
  getToolbarProps: () => ({}),
  destroy: editor.destroy.bind(editor),
});

export const initTiptapEditor = ({
  initialContent,
  onUpdate,
  tiptapExtensions,
}: TiptapConfig): TiptapAPI => {
  const tiptapData = draftToTiptap(initialContent);
  const editorCreator = getEditorCreator({ onUpdate, tiptapExtensions });
  const editor = editorCreator(tiptapData);

  return toTiptapAPI(editor);
};
