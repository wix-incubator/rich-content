/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  mergeStyles,
  getImageSrc,
  isValidUrl,
  IMAGE_TYPE,
  VIDEO_TYPE,
  GALLERY_TYPE,
  GIPHY_TYPE,
} from 'wix-rich-content-common';
import styles from '../anchor-panel.scss';
import { ANCHORABLE_BLOCKS } from './consts';
import classNames from 'classnames';
import { get } from 'lodash';

class AnchorableElement extends PureComponent {
  constructor(props) {
    super(props);
    const { block, theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = { iconThumbnail: this.getIconThumbnail(block) };
  }

  componentDidMount() {
    const { block, blockPreview } = this.props;
    if (!blockPreview && ANCHORABLE_BLOCKS[block.anchorType].preview) {
      this.getPreview();
    }
  }

  getIconThumbnail = block => {
    if (ANCHORABLE_BLOCKS[block.anchorType].thumbnail) {
      return ANCHORABLE_BLOCKS[block.anchorType].thumbnail;
    } else {
      return ANCHORABLE_BLOCKS[block.anchorType][`thumbnail-${block.type}`];
    }
  };

  getDataToDisplayByField = field => {
    const { block } = this.props;
    if (field === 'thumbnail' && ANCHORABLE_BLOCKS[block.anchorType].preview) {
      return this.getPreview();
    } else {
      return ANCHORABLE_BLOCKS[block.anchorType][field];
    }
  };

  getContent = () => {
    const { block, t } = this.props;
    if (block.type === 'atomic') {
      if (ANCHORABLE_BLOCKS[block.anchorType].preview) {
        return `${t(ANCHORABLE_BLOCKS[block.anchorType].type)} ${block.index}`;
      } else {
        return get(block, ANCHORABLE_BLOCKS[block.anchorType].textPath);
      }
    } else {
      return block.text;
    }
  };

  getAbsoluteUrl = url => (url.substring(0, 4) === 'http' ? url : 'http://' + url);

  getPreview = () => {
    const { block } = this.props;
    let src = {};
    switch (block.anchorType) {
      case IMAGE_TYPE:
        src = block.data.src;
        break;
      case VIDEO_TYPE:
        if (block?.data?.src?.thumbnail?.pathname) {
          src.file_name = block?.data?.src?.thumbnail?.pathname;
        } else if (isValidUrl(block?.data?.src)) {
          this.getVideoPreviewUsingNoEmbed(block);
        }
        break;
      case GALLERY_TYPE:
        src.file_name = block.data.items[0].url;
        break;
      case GIPHY_TYPE:
        this.setState({
          preview: block.data.gif.downsizedUrl,
        });
        return;
      default:
        // eslint-disable-next-line no-console
        console.error('Mismatch plugins');
        break;
    }
    if (src.file_name) {
      const imgSrc = getImageSrc(src, null, {
        requiredWidth: 50,
        requiredHeight: 50,
        requiredQuality: 90,
        imageType: 'highRes',
      });
      this.setState({
        preview: imgSrc,
      });
    }
  };

  getVideoPreviewUsingNoEmbed = block => {
    const noEmbedBasePath = 'https://noembed.com/embed?url=';
    try {
      fetch(`${noEmbedBasePath}${this.getAbsoluteUrl(block.data.src)}`, {
        method: 'GET',
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          const imgSrc = data.thumbnail_url;
          this.setState({
            preview: imgSrc,
          });
        });
    } catch (e) {
      return new Promise(resolve => {
        setTimeout(() => resolve({}), 1);
      });
    }
  };

  previewLoaded = e => {
    e.target.style.display = 'block';
    this.setState({ iconThumbnail: null });
  };

  render() {
    const { styles } = this;
    const { dataHook, onClick, isSelected, blockPreview, block, t } = this.props;
    const { iconThumbnail, preview } = this.state;
    const blockPreviewElements = blockPreview?.({
      type: block.anchorType,
      data: block.data,
      text: block.text,
    });
    const thumbnailToRender = blockPreviewElements ? (
      <div className={styles.AnchorableElement_thumbnail}>{blockPreviewElements.thumbnail}</div>
    ) : (
      <Thumbnail
        iconThumbnail={iconThumbnail}
        preview={preview}
        alt={this.getContent()}
        previewLoaded={this.previewLoaded}
        theme={styles}
      />
    );
    const typeToRender = blockPreviewElements
      ? blockPreviewElements.type
      : t(this.getDataToDisplayByField('type'));
    const contentToRender = blockPreviewElements ? blockPreviewElements.content : this.getContent();
    return (
      <div
        data-hook={dataHook}
        className={classNames(styles.AnchorableElement_container, {
          [styles.AnchorableElement_selected]: isSelected,
        })}
        onClick={() => onClick({ defaultName: this.getContent() })}
      >
        {thumbnailToRender}
        <div className={styles.AnchorableElement_contentContainer}>
          <div className={styles.AnchorableElement_contentType}>{typeToRender}</div>
          <div className={styles.AnchorableElement_blockContent}>{contentToRender}</div>
        </div>
      </div>
    );
  }

  static propTypes = {
    dataHook: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    block: PropTypes.object,
    theme: PropTypes.object,
    isSelected: PropTypes.bool,
    blockPreview: PropTypes.func,
  };
}

export default AnchorableElement;

class Thumbnail extends PureComponent {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/prop-types
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { iconThumbnail, preview, alt, previewLoaded } = this.props;
    return (
      <div className={styles.AnchorableElement_thumbnail}>
        {iconThumbnail && iconThumbnail}
        {preview && (
          <img
            src={preview}
            alt={alt}
            className={styles.AnchorableElement_preview}
            onLoad={e => previewLoaded(e)}
          />
        )}
      </div>
    );
  }
}
