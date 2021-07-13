/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable fp/no-loops */
import React from 'react';
import { RICOS_LINK_TYPE, EditorCommands } from 'wix-rich-content-common';
import { AlignTextCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from '../icons';
import {
  HEADING_TYPE_TO_ELEMENT,
  buttonsFullData,
  inlineStyleButtons,
  textBlockButtons,
  decorationButtons,
  setTextAlignment,
  colorTypes,
  translateHeading,
} from './buttonsListCreatorConsts';
import { HEADER_TYPE_MAP } from 'wix-rich-content-plugin-commons';

type editorCommands = EditorCommands;

export const createButtonsList = (
  formattingButtonsKeys,
  editorCommands: editorCommands,
  t,
  plugins,
  linkPanelData,
  colorPickerData
) => {
  const buttonsList = [];
  formattingButtonsKeys.forEach((buttonKey, index) => {
    handleButtonName(buttonsList, buttonKey, index);
    handleButtonType(buttonsList, index);
    handleButtonIcon(buttonsList, index, editorCommands);
    handleButtonDataHook(buttonsList, index);
    handleButtonTooltip(buttonsList, index);
    handleButtonLabel(buttonsList, index, editorCommands, t);
    handleButtonArrow(buttonsList, index);
    handleButtonOnClick(buttonsList, index, editorCommands);
    handleButtonIsActive(buttonsList, index, editorCommands);
    handleButtonIsDisabled(buttonsList, index);
    handleButtonModal(buttonsList, index, editorCommands, linkPanelData, t);
    handleButtonOnSave(buttonsList, index, editorCommands);
    handleButtonOnCancel(buttonsList, index, editorCommands);
    handleButtonOnChange(buttonsList, index, editorCommands);
    handleButtonOnDone(buttonsList, index, editorCommands);
    handleButtonOnDelete(buttonsList, index, editorCommands);
    // handleGroupButtons(buttonsList, buttonKey, index, editorCommands);
    buttonKey === 'Title' && handleTitleButton(buttonsList, index, editorCommands);
    handleButtonSaveState(buttonsList, index, editorCommands);
    handleButtonSaveSelection(buttonsList, index, editorCommands);
    handleButtonLoadSelection(buttonsList, index, editorCommands);
    handleButtonColorPicker(buttonsList, index, editorCommands, colorPickerData);
  });
  const filteredButtonsList = filterButtonsByPlugins(buttonsList, plugins);
  return filteredButtonsList;
};

const handleButtonColorPicker = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  colorPickerData
) => {
  if (buttonsFullData[buttonsList[index].name].type === 'color-picker') {
    const buttonName = buttonsList[index].name;
    buttonsList[index].getCurrentColor = () => editorCommands.getColor(colorTypes[buttonName]);
    buttonsList[index].onColorAdded = color => colorPickerData[buttonName]?.onColorAdded?.(color);
    buttonsList[index].onChange = color => {
      editorCommands.insertDecoration(colorTypes[buttonName], { color });
    };
    buttonsList[index].settings = colorPickerData[buttonName] || {};
    buttonsList[index].defaultPalette = Object.freeze([
      '#ff0000',
      '#ffffff',
      '#303030',
      '#3a54b4',
      '#bfad80',
      '#dddddd',
    ]);
    buttonsList[index].getUserColors = () => colorPickerData[buttonName]?.getUserColors?.();
    buttonsList[index].getDefaultColors = () =>
      colorPickerData[buttonName]?.getDefaultColors?.() ||
      Object.freeze(['#ff0000', '#ffffff', '#303030', '#3a54b4', '#bfad80', '#dddddd']);
    buttonsList[index].onResetColor = () => {
      editorCommands.insertDecoration(colorTypes[buttonName]);
    };
    buttonsList[index].colorPickerHeaderKey = buttonsFullData[buttonName].colorPickerHeaderKey;
    buttonsList[index].withColoredIcon = true;
  }
};

const filterButtonsByPlugins = (buttonsList, plugins) => {
  return buttonsList.filter(button => {
    if (buttonsFullData[button.name].plugin) {
      return plugins.includes(buttonsFullData[button.name].plugin);
    } else {
      return true;
    }
  });
};

