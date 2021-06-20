import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from '../../../../statics/styles/side-toolbar-panel.scss';
import { TextSearchInput } from 'wix-rich-content-ui-components';
import PluginMenuPluginsSection from './PluginMenuPluginsSection';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { getPluginsIdForTag } from '../../pluginsSearchTags';
import { debounce } from 'lodash';

export default class AddPluginMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    const { addPluginMenuConfig, isMobile, theme } = props;
    this.styles = mergeStyles({ styles: Styles, theme });
    this.showSearch = addPluginMenuConfig?.showSearch && !isMobile;
    this.horizontalMenu =
      (!addPluginMenuConfig || addPluginMenuConfig?.horizontalMenuLayout) && !isMobile;
    this.wrapperClassName = classNames(this.styles.sideToolbarPanelWrapper, {
      [this.styles.horizontalMenu]: this.horizontalMenu,
    });
    this.pluginsClassName = classNames(
      this.styles.pluginsWrapper,
      this.horizontalMenu && this.styles.horizontalMenu,
      this.showSearch && this.styles.withSearch
    );
  }

  triggerBi = debounce(() => {
    const { t, helpers, isMoreMenu } = this.props;
    helpers.onPluginAction('searchForPlugin', {
      searchTerm: this.state.value,
      pluginsDetails: getPluginsIdForTag(this.state.value.toLowerCase(), t).join(', '),
      entry_point: isMoreMenu ? 'footerToolbar' : 'sideToolbar',
    });
  }, 200);

  onChange = value => {
    this.setState({ value }, () => this.container?.scrollTo(0, 0));
    this.triggerBi();
  };

  render() {
    const {
      getEditorState,
      setEditorState,
      plugins,
      hidePopup,
      t,
      addPluginMenuConfig,
      isActive,
      theme,
      pluginMenuButtonRef,
      isMobile,
      toolbarName,
      searchablePlugins,
    } = this.props;
    const smallPlusIcon = addPluginMenuConfig?.tablePluginMenu;
    const { showSearch, wrapperClassName, pluginsClassName, horizontalMenu } = this;
    const { value } = this.state;
    return (
      <div
        className={wrapperClassName}
        data-hook="addPluginMenu"
        ref={ref => (this.container = ref)}
        style={{ height: this.container?.offsetHeight }}
      >
        {showSearch && isActive && (
          <div className={this.styles.searchWrapper}>
            <TextSearchInput
              onClose={hidePopup}
              placeHolder={t('BlockToolbar_Search_Placeholder')}
              onChange={this.onChange}
              value={value}
            />
          </div>
        )}
        <div className={pluginsClassName}>
          <PluginMenuPluginsSection
            getEditorState={getEditorState}
            setEditorState={setEditorState}
            plugins={plugins}
            searchTag={value}
            t={t}
            hidePopup={hidePopup}
            splitToSections={!value && addPluginMenuConfig?.splitToSections}
            horizontalMenu={horizontalMenu}
            smallPlusIcon={smallPlusIcon}
            theme={theme}
            pluginMenuButtonRef={pluginMenuButtonRef}
            isMobile={isMobile}
            toolbarName={toolbarName}
            searchablePlugins={searchablePlugins}
          />
        </div>
      </div>
    );
  }
}

AddPluginMenu.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  plugins: PropTypes.array.isRequired,
  t: PropTypes.func,
  hidePopup: PropTypes.func,
  isMobile: PropTypes.bool,
  addPluginMenuConfig: PropTypes.object,
  isActive: PropTypes.bool,
  theme: PropTypes.object,
  pluginMenuButtonRef: PropTypes.any,
  toolbarName: PropTypes.string,
  searchablePlugins: PropTypes.array,
  helpers: PropTypes.object,
  isMoreMenu: PropTypes.bool,
};
