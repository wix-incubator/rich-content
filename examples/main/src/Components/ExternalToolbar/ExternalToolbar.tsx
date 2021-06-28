import React, { Component, RefObject } from 'react';
import { FileInput } from 'wix-rich-content-ui-components';
import { BUTTON_TYPES } from 'wix-rich-content-editor-common';
import FormattingGroupButton from 'wix-rich-content-editor-common/libs/FormattingGroupButton';
import FormattingDropdownButton from 'wix-rich-content-editor-common/libs/FormattingDropdownButton';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import styles from './ExternalToolbar.scss';
import { RichContentTheme } from 'wix-rich-content-common';

class ExternalToolbar extends Component<{
  buttons;
  theme?: RichContentTheme;
  isMobile?: boolean;
  tabIndex?: number;
}> {
  theme: RichContentTheme;
  buttonRef: RefObject<any>;

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
    event.preventDefault();
  };

  renderButton = buttonProps => {
    const { onClick, getIcon, dataHook, isDisabled, isActive, tooltip } = buttonProps;
    const Icon = getIcon();
    const style = isActive() ? { background: 'lightslategray' } : {};
    return (
      <Tooltip content={tooltip} place="bottom">
        <button
          disabled={isDisabled()}
          data-hook={dataHook}
          onClick={onClick}
          style={style}
          onMouseDown={this.onMouseDown}
        >
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
        <Tooltip content={tooltip} place="bottom">
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

  buttonMap = {
    [BUTTON_TYPES.FILE]: this.renderFileUploadButton,
    [BUTTON_TYPES.BUTTON]: this.renderButton,
    [BUTTON_TYPES.SEPARATOR]: this.renderSeparator,
    [BUTTON_TYPES.DROPDOWN]: this.renderDropDown,
    [BUTTON_TYPES.GROUP]: this.renderButtonGroup,
  };

  render() {
    const { buttons = {} } = this.props;
    return (
      <div className={styles.toolbar}>
        {Object.values(buttons).map((buttonProps: any, i) => {
          const Button = this.buttonMap[buttonProps.type];
          return <Button {...buttonProps} key={i} />;
        })}
      </div>
    );
  }
}

export default ExternalToolbar;