const handleButtonOnDelete = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].onDelete) {
    const buttonName = buttonsList[index].name;
    if (buttonName === 'LINK') {
      buttonsList[index].onDelete = () => {
        editorCommands.deleteDecoration(decorationButtons[buttonName] as typeof RICOS_LINK_TYPE);
        setTimeout(() => editorCommands.loadSelectionState());
      };
    }
  }
};

const handleButtonOnDone = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].onDone) {
    const buttonName = buttonsList[index].name;
    if (buttonName === 'LINK') {
      buttonsList[index].onDone = data => {
        editorCommands.insertDecoration(decorationButtons[buttonName], data);
        setTimeout(() => editorCommands.loadSelectionState());
      };
    }
  }
};

const handleButtonOnChange = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].onChange) {
    const buttonName = buttonsList[index].name;
    if (buttonName === 'LINE_SPACING') {
      buttonsList[index].onChange = type => {
        updateSpacing(type, editorCommands, buttonName);
      };
    }
  }
};

const handleButtonOnCancel = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].onCancel) {
    const buttonName = buttonsList[index].name;
    if (buttonName === 'LINE_SPACING') {
      buttonsList[index].onCancel = () => editorCommands.loadEditorState();
    } else if (buttonName === 'LINK') {
      buttonsList[index].onCancel = () => editorCommands.loadSelectionState();
    }
  }
};

const handleButtonSaveState = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].saveState) {
    buttonsList[index].saveState = () => {
      editorCommands.saveSelectionState();
      editorCommands.saveEditorState();
    };
  }
};

const handleButtonLoadSelection = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].loadSelection) {
    buttonsList[index].loadSelection = () => {
      setTimeout(() => editorCommands.loadSelectionState());
    };
  }
};

const handleButtonSaveSelection = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].saveSelection) {
    buttonsList[index].saveSelection = () => {
      editorCommands.saveSelectionState();
    };
  }
};

const handleTitleButton = (buttonsList, index, editorCommands: editorCommands) => {
  const currentHeading = getCurrentHeading(editorCommands);
  let headingKey;
  switch (currentHeading) {
    case 'H2':
      headingKey = 'header-two';
      break;
    case 'H3':
      headingKey = 'header-three';
      break;
    default:
      headingKey = 'unstyled';
      break;
  }
  buttonsList[index].getIcon = () => buttonsFullData[buttonsList[index].name][headingKey].icon;
  buttonsList[index].onClick = () =>
    editorCommands.setBlockType(buttonsFullData[buttonsList[index].name][headingKey].action);
  buttonsList[index].isActive = () => headingKey === 'header-three' || headingKey === 'header-two';
};

const handleButtonOnSave = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].onSave) {
    const buttonName = buttonsList[index].name;

    if (Object.keys(textBlockButtons).includes(buttonName)) {
      buttonsList[index].onSave = type => editorCommands.setBlockType(type);
    } else if (buttonName === 'Alignment') {
      buttonsList[index].onSave = type => editorCommands.setTextAlignment(type);
    } else if (Object.keys(decorationButtons).includes(buttonName)) {
      buttonsList[index].onSave = type => {
        if (buttonName === 'LINE_SPACING') {
          if (type) {
            updateSpacing(type, editorCommands, buttonName);
            setTimeout(() => editorCommands.loadSelectionState());
          } else {
            editorCommands.loadEditorState();
          }
        }
      };
    }
  }
};

const handleButtonModal = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  linkPanelData,
  t
) => {
  const buttonName = buttonsList[index].name;
  if (buttonsFullData[buttonName].modal) {
    buttonsList[index].modal = buttonsFullData[buttonName].modal;
    if (buttonName === 'HEADINGS') {
      const Modal = buttonsFullData[buttonName].modal;
      const currentHeading = HEADER_TYPE_MAP[getCurrentHeading(editorCommands)];
      buttonsList[index].modal = props =>
        Modal && <Modal {...props} currentSelect={currentHeading} />;
    } else if (buttonName === 'Alignment') {
      const alignment = editorCommands.getTextAlignment();
      const Modal = buttonsFullData[buttonName].modal;
      buttonsList[index].modal = props => Modal && <Modal {...props} currentSelect={alignment} />;
    } else if (buttonName === 'LINE_SPACING') {
      const Modal = buttonsFullData[buttonName].modal;
      const spacing = editorCommands.getBlockSpacing();
      buttonsList[index].modal = props => Modal && <Modal {...props} currentSelect={spacing} />;
    } else if (buttonName === 'LINK') {
      const Modal = buttonsFullData[buttonName].modal;
      const linkData = editorCommands.getLinkDataInSelection();
      const anchorableBlocks = editorCommands.getAnchorableBlocks();
      buttonsList[index].modal = props =>
        Modal && (
          <Modal
            {...props}
            {...linkPanelData}
            {...linkData}
            t={t}
            anchorableBlocksData={anchorableBlocks}
          />
        );
    }
  }
};

