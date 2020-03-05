import React from 'react';
import EngineWrapper from '../EngineWrapper';
import themeStrategyProvider from '../themeStrategy/themeStrategyProvider';
import pluginsStrategyProvider from '../pluginsStrategy/pluginsStrategyProvider';
import localeStrategyProvider from '../localeStrategy/localeStrategyProvider';
import PropTypes from 'prop-types';

export function RichContentWrapper({
  strategies = [],
  theme,
  locale,
  palette,
  plugins = [],
  children,
  ...rest
}) {
  const themeGenerators = plugins.filter(plug => !!plug.theme).map(plug => plug.theme);
  const isEditor = children.type?.displayName === 'RichContentEditor';
  strategies.push(themeStrategyProvider(isEditor, { theme, palette, themeGenerators }));
  strategies.push(pluginsStrategyProvider(isEditor, { plugins }));
  strategies.push(localeStrategyProvider({ locale }));
  return (
    <EngineWrapper strategies={strategies} {...rest}>
      {children}
    </EngineWrapper>
  );
}
RichContentWrapper.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  locale: PropTypes.string,
  palette: PropTypes.array,
  plugins: PropTypes.arrayOf(PropTypes.object),
  strategies: PropTypes.arrayOf(PropTypes.func),
};

RichContentWrapper.defaultProps = {
  locale: 'en',
};
