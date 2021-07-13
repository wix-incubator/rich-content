/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import classNames from 'classnames';
import ClickOutside from 'react-click-outsider';
import styles from '../Toolbar.scss';
import ToolbarButton from '../ToolbarButton';
import { ColorPicker } from 'wix-rich-content-plugin-commons';
import { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';

type dropDownPropsType = {
  tooltip: string;
  isActive: () => boolean;
  getIcon: () => any;
  loadSelection?: () => void;
  saveSelection?: () => void;
  colorPickerHeaderKey: string;
  withColoredIcon?: boolean;
};

interface ColorPickerButtonProps {
  onToolbarButtonClick?: () => void;
  theme?: RichContentTheme;
  t: TranslationFunction;
  dropDownProps: dropDownPropsType;
  isMobile?: boolean;
  getCurrentColor: () => string;
  onColorAdded: (string) => void;
  onChange: (string) => void;
  settings: any;
  defaultPalette: string[];
  getUserColors: () => string[];
  onResetColor: () => void;
  nestedMenu?: boolean;
  afterClick?: () => void;
  getDefaultColors: () => string;
  setKeepOpen?: (boolean) => void;
}

interface State {
  isModalOpen: boolean;
  currentColor: string;
  userColors: string[];
}

class ColorPickerButton extends Component<ColorPickerButtonProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      currentColor: props.getCurrentColor() || 'unset',
      userColors: props?.getUserColors?.() || [],
    };
  }

  componentWillReceiveProps = nextProps => {
    const currentColor = this.state.currentColor;
    const nextCurrentColor = nextProps.getCurrentColor() || 'unset';
    if (nextCurrentColor !== currentColor) {
      this.setState({ currentColor: nextCurrentColor });
    }
  };

  toggleModal = () => {
    const { isModalOpen } = this.state;
    const {
      dropDownProps: { saveSelection },
      setKeepOpen,
    } = this.props;
    this.setState({ isModalOpen: !isModalOpen });
    if (!isModalOpen) {
      saveSelection?.();
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
      const {
        setKeepOpen,
        dropDownProps: { loadSelection },
      } = this.props;
      this.setState({ isModalOpen: false });
      setKeepOpen?.(false);
      loadSelection?.();
    }
  };

  onColorAdded = color => {
    this.props.onColorAdded(color);
    const userColors = this.props?.getUserColors?.() || [...this.state.userColors, color];
    this.setState({ userColors });
  };

  onChange = color => {
    this.props.onChange(color);
    this.setState({ currentColor: color });
    this.closeModal();
    this.props.afterClick && this.props.afterClick();
  };

  onResetColor = () => {
    const { getDefaultColors, onResetColor } = this.props;
    if (onResetColor) {
      onResetColor();
    } else {
      const defaultColors = getDefaultColors?.();
      this.onChange(defaultColors);
    }
    this.closeModal();
    this.props.afterClick && this.props.afterClick();
  };

  extractPalette = colorScheme => {
    if (!colorScheme) {
      return this.props.defaultPalette;
    }
    return Object.values(colorScheme)
      .sort((entry1: any, entry2: any) => (entry1.index > entry2.index ? 1 : -1))
      .map((entry: any) => entry.color);
  };

  render() {
    const { settings, t, isMobile, dropDownProps, theme, nestedMenu } = this.props;
    const { isActive, getIcon, tooltip, colorPickerHeaderKey, withColoredIcon } = dropDownProps;
    const { currentColor, userColors } = this.state;
    const { isModalOpen } = this.state;
    const { colorScheme } = settings;
    const palette = this.extractPalette(colorScheme);
    const paletteColors = isMobile ? palette.slice(0, 5) : palette.slice(0, 6);
    let icon;
    if (withColoredIcon) {
      const Icon = getIcon();
      let coloredIcon;
      if (currentColor[0] === '#' || currentColor === 'unset') {
        coloredIcon = <Icon style={{ color: currentColor }} />;
      } else {
        const color = colorScheme[currentColor].color;
        coloredIcon = <Icon style={{ color }} />;
      }
      icon = coloredIcon;
    } else {
      const Icon = getIcon();
      icon = <Icon />;
    }
    return (
      <ClickOutside onClickOutside={this.closeModal}>
        <ToolbarButton
          {...dropDownProps}
          isActive={withColoredIcon ? false : isActive()}
          onClick={this.toggleModal}
          tooltipText={tooltip}
          isMobile={isMobile}
          icon={() => icon}
          theme={theme}
          onToolbarButtonClick={this.props.onToolbarButtonClick}
        />
        {isModalOpen && (
          <div
            className={classNames(
              styles.modal,
              nestedMenu && styles.withoutTop,
              isMobile && styles.colorPickerMobile
            )}
            data-id={'color-picker-modal'}
          >
            <ColorPicker
              color={currentColor}
              palette={paletteColors}
              userColors={userColors.slice(-12)}
              onColorAdded={this.onColorAdded}
              theme={theme}
              isMobile={isMobile}
              onChange={this.onChange}
              t={t}
              onResetColor={this.onResetColor}
            >
              {({
                renderPalette,
                renderUserColors,
                renderAddColorButton,
                renderResetColorButton,
                mergedStyles,
              }) => (
                <>
                  {isMobile && (
                    <>
                      <div className={mergedStyles.colorPicker_header}>
                        {t(colorPickerHeaderKey)}
                      </div>
                      <div className={mergedStyles.colorPicker_separator} />
                    </>
                  )}
                  <div className={mergedStyles.colorPicker_palette}>
                    <div className={mergedStyles.colorPicker_buttons_container}>
                      {renderPalette()}
                      {renderUserColors()}
                      {isMobile && renderAddColorButton()}
                    </div>
                    {!isMobile && (
                      <>
                        <hr className={mergedStyles.colorPicker_separator} />
                        <div className={mergedStyles.colorPicker_bottom_container}>
                          {renderResetColorButton()}
                          {renderAddColorButton()}
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </ColorPicker>
          </div>
        )}
      </ClickOutside>
    );
  }
}

export default ColorPickerButton;
