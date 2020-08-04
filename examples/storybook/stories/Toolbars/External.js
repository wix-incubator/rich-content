/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Page } from '../Components/StoryParts';
import { Tooltip, TooltipHost, TOOLBARS } from 'wix-rich-content-editor-common';

import EditorWrapper from '../Components/EditorWrapper';

const plugins = ['image', 'gallery', 'video', 'gif', 'fileUpload', 'emoji', 'undoRedo'];
let editorRef;

const ExternalPluginButon = ({ name, getIcon, tooltip, onClick, isDisabled = () => false }) => {
  const Icon = getIcon();
  return (
    <Tooltip content={tooltip} key={name}>
      <button onClick={onClick} disabled={isDisabled()} style={{ marginLeft: '20px' }}>
        My custom button <Icon />
      </button>
    </Tooltip>
  );
};

ExternalPluginButon.propTypes = {
  name: PropTypes.string,
  tooltip: PropTypes.string,
  getIcon: PropTypes.func,
  onClick: PropTypes.func,
  isDisabled: PropTypes.func,
};

const InitialIntentToolbar = ({ buttons }) => {
  if (!buttons) {
    return null;
  }
  console.log({ buttons });

  const { UndoPlugin_InsertButton, RedoPlugin_InsertButton } = buttons;

  return (
    <div style={{ border: '1px solid black', padding: '20px' }}>
      My beatuiful External Toolbar!
      <ExternalPluginButon {...UndoPlugin_InsertButton} />
      <ExternalPluginButon {...RedoPlugin_InsertButton} />
      <TooltipHost />
    </div>
  );
};

InitialIntentToolbar.propTypes = {
  buttons: PropTypes.object,
};

export default () => {
  const [currentContent, setCurrentContent] = useState(null);

  const toolbarProps = editorRef && editorRef.getToolbarProps(TOOLBARS.INSERT_PLUGIN);
  const { buttons } = toolbarProps || {};

  return (
    <Page title="External Undo Example">
      <InitialIntentToolbar buttons={buttons} />

      <EditorWrapper
        onChange={setCurrentContent}
        content={currentContent}
        ref={ref => (editorRef = ref)}
        pluginsToDisplay={plugins}
        config={{
          getToolbarSettings: () => {
            return [
              {
                name: TOOLBARS.INSERT_PLUGIN,
                shouldCreate: () => ({ desktop: true }),
                getButtons: () => ({
                  desktop: ['UndoPlugin_InsertButton', 'RedoPlugin_InsertButton'],
                }),
              },
            ];
          },
        }}
      />
    </Page>
  );
};
