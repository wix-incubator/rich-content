import { Command, Node, mergeAttributes } from '@tiptap/core';

export interface ParagraphOptions {
  HTMLAttributes: Record<string, unknown>;
}

interface Commands {
  paragraph: {
    /**
     * Toggle a paragraph
     */
    setParagraph: () => Command;
  };
}

export const Paragraph = Node.create<ParagraphOptions>({
  name: 'paragraph',

  priority: 1000, //default paragraph is 1000

  defaultOptions: {
    HTMLAttributes: {},
  },

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [{ tag: 'div' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setParagraph: () => ({ commands }) => {
        return commands.toggleNode('paragraph', 'paragraph');
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-0': () => this.editor.commands.setParagraph(),
    };
  },
});
