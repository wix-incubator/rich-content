/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import styles from '../panels/styles.scss';
import MobilePanel from '../panels/MobilePanel';
import DesktopPanel from '../panels/DesktopPanel';
import CustomPanel from './CustomPanel';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';

const lineHeights = [
  { text: '1', commandKey: '1' },
  { text: '2', commandKey: '2' },
  { text: '2.5', commandKey: '2.5' },
  { text: '3', commandKey: '3' },
];
class LineSpacingPanel extends Component {
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
    this.props?.onToolbarButtonClick?.(merged['line-height']);
    this.props.onChange(merged);
  };

  onSave = spacing => {
    const merged = { ...this.state.spacing, ...spacing };
    this.props?.onToolbarButtonClick?.(merged['line-height']);
    this.props.onSave(merged);
  };

  render() {
    const { onCancel, t, isMobile, currentSelect } = this.props;
    const { isCustomPanel, spacing } = this.state;
    const { styles, showCustomPanel, onChange, onSave } = this;
    const onSaveLineHeight = height => onSave({ 'line-height': height });
    const onChangeLineHeight = height => onChange({ 'line-height': `${height}` });
    const panelHeader = t('LineSpacing_lineSpacing');

    const panel = isMobile ? (
      <MobilePanel
        {...{
          currentSelect,
          panelHeader,
          options: lineHeights,
          onChange: onChangeLineHeight,
        }}
      />
    ) : isCustomPanel ? (
      <CustomPanel {...{ spacing, onChange, onSave, onCancel, styles, t, isMobile }} />
    ) : (
      <DesktopPanel
        {...{
          currentSelect,
          options: lineHeights,
          onChange: onSaveLineHeight,
          panelHeader,
          showCustomPanel,
        }}
      />
    );
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        onBlur={this.onBlur}
        className={classNames(styles.panel_Container, {
          [styles.mobile_Container]: isMobile,
        })}
      >
        {panel}
      </div>
    );
  }
}

export default LineSpacingPanel;
