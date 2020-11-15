import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import undoIcon from './icons/UndoIcon';
import { InlineToolbarButton, EditorState } from 'wix-rich-content-editor-common';

const UndoButton = props => {
  const {
    isMobile,
    theme = {},
    children,
    className,
    config,
    tabIndex,
    t,
    getEditorState,
    setEditorState,
  } = props;
  const editorState = getEditorState();
  const combinedClassName = classNames(theme.undo, className);
  const icon = config?.toolbar?.icons?.Undo || undoIcon;
  const disabled = editorState?.getUndoStack()?.isEmpty?.() || !editorState;

  const onClick = event => {
    event.stopPropagation();
    const newEditorState = EditorState.undo(getEditorState());
    if (isMobile) {
      // set isInComposition property of editorState to false forces draft to rerender
      newEditorState._immutable._map._root.nodes[3].entry[1] = false;
    }
    setEditorState(newEditorState);
  };

  if (isMobile)
    return (
      <InlineToolbarButton
        disabled={disabled}
        onClick={onClick}
        isActive={false}
        theme={theme}
        isMobile={isMobile}
        tooltipText={t('undoButton_Tooltip')}
        dataHook={'undoButton'}
        tabIndex={tabIndex}
        icon={icon}
      >
        {children}
      </InlineToolbarButton>
    );
  else
    return (
      <button
        tabIndex={tabIndex}
        disabled={disabled}
        onClick={onClick}
        className={combinedClassName}
      >
        {children}
      </button>
    );
};

UndoButton.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.any,
  setEditorState: PropTypes.func,
  isMobile: PropTypes.bool,
  className: PropTypes.string,
  config: PropTypes.object,
  tabIndex: PropTypes.number,
  t: PropTypes.func,
  getEditorState: PropTypes.func,
  commonPubsub: PropTypes.object,
};

export default UndoButton;
