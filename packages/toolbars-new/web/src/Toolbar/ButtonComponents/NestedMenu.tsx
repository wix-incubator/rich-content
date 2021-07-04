/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import ClickOutside from 'react-click-outsider';
import styles from '../Toolbar.scss';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import {
  RichContentTheme,
  TranslationFunction,
  onToolbarButtonClickArgs,
} from 'wix-rich-content-common';

type dropDownPropsType = {
  t: TranslationFunction;
  isMobile?: boolean;
  tooltip: string;
  dataHook: string;
  isActive: () => boolean;
  getIcon: () => any;
  buttonList: any[];
  plugin?: string;
};

interface NestedMenuProps {
  editorCommands: any; //TODO: editorCommands type
  theme?: RichContentTheme;
  dropDownProps: dropDownPropsType;
  onToolbarButtonClick?: (args: onToolbarButtonClickArgs) => void;
}

interface State {
  isModalOpen: boolean;
}

class NestedMenu extends Component<NestedMenuProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  onMouseDown = event => {
    event.preventDefault();
  };

  render() {
    const { dropDownProps, theme, editorCommands } = this.props;
    const { tooltip, dataHook, getIcon, isMobile, t, buttonList, isActive, plugin } = dropDownProps;
    const { isModalOpen } = this.state;
    return (
      <ClickOutside onClickOutside={this.closeModal}>
        <div className={styles.buttonWrapper}>
          <ToolbarButton
            onToolbarButtonClick={this.props.onToolbarButtonClick}
            isActive={isActive()}
            onClick={this.toggleModal}
            tooltipText={tooltip}
            dataHook={dataHook}
            isMobile={isMobile}
            icon={getIcon()}
            theme={theme}
            showArrowIcon
            plugin={plugin}
          />
          {isModalOpen && (
            <div className={styles.modal}>
              <Toolbar
                editorCommands={editorCommands}
                theme={theme}
                isMobile={isMobile}
                t={t}
                buttons={buttonList}
                nestedMenu
                vertical
                afterClick={this.toggleModal}
              />
            </div>
          )}
        </div>
      </ClickOutside>
    );
  }
}

export default NestedMenu;
