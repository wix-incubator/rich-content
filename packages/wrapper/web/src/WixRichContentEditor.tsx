/* eslint-disable react/prop-types */
import React, { Component, Fragment, ElementType, FunctionComponent } from 'react';
import EngineWrapper from './EngineWrapper';
import { RichContentEditor } from 'wix-rich-content-editor';
import { shouldRenderChild, createDataConverter } from './utils';
import ReactDOM from 'react-dom';
import { EditorState } from 'draft-js';

interface State {
  StaticToolbar?: ElementType;
}

export class WixRichContentEditor extends Component<WixRichContentEditorProps, State> {
  editor: typeof RichContentEditor;
  dataInstance: EditorDataInstance;

  constructor(props) {
    super(props);
    this.dataInstance = createDataConverter();
    this.state = {};
  }

  componentDidMount() {
    if (this.editor) {
      const { MobileToolbar, TextToolbar } = this.editor.getToolbars();
      this.setState({ StaticToolbar: MobileToolbar || TextToolbar });
    }
  }

  onChange = (childOnChange?: OnChangeFunction) => (editorState: EditorState) => {
    this.dataInstance.refresh(editorState);
    childOnChange?.(editorState);
  };

  getToolbars = () => this.editor.getToolbars();
  focus = () => this.editor.focus();
  blur = () => this.editor.blur();
  getData = (postId?: string, forPublish?: boolean) => {
    const { getContentState } = this.dataInstance;
    if (postId && forPublish) {
      this.editor.publish(postId); //async
    }
    return {
      getContentState,
    };
  };

  render() {
    const { children, textToolbarContainer, ...props } = this.props;
    const { StaticToolbar } = this.state;

    const child: RichContentChild =
      children && shouldRenderChild(false, children) ? children : <RichContentEditor />;

    return (
      <Fragment>
        <StaticToolbarPortal
          StaticToolbar={StaticToolbar}
          textToolbarContainer={textToolbarContainer}
        />
        <EngineWrapper isViewer={false} key={'editor'} {...props}>
          {React.cloneElement(child, {
            onChange: this.onChange(child.props.onChange),
            ref: ref => (this.editor = ref),
          })}
        </EngineWrapper>
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
