import React, { useState } from 'react';
import styles from './styles.scss';

const Separator = () => <div className={styles.separator} />;

const MobilePanel = ({
  // selectedHeight,
  // styles,
  currentSelect,
  panelHeader,
  onChange,
  options,
  // onSave,
  // onCancel,
}) => {
  const [selected, setSelected] = useState<number | string>(currentSelect);
  const onClick = selected => {
    setSelected(selected);
    onChange(selected);
  };

  const lineHeightElement = (option, isSelected, showSeparator) => (
    <div>
      <button
        className={isSelected ? styles.mobilePanel_selectedLineHeight : ''}
        key={option[Object.keys(option)[0]]}
        onClick={() => onClick(option[Object.keys(option)[0]])}
      >
        <div className={styles.alignment_mobile_contentWrapper}>
          {option.icon && <div>{option.icon}</div>}
          <div>{Object.keys(option)[0]}</div>
        </div>
      </button>
      {showSeparator && <Separator />}
    </div>
  );

  return (
    <div className={styles.mobilePanel}>
      {/* t('LineSpacing_lineSpacing') */}
      <div className={styles.mobilePanel_header}>{panelHeader}</div>
      <Separator />
      <div className={styles.mobilePanel_heights}>
        {options.map((option, i) => {
          const isSelected = selected === option[Object.keys(option)[0]];
          const showSeparator = i !== options.length - 1;
          return lineHeightElement(option, isSelected, showSeparator);
        })}
      </div>
    </div>
  );
};

export default MobilePanel;
