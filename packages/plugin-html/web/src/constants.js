export const SRC_TYPE_HTML = 'html';
export const SRC_TYPE_URL = 'url';

export const MAX_ALIGNMENT_WIDTH = 739;

export const MIN_WIDTH = 35;
export const INIT_WIDTH = 350;
export const MAX_WIDTH = 940;

export const MIN_HEIGHT = 35;
export const INIT_HEIGHT = 550;
export const MAX_HEIGHT = 1200;
export const MAX_HEIGHT_INPUT = 9999;

export const DEFAULTS_CONFIG = { alignment: 'center' };

export const defaults = () => {
  return {
    srcType: SRC_TYPE_HTML,
    src: '',
    config: DEFAULTS_CONFIG,
  };
};

export const DEFAULTS_VIEWER = {};
