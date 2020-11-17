import React, { Component } from 'react';
import { mergeStyles, RichContentTheme, ComponentData } from 'wix-rich-content-common';
import styles from '../statics/styles/yourDpluginDname.scss';
import { YourPluginNamePluginViewerConfig } from './types';

interface Props {
  componentData: ComponentData;
  settings: YourPluginNamePluginViewerConfig;
  theme: RichContentTheme;
}

class YourPluginNameViewer extends Component<Props> {
  styles: Record<string, string>;

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    return <div>This is my new yourDpluginDname plugin!</div>;
  }
}

export default YourPluginNameViewer;
