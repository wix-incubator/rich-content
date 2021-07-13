/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, FC } from 'react';
import classNames from 'classnames';
import ClickOutside from 'react-click-outsider';
import styles from '../Toolbar.scss';
import ToolbarButton from '../ToolbarButton';
import { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';

type dropDownPropsType = {
  isMobile?: boolean;
  tabIndex?: number;
  buttons: any;
  tooltip: string;
  dataHook: string;
  isActive: () => boolean;
  isDisabled: () => boolean;
  getLabel?: () => string;
  arrow?: boolean;
  getIcon: () => any;
  saveState?: () => void;
  saveSelection?: () => void;
  onCancel?: () => void;
  onChange?: (any) => void;
  onDelete?: () => void;
  loadSelection?: () => void;
};

interface ModalButtonProps {
  onToolbarButtonClick?: () => void;
  theme?: RichContentTheme;
  setKeepOpen?: (boolean) => void;
  t: TranslationFunction;
  modal: (() => JSX.Element) | FC<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  onSelect: (string) => void;
  onSave?: (any) => void;
  onDone?: (any) => void;
  dropDownProps: dropDownPropsType;
}

interface State {
  isModalOpen: boolean;
}

class ModalButton extends Component<ModalButtonProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    const { isModalOpen } = this.state;
    const {
      dropDownProps: { saveState, saveSelection },
      setKeepOpen,
    } = this.props;
    this.setState({ isModalOpen: !isModalOpen });
    if (!isModalOpen) {
      saveSelection?.();
      saveState?.();
      setKeepOpen?.(true);
    } else {
      const {
        dropDownProps: { loadSelection },
      } = this.props;
      setKeepOpen?.(false);
      loadSelection?.();
    }
  };

  closeModal = () => {
    if (this.state.isModalOpen) {
      const { setKeepOpen } = this.props;
      this.setState({ isModalOpen: false });
      setKeepOpen?.(false);
    }
  };

  onSave = (...args: [any]) => {
    this.props.onSave?.(...args);
    this.closeModal();
  };

  onDone = (...args: [any]) => {
    this.props.onDone?.(...args);
    this.closeModal();
  };

  onDelete = () => {
    const {
      dropDownProps: { onDelete },
    } = this.props;
    onDelete?.();
    this.closeModal();
  };

  onCancel = () => {
    const {
      dropDownProps: { onCancel },
    } = this.props;
    onCancel?.();
    this.closeModal();
  };

  onChange = (...args: [any]) => {
    const {
      dropDownProps: { onChange },
    } = this.props;
    onChange?.(...args);
  };

  render() {
    const { modal, dropDownProps, onSelect, theme, t } = this.props;
    const {
      isActive,
      tooltip,
      dataHook,
      getIcon,
      isDisabled,
      tabIndex,
      isMobile,
      arrow = false,
      getLabel,
    } = dropDownProps;
    const { isModalOpen } = this.state;
    const buttonProps = arrow && getLabel ? { buttonContent: getLabel() } : { icon: getIcon() };
    return (
      <ClickOutside onClickOutside={this.closeModal}>
        <div className={styles.buttonWrapper}>
          <ToolbarButton
            onToolbarButtonClick={this.props.onToolbarButtonClick}
            isActive={isModalOpen || isActive()}
            onClick={this.toggleModal}
            showArrowIcon={arrow}
            tooltipText={tooltip}
            dataHook={dataHook}
            tabIndex={tabIndex}
            isMobile={isMobile}
            disabled={isDisabled()}
            icon={getIcon()}
            theme={theme}
            {...buttonProps}
          />
          {isModalOpen && (
            <div
              data-id="toolbar-modal-button"
              className={classNames(styles.modal, styles.withoutPadding)}
              onMouseDown={event => event.preventDefault()}
            >
              {modal({
                closeCustomModal: this.closeModal,
                onSelect,
                t,
                onSave: this.onSave,
                theme,
                isMobile,
                onCancel: this.onCancel,
                onChange: this.onChange,
                onDone: this.onDone,
                isActive: isActive(),
                onDelete: this.onDelete,
              })}
            </div>
          )}
        </div>
      </ClickOutside>
    );
  }
}

export default ModalButton;
