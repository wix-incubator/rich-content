import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './panelStyles.scss';
import { mergeStyles, GlobalContext } from 'wix-rich-content-common';
import classNames from 'classnames';
import { HEADER_TYPE_MAP } from 'wix-rich-content-plugin-commons';

export const DEFAULT_HEADERS_DROPDOWN_OPTIONS = Object.freeze(['P', 'H2', 'H3', 'H4', 'H5', 'H6']);

const headingElement = (heading, isSelected, onClick, t, translateHeading) => {
  const content = translateHeading(heading, t);
  const type = HEADER_TYPE_MAP[heading];
  return (
    <button
      className={classNames(
        styles.headingElement,
        isSelected ? styles.headingsPanel_selectedHeading : ''
      )}
      onClick={() => onClick(type, heading)}
    >
      {content}
    </button>
  );
};

class Panel extends Component {
  render() {
    const {
      customHeadingsOptions,
      selected,
      onSave,
      styles,
      isMobile,
      t,
      translateHeading,
    } = this.props;
    return (
      <div
        className={isMobile ? styles.headingsMobilePanel : styles.headingsPanel}
        data-hook="headingsDropdownPanel"
      >
        {customHeadingsOptions.map(heading => {
          return headingElement(heading, selected === heading, onSave, t, translateHeading);
        })}
      </div>
    );
  }
}

export default class HeadingsDropDownPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { heading: props.heading };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  static contextType = GlobalContext;

  onSaveHeading = (type, headingName) => {
    return this.props.onSave(type, headingName);
  };

  defaultHeadings = () => {
    const { experiments } = this.context;
    const defaults = [...DEFAULT_HEADERS_DROPDOWN_OPTIONS];
    if (experiments?.useHeadingOne?.enabled) {
      defaults.splice(1, 0, 'H1');
    }
    return defaults;
  };

  render() {
    const {
      isMobile,
      customHeadingsOptions = this.defaultHeadings(),
      t,
      translateHeading,
    } = this.props;
    const { heading } = this.state;
    const { styles } = this;
    const selected = heading;

    return (
      <div
        className={classNames(styles.headingsPanelContainer, {
          [styles.headingsPanelContainer_mobile]: isMobile,
        })}
      >
        <Panel
          styles={styles}
          selected={selected}
          onSave={this.onSaveHeading}
          isMobile={isMobile}
          customHeadingsOptions={customHeadingsOptions}
          t={t}
          translateHeading={translateHeading}
        />
      </div>
    );
  }
}

HeadingsDropDownPanel.propTypes = {
  isMobile: PropTypes.bool,
  onSave: PropTypes.func,
  theme: PropTypes.object.isRequired,
  customSettings: PropTypes.object,
  heading: PropTypes.string,
  customHeadingsOptions: PropTypes.array,
  t: PropTypes.func,
  translateHeading: PropTypes.func,
};

HeadingsDropDownPanel.defaultProps = { heading: 'P' };

Panel.propTypes = {
  onSave: PropTypes.func,
  selected: PropTypes.any,
  styles: PropTypes.object,
  customHeadingsOptions: PropTypes.array,
  translateHeading: PropTypes.func,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
};
