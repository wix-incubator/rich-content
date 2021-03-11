import React, { PureComponent, RefObject } from 'react';
import { RichContentViewer, RichContentViewerProps } from 'wix-rich-content-viewer';
import { isSSR, DraftContent, SEOSettings } from 'wix-rich-content-common';
import * as Plugins from './ViewerPlugins';
import theme from '../theme/theme'; // must import after custom styles
import getImagesData from 'wix-rich-content-fullscreen/libs/getImagesData';
import Fullscreen from 'wix-rich-content-fullscreen';
import { IMAGE_TYPE } from 'wix-rich-content-plugin-image/viewer';
import { TextSelectionToolbar, TwitterButton } from 'wix-rich-content-text-selection-toolbar';
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import { RicosViewer } from 'ricos-viewer';
import { mockHooks } from '../utils/mockHooksData';

const anchorTarget = '_top';
const relValue = 'noreferrer';

interface ExampleViewerProps {
  initialState?: DraftContent;
  isMobile?: boolean;
  locale: string;
  scrollingElementFn?: any;
  seoMode?: SEOSettings;
  localeResource?: Record<string, string>;
  shouldUseNewContent?: boolean;
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
    const onExpand = (blockKey, innerIndex = 0) => {
      //galleries have an innerIndex (i.e. second image will have innerIndex=1)
      this.setState({
        expandModeIsOpen: true,
        expandModeIndex: this.expandModeData.imageMap[blockKey] + innerIndex,
      });
    };
    const additionalConfig = {
      [GALLERY_TYPE]: { onExpand, scrollingElement: scrollingElementFn },
      [IMAGE_TYPE]: { onExpand },
    };
    return Plugins.getConfig(additionalConfig);
  };

  render() {
    const {
      isMobile,
      initialState,
      locale,
      seoMode,
      localeResource,
      shouldUseNewContent,
    } = this.props;
    const { expandModeIsOpen, expandModeIndex, disabled } = this.state;
    const viewerProps = {
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
        {shouldUseNewContent ? (
          <div id="rich-content-viewer" ref={this.viewerRef} className="viewer">
            <RicosViewer
              content={initialState}
              plugins={Plugins.viewerPlugins}
              locale={locale}
              hooks={mockHooks}
              linkSettings={{ relValue, anchorTarget }}
              isMobile={isMobile}
              cssOverride={theme}
              mediaSettings={{ pauseMedia: disabled }}
              seoSettings={seoMode}
            />
          </div>
        ) : (
          <div id="rich-content-viewer" ref={this.viewerRef} className="viewer">
            <RichContentViewer
              typeMappers={Plugins.typeMappers}
              // @ts-ignore
              inlineStyleMappers={Plugins.getInlineStyleMappers(initialState)}
              decorators={Plugins.decorators}
              config={this.pluginsConfig}
              hooks={mockHooks}
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
          </div>
        )}
        {!isMobile ? (
          <TextSelectionToolbar container={this.viewerRef.current}>
            {selectedText => <TwitterButton selectedText={selectedText} />}
          </TextSelectionToolbar>
        ) : null}
      </>
    );
  }
}
