/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Page } from '../Components/StoryParts';
import { INSERT_PLUGIN_BUTTONS, TOOLBARS } from 'ricos/editor-common';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import EditorWrapper from '../Components/EditorWrapper';
import { ToolbarButtonProps } from 'ricos/common';

const plugins = ['image', 'gallery', 'video', 'gif', 'fileUpload', 'emoji', 'undoRedo'];
let editorRef;

const ExternalPluginButon = ({
  name,
  getIcon,
  tooltip,
  onClick,
  isDisabled = () => false,
}: ToolbarButtonProps) => {
  const Icon = getIcon();
  return (
    <Tooltip content={tooltip} key={name}>
      <button onClick={onClick} disabled={isDisabled()} style={{ marginLeft: '20px' }}>
        My custom button <Icon />
      </button>
    </Tooltip>
  );
};

const InitialIntentToolbar = ({ buttons }) => {
  if (!buttons) {
    return null;
  }

  const {
    [INSERT_PLUGIN_BUTTONS.UNDO]: undoButtonProps,
    [INSERT_PLUGIN_BUTTONS.REDO]: redoButtonProps,
  } = buttons;

  return (
    <div style={{ border: '1px solid black', padding: '20px' }}>
      My beatuiful External Toolbar!
      <ExternalPluginButon {...undoButtonProps} />
      <ExternalPluginButon {...redoButtonProps} />
    </div>
  );
};

export default () => {
  const [currentContent, setCurrentContent] = useState(null);

  const toolbarProps = editorRef && editorRef.getToolbarProps();
  const { buttons } = toolbarProps || {};

  return (
    <Page title="External Undo Example">
      <InitialIntentToolbar buttons={buttons} />

      <EditorWrapper
        onChange={setCurrentContent}
        content={currentContent}
        ref={ref => (editorRef = ref)}
        pluginsToDisplay={plugins}
        toolbarSettings={{
          getToolbarSettings: () => {
            return [
              {
                name: TOOLBARS.INSERT_PLUGIN,
                shouldCreate: () => ({ desktop: true }),
                getButtons: () => ({
                  desktop: [INSERT_PLUGIN_BUTTONS.UNDO, INSERT_PLUGIN_BUTTONS.REDO],
                }),
              },
            ];
          },
        }}
      />
    </Page>
  );
};
