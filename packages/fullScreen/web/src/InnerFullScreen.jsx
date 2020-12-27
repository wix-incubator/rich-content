import React, { Component } from 'react';
import { closeIcon, expandIcon, shrinkIcon, arrowLeft, arrowRight } from './icons';
import layouts from 'wix-rich-content-plugin-gallery/libs/layout-data-provider';
import { fullscreenResizeMediaUrl } from 'wix-rich-content-plugin-gallery/libs/resize-media-url';
import PropTypes from 'prop-types';
import styles from './fullscreen.rtlignore.scss';
import fscreen from 'fscreen';
import { convertItemData } from 'wix-rich-content-plugin-gallery/libs/convert-item-data';

const { ProGallery } = require('pro-gallery');

const navArrowsMap = {
  left: arrowLeft,
  right: arrowRight,
};

export default class InnerFullscreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isInFullscreen: false };
    this.getItems();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onEsc);
    window.addEventListener('resize', this.onWindowResize);
    this.addFullscreenChangeListener();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEsc);
    window.removeEventListener('resize', this.onWindowResize);
    this.removeFullscreenChangeListener();
  }

  getItems() {
    const { images } = this.props;
    this.items = convertItemData({ items: images });
    this.itemIndexMap = {};
    this.items.map((item, index) => (this.itemIndexMap[item.itemId] = index));
  }

  addFullscreenChangeListener = () => {
    if (fscreen.fullscreenEnabled) {
      fscreen.addEventListener('fullscreenchange', this.onFullscreenChange);
    }
  };

  removeFullscreenChangeListener = () => {
    if (fscreen.fullscreenEnabled) {
      fscreen.removeEventListener('fullscreenchange', this.onFullscreenChange);
    }
  };

  onWindowResize = () => this.forceUpdate();

  onFullscreenChange = () => this.setState({ isInFullscreen: !!fscreen.fullscreenElement });

  onEsc = event => {
    if (event.key === 'Escape') {
      this.onClose();
    }
  };

  toggleFullscreenMode = () => {
    const { isInFullscreen } = this.state;
    if (fscreen.fullscreenEnabled) {
      isInFullscreen ? fscreen.exitFullscreen() : fscreen.requestFullscreen(document.body);
    }
  };

  getStyleParams = () => {
    const { isInFullscreen } = this.state;
    let arrowsPosition = 0;
    let slideshowInfoSize = 0;
    if (this.props.isMobile) {
      slideshowInfoSize = 154;
    } else if (!isInFullscreen) {
      arrowsPosition = 1;
      slideshowInfoSize = 142;
    }
    return { arrowsPosition, slideshowInfoSize };
  };

  onClose = () => {
    if (this.state.isInFullscreen) {
      this.toggleFullscreenMode();
    }
    this.props.onClose();
  };

  renderCloseButton = () => {
    const { iconsColor, backgroundColor } = this.props;
    return (
      <div
        role="button"
        tabIndex={0}
        className={styles.close}
        style={{ ...iconsColor, ...backgroundColor }}
        onClick={this.onClose}
        onKeyDown={this.onClose}
        aria-label={'Close'}
        data-hook={'fullscreen-close-button'}
      >
        {closeIcon()}
      </div>
    );
  };

  onFullscreenToggleKeyDown = event => {
    if (event.key === 'Escape') {
      this.onClose();
    } else {
      this.toggleFullscreenMode();
    }
  };

  renderFullscreenToggleButton = () => {
    const { isInFullscreen } = this.state;
    const { iconsColor, backgroundColor } = this.props;
    const icon = isInFullscreen ? shrinkIcon : expandIcon;
    const ariaLabel = isInFullscreen ? 'Shrink' : 'Expand';
    return (
      <div
        role="button"
        tabIndex={0}
        className={styles.expand_button}
        style={{ ...iconsColor, ...backgroundColor }}
        onClick={this.toggleFullscreenMode}
        onKeyDown={this.onFullscreenToggleKeyDown}
        aria-label={ariaLabel}
        data-hook={'fullscreen-toggle-button'}
      >
        {icon()}
      </div>
    );
  };

  handleGalleryEvents = (name, data) => {
    if (name === 'CURRENT_ITEM_CHANGED') {
      this.currentIdx = this.itemIndexMap[data.itemId];
    }
  };

  infoElement = itemProps => {
    return (
      <div className={styles.info_container}>
        <div className={styles.title}>{itemProps.title}</div>
      </div>
    );
  };

  renderArrows = direction => {
    const { iconsColor, backgroundColor } = this.props;
    return <div style={{ ...iconsColor, ...backgroundColor }}> {navArrowsMap[direction]()} </div>;
  };

  render() {
    const { backgroundColor, topMargin, isMobile, index } = this.props;
    const { isInFullscreen } = this.state;
    const { arrowsPosition, slideshowInfoSize } = this.getStyleParams();
    const width = isInFullscreen || isMobile ? window.innerWidth : window.innerWidth - 14;
    const height = isInFullscreen ? window.screen.height : window.innerHeight;
    return (
      <div
        style={{ ...backgroundColor, ...topMargin }}
        dir="ltr"
        data-hook={'fullscreen-root'}
        className={isInFullscreen ? styles.fullscreen_mode : styles.expand_mode}
      >
        {this.renderCloseButton()}
        {!isMobile && this.renderFullscreenToggleButton()}
        <ProGallery
          items={this.items}
          currentIdx={typeof this.currentIdx === 'number' ? this.currentIdx : index}
          eventsListener={this.handleGalleryEvents}
          resizeMediaUrl={fullscreenResizeMediaUrl}
          container={{ width, height }}
          styles={{
            ...layouts[5],
            galleryLayout: 5,
            cubeType: 'fit',
            scrollSnap: true,
            videoPlay: 'auto',
            allowSocial: false,
            loveButton: false,
            allowTitle: true,
            defaultShowInfoExpand: 1,
            showArrows: !isMobile,
            arrowsPosition,
            slideshowInfoSize,
          }}
          customSlideshowInfoRenderer={this.infoElement}
          customNavArrowsRenderer={this.renderArrows}
        />
      </div>
    );
  }
}

InnerFullscreen.propTypes = {
  images: PropTypes.array.isRequired,
  isMobile: PropTypes.bool,
  index: PropTypes.number,
  topMargin: PropTypes.object,
  backgroundColor: PropTypes.object,
  iconsColor: PropTypes.object,
  onClose: PropTypes.func,
};
