import {
  TOOLBARS,
  INSERT_PLUGIN_BUTTONS,
  BUTTON_TYPES,
  undo,
  redo,
  pluginsUndo,
} from 'wix-rich-content-editor-common';
import UndoIcon from './icons/UndoIcon';
import RedoIcon from './icons/RedoIcon';
import {
  CreateInsertButtons,
  TranslationFunction,
  GetEditorState,
  SetEditorState,
} from 'wix-rich-content-common';
import { UndoRedoPluginEditorConfig } from './types';

const createInsertButtons: CreateInsertButtons = ({
  t,
  settings,
  getEditorState,
  setEditorState,
  isPluginExperiment,
}: {
  t: TranslationFunction;
  getEditorState: GetEditorState;
  setEditorState: SetEditorState;
  settings: UndoRedoPluginEditorConfig;
  isPluginExperiment: boolean | undefined;
}) => {
  const undoIcon = settings?.toolbar?.icons?.Undo || UndoIcon;
  const redoIcon = settings?.toolbar?.icons?.Redo || RedoIcon;
  return [
    {
      type: BUTTON_TYPES.BUTTON,
      name: INSERT_PLUGIN_BUTTONS.UNDO,
      tooltip: t('UndoButton_Tooltip'),
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.FOOTER],
      getIcon: () => undoIcon,
      componentData: {},
      onClick: e => {
        e.preventDefault();
        setEditorState(isPluginExperiment ? pluginsUndo(getEditorState()) : undo(getEditorState()));
      },
      isDisabled: () =>
        getEditorState()
          .getUndoStack()
          .isEmpty(),
    },
    {
      type: BUTTON_TYPES.BUTTON,
      name: INSERT_PLUGIN_BUTTONS.REDO,
      tooltip: t('RedoButton_Tooltip'),
      toolbars: [TOOLBARS.INSERT_PLUGIN, TOOLBARS.FOOTER],
      getIcon: () => redoIcon,
      componentData: {},
      onClick: e => {
        e.preventDefault();
        setEditorState(redo(getEditorState()));
      },
      isDisabled: () =>
        getEditorState()
          .getRedoStack()
          .isEmpty(),
    },
  ];
};

export default createInsertButtons;
