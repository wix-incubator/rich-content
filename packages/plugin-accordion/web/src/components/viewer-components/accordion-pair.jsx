import React, { Component } from 'react';
import PropTypes, { oneOf } from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../../statics/styles/accordion-pair.rtlignore.scss';
import PlainText from './PlainText';
import { directions, Icons, NEW_PAIR } from '../../defaults';

class AccordionPair extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = this.stateFromProps(props);
  }

  static getDerivedStateFromProps(props, state) {
    const {
      componentData: {
        config: {
          settings: { visualization, direction },
        },
      },
      isExpanded,
    } = props;

    let newState = {};

    if (visualization !== state.visualization) {
      newState = { isExpanded, visualization };
    }

    if (direction !== state.direction) {
      newState = { ...state, direction };
    }

    return newState;
  }

  stateFromProps(props) {
    const {
      isExpanded,
      componentData: {
        config: {
          settings: { visualization, direction },
        },
      },
    } = props;
    return { isExpanded, visualization, direction };
  }

  handleIconClick = () => this.setState({ isExpanded: !this.state.isExpanded });

  renderIcon = () => {
    const {
      componentData: {
        config: {
          settings: { iconStyle },
        },
      },
    } = this.props;
    const { isExpanded } = this.state;

    const Icon = isExpanded ? Icons[iconStyle].expanded : Icons[iconStyle].collapsed;

    return (
      <button className={this.styles.icon} onClick={this.handleIconClick}>
        <Icon />
      </button>
    );
  };

  onChange = (id, text, isTitle) => {
    const { onChange } = this.props;
    const data = isTitle ? { title: { text } } : { content: { text } };
    onChange?.(id, data);
  };

  isNewPair = id => id === NEW_PAIR;

  render() {
    const {
      value,
      id,
      setFocusToBlock,
      setInPluginEditingMode,
      shouldForceFocus,
      resetForcedFocus,
      t,
    } = this.props;
    const className = this.state.direction === directions.LTR ? this.styles.ltr : this.styles.rtl;

    return (
      <div className={className}>
        <div className={this.styles.title}>
          {this.renderIcon()}
          {(setInPluginEditingMode || value?.title?.text) && (
            <PlainText //for now
              id={id}
              setInPluginEditingMode={setInPluginEditingMode}
              value={!this.isNewPair(id) ? value?.title?.text : ''}
              onChange={this.onChange}
              setFocusToBlock={setFocusToBlock}
              shouldForceFocus={shouldForceFocus}
              resetForcedFocus={resetForcedFocus}
              placeholder={t('Accordion_ShownText_Add_Placeholder')}
              isTitle
            />
          )}
        </div>
        {!this.isNewPair(id) && (this.state.isExpanded || setInPluginEditingMode) && (
          <div className={this.styles.content}>
            {(setInPluginEditingMode || value?.content?.text) && (
              <PlainText //for now
                id={id}
                setInPluginEditingMode={setInPluginEditingMode}
                value={value?.content?.text}
                onChange={this.onChange}
                setFocusToBlock={setFocusToBlock}
                placeholder={t('Accordion_CollapsedText_Add_Placeholder')}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

AccordionPair.propTypes = {
  theme: PropTypes.object.isRequired,
  setInPluginEditingMode: oneOf(PropTypes.func, undefined),
  setFocusToBlock: oneOf(PropTypes.func, undefined),
  onChange: PropTypes.func,
  componentData: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.object,
  isExpanded: PropTypes.bool.isRequired,
  shouldForceFocus: PropTypes.bool,
  resetForcedFocus: PropTypes.func,
  t: PropTypes.func.isRequired,
};

export default AccordionPair;
