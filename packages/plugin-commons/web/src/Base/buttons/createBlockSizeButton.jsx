import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ToolbarButton } from 'wix-rich-content-editor-common';
import { Version } from 'wix-rich-content-common';

export default ({ size, Icon, tooltipTextKey }) =>
  class BlockSizeButton extends Component {
    static propTypes = {
      size: PropTypes.string,
      setLayoutProps: PropTypes.func.isRequired,
      keyName: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      theme: PropTypes.object.isRequired,
      isMobile: PropTypes.bool,
      tooltipText: PropTypes.string,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
      helpers: PropTypes.object,
      pluginType: PropTypes.string,
    };

    isActive = () => this.props.size === size;

    handleClick = event => {
      event.preventDefault();
      const { disabled, setLayoutProps, helpers, pluginType } = this.props;
      if (disabled) {
        return;
      }
      helpers?.onToolbarButtonClick?.({
        version: Version.currentVersion,
        buttonName: 'Size',
        pluginId: pluginType,
        value: `${size}`,
      });
      setLayoutProps({ size });
    };

    preventBubblingUp = event => {
      event.preventDefault();
    };

    render() {
      const { disabled, theme, t, tabIndex, keyName } = this.props;
      const className = classNames({
        [theme.button]: true,
        [theme.active]: this.isActive(),
        [theme.disabled]: disabled,
      });
      const tooltipText = t(tooltipTextKey);
      const dataHookText = `blockSizeButton_${keyName}`;

      /* eslint-disable jsx-a11y/no-static-element-interactions */
      const blockButton = (
        <div className={theme.buttonWrapper} onMouseDown={this.preventBubblingUp}>
          <button
            tabIndex={tabIndex}
            className={className}
            data-hook={dataHookText}
            onClick={this.handleClick}
          >
            <div className={theme.icon}>
              <Icon />
            </div>
          </button>
        </div>
      );
      /* eslint-enable jsx-a11y/no-static-element-interactions */

      return <ToolbarButton theme={theme} tooltipText={tooltipText} button={blockButton} />;
    }
  };
