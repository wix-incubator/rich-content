import { deprecateHelpers } from '../../lib/deprecateHelpers';
import { RicosHooks } from '../types';

type Config = {
  'wix-draft-plugin-gallery': { onExpand?: () => void };
  'wix-draft-plugin-image': { onExpand?: () => void };
};

describe('Test deprecateHelpers function', () => {
  const onExpand = () => {};
  it('should move onExpand func from helpers and add it to plugins config', () => {
    const helpers = { onExpand };
    const config: Config = { 'wix-draft-plugin-gallery': {}, 'wix-draft-plugin-image': {} };
    deprecateHelpers(helpers, config);
    expect(helpers.onExpand).toBe(undefined);
    expect(config['wix-draft-plugin-gallery'].onExpand).toBe(onExpand);
    expect(config['wix-draft-plugin-image'].onExpand).toBe(onExpand);
  });

  it('should override existing onExpand func in plugins config', () => {
    const helpers = { onExpand };
    const config: Config = {
      'wix-draft-plugin-gallery': { onExpand: () => {} },
      'wix-draft-plugin-image': { onExpand: () => {} },
    };
    deprecateHelpers(helpers, config);
    expect(helpers.onExpand).toBe(undefined);
    expect(config['wix-draft-plugin-gallery'].onExpand).toBe(onExpand);
    expect(config['wix-draft-plugin-image'].onExpand).toBe(onExpand);
  });

  it('should not remove onExpand from plugins config if helpers is not includes onExpand', () => {
    const helpers: { onExpand?: () => void } = {};
    const config: Config = {
      'wix-draft-plugin-gallery': { onExpand },
      'wix-draft-plugin-image': { onExpand },
    };
    deprecateHelpers(helpers, config);
    expect(helpers.onExpand).toBe(undefined);
    expect(config['wix-draft-plugin-gallery'].onExpand).toBe(onExpand);
    expect(config['wix-draft-plugin-image'].onExpand).toBe(onExpand);
  });

  it('should fill all hooks from helpers', () => {
    const func = () => undefined;
    const helpers: Required<RicosHooks> = {
      onMediaUploadEnd: func,
      onMediaUploadStart: func,
      onOpenEditorSuccess: func,
      onPluginAdd: func,
      onPluginAddStep: func,
      onPluginAddSuccess: func,
      onPluginChange: func,
      onPluginDelete: func,
      onPublish: func,
      onViewerAction: func,
      onViewerLoaded: func,
    };
    const hooks: RicosHooks = {};
    const config = {};
    deprecateHelpers(helpers, config, hooks);
    expect(hooks).toStrictEqual(helpers);
  });
});
