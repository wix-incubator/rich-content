import React from 'react';
import { RicosHooks, HooksContext, ContextProviderHOC } from 'wix-rich-content-common';

export const mockHooks: Required<RicosHooks> = {
  //these are for testing purposes only in our exampleApp
  onPluginAdd: (...args) => console.debug('biPluginAdd', ...args),
  onPluginAddStep: (...args) => console.debug('onPluginAddStep', ...args),
  onPluginAddSuccess: (...args) => console.debug('biPluginAddSuccess', ...args),
  onPluginDelete: (...args) => console.debug('biPluginDelete', ...args),
  onPluginChange: (...args) => console.debug('biPluginChange', ...args),
  onPublish: (...args) => console.debug('biOnPublish', ...args),
  onOpenEditorSuccess: (...args) => console.debug('onOpenEditorSuccess', ...args),
  onViewerAction: (...args) => console.debug('onViewerAction', ...args),
  onViewerLoaded: (...args) => console.debug('onViewerLoaded', ...args),
  onMediaUploadEnd: (...args) => console.debug('onMediaUploadEnd', ...args),
  onMediaUploadStart: (...args) => console.debug('onMediaUploadStart', ...args),
};