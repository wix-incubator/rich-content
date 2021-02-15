import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/table-settings-counter.scss';
import { TextInput } from 'wix-rich-content-plugin-commons';

export default class TableSettingsCountSection extends Component {
  onChange = count => this.props.onCountChange(count);

  setInputRef = ref => (this.input = ref);

  componentDidMount() {
    this.input.setSelectionRange(0, this.input.value.length);
  }

  render() {
    const { title, theme, input = '', error, dataHook, showErrorIcon } = this.props;
    return (
      <div className={styles.container}>
        {title}
        <TextInput
          inputRef={this.setInputRef}
          onChange={this.onChange}
          value={input}
          error={error}
          theme={theme}
          autoComplete="off"
          dataHook={dataHook}
          showErrorIcon={showErrorIcon}
        />
      </div>
    );
  }
}

TableSettingsCountSection.propTypes = {
  title: PropTypes.string.isRequired,
  theme: PropTypes.any.isRequired,
  onCountChange: PropTypes.func.isRequired,
  input: PropTypes.string,
  error: PropTypes.string,
  dataHook: PropTypes.string,
  showErrorIcon: PropTypes.bool,
};
