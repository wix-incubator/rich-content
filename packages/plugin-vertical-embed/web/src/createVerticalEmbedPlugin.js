import { createBasePlugin } from 'wix-rich-content-plugin-commons';

import { VERTICAL_EMBED_TYPE, DEFAULTS } from './constants';
import VerticalEmbedComponent from './components/vertical-embed-component';
import createToolbar from './toolbar/createToolbar';

const createVerticalEmbedPlugin = (config = {}) => {
  const type = VERTICAL_EMBED_TYPE;
  const { helpers, theme, t, [type]: settings = {}, isMobile, locale, ...rest } = config;

  return createBasePlugin({
    component: VerticalEmbedComponent,
    settings,
    theme,
    type,
    toolbar: createToolbar({
      settings,
      helpers,
      t,
      isMobile,
      locale,
    }),
    helpers,
    t,
    defaultPluginData: DEFAULTS,
    isMobile,
    ...rest,
  });
};

export { createVerticalEmbedPlugin };
