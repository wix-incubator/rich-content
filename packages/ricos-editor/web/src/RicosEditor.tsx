import React, { Component, Fragment, ElementType, FunctionComponent } from 'react';
import { RicosEngine, shouldRenderChild, localeStrategy } from 'ricos-common';
import { RichContentEditor, RichContentEditorProps } from 'wix-rich-content-editor';
import { createDataConverter, filterDraftEditorSettings } from './utils/editorUtils';
import ReactDOM from 'react-dom';
import { EditorState, ContentState } from 'draft-js';
import RicosModal from './modals/RicosModal';
import './styles.css';
import { RicosEditorProps, EditorDataInstance } from '.';
import { hasActiveUploads } from './utils/hasActiveUploads';
import {
  convertToRaw,
  convertFromRaw,
  createWithContent,
} from 'wix-rich-content-editor/libs/editorStateConversion';
import { isEqual } from 'lodash';
import { withEditorEvents } from 'wix-rich-content-editor-common';
import { ToolbarType } from 'wix-rich-content-common';

interface State {
  StaticToolbar?: ElementType;
  localeStrategy: { locale?: string; localeResource?: Record<string, string> };
  remountKey: boolean;
  editorState?: EditorState;
}

export class RicosEditor extends Component<RicosEditorProps, State> {
  editor: RichContentEditor;
  dataInstance: EditorDataInstance;
  isBusy = false;
  currentEditorRef: ElementType;

  constructor(props: RicosEditorProps) {
    super(props);
    this.dataInstance = createDataConverter(props.onChange);
    this.state = { localeStrategy: { locale: props.locale }, remountKey: false };
  }

  static defaultProps = { locale: 'en' };

  updateLocale = async () => {
    const { locale, children } = this.props;
    await localeStrategy(children?.props.locale || locale).then(localeData => {
      this.setState({ localeStrategy: localeData, remountKey: !this.state.remountKey });
    });
  };

  componentDidMount() {
    this.updateLocale();
    this.props.editorEvents?.subscribe('rce:publish', this.publish);
  }

  componentWillUnmount() {
    this.props.editorEvents?.unsubscribe('rce:publish', this.publish);
  }

  publish = async () => {
    // TODO: remove this param after getContent(postId) is deprecated
    await this.editor.publish((undefined as unknown) as string);
    console.debug('editor publish callback'); // eslint-disable-line
    return {
      type: 'EDITOR_PUBLISH',
      data: this.getContent(),
    };
  };

  setStaticToolbar = ref => {
    if (ref && ref !== this.currentEditorRef) {
      this.currentEditorRef = ref;
      const { MobileToolbar, TextToolbar } = ref.getToolbars();
      this.setState({ StaticToolbar: MobileToolbar || TextToolbar });
    }
  };

  componentWillReceiveProps(newProps: RicosEditorProps) {
    if (newProps.locale !== this.props.locale) {
      this.updateLocale();
    }
    if (
      newProps.injectedContent &&
      !isEqual(this.props.injectedContent, newProps.injectedContent)
    ) {
      console.debug('new content provided as editorState'); // eslint-disable-line
      this.setState({ editorState: createWithContent(convertFromRaw(newProps.injectedContent)) });
    }
  }

  onChange = (childOnChange?: RichContentEditorProps['onChange']) => (
    editorState: EditorState,
    contentTraits: { isEmpty: boolean; isContentChanged: boolean }
  ) => {
    this.dataInstance.refresh(editorState, contentTraits);
    childOnChange?.(editorState, contentTraits);
    this.onBusyChange(editorState.getCurrentContent(), contentTraits);
  };

  getToolbarProps = (type: ToolbarType) => this.editor.getToolbarProps(type);

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  getToolbars = () => this.editor.getToolbars();

  getContent = async (postId?: string, forPublish?: boolean, shouldRemoveErrorBlocks = true) => {
    const { getContentState } = this.dataInstance;
    if (postId && forPublish) {
      /* eslint-disable */
      console.warn(
        'Please use biSettings.postId and ref.publish() API for publishing. The getContent(postId, isPublishing) API is deprecated and will be removed in ricos v9.0.0'
      );
      /* eslint-enable */
      await this.editor.publish(postId); //async
    }
    return getContentState({ shouldRemoveErrorBlocks });
  };

  getContentPromise = async ({
    publishId,
    flush,
  }: { flush?: boolean; publishId?: string } = {}) => {
    const { getContentStatePromise, waitForUpdate } = this.dataInstance;
    if (flush) {
      waitForUpdate();
      this.blur();
    }
    const res = await getContentStatePromise();
    if (publishId) {
      this.editor.publish(publishId);
    }
    return res;
  };

  onBusyChange = (
    contentState: ContentState,
    contentTraits: { isEmpty: boolean; isContentChanged: boolean }
  ) => {
    const { onBusyChange, onChange } = this.props;
    const isBusy = hasActiveUploads(contentState);
    if (this.isBusy !== isBusy) {
      this.isBusy = isBusy;
      onBusyChange?.(isBusy);
      onChange?.(convertToRaw(contentState), contentTraits);
    }
  };

  setEditorRef = (ref: RichContentEditor) => {
    this.editor = ref;
    this.setStaticToolbar(ref);
  };

  render() {
    const { children, toolbarSettings, draftEditorSettings = {}, content, ...props } = this.props;
    const { StaticToolbar, localeStrategy, remountKey, editorState } = this.state;

    const contentProp = editorState
      ? { editorState: { editorState }, content: {} }
      : { editorState: {}, content: { content } };

    const supportedDraftEditorSettings = filterDraftEditorSettings(draftEditorSettings);

    const child =
      children && shouldRenderChild('RichContentEditor', children) ? (
        children
      ) : (
        <RichContentEditor />
      );

    return (
      <Fragment key={`${remountKey}`}>
        <StaticToolbarPortal
          StaticToolbar={StaticToolbar}
          textToolbarContainer={toolbarSettings?.textToolbarContainer}
        />
        <RicosEngine
          RicosModal={RicosModal}
          isViewer={false}
          key={'editor'}
          toolbarSettings={toolbarSettings}
          {...contentProp.content}
          {...props}
        >
          {React.cloneElement(child, {
            onChange: this.onChange(child.props.onChange),
            ref: this.setEditorRef,
            editorKey: 'editor',
            setEditorToolbars: this.setStaticToolbar,
            ...contentProp.editorState,
            ...supportedDraftEditorSettings,
            ...localeStrategy,
          })}
        </RicosEngine>
      </Fragment>
    );
  }
}

export default withEditorEvents(RicosEditor);

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
