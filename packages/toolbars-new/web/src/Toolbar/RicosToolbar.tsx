/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import Toolbar from './Toolbar';
import { TOOLBAR_BUTTON_TYPES } from './consts';
import { createButtonsList } from './buttonsListCreator';
import {
  RichContentTheme,
  TranslationFunction,
  DesktopTextButtons,
  Helpers,
  ToolbarType,
  Version,
  EditorCommands,
} from 'wix-rich-content-common';

type formattingToolbarButtonsKeysType =
  | DesktopTextButtons
  | {
      ios?: string[] | undefined;
      android?: string[] | undefined;
    }
  | undefined;

interface RicosToolbarProps {
  isMobile?: boolean;
  tabIndex?: number;
  t: TranslationFunction;
  vertical?: boolean;
  buttons?: formattingToolbarButtonsKeysType;
  editorCommands: EditorCommands;
  plugins?: string[];
  setKeepOpen?: (boolean) => void;
  afterClick?: () => void;
  nestedMenu?: boolean;
  theme?: RichContentTheme;
  linkPanelData?: {
    linkTypes?: any;
    anchorTarget?: string;
    rel?: { nofollow?: boolean };
    uiSettings?: {
      linkPanel?: {
        dropDown?: any;
        externalPopups?: boolean;
        showNewTabCheckbox?: boolean;
        showNoFollowCheckbox?: boolean;
        showSponsoredCheckbox?: boolean;
      };
    };
    isMobile?: boolean;
  };
  colorPickerData?: any;
  helpers?: Helpers;
  toolbarType?: ToolbarType;
}

class RicosToolbar extends Component<RicosToolbarProps> {
  onToolbarButtonClick = (name, value = undefined) => {
    const { helpers, toolbarType } = this.props;
    helpers?.onToolbarButtonClick?.({
      buttonName: name,
      type: toolbarType,
      value: value === undefined ? undefined : typeof value === 'boolean' ? `${!value}` : value,
      version: Version.currentVersion,
    });
  };

  separateByGaps = buttons => {
    const separatedButtons: any = [[]];
    buttons.forEach(button => {
      if (button.type !== TOOLBAR_BUTTON_TYPES.GAP) {
        separatedButtons[separatedButtons.length - 1].push(button);
      } else {
        separatedButtons.push([]);
      }
    });
    return separatedButtons;
  };

  cleanUnwantedSeparators = buttons => {
    if (buttons[0].type === 'SEPARATOR') {
      buttons.shift();
    }
    if (buttons[buttons.length - 1].type === 'SEPARATOR') {
      buttons.pop();
    }
    return buttons;
  };

  render() {
    const {
      buttons,
      editorCommands,
      t,
      plugins,
      linkPanelData,
      colorPickerData,
      isMobile,
      theme,
      vertical,
      setKeepOpen,
      afterClick,
      nestedMenu,
    } = this.props;
    const updatedButtons = createButtonsList(
      buttons,
      editorCommands,
      t,
      plugins,
      linkPanelData,
      colorPickerData
    );
    updatedButtons.length > 0 && this.cleanUnwantedSeparators(updatedButtons);
    const buttonsSeparatedByGaps = this.separateByGaps(updatedButtons);

    return (
      <Toolbar
        buttons={buttonsSeparatedByGaps}
        t={t}
        isMobile={isMobile}
        theme={theme}
        vertical={vertical}
        setKeepOpen={setKeepOpen}
        afterClick={afterClick}
        nestedMenu={nestedMenu}
        onToolbarButtonClick={this.onToolbarButtonClick}
      />
    );
  }
}

export default RicosToolbar;
