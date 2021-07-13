import React from 'react';
// import styles from './styles.scss';

const LabeledInput = ({
  label,
  name,
  unit = '',
  defaultValue = 0,
  spacing,
  onChange,
  min,
  max,
  styles,
}) => {
  const value = spacing[name] === undefined ? defaultValue : parseFloat(spacing[name]);
  return (
    <label className={styles.customSpacingPanel_labeledInput}>
      <span>{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={e => {
          onChange({ [name]: Number(e.target.value) + unit });
        }}
        onMouseDown={event => event.stopPropagation()}
      />
    </label>
  );
};

const CustomPanel = ({ spacing, onChange, onSave, onCancel, styles, t }) => {
  return (
    <div className={styles.customSpacingPanel}>
      <LabeledInput
        label={t('LineSpacing_lineSpacing')}
        name="line-height"
        defaultValue={1.5}
        onChange={onChange}
        spacing={spacing}
        min={1}
        max={100}
        styles={styles}
      />
      <div className={styles.separator} />
      <LabeledInput
        label={t('LineSpacing_beforeParagraph')}
        name="padding-top"
        unit="px"
        onChange={onChange}
        spacing={spacing}
        min={0}
        max={250}
        styles={styles}
      />
      <LabeledInput
        label={t('LineSpacing_afterParagraph')}
        name="padding-bottom"
        unit="px"
        onChange={onChange}
        spacing={spacing}
        min={0}
        max={250}
        styles={styles}
      />
      <div className={styles.customSpacingPanel_buttons}>
        <button onClick={onCancel}>{t('LineSpacing_cancel')}</button>
        <button onClick={() => onSave()}>{t('LineSpacing_save')}</button>
      </div>
    </div>
  );
};

export default CustomPanel;
