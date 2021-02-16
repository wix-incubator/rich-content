import React, { PureComponent, RefObject } from 'react';
import { RichContentViewer, RichContentViewerProps } from 'wix-rich-content-viewer';
import { isSSR, SEOSettings } from 'wix-rich-content-common';
import * as Plugins from './ViewerPlugins';
import theme from '../theme/theme'; // must import after custom styles
import getImagesData from 'wix-rich-content-fullscreen/libs/getImagesData';
import Fullscreen from 'wix-rich-content-fullscreen';
import 'wix-rich-content-fullscreen/dist/styles.min.css';
import { IMAGE_TYPE } from 'wix-rich-content-plugin-image/viewer';
import { TextSelectionToolbar, TwitterButton, HighlightButton, UnhighlightButton } from 'wix-rich-content-text-selection-toolbar';
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
const anchorTarget = '_top';
const relValue = 'noreferrer';

interface ExampleViewerProps {
  initialState?: RichContentViewerProps['initialState'];
  isMobile?: boolean;
  locale: string;
  scrollingElementFn?: any;
  seoMode?: SEOSettings;
  localeResource?: Record<string, string>;
}

interface ExampleViewerState {
  expandModeIsOpen?: boolean;
  expandModeIndex?: number;
  disabled: boolean;
}

export default class Viewer extends PureComponent<ExampleViewerProps, ExampleViewerState> {
  expandModeData;
  viewerRef: RefObject<any>;
  pluginsConfig: RichContentViewerProps['config'];
  shouldRenderFullscreen: boolean;

  constructor(props: ExampleViewerProps) {
    super(props);
    if (!isSSR()) {
      this.expandModeData = getImagesData(this.props.initialState);
    }
    this.state = {
      disabled: false,
    };
    this.viewerRef = React.createRef();
    this.pluginsConfig = this.getConfig();
  }

  componentDidMount() {
    this.shouldRenderFullscreen = true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialState !== this.props.initialState) {
      this.expandModeData = getImagesData(this.props.initialState);
    }
  }

  getConfig = () => {
    const { scrollingElementFn } = this.props;
    const onExpand = (entityIndex, innerIndex = 0) => {
      //galleries have an innerIndex (i.e. second image will have innerIndex=1)
      this.setState({
        expandModeIsOpen: true,
        expandModeIndex: this.expandModeData.imageMap[entityIndex] + innerIndex,
      });
    };
    const additionalConfig = {
      [GALLERY_TYPE]: { onExpand, scrollingElement: scrollingElementFn },
      [IMAGE_TYPE]: { onExpand },
    };
    return Plugins.getConfig(additionalConfig);
  };

  render() {
    const { isMobile, initialState, locale, seoMode, localeResource } = this.props;
    const { expandModeIsOpen, expandModeIndex, disabled } = this.state;
    const viewerProps = {
      helpers: {
        // This is for debugging only
        onViewerAction: async (actionName, pluginId, value) =>
          console.log('onViewerAction', actionName, pluginId, value),
        onViewerLoaded: async (...args) => console.log('onViewerLoaded', ...args),
      },
      localeResource,
      locale,
      relValue,
      anchorTarget,
      isMobile,
      theme,
      initialState,
      disabled,
      seoMode,
    };

    return (
      <>
        <div id="rich-content-viewer" ref={this.viewerRef} className="viewer">
          <RichContentViewer
            typeMappers={Plugins.typeMappers}
            // @ts-ignore
            inlineStyleMappers={Plugins.getInlineStyleMappers(initialState)}
            decorators={Plugins.decorators}
            config={this.pluginsConfig}
            {...viewerProps}
          />
          {this.shouldRenderFullscreen && (
            <Fullscreen
              images={this.expandModeData.images}
              onClose={() => this.setState({ expandModeIsOpen: false })}
              isOpen={expandModeIsOpen}
              index={expandModeIndex}
              isMobile={isMobile}
            />
          )}
          {!isMobile ? (
            <TextSelectionToolbar container={this.viewerRef.current}>
              {selectedText => <>
                <TwitterButton selectedText={selectedText} />
                <HighlightButton />
                <UnhighlightButton />
              </>}
            </TextSelectionToolbar>
          ) : null}
        </div>
      </>
    );
  }
}
