import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import ErrorIcon from '../../lib/ErrorIcon';
import { SearchIcon } from '../Icons';

import textInputStyles from '../../statics/styles/text-input.scss';
import { omit } from 'lodash';

export default class TextInput extends React.Component {
  static propTypes = {
    inputRef: PropTypes.func,
    theme: PropTypes.object.isRequired,
    error: PropTypes.string,
    showTooltip: PropTypes.bool,
    showErrorIcon: PropTypes.bool,
    onChange: PropTypes.func,
    getTarget: PropTypes.bool,
    searchIcon: PropTypes.bool,
    dataHook: PropTypes.string,
  };

  static defaultProps = {
    showTooltip: true,
    showErrorIcon: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      focusSearchIcon: true,
    };
  }

  handleOnChange = event => {
    const { onChange, getTarget } = this.props;
    onChange(getTarget ? event.target : event.target.value);
  };

  focusSearchIcon = () => {
    this.setState({ focusSearchIcon: true });
  };

  unfocusSearchIcon = () => {
    this.setState({ focusSearchIcon: false });
  };

  render() {
    const {
      inputRef,
      error,
      theme,
      showTooltip,
      searchIcon = false,
      dataHook,
      showErrorIcon,
      ...otherProps
    } = this.props;
    const inputProps = omit(otherProps, ['onChange']);
    const styles = mergeStyles({ styles: textInputStyles, theme });
    const { focusSearchIcon } = this.state;
    return (
      <div className={styles.textInput} data-hook={dataHook}>
        {searchIcon && (
          <SearchIcon
            className={classNames(styles.prefixIcon, {
              [styles.unfocusFill]: !focusSearchIcon,
              [styles.focusFill]: focusSearchIcon,
            })}
          />
        )}
        <input
          ref={inputRef}
          className={classNames(styles.textInput_input, {
            [styles.textInput_input_invalid]: error,
            [styles.searchIcon]: searchIcon,
          })}
          onChange={this.handleOnChange}
          onFocus={this.focusSearchIcon}
          onBlur={this.unfocusSearchIcon}
          {...inputProps}
        />
        {error &&
          showErrorIcon &&
          (showTooltip ? (
            <Tooltip isError content={error}>
              <ErrorIcon className={styles.textInput_errorIcon} />
            </Tooltip>
          ) : (
            <ErrorIcon className={styles.textInput_errorIcon} />
          ))}
      </div>
    );
  }
}
