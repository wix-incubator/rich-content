import createToolbar from './toolbar';
import { Component, DEFAULTS } from './yourDpluginDname-component';
import { YOUR_PLUGIN_NAME_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-editor-common';

const createYourPluginNamePlugin = (config = {}) => {
  const { helpers, t, [YOUR_PLUGIN_NAME_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: Component,
    type: YOUR_PLUGIN_NAME_TYPE,
    toolbar: createToolbar({
      helpers,
      t,
      settings,
      isMobile,
    }),
    helpers,
    settings,
    t,
    isMobile,
    disableRightClick: config?.uiSettings?.disableRightClick,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

export { createYourPluginNamePlugin };
