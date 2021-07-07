import { hydrate } from 'react-dom';
import React from 'react';
import RichContentApp from '../../../../examples/main/shared/RichContentApp';
import TestApp from './TestApp';
import IsolatedTestApp from './IsolatedTestApp';
import RicosTestApp from './RicosTestApp';
import PreviewTestApp from './PreviewTestApp';
import { loadableReady } from '@loadable/component';

import './app.css';
import { TestAppConfig } from '../../../../examples/main/src/types';

const compMap = {
  rce: TestApp,
  'rce-isolated': IsolatedTestApp,
  rcp: PreviewTestApp,
  ricos: RicosTestApp,
};

const props = {
  initialState: window.__CONTENT_STATE__,
  isMobile: window.isMobile,
  locale: window.locale,
  testAppConfig: window.testAppConfig,
};

loadableReady(() => {
  hydrate(
    <RichContentApp app={compMap[window.compId]} mode={'test'} {...props} />,
    document.getElementById('root')
  );
});

declare global {
  interface Window {
    isMobile: boolean;
    locale: string;
    testAppConfig: TestAppConfig;
    compId: string;
  }
}
