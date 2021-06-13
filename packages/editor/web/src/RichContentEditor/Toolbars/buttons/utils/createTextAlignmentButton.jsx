import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { setTextAlignment } from 'wix-rich-content-editor-common';
import TextButton from '../TextButton';

export default ({ alignment, Icon, tooltipTextKey }) =>
  class TextAlignmentButton extends Component {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      alignment: PropTypes.string,
      onClick: PropTypes.func,
      theme: PropTypes.object.isRequired,
      helpers: PropTypes.object,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
    };

    isActive = () => this.props.alignment === alignment;

    handleClick = () => {
      const { onClick, helpers, getEditorState, setEditorState } = this.props;
      helpers?.onToolbarButtonClick?.({
        type: 'FORMATTING',
        buttonName: 'Alignment',
        value: alignment,
      });
      if (onClick) {
        onClick(alignment);
      } else {
        const newEditorState = setTextAlignment(getEditorState(), alignment);
        setEditorState(newEditorState);
      }
    };

    render() {
      const { theme, isMobile, t, tabIndex } = this.props;
      const tooltipText = t(tooltipTextKey);
      const dataHookText = `textAlignmentButton_${alignment}`;

      return (
        <TextButton
          icon={Icon}
          theme={theme}
          isMobile={isMobile}
          isActive={this.isActive}
          onClick={this.handleClick}
          tooltipText={tooltipText}
          dataHook={dataHookText}
          tabIndex={tabIndex}
        />
      );
    }
  };
