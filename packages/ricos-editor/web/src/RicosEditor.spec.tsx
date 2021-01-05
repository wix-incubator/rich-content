/* eslint-disable max-len */
import React from 'react';
import { RicosEditorType, RicosEditor, RicosEditorProps, DraftEditorSettings } from './index';
import { RichContentEditor } from 'wix-rich-content-editor';
import introState from '../../../../e2e/tests/fixtures/intro.json';
import { pluginHashtag, HASHTAG_TYPE } from '../../../plugin-hashtag/web/src';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { default as hebResource } from 'wix-rich-content-common/dist/statics/locale/messages_he.json';

Enzyme.configure({ adapter: new Adapter() });
const { shallow, mount } = Enzyme;

const plugins = [pluginHashtag()];

const getRicosEditor = (ricosEditorProps?: RicosEditorProps) =>
  mount(<RicosEditor {...(ricosEditorProps || {})} />);

const getStaticToolbar = ricosEditor => ricosEditor.children().first();

// const getRicosEngine = (ricosEditorProps?: RicosEditorProps) =>
//   getRicosEditor(ricosEditorProps)
//     .children()
//     .last()
//     .instance();

const getRicosEditorInstance = (ricosEditorProps?: RicosEditorProps) =>
  getRicosEditor(ricosEditorProps).instance();

const getRCE = (ricosEditorProps?: RicosEditorProps, asWrapper?: boolean) => {
  const toRender = !asWrapper ? (
    <RicosEditor {...(ricosEditorProps || {})} />
  ) : (
    <RicosEditorType {...(ricosEditorProps || {})}>
      <RichContentEditor />
    </RicosEditorType>
  );

  const element = shallow(toRender)
    .children()
    .last()
    .dive()
    .children();

  return element.at(element.length - 1); // due to add html by strategies
};

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
    const rceProps = getRCE({ theme: { palette: 'darkTheme' } }).props();
    expect(rceProps).toHaveProperty('theme');
    expect(rceProps.theme).toHaveProperty('modalTheme');
  });
  // locale strategy moved from RicosEngine to RicosEditor/RicosViewer
  //
  // it('should call updateLocale on componentDidMount', () => {
  //   const ricosEngineInstance = getRicosEngine() as RicosEngine;
  //   const spyUpdate = spyOn(ricosEngineInstance, 'updateLocale');
  //   ricosEngineInstance.componentDidMount();
  //   expect(spyUpdate.calls.count()).toEqual(1);
  // });
  // it('should render localeStrategy in strategies', async () => {
  //   const ricosEngineInstance = getRicosEngine({ locale: 'he' }) as RicosEngine;
  //   await ricosEngineInstance.updateLocale();
  //   const renderResult = ricosEngineInstance.render();
  //   expect(renderResult[1].props).toMatchObject({
  //     locale: 'he',
  //     localeResource: hebResource,
  //   });
  // });
  it('should call updateLocale on componentDidMount', () => {
    const ricosEditor = getRicosEditorInstance() as RicosEditorType;
    const spyUpdate = spyOn(ricosEditor, 'updateLocale');
    ricosEditor.componentDidMount();
    expect(spyUpdate.calls.count()).toEqual(1);
  });
  it('should render localeStrategy in strategies', async () => {
    const ricosEditor = getRicosEditorInstance({ locale: 'he' }) as RicosEditorType;
    await ricosEditor.updateLocale();
    expect(ricosEditor.state.localeStrategy).toMatchObject({
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
  it('should create same props with & without a wrapping component', () => {
    const props: RicosEditorProps = {
      theme: { palette: 'darkTheme' },
      locale: 'fr',
      content: introState,
      isMobile: true,
      _rcProps: {
        helpers: { dummyFunction: () => true },
        config: { [HASHTAG_TYPE]: {} },
      },
      plugins,
      placeholder: 'dummyPlaceHolder',
      onError: () => true,
    };
    const rceProps = getRCE(props).props();
    const rcePropsWrapped = getRCE(props, true).props();
    // hashed theme classnames can be different; assert keys only.
    const themeKeys = Object.keys(rceProps.theme);
    const themeKeys_wrapped = Object.keys(rcePropsWrapped.theme);
    expect(themeKeys).toStrictEqual(themeKeys_wrapped);
    const rceProps_noTheme = JSON.stringify({ ...rceProps, theme: {} });
    const rcePropsWrapped_noTheme = JSON.stringify({ ...rcePropsWrapped, theme: {} });
    expect(rceProps_noTheme).toStrictEqual(rcePropsWrapped_noTheme);
  });
  it('should only accept valid Draft-js editor props', () => {
    const draftEditorSettings: DraftEditorSettings & { notADraftSetting: boolean } = {
      tabIndex: -1,
      spellCheck: true,
      stripPastedStyles: false,
      notADraftSetting: false,
    };
    const rceProps = getRCE({ draftEditorSettings }).props();
    expect(rceProps).toHaveProperty('theme');
    expect(rceProps.tabIndex).toEqual(-1);
    expect(rceProps.spellCheck).toEqual(true);
    expect(rceProps).not.toHaveProperty('notADraftSetting');
  });
  describe('Modal API', () => {
    it('should pass openModal & closeModal to helpers', () => {
      const modalSettings = { openModal: () => 'open', closeModal: () => 'close' };
      const rceProps = getRCE({ modalSettings }).props();
      expect(rceProps).toHaveProperty('helpers');
      const { openModal, closeModal } = rceProps.helpers;
      expect({ openModal, closeModal }).toStrictEqual(modalSettings);
    });
  });
});
