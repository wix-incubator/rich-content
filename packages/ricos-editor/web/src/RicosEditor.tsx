/* eslint-disable react/prop-types */
import React, { Component, Fragment, ElementType, FunctionComponent } from 'react';
import { RicosEngine } from 'ricos-viewer';
import { RichContentEditor } from 'wix-rich-content-editor';
import { createDataConverter } from './editorUtils';
import { shouldRenderChild } from 'ricos-viewer/dist/lib/utils.cjs.js';
import ReactDOM from 'react-dom';
import { EditorState } from 'draft-js';
import './styles.css';

interface State {
  StaticToolbar?: ElementType;
}

export class RicosEditor extends Component<RicosEditorProps, State> {
  editor: typeof RichContentEditor;
  dataInstance: EditorDataInstance;

  constructor(props: RicosEditorProps) {
    super(props);
    this.dataInstance = createDataConverter(props.onChange);
    this.state = {};
  }

  componentDidMount() {
    if (this.editor) {
      const { MobileToolbar, TextToolbar } = this.editor.getToolbars();
      this.setState({ StaticToolbar: MobileToolbar || TextToolbar });
    }
  }

  onChange = (childOnChange?: (editorState: EditorState) => void) => (editorState: EditorState) => {
    this.dataInstance.refresh(editorState);
    childOnChange?.(editorState);
  };

  focus = () => this.editor.focus();
  blur = () => this.editor.blur();
  getContent = (postId?: string, forPublish?: boolean) => {
    const { getContentState } = this.dataInstance;
    if (postId && forPublish) {
      this.editor.publish(postId); //async
    }
    return getContentState();
  };

  render() {
    const { children, toolbarSettings, ...props } = this.props;
    const { StaticToolbar } = this.state;

    const child: RichContentChild =
      children && shouldRenderChild('RichContentEditor', children) ? (
        children
      ) : (
        <RichContentEditor />
      );

    return (
      <Fragment>
        <StaticToolbarPortal
          StaticToolbar={StaticToolbar}
          textToolbarContainer={toolbarSettings?.textToolbarContainer}
        />
        <RicosEngine isViewer={false} key={'editor'} {...props} toolbarSettings={toolbarSettings}>
          {React.cloneElement(child, {
            onChange: this.onChange(child.props.onChange),
            ref: ref => (this.editor = ref),
            editorKey: 'editor',
          })}
        </RicosEngine>
      </Fragment>
    );
  }
}

const StaticToolbarPortal: FunctionComponent<{
  StaticToolbar?: ElementType;
  textToolbarContainer?: HTMLElement;
}> = ({ StaticToolbar, textToolbarContainer }) => {
  if (!StaticToolbar) return null;

  if (textToolbarContainer) {
    return ReactDOM.createPortal(<StaticToolbar />, textToolbarContainer);
  }
  return <StaticToolbar />;
};
