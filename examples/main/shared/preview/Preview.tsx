import React, { PureComponent } from 'react';
import { RichContentPreview } from 'wix-rich-content-preview';
import * as Plugins from './PreviewPlugins';
import { isSSR, DraftContent, SEOSettings } from 'wix-rich-content-common';
import theme from '../theme/theme'; // must import after custom styles
import 'wix-rich-content-preview/dist/styles.min.css';
import getImagesData from 'wix-rich-content-fullscreen/libs/getImagesData';
import Fullscreen from 'wix-rich-content-fullscreen';
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery/loadable/viewer';
import { IMAGE_TYPE } from 'wix-rich-content-plugin-image/loadable/viewer';

const anchorTarget = '_top';
const relValue = 'noreferrer';

interface Props {
  initialState?: DraftContent;
  isMobile?: boolean;
  locale?: string;
  localeResource?: Record<string, string>;
  seoMode?: SEOSettings;
}

interface State {
  expandModeIsOpen?: boolean;
  expandModeIndex?: number;
  disabled: boolean;
  showModal?: boolean;
}

export default class Preview extends PureComponent<Props, State> {
  expandModeData: { images: any; imageMap: {} };
  config;
  shouldRenderFullscreen: boolean;

  constructor(props) {
    super(props);
    if (!isSSR()) {
      this.expandModeData = getImagesData(this.props.initialState);
    }
    this.state = {
      disabled: false,
    };
    this.config = this.getConfig();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.initialState !== this.props.initialState) {
      this.expandModeData = getImagesData(this.props.initialState);
    }
  }

  componentDidMount() {
    this.shouldRenderFullscreen = true;
  }

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  getConfig = () => {
    const onExpand = (blockKey, innerIndex = 0) => {
      //galleries have an innerIndex (i.e. second image will have innerIndex=1)
      this.setState({
        expandModeIsOpen: true,
        expandModeIndex: this.expandModeData.imageMap[blockKey] + innerIndex,
      });
    };
    const onPreviewExpand = () => console.log('preview expanded');
    const additionalConfig = {
      [GALLERY_TYPE]: { onExpand },
      [IMAGE_TYPE]: { onExpand },
      PREVIEW: { onPreviewExpand },
    };
    return Plugins.getConfig(additionalConfig);
  };

  render() {
    const { expandModeIsOpen, expandModeIndex } = this.state;
    const helpers = {
      onViewerLoaded: async (...args) => console.log('onViewerLoaded', ...args),
    };
    return (
      <div id="rich-content-preview" className="viewer">
        <div className="content-preview">
          <RichContentPreview
            locale={this.props.locale}
            typeMappers={Plugins.typeMappers}
            // @ts-ignore
            inlineStyleMappers={Plugins.getInlineStyleMappers(this.props.initialState)}
            decorators={Plugins.decorators}
            config={this.config}
            initialState={this.props.initialState}
            theme={theme}
            helpers={helpers}
            isMobile={this.props.isMobile}
            anchorTarget={anchorTarget}
            relValue={relValue}
            disabled={this.state.disabled}
            seoMode={this.props.seoMode}
          />
          {this.shouldRenderFullscreen && (
            <Fullscreen
              images={this.expandModeData.images}
              onClose={() => this.setState({ expandModeIsOpen: false })}
              isOpen={expandModeIsOpen}
              index={expandModeIndex}
            />
          )}
        </div>
      </div>
    );
  }
}
