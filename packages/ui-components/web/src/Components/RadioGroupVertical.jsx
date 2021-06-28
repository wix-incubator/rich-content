import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadioGroup from './RadioGroup';
import InfoIcon from './InfoIcon';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/radio-group-vertical.scss';
import infoIconStyles from '../../statics/styles/info-icon.scss';

class RadioGroupVertical extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.id = `h_group_${Math.floor(Math.random() * 9999)}`;
  }

  render() {
    const { label, tooltipTextKey, t, ...props } = this.props;
    const { styles } = this;
    const groupClassName = styles.radioGroupVertical_group;

    return (
      <div>
        <div className={infoIconStyles.infoContainer}>
          {label ? (
            <span id={`${this.id}_label`} className={styles.radioGroupVertical_title}>
              {label}
            </span>
          ) : null}
          {tooltipTextKey && <InfoIcon tooltipText={t(tooltipTextKey)} />}
        </div>
        <RadioGroup ariaLabelledBy={`${this.id}_label`} {...props} className={groupClassName} />
      </div>
    );
  }
}

RadioGroupVertical.propTypes = {
  label: PropTypes.string,
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  disabled: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  tooltipTextKey: PropTypes.string,
  t: PropTypes.func,
};

export default RadioGroupVertical;
