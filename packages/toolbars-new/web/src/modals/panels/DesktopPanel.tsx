/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Styles from './styles.scss';
import { mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';

const DesktopPanel = ({
  currentSelect,
  options,
  onChange,
  showCustomPanel,
  panelHeader,
  theme,
  hasIcons,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const optionElement = (option, isSelected, onClick) => {
    return (
      <button
        className={isSelected ? styles.desktopPanel_selectedRow : ''}
        key={option.commandKey}
        onClick={() => onClick(option.commandKey)}
      >
        {hasIcons ? option.icon : option.text}
      </button>
    );
  };
  return (
    <div
      className={classNames(styles.desktopPanel, {
        [styles.desktopPanel_withIcons]: hasIcons,
        [styles.desktopPanel_withCustomPanel]: showCustomPanel,
      })}
    >
      {options.map(option =>
        optionElement(
          option,
          (currentSelect['line-height'] ?? currentSelect) === option.commandKey,
          onChange
        )
      )}
      {showCustomPanel && (
        <>
          <div className={styles.separator} />
          <button onClick={showCustomPanel}>{panelHeader}</button>
        </>
      )}
    </div>
  );
};

export default DesktopPanel;
