/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { PureComponent } from 'react';
import ClickOutside from 'react-click-outsider';
import Styles from '../Toolbar.scss';
import ToolbarButton from '../ToolbarButton.jsx';
import { isElementOutOfWindow } from 'wix-rich-content-editor-common';
import { RichContentTheme } from 'wix-rich-content-common';

interface ContextMenuProps {
  isMobile: boolean;
  tabIndex?: number;
  tooltip: string;
  dataHook: string;
  isActive: () => boolean;
  isDisabled: () => boolean;
  getIcon: () => any;
  theme: RichContentTheme;
  buttonList: any[];
}

interface State {
  isOpen: boolean;
  position: { right: number } | { left: number } | null;
}

class ContextMenu extends PureComponent<ContextMenuProps, State> {
  modalRef?: HTMLDivElement | null;

  static defaultProps = {
    isActive: () => false,
    isDisabled: () => false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      position: null,
    };
  }

  setModalRef = ref => (this.modalRef = ref);

  toggleOptions = () => {
    this.setState({ isOpen: !this.state.isOpen }, () => {
      if (this.state.isOpen && this.modalRef) {
        const isModalOverflow = isElementOutOfWindow(this.modalRef);
        this.setState({ position: isModalOverflow ? { right: 0 } : { left: 0 } });
      } else {
        this.setState({ position: null });
      }
    });
  };

  hideOptions = () => this.setState({ isOpen: false });

  onChange = ({ onClick }) => e => {
    onClick(e);
    this.setState({ isOpen: false });
  };

  renderOptions = () => {
    const { buttonList, theme } = this.props;
    const { isOpen, position } = this.state;
    const display = isOpen ? { display: 'block' } : { display: 'none' };

    return (
      <div
        className={Styles.modal}
        ref={this.setModalRef}
        style={{
          ...position,
          ...display,
        }}
      >
        {Object.values(buttonList).map((props, i) => {
          if (props) {
            if (props.type === 'divider') {
              return <div key={i} className={Styles.contextMenuDivider} />;
            }
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
                buttonContent={buttonProps.text}
                disabledStyle={buttonProps.isDisabled()}
                tooltipText={buttonProps.tooltip}
                asContextButton
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    );
  };

  render() {
    const { tooltip, dataHook, isMobile, getIcon, tabIndex, theme } = this.props;
    return (
      <ClickOutside onClickOutside={this.hideOptions}>
        <div className={Styles.buttonWrapper}>
          <ToolbarButton
            isActive={false}
            onClick={this.toggleOptions}
            tooltipText={tooltip}
            dataHook={dataHook}
            isMobile={isMobile}
            icon={getIcon()}
            theme={theme}
            tabIndex={tabIndex}
          />
          {this.renderOptions()}
        </div>
      </ClickOutside>
    );
  }
}

export default ContextMenu;
