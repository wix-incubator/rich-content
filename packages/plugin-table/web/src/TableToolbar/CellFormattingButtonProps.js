import { getRange } from '../domain/tableDataUtil';
import {
  VerticalAlignmentTop,
  VerticalAlignmentMiddle,
  VerticalAlignmentBottom,
  BGColorIcon,
  BorderIcon,
  TrashIcon,
  BorderOutsideIcon,
  RowHeader,
  ColumnHeader,
} from '../icons';

const DEFAULT_PALETTE = Object.freeze([
  'transparent',
  '#ffffff',
  '#303030',
  '#3a54b4',
  '#bfad80',
  '#dddddd',
]);
const DEFAULT_BG_COLOR = 'transparent';
const DEFAULT_BORDER_COLOR = '#dddddd';

const getColorsFromComponentData = (selected, table) => {
  const selectionStyle = table.getSelectionStyle(selected, DEFAULT_BG_COLOR, DEFAULT_BORDER_COLOR);
  const bgColor = selectionStyle.selectionBGColor;
  const borderColor = selectionStyle.selectionBorderColor;
  const verticalAlignment = selectionStyle.selectionVerticalAlign;
  return {
    bgCurrentColor: bgColor,
    borderCurrentColor: borderColor,
    verticalAlignment,
  };
};

const setVerticalAlign = (value, table, selected) => {
  table.setCellsStyle({ verticalAlign: value }, getRange(selected));
};

const getAllCellsSelectionButtons = (isAllCellsSelected, deleteBlock) => {
  return isAllCellsSelected
    ? [
        {
          type: 'SEPARATOR',
        },
        {
          tooltip: 'Delete table',
          onClick: deleteBlock,
          dataHook: 'delete-table',
          getIcon: () => TrashIcon,
          getLabel: () => {},
          isActive: () => false,
          isDisabled: () => {},
          type: 'toggle',
        },
      ]
    : [];
};

const getHeaderButtons = (selectedRows, selectedCols, table) => {
  const isRowHeader = isHeaderSelected(selectedRows);
  const isColHeader = isHeaderSelected(selectedCols);
  if (isRowHeader || isColHeader) {
    return [
      {
        type: 'SEPARATOR',
      },
      {
        tooltip: 'Set as Header',
        onClick: isRowHeader ? table.toggleRowHeader : table.toggleColHeader,
        dataHook: isRowHeader ? 'row-header' : 'col-header',
        getIcon: () => (isRowHeader ? RowHeader : ColumnHeader),
        isDisabled: () => {},
        getLabel: () => {},
        isActive: () => (isRowHeader ? table.getRowHeader() : table.getColHeader()),
        type: 'button',
      },
    ];
  }
  return [];
};

const isHeaderSelected = (selection = []) => selection.length === 1 && selection.includes('0');

export const getCellFormattingButtonsProps = (
  selected,
  settings,
  table,
  isAllCellsSelected,
  deleteBlock,
  selectedRows,
  selectedCols
) => {
  return [
    {
      tooltip: 'Back ground color',
      dataHook: 'back-ground-color',
      getCurrentColor: () => getColorsFromComponentData(selected, table).bgCurrentColor,
      onColorAdded: color => settings?.onBgColorAdded?.(color),
      onChange: color => table.setCellsStyle({ backgroundColor: color }, getRange(selected)),
      settings,
      defaultPalette: DEFAULT_PALETTE,
      getUserColors: () => settings?.getBgUserColors?.(),
      getDefaultColors: () => settings?.getBgDefaultColors?.() || DEFAULT_BG_COLOR,
      getIcon: () => BGColorIcon,
      isDisabled: () => {},
      getLabel: () => {},
      isActive: () =>
        getColorsFromComponentData(selected, table).bgCurrentColor !== DEFAULT_BG_COLOR,
      type: 'color-picker',
    },
    {
      type: 'SEPARATOR',
    },
    {
      type: 'nested-menu',
      dataHook: 'border-color-buttons',
      getIcon: () => BorderIcon,
      isActive: () =>
        getColorsFromComponentData(selected, table).borderCurrentColor !== DEFAULT_BORDER_COLOR,
      buttonList: [
        {
          dataHook: 'border-color-around',
          getCurrentColor: () => getColorsFromComponentData(selected, table).borderCurrentColor,
          onColorAdded: color => settings?.onBorderColorAdded?.(color),
          onChange: color => table.setCellsSelectionBorderStyle(color, selected),
          settings,
          defaultPalette: DEFAULT_PALETTE,
          getUserColors: () => settings?.getBorderUserColors?.(),
          getDefaultColors: () => settings?.getBorderDefaultColors?.() || DEFAULT_BORDER_COLOR,
          getIcon: () => BorderOutsideIcon,
          isDisabled: () => {},
          getLabel: () => {},
          isActive: () =>
            getColorsFromComponentData(selected, table).borderCurrentColor !== DEFAULT_BORDER_COLOR,
          type: 'color-picker',
        },
        {
          dataHook: 'border-color-all',
          getCurrentColor: () => getColorsFromComponentData(selected, table).borderCurrentColor,
          onColorAdded: color => settings?.onBorderColorAdded?.(color),
          onChange: color => table.setCellsSelectionBorderStyle(color, selected, true),
          settings,
          defaultPalette: DEFAULT_PALETTE,
          getUserColors: () => settings?.getBorderUserColors?.(),
          getDefaultColors: () => settings?.getBorderDefaultColors?.() || DEFAULT_BORDER_COLOR,
          getIcon: () => BorderIcon,
          isDisabled: () => {},
          getLabel: () => {},
          isActive: () =>
            getColorsFromComponentData(selected, table).borderCurrentColor !== DEFAULT_BORDER_COLOR,
          type: 'color-picker',
        },
      ],
    },
    {
      type: 'SEPARATOR',
    },
    {
      buttonList: [
        {
          dataHook: 'vertical-alignment-align-top',
          getIcon: () => VerticalAlignmentTop,
          getLabel: () => {},
          isActive: () => getColorsFromComponentData(selected, table).verticalAlignment === 'top',
          isDisabled: () => {},
          name: 'AlignTop',
          onClick: () => setVerticalAlign('top', table, selected),
          tooltip: 'Align top',
          type: 'button',
        },
        {
          dataHook: 'vertical-alignment-align-middle',
          getIcon: () => VerticalAlignmentMiddle,
          getLabel: () => {},
          isActive: () =>
            getColorsFromComponentData(selected, table).verticalAlignment === 'middle',
          isDisabled: () => {},
          name: 'AlignMiddle',
          onClick: () => setVerticalAlign('middle', table, selected),
          tooltip: 'Align middle',
          type: 'button',
        },
        {
          dataHook: 'vertical-alignment-align-bottom',
          getIcon: () => VerticalAlignmentBottom,
          getLabel: () => {},
          isActive: () =>
            getColorsFromComponentData(selected, table).verticalAlignment === 'bottom',
          isDisabled: () => {},
          name: 'AlignBottom',
          onClick: () => setVerticalAlign('bottom', table, selected),
          tooltip: 'Align bottom',
          type: 'button',
        },
      ],
      dataHook: 'VerticalAlignment',
      name: 'VerticalAlignment',
      tooltip: 'Vertical alignment',
      type: 'GROUP',
    },
    ...getHeaderButtons(selectedRows, selectedCols, table),
    ...getAllCellsSelectionButtons(isAllCellsSelected, deleteBlock),
  ];
};
