import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import { mergeStyles } from 'wix-rich-content-common';
import classNames from 'classnames';
import NewMobilePanel from '../modal-panels/MobilePanel';

const Separator = () => <div className={styles.lineSpacing_separator} />;

const LineHeightsPanel = ({ selectedHeight, onSave, showCustomPanel, styles, t }) => {
  const lineHeightElement = (height, isSelected, onClick) => (
    <button
      className={isSelected ? styles.lineHeightsPanel_selectedLineHeight : ''}
      key={height}
      onClick={() => onClick(`${height}`)}
    >
      {height}
    </button>
  );

  const lineHeights = [1, 1.5, 2, 2.5, 3];
  return (
    <div className={styles.lineHeightsPanel}>
      {lineHeights.map(height =>
        lineHeightElement(height, parseFloat(selectedHeight) === height, onSave)
      )}
      <Separator />
      <button onClick={showCustomPanel}>{t('LineSpacing_customSpacing')}</button>
    </div>
  );
};

// const MobilePanel = ({ selectedHeight, styles, t, onChange, onSave, onCancel }) => {
//   const lineHeightElement = (height, isSelected, onClick, showSeparator) => (
//     <div>
//       <button
//         className={isSelected ? styles.lineSpacingMobilePanel_selectedLineHeight : ''}
//         key={height}
//         onClick={() => onClick(`${height}`)}
//       >
//         {height}
//       </button>
//       {showSeparator && <Separator />}
//     </div>
//   );

//   const lineHeights = [1, 1.5, 2, 2.5, 3];
//   return (
//     <div className={styles.lineSpacingMobilePanel}>
//       <div className={styles.lineSpacingMobilePanel_header}>{t('LineSpacing_lineSpacing')}</div>
//       <Separator />
//       <div className={styles.lineSpacingMobilePanel_heights}>
//         {lineHeights.map((height, i) => {
//           const selected = parseFloat(selectedHeight) === height;
//           const showSeparator = i !== lineHeights.length - 1;
//           return lineHeightElement(height, selected, onChange, showSeparator);
//         })}
//       </div>
//       {/* <Separator /> */}
//       {/* <div className={styles.lineSpacingMobilePanel_buttons}>
//         <button onClick={onCancel}>{t('LineSpacing_cancel')}</button>
//         <button onClick={() => onSave()}>{t('LineSpacing_save')}</button>
//       </div> */}
//     </div>
//   );
// };

const LabeledInput = ({
  label,
  name,
  unit = '',
  defaultValue = 0,
  spacing,
  onChange,
  min,
  max,
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
        onChange={e => onChange({ [name]: Number(e.target.value) + unit })}
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
      />
      <Separator />
      <LabeledInput
        label={t('LineSpacing_beforeParagraph')}
        name="padding-top"
        unit="px"
        onChange={onChange}
        spacing={spacing}
        min={0}
        max={250}
      />
      <LabeledInput
        label={t('LineSpacing_afterParagraph')}
        name="padding-bottom"
        unit="px"
        onChange={onChange}
        spacing={spacing}
        min={0}
        max={250}
      />
      <div className={styles.customSpacingPanel_buttons}>
        <button onClick={onCancel}>{t('LineSpacing_cancel')}</button>
        <button onClick={() => onSave()}>{t('LineSpacing_save')}</button>
      </div>
    </div>
  );
};

export default class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = { spacing: props.currentSelect };
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  showCustomPanel = () => {
    this.setState({ isCustomPanel: true });
  };

  onBlur = e => {
    const { target, relatedTarget, currentTarget } = e;
    if (!currentTarget.contains(relatedTarget)) {
      setTimeout(() => target.focus());
    }
  };

  onChange = spacing => {
    const merged = { ...this.state.spacing, ...spacing };
    this.setState({ spacing: merged });
    this.props.onChange(merged);
  };

  onSave = spacing => {
    this.props.onSave({ ...this.state.spacing, ...spacing });
  };

  render() {
    const { onCancel, t, isMobile, currentSelect } = this.props;
    const { isCustomPanel, spacing } = this.state;
    const { styles, showCustomPanel, onChange, onSave } = this;
    const selectedHeight = spacing['line-height'];
    const onSaveLineHeight = height => onSave({ 'line-height': height });
    const onChangeLineHeight = height => onChange({ 'line-height': `${height}` });
    const options = [{ 1: 1 }, { 1.5: 1.5 }, { 2: 2 }, { 2.5: 2.5 }, { 3: 3 }];
    const panelHeader = t('LineSpacing_lineSpacing');

    const panel = isMobile ? (
      <NewMobilePanel
        {...{
          // styles,
          // selectedHeight,
          currentSelect,
          panelHeader,
          options,
          onChange: onChangeLineHeight,
          onSave,
          onCancel,
        }}
      />
    ) : isCustomPanel ? (
      <CustomPanel {...{ spacing, onChange, onSave, onCancel, styles, t, isMobile }} />
    ) : (
      <LineHeightsPanel
        {...{ styles, selectedHeight, showCustomPanel, t, onSave: onSaveLineHeight }}
      />
    );

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        onBlur={this.onBlur}
        className={classNames(styles.lineSpacingContainer, {
          [styles.lineSpacingContainer_mobile]: isMobile,
        })}
      >
        {panel}
      </div>
    );
  }
}

Panel.propTypes = {
  isMobile: PropTypes.bool,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onCustomPanel: PropTypes.func,
  onSave: PropTypes.func,
  showCustomPanel: PropTypes.func,
  currentSelect: PropTypes.shape({
    'line-height': PropTypes.string,
    'padding-top': PropTypes.string,
    'padding-bottom': PropTypes.string,
  }),
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

Panel.defaultProps = { spacing: {} };

CustomPanel.propTypes = {
  isMobile: PropTypes.bool,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  spacing: PropTypes.object,
  styles: PropTypes.object,
  t: PropTypes.func,
};

LabeledInput.propTypes = {
  defaultValue: PropTypes.number,
  label: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  spacing: PropTypes.object,
  unit: PropTypes.string,
};

LineHeightsPanel.propTypes = {
  onSave: PropTypes.func,
  selectedHeight: PropTypes.any,
  showCustomPanel: PropTypes.func,
  styles: PropTypes.object,
  t: PropTypes.func.isRequired,
};

// MobilePanel.propTypes = {
//   onCancel: PropTypes.func.isRequired,
//   onChange: PropTypes.func.isRequired,
//   onSave: PropTypes.func.isRequired,
//   selectedHeight: PropTypes.string.isRequired,
//   styles: PropTypes.object.isRequired,
//   t: PropTypes.func.isRequired,
// };
