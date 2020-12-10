/* eslint-disable complexity */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/cell.scss';
import classNames from 'classnames';
import { TOOLBARS } from 'wix-rich-content-editor-common';
import { ToolbarContainer, Toolbar } from 'wix-rich-content-toolbars';
import { getRange } from '../tableUtils';
import { isNumber, cloneDeep } from 'lodash';
import CellBorders from './CellBorders';

export default class Cell extends Component {
  componentDidUpdate(prevProps) {
    if (
      !this.isEditing(prevProps.editing, prevProps.selectedCells) &&
      this.isEditing(this.props.editing, this.props.selectedCells)
    ) {
      this.editorRef.focus();
      this.props.setEditingActive(true);
      this.contentBeforeEdit = prevProps.table.getCellContent(prevProps.row, prevProps.col);
    }
    if (
      this.isEditing(prevProps.editing, prevProps.selectedCells) &&
      !this.isEditing(this.props.editing, this.props.selectedCells)
    ) {
      this.props.setEditingActive(false);
    }
    if (this.props.selected) {
      if (!this.isEditing(this.props.editing, this.props.selectedCells) && !this.props.isMobile) {
        this.editorRef?.selectAllContent();
      }
      if (!prevProps.selected) {
        const { selectedCells } = this.props;
        selectedCells && getRange(selectedCells).length === 1 && this.editorRef?.focus();
      }
    }
  }

  isSingleCellSelected = (selectedCells = {}) =>
    selectedCells?.start?.i === selectedCells?.end?.i &&
    selectedCells?.start?.j === selectedCells?.end?.j;

  isEditing = (editing, selectedCells) => editing && this.isSingleCellSelected(selectedCells);

  setEditorRef = ref => {
    const { setEditorRef, row, col } = this.props;
    this.editorRef = ref;
    setEditorRef && setEditorRef(ref, row, col);
  };

  setTdRef = ref => (this.tdRef = ref);

  getToolbarPosition = () => {
    if (this.tdRef) {
      const cellOffsetLeft = this.tdRef.offsetLeft;
      const tableWidth = this.props.tableWidth;
      return {
        x: 0,
        containerWidth: tableWidth,
        offsetLeftInsideContainer: cellOffsetLeft,
      };
    }
  };

  handleClipboardEvent = e => {
    const { editing, row, col, updateCellContent } = this.props;
    if (editing) {
      if (e.key === 'Backspace') {
        e.stopPropagation();
      } else if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
        e.stopPropagation();
        e.preventDefault();
        this.editorRef.selectAllContent(true);
      }
      if (e.key === 'Escape') {
        updateCellContent(row, col, this.contentBeforeEdit);
      }
    }
  };

  fixReactModalButtons = toolbarButtons => {
    Object.values(toolbarButtons).forEach(buttonsProps => {
      if (buttonsProps.type === 'DROPDOWN') {
        buttonsProps.type = 'modal';
      }
    });
  };

  render() {
    const {
      row,
      col,
      style,
      onMouseDown,
      onMouseOver,
      onDoubleClick,
      editing,
      onContextMenu,
      children,
      selected,
      selectedCells,
      table,
      isMobile,
      disableSelectedStyle,
      t,
    } = this.props;
    const { style: additionalStyles, merge = {}, border = {} } = table.getCell(row, col);
    const { colSpan = 1, rowSpan = 1, parentCellKey } = merge;
    const isEditing = this.isEditing(editing, selectedCells);
    const shouldShowSelectedStyle = selected && !disableSelectedStyle && !isEditing;
    const range = selectedCells && getRange(selectedCells);
    const width =
      isMobile && isNumber(table.getColWidth(col))
        ? table.getColWidth(col) * 0.8
        : table.getColWidth(col);
    const toolbarButtons = cloneDeep(
      this.editorRef?.getToolbarProps?.(TOOLBARS.FORMATTING).buttons
    );
    toolbarButtons && this.fixReactModalButtons(toolbarButtons);
    const buttonsAsArray = toolbarButtons && Object.values(toolbarButtons);
    const isContainedInHeader = table.isCellContainedInHeader(row, col);
    const Tag = isContainedInHeader ? 'th' : 'td';
    const showFormattingToolbar =
      this.editorRef &&
      isEditing &&
      !table
        .getCellContent(row, col)
        .getSelection()
        .isCollapsed();
    return parentCellKey ? null : (
      //eslint-disable-next-line
      <Tag
        data-hook={'table-plugin-cell'}
        ref={this.setTdRef}
        className={classNames(
          styles.cell,
          shouldShowSelectedStyle && styles.selected,
          !isMobile && isEditing && styles.editing,
          range?.length === 1 && styles.multiSelection,
          isContainedInHeader && styles.header
        )}
        onMouseDown={onMouseDown}
        onMouseOver={onMouseOver}
        onDoubleClick={onDoubleClick}
        onContextMenu={onContextMenu}
        colSpan={colSpan}
        rowSpan={rowSpan}
        style={{
          ...style,
          ...(additionalStyles || {}),
          width,
        }}
        data-row={row}
        data-col={col}
        onKeyDown={this.handleClipboardEvent}
      >
        {showFormattingToolbar && (
          <ToolbarContainer toolbarPosition={this.getToolbarPosition()}>
            <Toolbar theme={{}} isMobile={isMobile} t={t} buttons={buttonsAsArray} />
          </ToolbarContainer>
        )}
        <Editor
          editing={isMobile ? selected : isEditing}
          selected={selected}
          contentState={table.getCellContent(row, col)}
          setEditorRef={this.setEditorRef}
        >
          {children}
        </Editor>
        <CellBorders
          borders={
            !isMobile && shouldShowSelectedStyle
              ? table.getCellBorders(selectedCells, row, col)
              : border
          }
        />
      </Tag>
    );
  }
}

class Editor extends Component {
  shouldComponentUpdate(nextProps) {
    const { editing, selected, contentState } = this.props;
    const isContentStateChanged =
      JSON.stringify(contentState || {}) !== JSON.stringify(nextProps.contentState || {});
    return editing || nextProps.editing || selected || isContentStateChanged;
  }

  render() {
    const { children, setEditorRef, editing } = this.props;
    return (
      <div className={classNames(styles.editor, editing && styles.editing)}>
        {React.cloneElement(children, { ref: setEditorRef, editing })}
      </div>
    );
  }
}
Editor.propTypes = {
  setEditorRef: PropTypes.func,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  children: PropTypes.any,
  contentState: PropTypes.object,
  setIsHighlighted: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
Cell.propTypes = {
  t: PropTypes.func,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  editing: PropTypes.bool,
  updated: PropTypes.bool,
  onMouseDown: PropTypes.func.isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  style: PropTypes.object,
  children: PropTypes.any,
  setDragsVisibility: PropTypes.func,
  table: PropTypes.object,
  setEditorRef: PropTypes.func,
  toolbarRef: PropTypes.any,
  selectedCells: PropTypes.object,
  setEditingActive: PropTypes.func,
  updateCellContent: PropTypes.func,
  tableWidth: PropTypes.number,
  isMobile: PropTypes.bool,
  disableSelectedStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};
