import React, { Component } from 'react';
import EngineWrapper from './EngineWrapper';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { shouldRenderChild } from './utils';

export class WixRichContentViewer extends Component<WixRichContentViewerProps> {
  render() {
    const { children, ...props } = this.props;
    const child = children && shouldRenderChild(true, children) ? children : <RichContentViewer />;

    return (
      <EngineWrapper isViewer key={'viewer'} {...props}>
        {child}
      </EngineWrapper>
    );
  }
}
