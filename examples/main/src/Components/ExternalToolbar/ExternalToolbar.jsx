import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FileInput,
  BUTTON_TYPES,
} from 'wix-rich-content-editor-common';
import FormattingGroupButton from 'wix-rich-content-editor-common/dist/lib/FormattingGroupButton.cjs.js';
import FormattingDropdownButton from 'wix-rich-content-editor-common/dist/lib/FormattingDropdownButton.cjs.js';
import Tooltip from 'wix-rich-content-common/dist/lib/Tooltip.cjs.jsx';
import styles from './ExternalToolbar.scss';

class ExternalToolbar extends Component {
  static propTypes = {
    buttons: PropTypes.object.isRequired,
    theme: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const buttonTheme = props.theme.buttonStyles || {};
    const buttonStyles = {
      inlineToolbarButton_wrapper: buttonTheme.textToolbarButton_wrapper,
      inlineToolbarButton: buttonTheme.textToolbarButton,
      inlineToolbarButton_icon: buttonTheme.textToolbarButton_icon,
    };
    this.theme = { ...props.theme, buttonStyles };
  }

  onMouseDown = event => {
    console.log('prevent default in externalToolbar');
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  renderButton = buttonProps => {
    const { onClick, getIcon, dataHook, isDisabled, isActive, tooltip } = buttonProps;
    const Icon = getIcon();
    const style = isActive() ? { background: 'lightslategray' } : {};
    return (
      <Tooltip content={tooltip} place="bottom" moveBy={{ y: -20 }}>
        <button disabled={isDisabled()} data-hook={dataHook} onClick={onClick} style={style} onMouseDown={this.onMouseDown}>
          <Icon />
        </button>
      </Tooltip>
    );
  };

  renderFileUploadButton = ({
    getIcon,
    onChange,
    accept,
    multiple,
    dataHook,
    isDisabled,
    name,
    tooltip,
  }) => {
    const Icon = getIcon();
    return (
      <FileInput
        disabled={isDisabled()}
        dataHook={dataHook}
        onChange={onChange}
        accept={accept}
        multiple={multiple}
        key={name}
      >
        <Tooltip content={tooltip} place="bottom" moveBy={{ y: -20 }}>
          <Icon />
        </Tooltip>
      </FileInput>
    );
  };

  renderSeparator = () => null;

  handleDropDownClick = onClick => () => {
    if (this.buttonRef) {
      onClick(this.buttonRef);
    }
  };

  renderDropDown = buttonProps => {
    const { isMobile, tabIndex } = this.props;
    const dropDownProps = {
      tabIndex,
      isMobile,
      theme: this.theme,
      ...buttonProps,
    };
    return <FormattingDropdownButton {...dropDownProps} />;
  };

  renderButtonGroup = ({ buttonList, ...rest }) => {
    const { theme, isMobile, tabIndex } = this.props;
    const dropDownProps = {
      tabIndex,
      isMobile,
      theme,
      ...rest,
    };
    return <FormattingGroupButton buttons={Object.values(buttonList)} {...dropDownProps} />;
  };

  render() {
    const { buttons } = this.props;
    return (
      <div className={styles.toolbar}>
        {Object.values(buttons).map(buttonProps =>
          ({
            [BUTTON_TYPES.FILE]: this.renderFileUploadButton,
            [BUTTON_TYPES.BUTTON]: this.renderButton,
            [BUTTON_TYPES.SEPARATOR]: this.renderSeparator,
            [BUTTON_TYPES.DROPDOWN]: this.renderDropDown,
            [BUTTON_TYPES.GROUP]: this.renderButtonGroup,
          }[buttonProps.type](buttonProps))
        )}
      </div>
    );
  }
}

export default ExternalToolbar;
