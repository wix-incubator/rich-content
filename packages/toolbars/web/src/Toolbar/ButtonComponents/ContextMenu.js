import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ClickOutside from 'react-click-outsider';
import Styles from '../Toolbar.scss';
import ToolbarButton from '../ToolbarButton.jsx';
import { isElementOutOfWindow } from '../ToolbarUtils';

class ContextMenu extends PureComponent {
  static propTypes = {
    isMobile: PropTypes.bool,
    tabIndex: PropTypes.number,
    buttonList: PropTypes.array,
    activeItem: PropTypes.func,
    tooltip: PropTypes.string,
    dataHook: PropTypes.string,
    getButtonStyles: PropTypes.func,
    disableState: PropTypes.bool,
    isActive: PropTypes.func,
    isDisabled: PropTypes.func,
    getIcon: PropTypes.func,
    theme: PropTypes.object,
  };

  static defaultProps = {
    isActive: () => false,
    isDisabled: () => false,
    getButtonStyles: () => ({}),
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
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
    const visibility = isOpen ? { visibility: 'visible' } : { visibility: 'hidden' };

    return (
      <div
        className={Styles.modal}
        ref={this.setModalRef}
        style={{
          ...position,
          ...visibility,
        }}
      >
        {Object.values(buttonList).map((props, i) => {
          if (props) {
            if (props.type === 'divider') {
              return <div className={Styles.contextMenuDivider} />;
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
                disabled={buttonProps.isDisabled()}
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
    const { tooltip, dataHook, getButtonStyles, isMobile, getIcon, tabIndex, theme } = this.props;
    return (
      <ClickOutside onClickOutside={this.hideOptions}>
        <div className={Styles.buttonWrapper}>
          <ToolbarButton
            isActive={false}
            onClick={this.toggleOptions}
            getButtonStyles={getButtonStyles}
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
