import React, { Component } from 'react';
import { CloseIcon, ExpandIcon, ShrinkIcon, ArrowLeft, ArrowRight } from './icons';
import { fullscreenResizeMediaUrl } from 'wix-rich-content-plugin-gallery/libs/resize-media-url';
import PropTypes from 'prop-types';
import styles from './fullscreen.rtlignore.scss';
import fscreen from 'fscreen';
import { convertItemData } from 'wix-rich-content-plugin-gallery/libs/convert-item-data';
import layouts from 'wix-rich-content-plugin-gallery/libs/layout-data-provider';

const { ProGallery } = require('pro-gallery');

export default class InnerFullscreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isInFullscreen: false };
    this.getItems();
    this.containerRef = React.createRef();
  }

  static defaultProps = {
    backgroundColor: 'white',
    foregroundColor: '#2F2E2E',
  };

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

  getStyleParams = isHorizontalView => {
    const { isInFullscreen } = this.state;
    let arrowsPosition = 0;
    let slideshowInfoSize = 0;
    if (this.props.isMobile) {
      slideshowInfoSize = isHorizontalView ? 0 : 40;
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
    const { backgroundColor, foregroundColor } = this.props;
    return (
      <div
        role="button"
        tabIndex={0}
        className={styles.close}
        onClick={this.onClose}
        onKeyDown={this.onClose}
        aria-label={'Close'}
        data-hook={'fullscreen-close-button'}
      >
        <CloseIcon backgroundColor={backgroundColor} foregroundColor={foregroundColor} />
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
    const { backgroundColor, foregroundColor } = this.props;
    const Icon = isInFullscreen ? ShrinkIcon : ExpandIcon;
    const ariaLabel = isInFullscreen ? 'Shrink' : 'Expand';
    return (
      <div
        role="button"
        tabIndex={0}
        className={styles.expand_button}
        onClick={this.toggleFullscreenMode}
        onKeyDown={this.onFullscreenToggleKeyDown}
        aria-label={ariaLabel}
        data-hook={'fullscreen-toggle-button'}
      >
        <Icon backgroundColor={backgroundColor} foregroundColor={foregroundColor} />
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
        <div style={{ color: this.props.foregroundColor }} className={styles.title}>
          {itemProps.title}
        </div>
      </div>
    );
  };

  renderArrow = (Icon, styles) => {
    const { backgroundColor, foregroundColor } = this.props;
    return (
      <div className={styles}>
        <Icon backgroundColor={backgroundColor} foregroundColor={foregroundColor} />
      </div>
    );
  };

  arrowRenderers = {
    left: this.renderArrow(ArrowLeft, styles.nav_arrow_left),
    right: this.renderArrow(ArrowRight, styles.nav_arrow_right),
  };

  customArrowRenderer = direction => this.arrowRenderers[direction];

  getDimensions = () => {
    const container = this.containerRef.current?.getBoundingClientRect?.();
    const width = container?.width || document.documentElement.clientWidth;
    const height = container?.height || document.documentElement.clientHeight;
    return { width, height };
  };

  render() {
    const { backgroundColor, topMargin, isMobile, index } = this.props;
    const { isInFullscreen } = this.state;
    const { width, height } = this.getDimensions();
    const isHorizontalView = width > height;
    const { arrowsPosition, slideshowInfoSize } = this.getStyleParams(isHorizontalView);

    return (
      <div
        style={{ background: backgroundColor, ...topMargin }}
        dir="ltr"
        data-hook={'fullscreen-root'}
        className={isInFullscreen || isMobile ? styles.fullscreen_mode : styles.expand_mode}
        ref={this.containerRef}
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
          customNavArrowsRenderer={this.customArrowRenderer}
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
  backgroundColor: PropTypes.string,
  foregroundColor: PropTypes.string,
  onClose: PropTypes.func,
};
