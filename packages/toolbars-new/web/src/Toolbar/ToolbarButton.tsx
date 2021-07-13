/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component, ReactElement, ReactNode, Ref, FC } from 'react';
import classNames from 'classnames';
import DropdownArrowIcon from '../icons/DropdownArrowIcon';
import Styles from './ToolbarButton.scss';
import { mergeStyles } from 'wix-rich-content-common';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';

type ToolbarButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isActive?: boolean;
  theme?: Record<string, string>;
  dataHook?: string;
  isMobile?: boolean;
  tooltipText: string;
  tabIndex?: number;
  icon?: (() => JSX.Element) | FC<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  forwardRef?: Ref<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  children?: ReactElement | ReactNode;
  disabled?: boolean;
  buttonContent?: string;
  showArrowIcon?: boolean;
  asGroupButton?: boolean;
  asContextButton?: boolean;
  disabledStyle?: boolean;
  onToolbarButtonClick?: () => void;
};

class ToolbarButton extends Component<ToolbarButtonProps> {
  styles: Record<string, string>;

  constructor(props) {
    super(props);
    // const { buttonStyles = {} } = props.theme || {};
    const styles = mergeStyles({ styles: Styles, theme: props.theme });

    this.styles = {
      button: classNames(
        styles.toolbarButton
        // buttonStyles.inlineToolbarButton,
        // buttonStyles.pluginToolbarButton
      ),
      buttonWrapper: classNames(
        styles.toolbarButton_wrapper,
        props.isMobile && styles.toolbarButton_wrapper_mobile
        // buttonStyles.inlineToolbarButton_wrapper,
        // buttonStyles.pluginToolbarButton_wrapper
      ),
      icon: classNames(
        styles.toolbarButton_icon
        // buttonStyles.inlineToolbarButton_icon,
        // buttonStyles.pluginToolbarButton_icon
      ),
      active: classNames(
        styles.toolbarButton_active
        // buttonStyles.inlineToolbarButton_active,
        // buttonStyles.pluginToolbarButton_active
      ),
      menuButton: classNames(
        styles.toolbarButton_menuButton,
        styles.toolbarButton_icon
        // buttonStyles.inlineToolbarButton_icon,
        // buttonStyles.inlineToolbarButton_menuButton,
        // buttonStyles.pluginToolbarButton_icon
      ),
      arrowIcon: classNames(
        styles.toolbarButton_icon,
        styles.toolbarDropdownButton_arrowIcon
        // buttonStyles.inlineToolbarButton_icon,
        // buttonStyles.pluginToolbarButton_icon
      ),
    };
  }

  preventDefault = event => event.preventDefault();

  onClick = (...args: [any]) => {
    const { onToolbarButtonClick } = this.props;
    onToolbarButtonClick?.();
    this.props.onClick?.(...args);
  };

  render() {
    const {
      isActive,
      tooltipText,
      dataHook,
      tabIndex,
      icon: Icon,
      forwardRef,
      disabled,
      buttonContent,
      showArrowIcon,
      asGroupButton,
      asContextButton,
      disabledStyle,
    } = this.props;
    const { styles } = this;
    const arrowIcon = (
      <span
        className={classNames(styles.arrowIcon, {
          [styles.active]: isActive,
        })}
      >
        <DropdownArrowIcon />
      </span>
    );
    const iconClassNames = classNames(styles.icon, {
      [styles.active]: isActive,
    });
    const buttonTextContent = buttonContent || (
      <div className={iconClassNames}>{Icon && <Icon />}</div>
    );
    const menuButtonClassNames = classNames(styles.menuButton, {
      [styles.active]: isActive,
    });

    const wrapperClassNames = classNames(styles.buttonWrapper, {
      [styles.active]: isActive,
      [Styles.renderAsGroupButton]: asGroupButton || asContextButton,
    });

    const isMenu = !!showArrowIcon;
    return (
      <Tooltip key={tooltipText} content={tooltipText} tooltipOffset={{ x: 0, y: -8 }}>
        <div className={wrapperClassNames}>
          <button
            disabled={disabled}
            tabIndex={tabIndex}
            aria-label={tooltipText}
            aria-pressed={isActive}
            data-hook={dataHook}
            onClick={this.onClick}
            className={classNames(styles.button, {
              [Styles.renderAsContextButton]: asContextButton,
              [Styles.disabled]: disabledStyle,
            })}
            ref={forwardRef}
            onMouseDown={this.preventDefault}
          >
            {isMenu ? (
              <div className={menuButtonClassNames}>
                {buttonTextContent}
                {arrowIcon}
              </div>
            ) : (
              buttonTextContent
            )}
          </button>
          {this.props.children}
        </div>
      </Tooltip>
    );
  }
}

export default React.forwardRef<ToolbarButton, ToolbarButtonProps>((props, ref) => (
  <ToolbarButton forwardRef={ref} {...props} />
));

export type ToolbarButtonType = ToolbarButton;
