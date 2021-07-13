/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import ClickOutside from 'react-click-outsider';
import ToolbarButton, { ToolbarButtonType } from '../ToolbarButton';
import { RichContentTheme } from 'wix-rich-content-common';

interface DropdownButtonProps {
  isMobile: boolean;
  tabIndex?: number;
  buttons: unknown[];
  tooltip: string;
  dataHook: string;
  isActive: () => boolean;
  isDisabled: () => boolean;
  theme: RichContentTheme;
  getLabel?: () => string;
  getIcon: () => any;
  onClick: (any) => void;
  arrow?: boolean;
  onClose: () => void;
  setKeepOpen?: (boolean) => void;
}

class DropdownButton extends Component<DropdownButtonProps> {
  isDropDownOpen: boolean;

  buttonRef?: ToolbarButtonType | null;

  constructor(props) {
    super(props);
    this.isDropDownOpen = false;
  }

  handleDropDownClick = onClick => () => {
    if (this.buttonRef) {
      this.props.setKeepOpen?.(true);
      onClick({ ref: this.buttonRef });
      this.isDropDownOpen = true;
    }
  };

  onDropDownClose = onClose => () => {
    if (this.isDropDownOpen) {
      this.props.setKeepOpen?.(false);
      onClose();
    }
  };

  render() {
    const {
      isMobile,
      tabIndex,
      getIcon,
      onClick,
      tooltip,
      dataHook,
      isActive,
      arrow = false,
      onClose = () => {},
      isDisabled,
      theme,
      getLabel,
    } = this.props;
    const disabledState = isDisabled();
    const buttonProps = arrow && getLabel ? { buttonContent: getLabel() } : { icon: getIcon() };
    return (
      <div>
        <ClickOutside onClickOutside={this.onDropDownClose(onClose)}>
          <ToolbarButton
            isActive={isActive()}
            onClick={this.handleDropDownClick(onClick)}
            showArrowIcon={arrow}
            tooltipText={tooltip}
            dataHook={dataHook}
            tabIndex={tabIndex}
            isMobile={isMobile}
            disabled={disabledState}
            ref={ref => (this.buttonRef = ref)}
            theme={theme}
            {...buttonProps}
          />
        </ClickOutside>
      </div>
    );
  }
}
export default DropdownButton;