const handleButtonIsDisabled = (buttonsList, index) => {
  buttonsList[index].isDisabled = () => false;
};

const handleButtonIsActive = (buttonsList, index, editorCommands: editorCommands) => {
  const buttonName = buttonsList[index].name;
  if (Object.keys(inlineStyleButtons).includes(buttonName)) {
    buttonsList[index].isActive = () =>
      editorCommands.hasInlineStyle(inlineStyleButtons[buttonName]);
  } else if (Object.keys(textBlockButtons).includes(buttonName)) {
    buttonsList[index].isActive = () =>
      editorCommands.isBlockTypeSelected(textBlockButtons[buttonName]);
  } else if (Object.keys(setTextAlignment).includes(buttonName)) {
    buttonsList[index].isActive = () =>
      editorCommands.getTextAlignment() === setTextAlignment[buttonName];
  } else if (buttonName === 'LINK') {
    buttonsList[index].isActive = () => editorCommands.hasLinkInSelection();
  } else if (Object.keys(colorTypes).includes(buttonName)) {
    buttonsList[index].isActive = () =>
      editorCommands.getColor(colorTypes[buttonName]) !== undefined;
  } else {
    buttonsList[index].isActive = () => false;
  }
};

const handleButtonOnClick = (buttonsList, index, editorCommands: editorCommands) => {
  const buttonName = buttonsList[index].name;
  if (Object.keys(inlineStyleButtons).includes(buttonName)) {
    buttonsList[index].onClick = () =>
      editorCommands.toggleInlineStyle(inlineStyleButtons[buttonName]);
  } else if (Object.keys(textBlockButtons).includes(buttonName)) {
    buttonsList[index].onClick = () => editorCommands.setBlockType(textBlockButtons[buttonName]);
  } else if (Object.keys(setTextAlignment).includes(buttonName)) {
    buttonsList[index].onClick = () =>
      editorCommands.setTextAlignment(setTextAlignment[buttonName]);
  } else if (Object.keys(decorationButtons).includes(buttonName)) {
    if (buttonName === 'DECREASE_INDENT') {
      buttonsList[index].onClick = () =>
        editorCommands.insertDecoration(decorationButtons[buttonName], -1);
    } else if (buttonName === 'INCREASE_INDENT') {
      buttonsList[index].onClick = () =>
        editorCommands.insertDecoration(decorationButtons[buttonName], 1);
    }
  } else if (buttonName === 'LINK') {
    buttonsList[index].onClick = () => {
      // eslint-disable-next-line no-console
      console.log('hasLinkInSelection = ', editorCommands.hasLinkInSelection());
      // eslint-disable-next-line no-console
      console.log('getLinkDataInSelection = ', editorCommands.getLinkDataInSelection());
      // console.log('getLinkData = ', getLinkData(editorCommands));
    };
  } else {
    // eslint-disable-next-line no-console
    buttonsList[index].onClick = () => console.log('click');
  }
};

const handleButtonArrow = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].arrow) {
    buttonsList[index].arrow = buttonsFullData[buttonsList[index].name].arrow;
  }
};

const handleButtonLabel = (buttonsList, index, editorCommands: editorCommands, t) => {
  const buttonName = buttonsList[index].name;
  if (buttonsFullData[buttonName].label) {
    buttonsList[index].getLabel = () => buttonsFullData[buttonName].label;
    if (buttonName === 'HEADINGS') {
      buttonsList[index].getLabel = () => translateHeading(getCurrentHeading(editorCommands), t);
    }
  }
};

