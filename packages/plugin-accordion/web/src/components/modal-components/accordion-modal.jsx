import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { SettingsPanelFooter, FocusManager, Tabs, Tab } from 'wix-rich-content-editor-common';
import { TABS } from '../../defaults';
import AccordionSettings from './accordion-settings';
import AccordionModalMobileHeader from './accordion-modal-mobile-header';
import styles from '../../../statics/styles/accordion-modal.scss';

class AccordionModal extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialStateFromProps(props);
    const { t, theme } = props;
    this.styles = mergeStyles({ styles, theme });
    this.headerText = t('Accordion_AccordionSettings_Common_Header');
    this.settingsTabLabel = t('Accordion_AccordionSettings_Tab_Settings_TabName');
    this.designTabLabel = t('Accordion_AccordionSettings_Tab_Design_TabName');
  }

  initialStateFromProps(props) {
    return { initialComponentData: props.pubsub.get('componentData'), activeTab: props.activeTab };
  }

  componentDidMount() {
    const { pubsub } = this.props;
    pubsub.subscribe('componentData', this.onComponentUpdate);
    this.setState({ initialComponentData: pubsub.get('componentData') });
  }

  componentWillUnmount() {
    this.props.pubsub.unsubscribe('componentData', this.onComponentUpdate);
  }

  onComponentUpdate = () => this.forceUpdate();

  revertComponentData = () => {
    const { pubsub, helpers } = this.props;
    const { initialComponentData } = this.state;
    if (initialComponentData) {
      pubsub.store.set('componentData', initialComponentData);
    }

    helpers.closeModal();
  };

  onDoneClick = () => {
    const { helpers } = this.props;
    helpers.closeModal();
  };

  onTabSelected = activeTab => this.setState({ activeTab });

  render() {
    const { theme, t, isMobile, languageDir, componentData, pubsub } = this.props;
    const { activeTab } = this.state;

    return (
      <div className={this.styles.accordionModal} data-hook="accordionModal" dir={languageDir}>
        {isMobile ? (
          <AccordionModalMobileHeader
            t={t}
            theme={theme}
            onCancel={() => this.revertComponentData()}
            onSave={() => this.onDoneClick()}
          />
        ) : (
          <h3 className={this.styles.accordionModalTitle}>{this.headerText}</h3>
        )}
        <div
          className={classNames(styles.accordionModal_scrollContainer, {
            [styles.accordionModal_mobile]: isMobile,
          })}
        >
          <FocusManager className={styles.accordionModal} dir={languageDir} theme={theme}>
            <Tabs value={activeTab} theme={this.props.theme} onTabSelected={this.onTabSelected}>
              <Tab label={this.settingsTabLabel} value={TABS.SETTINGS} theme={this.props.theme}>
                <AccordionSettings
                  componentData={componentData}
                  theme={theme}
                  store={pubsub.store}
                  t={t}
                />
              </Tab>
              <Tab label={this.designTabLabel} value={TABS.DESIGN} theme={this.props.theme} />
            </Tabs>
          </FocusManager>
          );
        </div>
        {isMobile ? null : (
          <SettingsPanelFooter
            fixed
            theme={theme}
            cancel={() => this.revertComponentData()}
            save={() => this.onDoneClick()}
            t={t}
          />
        )}
      </div>
    );
  }
}
AccordionModal.propTypes = {
  componentData: PropTypes.any.isRequired,
  helpers: PropTypes.object,
  theme: PropTypes.object.isRequired,
  pubsub: PropTypes.any,
  t: PropTypes.func,
  isMobile: PropTypes.bool,
  languageDir: PropTypes.string,
  activeTab: PropTypes.string,
};

export default AccordionModal;
