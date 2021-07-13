/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import ClickOutside from 'react-click-outsider';
import Styles from '../Toolbar.scss';
import ToolbarButton from '../ToolbarButton.jsx';
import { RichContentTheme } from 'wix-rich-content-common';

interface GroupButtonProps {
  isMobile?: boolean;
  tabIndex?: number;
  buttons: any;
  tooltip: string;
  dataHook?: string;
  isActive: () => boolean;
  isDisabled: () => boolean;
  theme?: RichContentTheme;
}

interface State {
  isOpen: boolean;
  Icon: any;
  isDisabled: () => boolean;
}

class GroupButton extends PureComponent<GroupButtonProps, State> {
  static defaultProps = {
    isActive: () => false,
    isDisabled: () => false,
  };

  constructor(props) {
    super(props);

    const { buttons } = props;
    const activeButton = buttons.filter(b => b.isActive())[0] || buttons[0];

    this.state = {
      isOpen: false,
      Icon: activeButton.getIcon(),
      isDisabled: activeButton.isDisabled,
    };
  }

  componentWillReceiveProps = nextProps => {
    const { buttons } = this.props;
    const activeButton = buttons.filter(b => b.isActive())[0] || buttons[0];
    const nextActiveButton = nextProps.buttons.filter(b => b.isActive())[0] || buttons[0];
    if (activeButton !== nextActiveButton) {
      this.setState({
        Icon: nextActiveButton.getIcon(),
        isDisabled: nextActiveButton.isDisabled,
      });
    }
  };

  toggleOptions = () => this.setState({ isOpen: !this.state.isOpen });

  hideOptions = () => this.setState({ isOpen: false });

  onChange = ({ onClick, getIcon, isDisabled }) => e => {
    onClick(e);
    this.setState({ Icon: getIcon(), isOpen: false, isDisabled });
  };

  renderOptions = () => {
    const { buttons, theme } = this.props;

    return (
      <div className={classNames(Styles.modal, Styles.groupButtonModal)}>
        {buttons.map((props: any, i: number) => {
          const buttonProps = {
            ...this.props,
            shouldRefreshTooltips: () => this.state.isOpen,
            ...props,
            onClick: this.onChange(props),
          };
          return (
            <ToolbarButton
              key={i}
              onClick={this.onChange(props)}
              isActive={buttonProps.isActive()}
              theme={theme}
              dataHook={buttonProps.dataHook}
              isMobile={this.props.isMobile}
              tooltipText={buttonProps.tooltip}
              icon={buttonProps.getIcon()}
              disabled={buttonProps.isDisabled()}
              asGroupButton
            />
          );
        })}
      </div>
    );
  };

  render() {
    const { tooltip, dataHook, isActive, isMobile, tabIndex, theme } = this.props;
    const { Icon, isDisabled, isOpen } = this.state;
    const disabled = isDisabled();
    return (
      <ClickOutside onClickOutside={this.hideOptions}>
        <div className={Styles.buttonWrapper}>
          <ToolbarButton
            isActive={isOpen || isActive()}
            onClick={this.toggleOptions}
            showArrowIcon
            tooltipText={tooltip}
            dataHook={dataHook}
            tabIndex={tabIndex}
            isMobile={isMobile}
            disabled={disabled}
            icon={Icon}
            theme={theme}
          />
          {isOpen && this.renderOptions()}
        </div>
      </ClickOutside>
    );
  }
}

export default GroupButton;
