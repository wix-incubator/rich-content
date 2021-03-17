import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import { FocusManager } from 'wix-rich-content-editor-common';
import {
  SettingsPanelFooter,
  SettingsSection,
  LabeledToggle,
  Tabs,
  Tab,
} from 'wix-rich-content-plugin-commons';
import LayoutSelector from './gallery-controls/layouts-selector';
import styles from '../../statics/styles/gallery-settings-modal.scss';
import LayoutControlsSection from './layout-controls-section';
import { SortableComponent } from './gallery-controls/gallery-items-sortable';
import layoutData from '../../lib/layout-data-provider';
import GallerySettingsMobileHeader from './gallery-controls/gallery-settings-mobile-header';

class ManageMediaSection extends Component {
  applyItems = items => {
    const { data, store } = this.props;
    const componentData = { ...data, items };
    store.set('componentData', componentData);
  };

  handleFileChange = (files, itemPos) => {
    if (files.length > 0) {
      const handleFilesSelected = this.props.store.getBlockHandler('handleFilesSelected');
      handleFilesSelected(files, itemPos);
    }
  };

  handleFileSelection = (index, multiple, handleFilesAdded, deleteBlock) => {
    const { helpers, data } = this.props;
    helpers.handleFileSelection(index, multiple, handleFilesAdded, deleteBlock, data);
  };

  render() {
    const {
      helpers,
      store,
      t,
      relValue,
      anchorTarget,
      isMobile,
      uiSettings,
      languageDir,
      accept,
    } = this.props;
    const { handleFileSelection } = helpers;
    return (
      <div dir={languageDir}>
        <SortableComponent
          theme={this.props.theme}
          items={this.props.data.items}
          onItemsChange={this.applyItems}
          handleFileChange={this.handleFileChange}
          handleFileSelection={handleFileSelection && this.handleFileSelection}
          handleFilesAdded={store.getBlockHandler('handleFilesAdded')}
          deleteBlock={store.get('deleteBlock')}
          t={t}
          relValue={relValue}
          anchorTarget={anchorTarget}
          isMobile={isMobile}
          uiSettings={uiSettings}
          accept={accept}
        />
      </div>
    );
  }
}

ManageMediaSection.propTypes = {
  data: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  t: PropTypes.func,
  anchorTarget: PropTypes.string,
  relValue: PropTypes.string,
  uiSettings: PropTypes.object,
  languageDir: PropTypes.string,
  accept: PropTypes.string,
};

class AdvancedSettingsSection extends Component {
  applyGallerySetting = setting => {
    const { data, store } = this.props;
    const componentData = {
      ...data,
      styles: setting,
    };
    store.set('componentData', componentData);
  };

  switchLayout = layout => {
    this.applyGallerySetting({ ...layout, ...layoutData[layout.galleryLayout] });
  };

  getValueFromComponentStyles = name => this.props.data.styles[name];

  shouldRender() {
    const { data } = this.props;
    return data && data.styles;
  }

  render() {
    const { data, store, theme, t, isMobile, languageDir } = this.props;
    return (
      this.shouldRender() && (
        <div
          className={
            isMobile
              ? styles.gallerySettings_settingsContainerMobile
              : styles.gallerySettings_settingsContainer
          }
          dir={languageDir}
        >
          <SettingsSection
            theme={theme}
            ariaProps={{ 'aria-label': 'layout selection', role: 'region' }}
          >
            <LayoutSelector
              theme={theme}
              value={this.getValueFromComponentStyles('galleryLayout')}
              onChange={value => this.switchLayout({ galleryLayout: value })}
              t={t}
              isMobile={isMobile}
            />
          </SettingsSection>
          <LayoutControlsSection
            theme={theme}
            layout={this.getValueFromComponentStyles('galleryLayout')}
            data={data}
            store={store}
            t={t}
            isMobile={isMobile}
          />
        </div>
      )
    );
  }
}

AdvancedSettingsSection.propTypes = {
  data: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
  isMobile: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  languageDir: PropTypes.string,
};
export class GallerySettingsModal extends Component {
  constructor(props) {
    super(props);
    const { componentData } = this.props;
    this.state = {
      activeTab: this.props.activeTab,
      isExpandEnabled: !componentData.disableExpand,
      isRightClickEnabled: !componentData.disableRightClick,
    };
    this.styles = mergeStyles({ styles, theme: props.theme });
    this.switchTab = this.switchTab.bind(this);
  }

