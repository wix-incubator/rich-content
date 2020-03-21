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
  const { theme = {} } = innerProps;
  const newConfig = { ...config, ...(innerProps.config || {}) };
  if (isEditor)
    return {
      config: newConfig,
      plugins: [...plugins, ...(innerProps.plugins || [])],
      ModalsMap: { ...ModalsMap, ...(innerProps.ModalsMap || {}) },
    };
  else {
    const styleMappers = raw =>
      inlineStyleMappers
        .concat(innerProps.inlineStyleMappers || [])
        .map(mapper => mapper(newConfig, raw));
    const finalDecorators = decorators
      .concat(innerProps.decorators || [])
      .map(decor => decor(theme, newConfig));
    return {
      config: newConfig,
      typeMappers: typeMappers.concat(innerProps.typeMappers || []),
      decorators: finalDecorators,
      inlineStyleMappers: styleMappers(innerProps.initialState),
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
      inlineStyleMapper,
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
        (inlineStyleMapper && prev.inlineStyleMappers.concat([inlineStyleMapper])) ||
        prev.inlineStyleMappers,
    };
  }, emptyAccumulator);

  return createPluginsStrategy(isEditor, pack);
}
