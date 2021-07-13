import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../anchor-panel.scss';

class FilterDropdownElement extends PureComponent {
  styles = mergeStyles({ styles, theme: this.props.theme });

  render() {
    const { label } = this.props;
    return <div className={this.styles.AnchorPanel_FilterDropdownElement}>{label}</div>;
  }

  static propTypes = {
    label: PropTypes.string,
    theme: PropTypes.object,
  };
}

export default FilterDropdownElement;
