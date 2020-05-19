import React, { PureComponent } from 'react';
import { ContentStateTransformation, RichContentPreview } from 'wix-rich-content-preview';
import * as PropTypes from 'prop-types';
import * as Plugins from './PreviewPlugins';
import { isSSR } from 'wix-rich-content-common';
import theme from '../theme/theme'; // must import after custom styles
import 'wix-rich-content-preview/dist/styles.min.css';
import getImagesData from 'wix-rich-content-fullscreen/dist/lib/getImagesData';
import Fullscreen from 'wix-rich-content-fullscreen';

import 'wix-rich-content-fullscreen/dist/styles.min.css';

const anchorTarget = '_top';
const relValue = 'noreferrer';

export default class Preview extends PureComponent {
  constructor(props) {
    super(props);
    if (!isSSR()) {
      this.expandModeData = getImagesData(this.props.initialState);
    }
    this.state = {
      disabled: false,
    };
    this.transformations = [
      new ContentStateTransformation({
        _if: metadata => metadata.plain.length > 0,
        _then: (metadata, preview) => preview.plain(metadata.plain[0]).readMore({ lines: 3 }),
      }),
      new ContentStateTransformation({
        _if: metadata => metadata.images.length > 0,
        _then: (metadata, preview) =>
          preview.image({ mediaInfo: metadata.images[0] }).seeFullPost(),
      }),
      new ContentStateTransformation({
        _if: metadata => metadata.plain.length > 0,
        _then: (metadata, preview) => preview.plain(metadata.plain[0]).readMore({ lines: 1 }),
      }).rule({
        _if: metadata => metadata.images.length > 3,
        _then: (metadata, preview) =>
          preview
            .gallery({ mediaInfo: metadata.images.slice(0, 3) })
            .imageCounter({ counter: metadata.images.length - 3 }),
      }),
    ];
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
      modalContent: null,
    });
  };

  helpers = {
    onExpand: (entityIndex, innerIndex = 0) => {
      //galleries have an innerIndex (i.e. second image will have innerIndex=1)
      this.setState({
        expandModeIsOpen: true,
        expandModeIndex: this.expandModeData.imageMap[entityIndex] + innerIndex,
      });
    },
  };

  render() {
    const { expandModeIsOpen, expandModeIndex } = this.state;
    return (
      <div id="rich-content-preview" className="viewer">
        <div className="content-preview">
          <RichContentPreview
            locale={this.props.locale}
            helpers={this.helpers}
            typeMappers={Plugins.typeMappers}
            inlineStyleMappers={Plugins.getInlineStyleMappers(this.props.initialState)}
            decorators={Plugins.decorators}
            config={Plugins.config}
            initialState={this.props.initialState}
            theme={theme}
            isMobile={this.props.isMobile}
            anchorTarget={anchorTarget}
            relValue={relValue}
            disabled={this.state.disabled}
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

Preview.propTypes = {
  initialState: PropTypes.any,
  isMobile: PropTypes.bool,
};
