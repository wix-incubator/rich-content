import React from 'react';
import PropTypes from 'prop-types';
import { validate, mergeStyles } from 'wix-rich-content-common';
// eslint-disable-next-line max-len
import pluginGallerySchema from 'wix-rich-content-common/dist/statics/schemas/plugin-gallery.schema.json';
import { isEqual, debounce } from 'lodash';
import { convertItemData } from '../lib/convert-item-data';
import { DEFAULTS, isHorizontalLayout, sampleItems } from './defaults';
import { resizeMediaUrl } from '../lib/resize-media-url';
import styles from '../statics/styles/viewer.rtlignore.scss';
import '../statics/styles/gallery-styles.rtlignore.scss';
import ExpandIcon from './icons/expand';
import classnames from 'classnames';
import { GALLERY_TYPE } from './types';

const { ProGallery, GALLERY_CONSTS } = require('pro-gallery');

const GALLERY_EVENTS = GALLERY_CONSTS.events;

const getGalleryHeight = width => (width ? Math.floor((width * 3) / 4) : 300);

class GalleryViewer extends React.Component {
  constructor(props) {
    validate(props.componentData, pluginGallerySchema);
    super(props);
    this.domId = this.props.blockKey || 'v-' + this.props.entityIndex;
    this.containerRef = React.createRef();
    this.state = {
      ...this.stateFromProps(props),
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ size: this.getDimensions() });
    this.initUpdateDimensionsForDomChanges();
  }

  initUpdateDimensionsForDomChanges() {
    let { scrollingElement } = this.props?.settings;
    if (!scrollingElement) {
      // eslint-disable-next-line no-console
      console.error(
        `Please fix the gallery config of Rich Content Editor.
        A scrollingElement needs to be provided. Without it the gallery will not work correctly`
      );
      scrollingElement = document.body;
    }
    let contentElement =
      typeof scrollingElement === 'function' ? scrollingElement() : scrollingElement;
    if (contentElement?.nodeType !== 1) {
      contentElement = document.body;
    }
    if (contentElement) {
      this.observer = new MutationObserver(() => {
        if (contentElement.clientHeight !== this.oldContentElementHeight) {
          this.oldContentElementHeight = contentElement.clientHeight;
          this.updateDimensions();
        }
      });
      this.observer.observe(contentElement, { attributes: true, childList: true, subtree: true });
    } else {
      // eslint-disable-next-line no-console
      console.warn(`can't find content container to listen for changes to update gallery`);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.stateFromProps(nextProps) });
  }

  componentDidUpdate(prevProps) {
    if (this.shouldUpdateDimensions(prevProps.componentData)) {
      this.updateDimensions();
    }
  }

  componentWillUnmount() {
    this.observer.disconnect();
    window.removeEventListener('resize', this.updateDimensions);
    this.updateDimensions.cancel();
  }

  shouldUpdateDimensions = prevComponentData => {
    const { galleryLayout: prevGalleryLayout } = prevComponentData.styles;
    const { galleryLayout: currentGalleryLayout } = this.props.componentData.styles;
    if (currentGalleryLayout !== prevGalleryLayout) {
      return true;
    }

    if (!isEqual(prevComponentData.config, this.props.componentData.config)) {
      return true;
    }
  };

  getDimensions = () => {
    const width = Math.floor(this.containerRef.current.getBoundingClientRect().width);
    const height = isHorizontalLayout(this.props.componentData.styles)
      ? getGalleryHeight(width)
      : undefined;
    return { width, height };
  };

  updateDimensions = debounce(() => {
    const { width, height } = this.getDimensions();
    if (width !== this.state.size?.width || height !== this.state.size?.height) {
      this.setState({ size: { width, height } });
    }
  }, 100);

  stateFromProps = props => {
    let items = props.componentData.items || DEFAULTS.items;
    items = items.filter(item => !item.error);
    return {
      items,
    };
  };

  getItems() {
    const { items } = this.state;
    const { anchorTarget, relValue } = this.props;
    if (items.length > 0) {
      return convertItemData({ items, anchorTarget, relValue });
    } else {
      return sampleItems;
    }
  }

  handleGalleryEvents = (name, data) => {
    const {
      componentData: { styles: styleParams },
    } = this.props;

    switch (name) {
      case GALLERY_EVENTS.GALLERY_CHANGE:
        if (this.containerRef.current) {
          if (!isHorizontalLayout(styleParams)) {
            this.containerRef.current.style.height = `${data.layoutHeight}px`;
          } else {
            this.containerRef.current.style.height = 'auto';
          }
        }
        break;
      case GALLERY_EVENTS.ITEM_ACTION_TRIGGERED:
        !data.linkData.url && this.hasExpand() && this.handleExpand(data);
        break;
      default:
        break;
    }
  };

  handleExpand = data => {
    const {
      settings: { onExpand },
      helpers = {},
    } = this.props;
    helpers.onViewerAction?.(GALLERY_TYPE, 'expand_gallery');
    this.hasExpand() && onExpand?.(this.props.blockKey, data.idx);
  };

  renderExpandIcon = itemProps => {
    return (
      <div className={this.styles.expandContainer}>
        <ExpandIcon
          className={this.styles.expandIcon}
          onClick={e => {
            e.preventDefault();
            this.handleExpand(itemProps);
          }}
        />
      </div>
    );
  };

  hasExpand = () => {
    const { componentData, settings } = this.props;
    let disableExpand = false;
    if (componentData.disableExpand !== undefined) {
      disableExpand = componentData.disableExpand;
    } else if (settings.disableExpand !== undefined) {
      disableExpand = settings.disableExpand;
    }
    return !disableExpand && settings.onExpand;
  };

  renderTitle = title => {
    return title ? (
      <div className={styles.imageTitleContainer}>
        <div className={this.styles.imageTitle}>{title}</div>
      </div>
    ) : null;
  };

  hoverElement = itemProps => {
    const isClickable = this.hasExpand() || itemProps.link;
    const itemOverlayStyles = classnames(
      this.styles.itemOverlay,
      isClickable && this.styles.clickableItem
    );
    return (
      <div className={itemOverlayStyles}>
        {this.hasExpand() && this.renderExpandIcon(itemProps)}
        {this.renderTitle(itemProps.title, 'HOVER')}
        {this.props.itemOverlayElement?.(itemProps)}
      </div>
    );
  };

  handleContextMenu = e => {
    const { componentData, disableRightClick } = this.props;
    let disabled = false;
    if (componentData.disableRightClick !== undefined) {
      disabled = componentData.disableRightClick;
    } else if (disableRightClick !== undefined) {
      disabled = disableRightClick;
    }
    return disabled && e.preventDefault();
  };

  render() {
    const {
      theme,
      settings,
      seoMode,
      componentData: { styles: styleParams },
    } = this.props;
    this.styles = this.styles || mergeStyles({ styles, theme });
    const { scrollingElement, ...galleySettings } = settings;
    const { size } = this.state;

    const items = this.getItems();
    const viewMode = seoMode ? GALLERY_CONSTS.viewMode.SEO : undefined;
    const alwaysShowHover = {
      hoveringBehaviour: 'NO_CHANGE',
      alwaysShowHover: 'true' /*alwaysShowHover needed for mobile*/,
    };

    return (
      <div
        ref={this.containerRef}
        className={this.styles.gallery_container}
        data-hook={'galleryViewer'}
        role="none"
        onContextMenu={this.handleContextMenu}
      >
        {size?.width ? (
          <ProGallery
            domId={this.domId}
            allowSSR={!!seoMode}
            items={items}
            styles={{
              ...DEFAULTS.styles,
              ...styleParams,
              ...alwaysShowHover,
            }}
            container={size}
            settings={galleySettings}
            scrollingElement={scrollingElement}
            eventsListener={this.handleGalleryEvents}
            resizeMediaUrl={resizeMediaUrl}
            viewMode={viewMode}
            customHoverRenderer={this.hoverElement}
          />
        ) : null}
      </div>
    );
  }
}

GalleryViewer.propTypes = {
  componentData: PropTypes.object.isRequired,
  blockKey: PropTypes.string,
  entityIndex: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string,
  settings: PropTypes.object,
  disableRightClick: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
  helpers: PropTypes.object.isRequired,
  anchorTarget: PropTypes.string.isRequired,
  relValue: PropTypes.string.isRequired,
  seoMode: PropTypes.bool,
  itemOverlayElement: PropTypes.elementType,
};

export default GalleryViewer;
