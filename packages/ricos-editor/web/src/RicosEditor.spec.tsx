/* eslint-disable max-len */
import React from 'react';
import { RicosEditor } from './index';
import { pluginHashtag } from '../../../plugin-hashtag/web/src/editor';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { default as hebResource } from 'wix-rich-content-common/dist/statics/locale/messages_he.json';
import { RicosEngine } from 'ricos-viewer';

Enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = Enzyme;

const plugins = [pluginHashtag()];

const getRicosEditor = (ricosEditorProps?: RicosEditorProps) =>
  mount(<RicosEditor {...(ricosEditorProps || {})} />);

const getStaticToolbar = ricosEditor => ricosEditor.children().first();

const getRicosEngine = (ricosEditorProps?: RicosEditorProps) =>
  getRicosEditor(ricosEditorProps)
    .children()
    .last()
    .instance();

const getRCE = (ricosEditorProps?: RicosEditorProps) =>
  shallow(<RicosEditor {...(ricosEditorProps || {})} />)
    .children()
    .last()
    .dive()
    .children();

describe('RicosEditor', () => {
  it('should render editor', () => {
    const element = getRicosEditor();
    expect(element).toBeTruthy();
  });
  it('should render editor with locale', () => {
    const element = getRicosEditor({ locale: 'he' });
    expect(element).toBeTruthy();
  });
  it('should render locale="en" if unspecified', () => {
    const rceProps = getRCE().props();
    expect(rceProps).toHaveProperty('locale');
    expect(rceProps.locale).toEqual('en');
  });
  it('should render locale="he"', () => {
    const rceProps = getRCE({ locale: 'he' }).props();
    expect(rceProps).toHaveProperty('locale');
    expect(rceProps.locale).toEqual('he');
  });
  it('should render with pluginsStrategy output', () => {
    const rceProps = getRCE({ plugins }).props();
    expect(rceProps).toHaveProperty('config');
    expect(rceProps.config).toHaveProperty('wix-draft-plugin-hashtag');
  });
  it('should render with themeStrategy output', () => {
    const rceProps = getRCE({ theme: 'Default' }).props();
    expect(rceProps).toHaveProperty('theme');
    expect(rceProps.theme).toHaveProperty('modalTheme');
  });
  it('should call updateLocale on componentDidMount', () => {
    const ricosEngineInstance = getRicosEngine() as RicosEngine;
    const spyUpdate = spyOn(ricosEngineInstance, 'updateLocale');
    ricosEngineInstance.componentDidMount();
    expect(spyUpdate.calls.count()).toEqual(1);
  });
  it('should render localeStrategy in strategies', async () => {
    const ricosEngineInstance = getRicosEngine({ locale: 'he' }) as RicosEngine;
    await ricosEngineInstance.updateLocale();
    const renderResult = ricosEngineInstance.render();
    expect(renderResult.props).toMatchObject({
      locale: 'he',
      localeResource: hebResource,
    });
  });
  it('should render a static text toolbar', () => {
    const ricosEditor = getRicosEditor({ toolbarSettings: { useStaticTextToolbar: true } });
    const staticToolbar = getStaticToolbar(ricosEditor);
    expect(staticToolbar.props().StaticToolbar).toBeTruthy();
  });
  it('should render a static text toolbar', () => {
    const container = document.createElement('div');
    const ricosEditor = getRicosEditor({ toolbarSettings: { textToolbarContainer: container } });
    const staticToolbarProps = getStaticToolbar(ricosEditor).props();
    expect(staticToolbarProps.StaticToolbar).toBeTruthy();
    expect(staticToolbarProps.textToolbarContainer).toEqual(container);
  });
});
