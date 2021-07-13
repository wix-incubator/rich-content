import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import LinkPanelWrapper from './LinkPanelWrapper';
// import FocusManager from '../FocusManager';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../link-panel.scss';
import LinkActionsButtons from './LinkActionsButtons';
import { LinkIcon } from '../Icons';

class BasicLinkPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.styles = mergeStyles({ styles, theme: props.theme });
  }

  renderMobileTitle = () => {
    const { t } = this.props;
    return (
      <div className={styles.mobileLinkModal_titleContainer}>
        <div className={styles.mobileLinkModal_linkIconContainer}>
          <LinkIcon />
        </div>
        <h3 id="mob_link_modal_hdr" className={styles.mobileLinkModal_title}>
          {t('MobileLinkModal_Title')}
        </h3>
      </div>
    );
  };

  render() {
    const { styles } = this;
    const {
      ariaProps,
      showNewTabCheckbox,
      showNoFollowCheckbox,
      showSponsoredCheckbox,
      sharedPanelsProps,
      buttonsProps,
      linkPanelValues,
      onChangeLinkPanel,
      isMobile,
    } = this.props;
    const linkPanelContainerClassName = classNames(styles.linkPanel_container, {
      [styles.linkPanel_container_isMobile]: isMobile,
    });
    return (
      // <FocusManager
      //   className={linkPanelContainerClassName}
      //   data-hook="linkPanelContainer"
      //   role="form"
      //   {...ariaProps}
      // >
      <div className={linkPanelContainerClassName} data-hook="linkPanelContainer">
        {isMobile && this.renderMobileTitle()}
        <div className={styles.linkPanel_content}>
          <LinkPanelWrapper
            linkValues={linkPanelValues}
            onChange={onChangeLinkPanel}
            showNewTabCheckbox={showNewTabCheckbox}
            showNoFollowCheckbox={showNoFollowCheckbox}
            showSponsoredCheckbox={showSponsoredCheckbox}
            {...sharedPanelsProps}
          />
          <div className={styles.linkPanel_actionsDivider} role="separator" />
        </div>
        <LinkActionsButtons basicLinkPanel {...buttonsProps} />
      </div>
      // </FocusManager>
    );
  }
}

BasicLinkPanel.propTypes = {
  theme: PropTypes.object.isRequired,
  t: PropTypes.func,
  ariaProps: PropTypes.object,
  showNewTabCheckbox: PropTypes.bool,
  showNoFollowCheckbox: PropTypes.bool,
  showSponsoredCheckbox: PropTypes.bool,
  sharedPanelsProps: PropTypes.object,
  buttonsProps: PropTypes.object,
  changeRadioGroup: PropTypes.func,
  linkPanelValues: PropTypes.object,
  onChangeLinkPanel: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default BasicLinkPanel;
