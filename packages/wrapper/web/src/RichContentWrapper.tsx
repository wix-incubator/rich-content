import React, { Component, ReactElement } from 'react';
import EngineWrapper from './EngineWrapper';
import themeStrategy from './themeStrategy/themeStrategy';
import pluginsStrategy from './pluginsStrategy/pluginsStrategy';
import localeStrategy from './localeStrategy/localeStrategy';
import './styles.global.css';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import { isDefined } from 'ts-is-present';
import { RichContentProps } from './RichContentProps';

export interface RichContentWrapperProps {
  children: ReactElement;
  theme?: string | object;
  locale?: string;
  palette?: Palette;
  plugins?: PluginConfig[];
  isEditor?: boolean;
  isMobile?: boolean;
  rcProps?: RichContentProps;
  textToolbarType?: TextToolbarType;
  textToolbarContainer?: HTMLElement;
}

export class RichContentWrapper extends Component<
  RichContentWrapperProps,
  { localeStrategy: RichContentProps }
> {
  constructor(props: RichContentWrapperProps) {
    super(props);
    this.state = {
      localeStrategy: {},
    };
  }

  static propTypes = { children: PropTypes.element.isRequired };

  static defaultProps = { locale: 'en', isMobile: false };

  updateLocale = async () => {
    const { locale, children } = this.props;
    await localeStrategy(children.props.locale || locale).then(localeData => {
      this.setState({ localeStrategy: localeData });
    });
  };

  componentDidMount() {
    this.updateLocale();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.locale !== this.props.locale) {
      this.updateLocale();
    }
  }

  render() {
    const {
      theme: childTheme,
      palette,
      plugins = [],
      children,
      isEditor = false,
      rcProps,
      ...rest
    } = this.props;
    const { localeStrategy } = this.state;

    const themeGenerators: ThemeGeneratorFunction[] = plugins
      .map(plugin => plugin.theme)
      .filter(isDefined);

    const { theme } = themeStrategy(isEditor, {
      theme: childTheme,
      palette,
      themeGenerators,
    });
    const mergedRCProps = merge(
      { theme },
      pluginsStrategy(isEditor, plugins, children.props, theme),
      localeStrategy,
      rcProps
    );

    return (
      <EngineWrapper
        rcProps={mergedRCProps}
        isEditor={isEditor}
        key={isEditor ? 'editor' : 'viewer'}
        {...rest}
      >
        {children}
      </EngineWrapper>
    );
  }
}
