import React, { Component } from 'react';
import { withI18n, ToolbarType } from 'wix-rich-content-common';
import englishResources from 'wix-rich-content-common/dist/statics/locale/messages_en.json';
import RichContentEditor, { RichContentEditorProps } from './RichContentEditor';

const WrappedEditor = withI18n<RichContentEditor, Partial<RichContentEditorProps>>(
  RichContentEditor,
  englishResources
);

export default class I18nRichContentEditor extends Component<Partial<RichContentEditorProps>> {
  editor!: RichContentEditor;

  static displayName = 'RichContentEditor';

  setEditorRef = editor => (this.editor = editor ? editor.getWrappedInstance() : undefined);

  getToolbars = () => this.editor.getToolbars();

  getToolbarProps = (type: ToolbarType) => this.editor.getToolbarProps(type);

  getT = () => this.editor.getT();

  getPlugins = () => this.editor.getPlugins();

  removeToolbarFocus = () => this.editor.removeToolbarFocus();

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  getEditorCommands = () => this.editor.EditorCommands;

  render() {
    return <WrappedEditor {...this.props} ref={this.setEditorRef} />;
  }
}
