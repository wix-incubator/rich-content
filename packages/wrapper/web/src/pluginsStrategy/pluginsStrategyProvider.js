// TODO: move to common
function assert(predicate, error) {
  if (!predicate) {
    throw error;
  }
}

const createPluginsStrategy = (
  isEditor,
  {
    config = {},
    plugins = [],
    ModalsMap = {},
    typeMappers = [],
    decorators = [],
    inlineStyleMappers = [],
  } = {}
) => (innerProps = {}) => {
  if (isEditor)
    return {
      config: { ...config, ...(innerProps.config || {}) },
      plugins: [...plugins, ...(innerProps.plugins || [])],
      ModalsMap: { ...ModalsMap, ...(innerProps.ModalsMap || {}) },
    };
  else {
    const newConfig = { ...config, ...(innerProps.config || {}) };
    const styleMappers = raw =>
      inlineStyleMappers
        .concat(innerProps.inlineStyleMappers || [])
        .forEach(mapper => mapper(newConfig, raw));
    return {
      config: newConfig,
      typeMappers: typeMappers.concat(innerProps.typeMappers || []),
      decorators: decorators.concat(innerProps.decorators || []),
      inlineStyleMappers: styleMappers,
    };
  }
};

const isEmpty = obj => Object.entries(obj).length === 0 && obj.constructor === Object;

export default function pluginsStrategyProvider(isEditor, { plugins = [] }) {
  const emptyAccumulator = isEditor
    ? { config: {}, plugins: [], ModalsMap: {} }
    : { config: {}, typeMappers: [], decorators: [], inlineStyleMappers: [] };

  assert(Array.isArray(plugins), 'plugins is expected to be an object array');
  const pack = plugins.reduce((prev, curr) => {
    const {
      createPlugin,
      type,
      config,
      ModalsMap,
      typeMapper,
      decorator = {},
      inlineStyleMappers = [],
    } = curr;
    const pConfig = { [type]: config };
    if (isEditor)
      return {
        config: { ...prev.config, ...pConfig },
        plugins: prev.plugins.concat(createPlugin),
        ModalsMap: { ...prev.ModalsMap, ...ModalsMap },
      };
    return {
      config: { ...prev.config, ...pConfig },
      typeMappers: (typeMapper && prev.typeMappers.concat([typeMapper])) || prev.typeMappers,
      decorators: (!isEmpty(decorator) && prev.decorators.concat([decorator])) || prev.decorators,
      inlineStyleMappers:
        (!isEmpty(inlineStyleMappers) && prev.inlineStyleMappers.concat([inlineStyleMappers])) ||
        prev.inlineStyleMappers,
    };
  }, emptyAccumulator);

  return createPluginsStrategy(isEditor, pack);
}