const handleButtonTooltip = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].tooltip) {
    buttonsList[index].tooltip = buttonsFullData[buttonsList[index].name].tooltip;
  }
};

const handleButtonDataHook = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].dataHook) {
    buttonsList[index].dataHook = buttonsFullData[buttonsList[index].name].dataHook;
  }
};

const handleButtonIcon = (buttonsList, index, editorCommands: editorCommands) => {
  const buttonName = buttonsList[index].name;
  if (buttonsFullData[buttonName].icon) {
    buttonsList[index].getIcon = () => buttonsFullData[buttonsList[index].name].icon;
  } else if (buttonName === 'Alignment') {
    buttonsList[index].getIcon = () => handleAlignmentIcon(editorCommands);
  }
};

const handleAlignmentIcon = editorCommands => {
  const currentAlignment = editorCommands.getTextAlignment();
  let alignmentIcon;
  switch (currentAlignment) {
    case setTextAlignment.AlignCenter:
      alignmentIcon = AlignTextCenterIcon;
      break;
    case setTextAlignment.AlignRight:
      alignmentIcon = AlignRightIcon;
      break;
    case setTextAlignment.Justify:
      alignmentIcon = AlignJustifyIcon;
      break;
    default:
      alignmentIcon = AlignLeftIcon;
      break;
  }
  return alignmentIcon;
};

const handleButtonType = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].type) {
    buttonsList[index].type = buttonsFullData[buttonsList[index].name].type;
  }
};

const handleButtonName = (buttonsList, buttonKey, index) => {
  if (buttonKey === '|') {
    buttonsList[index] = { name: 'Separator' };
    // } else if (typeof buttonKey !== 'string') {
    //   //grouped buttons
    //   buttonsList[index] = { name: buttonKey.name };
  } else {
    buttonsList[index] = { name: buttonKey };
  }
};

// const handleGroupButtons = (buttonsList, buttonKey, index, editorCommands: editorCommands) => {
//   if (buttonKey.buttons) {
//     buttonsList[index].buttonList = {};
//     buttonKey.buttons.forEach(innerButtonKey => {
//       buttonsList[index].buttonList[innerButtonKey] = { name: innerButtonKey };
//       addGroupButtonsData(buttonsList, index, innerButtonKey, editorCommands);
//     });
//   }
// };

// const addGroupButtonsData = (
//   buttonsList,
//   index,
//   innerButtonKey,
//   editorCommands: editorCommands
// ) => {
//   const currentInnerButton = buttonsList[index].buttonList[innerButtonKey];
//   if (buttonsFullData[innerButtonKey].type) {
//     currentInnerButton.type = buttonsFullData[innerButtonKey].type;
//   }
//   if (buttonsFullData[innerButtonKey].icon) {
//     currentInnerButton.getIcon = () => buttonsFullData[innerButtonKey].icon;
//   }
//   if (buttonsFullData[innerButtonKey].dataHook) {
//     currentInnerButton.dataHook = buttonsFullData[innerButtonKey].dataHook;
//   }
//   if (buttonsFullData[innerButtonKey].tooltip) {
//     currentInnerButton.tooltip = buttonsFullData[innerButtonKey].tooltip;
//   }
//   //TODO: check type of button (Alignment)
//   currentInnerButton.onClick = () =>
//     editorCommands.setTextAlignment(setTextAlignment[innerButtonKey]);
//   currentInnerButton.isActive = () =>
//     editorCommands.getTextAlignment() === buttonsFullData[innerButtonKey].action;
//   currentInnerButton.isDisabled = () => false;
// };

const getCurrentHeading = (editorCommands: editorCommands) => {
  let currentHeading = 'P';
  Object.keys(HEADING_TYPE_TO_ELEMENT).forEach(headingType => {
    if (editorCommands.isBlockTypeSelected(headingType)) {
      currentHeading = HEADING_TYPE_TO_ELEMENT[headingType];
    }
  });
  return currentHeading;
};

const updateSpacing = (type, editorCommands: editorCommands, buttonName) => {
  const dynamicStyles = type;
  editorCommands.insertDecoration(decorationButtons[buttonName], { dynamicStyles });
};
