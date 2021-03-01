import React, { FunctionComponent } from 'react';
import { RicosContent, RicosViewer } from 'ricos/viewer';
import { pluginActionButton } from 'ricos/button/viewer';

const buttonConfig = {
  onClick: () => {
    // eslint-disable-next-line no-alert
    window.alert('pass `onClick` prop callback to customize action');
  },
};

const plugins = [pluginActionButton(buttonConfig)];

const ButtonsViewer: FunctionComponent<{ content?: RicosContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={plugins} />
);

export default ButtonsViewer;