  componentDidMount() {
    this.props.pubsub.subscribe('componentData', this.onComponentUpdate);
    this.setState({
      initComponentData: this.props.pubsub.get('componentData'),
    });
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => this.forceUpdate();

  revertComponentData = () => {
    const { pubsub, helpers } = this.props;
    if (this.state.initComponentData) {
      pubsub.set('componentData', this.state.initComponentData);
    }

    helpers.closeModal();
  };

  otherTab() {
    let tab = 'settings';
    if (this.state.activeTab === 'manage_media') tab = 'advanced_settings';
    if (this.state.activeTab === 'advanced_settings') tab = 'settings';
    if (this.state.activeTab === 'settings') tab = 'manage_media';
    return tab;
  }

  switchTab() {
    const otherTab = this.otherTab();
    this.setState({ activeTab: otherTab });
  }

  onTabSelected = tab => this.setState({ activeTab: tab });

  tabName(tab, t) {
    /* eslint-disable camelcase */
    return {
      manage_media: t('GallerySettings_Tab_ManageMedia'),
      advanced_settings: t('GallerySettings_Tab_AdvancedSettings'),
      settings: t('GallerySettings_Tab_Settings'),
    }[tab];
  }
  onDoneClick = () => {
    const { helpers, pubsub } = this.props;
    const componentData = pubsub.get('componentData');
    const newComponentData = {
      ...componentData,
      disableRightClick: !this.state.isRightClickEnabled,
      disableExpand: !this.state.isExpandEnabled,
    };

    pubsub.update('componentData', newComponentData);

    helpers.closeModal();
  };

  toggleState = key => () => {
    this.setState(prevState => ({
      [key]: !prevState[key],
    }));
  };

  renderToggle = ({ toggleKey, labelKey, tooltipText }) => (
    <LabeledToggle
      key={toggleKey}
      theme={this.props.theme}
      checked={this.state[toggleKey]}
      label={this.props.t(labelKey)}
      onChange={this.toggleState(toggleKey)}
      tooltipText={tooltipText}
    />
  );

  toggleData = [
    {
      toggleKey: 'isExpandEnabled',
      labelKey: 'GalleryPlugin_Settings_ImagesOpenInExpandMode_Label',
    },
    {
      toggleKey: 'isRightClickEnabled',
      labelKey: 'GalleryPlugin_Settings_ImagesCanBeDownloaded_Label',
      tooltipText: this.props.t('GalleryPlugin_Settings_ImagesCanBeDownloaded_Tooltip'),
    },
  ];

  render() {
    const styles = this.styles;
    const {
      pubsub,
      helpers,
      t,
      isMobile,
      anchorTarget,
      relValue,
      uiSettings,
      languageDir,
      accept,
    } = this.props;
    const { activeTab } = this.state;
    const componentData = pubsub.get('componentData');

    return (
      <div dir={languageDir}>
        {isMobile && (
          <GallerySettingsMobileHeader
            theme={this.props.theme}
            cancel={() => this.revertComponentData()}
            save={() => helpers.closeModal()}
            switchTab={this.switchTab}
            otherTab={this.tabName(this.otherTab(), t)}
            t={t}
          />
        )}
        <FocusManager
          focusTrapOptions={{ initialFocus: `#${activeTab}_header` }}
          className={styles.gallerySettings}
          dir={languageDir}
        >
          <div className={styles.gallerySettings_title}>{t('GallerySettings_Header')}</div>
          <div className={styles.gallerySettings_tabsContainer}>
            <Tabs value={activeTab} theme={this.props.theme} onTabSelected={this.onTabSelected}>
              <Tab
                label={this.tabName('manage_media', t)}
                value={'manage_media'}
                theme={this.props.theme}
              >
                <ManageMediaSection
                  data={componentData}
                  store={pubsub.store}
                  helpers={helpers}
                  theme={this.props.theme}
                  t={t}
                  anchorTarget={anchorTarget}
                  relValue={relValue}
                  uiSettings={uiSettings}
                  accept={accept}
                />
              </Tab>
              <Tab
                label={this.tabName('advanced_settings', t)}
                value={'advanced_settings'}
                theme={this.props.theme}
              >
                <AdvancedSettingsSection
                  theme={this.props.theme}
                  data={componentData}
                  store={pubsub.store}
                  helpers={helpers}
                  t={t}
                />
              </Tab>
              <Tab label={this.tabName('settings', t)} value={'settings'} theme={this.props.theme}>
                {this.toggleData.map(toggle => this.renderToggle(toggle))}
              </Tab>
            </Tabs>
          </div>
          {!isMobile && (
            <SettingsPanelFooter
              fixed
              cancel={() => this.revertComponentData()}
              save={this.onDoneClick}
              theme={this.props.theme}
              t={t}
            />
          )}
        </FocusManager>
      </div>
    );
  }
}

GallerySettingsModal.propTypes = {
  activeTab: PropTypes.oneOf(['manage_media', 'advanced_settings', 'settings']),
  componentData: PropTypes.object.isRequired,
  helpers: PropTypes.object.isRequired,
  pubsub: PropTypes.any.isRequired,
  isMobile: PropTypes.bool,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  relValue: PropTypes.string,
  anchorTarget: PropTypes.string,
  uiSettings: PropTypes.object,
  languageDir: PropTypes.string,
  accept: PropTypes.string,
};

export default GallerySettingsModal;
