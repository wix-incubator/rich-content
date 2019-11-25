import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextHighlightIcon from './TextHighlightIcon';
import { TEXT_HIGHLIGHT_TYPE } from '../types';
import BaseTextColor from './BaseTextColor';
import { textBackgroundPredicate } from '../text-decorations-utils';
import { get } from 'lodash';

export default class TextHighlightButton extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }
  render() {
    const settings = this.props.config[TEXT_HIGHLIGHT_TYPE];
    const icon = get(settings, 'toolbar.icons.TextHighlight');
    const pluginParams = {
      dataHook: 'TextHighlightButton',
      toolTip: 'TextHighlightButton_Tooltip',
      icon: icon || TextHighlightIcon,
      type: TEXT_HIGHLIGHT_TYPE,
      predicate: textBackgroundPredicate,
    };
    return <BaseTextColor buttonRef={this.buttonRef} pluginParams={pluginParams} {...this.props} />;
  }
}

TextHighlightButton.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  onExtendContent: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  textColorModal: PropTypes.bool,
  helpers: PropTypes.object,
  keyName: PropTypes.string,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
  uiSettings: PropTypes.object,
  config: PropTypes.object,
  setKeepOpen: PropTypes.func,
};

TextHighlightButton.defaultProps = {
  setKeepOpen: () => {},
};
