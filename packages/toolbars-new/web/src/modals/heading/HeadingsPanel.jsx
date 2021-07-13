/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styles from '../panels/styles.scss';
import MobilePanel from '../panels/MobilePanel';
import DesktopPanel from '../panels/DesktopPanel';
import classNames from 'classnames';
import { mergeStyles, GlobalContext } from 'wix-rich-content-common';
import { HEADER_TYPE_MAP } from 'wix-rich-content-plugin-commons';

export const DEFAULT_HEADERS_DROPDOWN_OPTIONS = Object.freeze(['P', 'H2', 'H3', 'H4', 'H5', 'H6']);

class HeadingsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { heading: props.currentSelect };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  componentDidUpdate() {
    const { heading } = this.state;
    if (heading !== this.props.currentSelect) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ heading: this.props.currentSelect });
    }
  }

  static contextType = GlobalContext;

  onSaveHeading = type => {
    this.props?.onToolbarButtonClick?.(type);
    return this.props.onSave(type);
  };

  defaultHeadings = () => {
    const { experiments } = this.context;
    const defaults = DEFAULT_HEADERS_DROPDOWN_OPTIONS.map(heading => ({
      text: this.props.translateHeading(heading, this.props.t),
      commandKey: HEADER_TYPE_MAP[heading],
    }));
    if (experiments?.useHeadingOne?.enabled) {
      defaults.splice(1, 0, HEADER_TYPE_MAP.H1);
    }
    return defaults;
  };

  onBlur = e => {
    const { target, relatedTarget, currentTarget } = e;
    if (!currentTarget.contains(relatedTarget)) {
      setTimeout(() => target.focus());
    }
  };

  render() {
    const { isMobile, t, currentSelect } = this.props;
    const panelHeader = t('Headings');

    const panel = isMobile ? (
      <MobilePanel
        {...{
          currentSelect,
          panelHeader,
          options: this.defaultHeadings(),
          onChange: this.onSaveHeading,
        }}
      />
    ) : (
      <DesktopPanel
        {...{ currentSelect, options: this.defaultHeadings(), onChange: this.onSaveHeading }}
      />
    );
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        onBlur={this.onBlur}
        className={classNames(styles.panel_Container, {
          [styles.mobile_Container]: isMobile,
        })}
      >
        {panel}
      </div>
    );
  }
}

export default HeadingsPanel;
