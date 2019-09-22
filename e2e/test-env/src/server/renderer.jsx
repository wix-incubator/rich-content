import React from 'react';
import { renderToString } from 'react-dom/server';
import Editor from '../../../../examples/main/src/editor/Editor.jsx';
import Viewer from '../shared/components/Viewer';

const COMPONENTS = {
  rce: {
    Components: [RichContentApp],
    bundleName: 'index',
  },
};

export default function renderer() {
  return (req, res) => {
    const [componentId, fixtureName = 'empty'] = req.path.replace(/^\/|\/$/g, '').split('/');
    const isMobile = req.query.mobile === '';
    const locale = req.query.hebrew === '' ? 'he' : 'en';
    const { Components, bundleName } = COMPONENTS[componentId] || {};
    const props = { initialState: null, isMobile, locale };

    if (!Components) {
      return res.status(404).send(`Component for ${componentId} not found`);
    }

    try {
      const initialState = require(`../../../tests/fixtures/${fixtureName}.json`);
      props.initialState = initialState;
    } catch (error) {
      console.log(error);
      return res.status(404).send(`Fixture ${fixtureName} not found`);
    }

    res.render('index', {
      html: renderToString(
        <>
          {Components.map((Comp, i) => (
            <Comp key={i} mode={'test'} {...props} />
          ))}
        </>
      ),
      initialState: props.initialState,
      bundleName,
      isMobile,
      locale,
    });
  };
}
