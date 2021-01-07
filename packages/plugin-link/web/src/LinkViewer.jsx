import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { normalizeUrl, mergeStyles, validate, anchorScroll } from 'wix-rich-content-common';
import pluginLinkSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-link.schema.json';
import { isEqual } from 'lodash';
import styles from '../statics/link-viewer.scss';
import { LINK_TYPE } from './types';

class LinkViewer extends Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    children: PropTypes.node,
    anchorTarget: PropTypes.string,
    relValue: PropTypes.string,
    settings: PropTypes.object,
    isInEditor: PropTypes.bool,
    config: PropTypes.object,
  };

  constructor(props) {
    super(props);
    validate(props.componentData, pluginLinkSchema);
    const theme = this.props.theme;
    this.styles = mergeStyles({ styles, theme });
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginLinkSchema);
    }
  }

  handleClick = event => {
    const { componentData, isInEditor, config } = this.props;
    const settings = config[LINK_TYPE];
    const { onClick } = settings;
    const { anchor, url } = componentData;
    event.preventDefault();
    onClick?.(event, componentData?.customData || this.getHref(url, anchor));
    if (anchor && !isInEditor) {
      const anchorString = `viewer-${anchor}`;
      history.pushState({}, null, `#${anchorString}`);
      const element = document.getElementById(anchorString);
      anchorScroll(element);
    }
  };

  getHref(url, anchor) {
    const siteUrl = this.props.config?.[LINK_TYPE]?.siteUrl;
    if (url) {
      return normalizeUrl(url);
    } else if (siteUrl) {
      return `${siteUrl}#viewer-${anchor}`;
    }
  }
  getTarget(anchor, target, anchorTarget) {
    if (anchor) {
      return '_self';
    } else {
      return target ? target : anchorTarget || '_self';
    }
  }

  render() {
    const { componentData, anchorTarget, relValue, children, isInEditor } = this.props;
    const { url, anchor, target, rel } = componentData;
    const anchorProps = {
      href: this.getHref(url, anchor),
      target: this.getTarget(anchor, target, anchorTarget),
      rel: rel ? rel : relValue || 'noopener',
      className: classNames(this.styles.link, {
        [this.styles.linkToAnchorInViewer]: anchor && !isInEditor,
      }),
      onClick: this.handleClick,
    };
    return <a {...anchorProps}>{children}</a>;
  }
}

export default LinkViewer;
