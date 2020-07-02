import { createBasePlugin } from 'wix-rich-content-editor-common';

import { createToolbar } from './toolbar';
import { PollEditor } from './components';
import { POLL_TYPE } from './types';

export const createPollPlugin = (config = {}) => {
  const { helpers, theme, t, [POLL_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: PollEditor,
    settings,
    theme,
    type: POLL_TYPE,
    toolbar: createToolbar({
      helpers,
      settings,
      isMobile,
      theme,
      t,
    }),
    helpers,
    t,
    isMobile,
    ...rest,
  });
};
