import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';
import classNames from 'classnames';
import { mergeStyles } from '../Utils/mergeStyles';
import styles from '../../statics/styles/input-with-label.scss';

class InputWithLabel extends Component {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  // hasError = () => {
  //   const { value, maxLength } = this.props;
  //   return maxLength && value.length >= maxLength;
  // };

  // handleKeyDown = e => {
  //   const { value, maxLength } = this.props;
  //   if (e.key !== 'Enter' && e.key !== 'Escape' && value.length > maxLength) {
  //     this.setState({ is });
  //   }
  // };

  renderInput = () => {
    const { styles } = this;
    const { id, isTextArea, isFullHeight, dataHook, ...otherProps } = this.props;
    const inputProps = omit(otherProps, ['theme']);
    const inputClassName = classNames(styles.inputWithLabel_input, {
      [styles.inputWithLabel_textArea]: isTextArea,
      [styles.inputWithLabel_fullHeight]: isFullHeight,
    });
    const InputComponent = isTextArea ? 'textarea' : 'input';

    return (
      <InputComponent className={inputClassName} id={id} data-hook={dataHook} {...inputProps} />
    );
  };

  renderCharacterCapacity = () => {
    const { value, maxLength } = this.props;
    return <span className={styles.inputWithLabel_label}>{value.length + '/' + maxLength}</span>;
  };

  render() {
    const { styles } = this;
    const { id, label, maxLength } = this.props;
    if (label) {
      return (
        <label htmlFor={id}>
          <span className={styles.inputWithLabel_label}>{label}</span>
          {this.renderInput()}
          {maxLength && this.renderCharacterCapacity()}
        </label>
      );
    } else {
      return this.renderInput();
    }
  }
}

InputWithLabel.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.object.isRequired,
  isTextArea: PropTypes.bool,
  isFullHeight: PropTypes.bool,
  dataHook: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number,
};

export default InputWithLabel;
