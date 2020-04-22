import React from 'react';
import { renderToString } from 'react-dom/server';
import RichContentApp from '../../../../examples/main/shared/RichContentApp';
import serialize from 'serialize-javascript';
import TestApp from '../client/TestApp';
import IsolatedTestApp from '../client/IsolatedTestApp';

export default function renderer() {
  return (req, res) => {
    const [componentId, fixtureName = 'empty'] = req.path.replace(/^\/|\/$/g, '').split('/');
    const compMap = { rce: TestApp, 'rce-isolated': IsolatedTestApp };
    if (Object.keys(compMap).indexOf(componentId) === -1) {
      return res.status(404).send(`Component for ${componentId} not found`);
    }

    const isMobile = req.query.mobile === '';
    const locale = req.query.hebrew === '' ? 'he' : 'en';
    const seoMode = req.query.seoMode === '';
    const testAppPlugins = req.query.testAppPlugins;
    const props = { isMobile, locale, seoMode, testAppPlugins };

    try {
      props.initialState = require(`../../../tests/fixtures/${fixtureName}.json`);
    } catch (error) {
      console.log(error); //eslint-disable-line no-console
      return res.status(404).send(`Fixture ${fixtureName} not found`);
    }

    const App = compMap[componentId];
    res.render('index', {
      html: renderToString(<RichContentApp app={App} mode={'test'} {...props} />),
      compId: componentId,
      initialState: props.initialState,
      bundleName: 'index',
      isMobile,
      locale,
      testAppPlugins,
      serialize,
    });
  };
}
