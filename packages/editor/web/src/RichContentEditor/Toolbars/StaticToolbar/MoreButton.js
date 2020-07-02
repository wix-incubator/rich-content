/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from '../../../../statics/styles/static-toolbar-more-button.scss';
import AddPluginMenu from '../SideToolbar/AddPluginMenu';
import classnames from 'classnames';
import { ShortcutIcon } from '../../Icons';
import ClickOutside from 'react-click-outside';

class MoreButton extends Component {
  constructor(props) {
    super(props);
    this.state = { showPluginMenu: false };
    const { structure, footerToolbarConfig = {} } = props;
    const { showSearch, splitToSections } = footerToolbarConfig.morePluginsMenu || {};
    if (!splitToSections) {
      this.plugins = structure.map(plugin => ({
        ...plugin,
        section: 'BlockToolbar_Section_NoSections',
      }));
    } else {
      this.plugins = structure;
    }
    this.addPluginMenuConfig = {
      showSearch,
      splitToSections: true,
    };
  }

  togglePopup = showPluginMenu => this.setState({ showPluginMenu });

  render() {
    const { addPluginMenuProps, isActive, t } = this.props;
    const { pluginMenuPosition, showPluginMenu } = this.state;
    return (
      <div>
        <div
          className={classnames(Styles.moreButton, isActive && Styles.active)}
          key="shorcutButton"
          onClick={() => this.togglePopup(!showPluginMenu)}
          data-hook="moreButton"
        >
          {t('Shortcut_Toolbar_ViewAll_Blocks')}
          <ShortcutIcon />
        </div>
        {showPluginMenu && (
          <ClickOutside onClickOutside={() => this.togglePopup(false)} key="shortcutMenu">
            <div className={Styles.shortcutPluginMenu} onClick={event => event.stopPropagation()}>
              <AddPluginMenu
                {...addPluginMenuProps}
                t={t}
                addPluginMenuConfig={this.addPluginMenuConfig}
                plugins={this.plugins}
                isActive={showPluginMenu}
                isMobile={false}
                hidePopup={() => this.togglePopup(false)}
              />
            </div>
          </ClickOutside>
        )}
      </div>
    );
  }
}

MoreButton.propTypes = {
  addPluginMenuProps: PropTypes.object.isRequired,
};

export default MoreButton;
