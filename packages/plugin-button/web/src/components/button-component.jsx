import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Context, normalizeUrl } from 'wix-rich-content-common';
import { alignmentClassName, sizeClassName } from '../classNameStrategies.js';
import { COLORS } from '../constants';
import ButtonViewer from './button-viewer';

class ButtonComponent extends PureComponent {
  static alignmentClassName = (componentData, theme, styles, isMobile) =>
    alignmentClassName(componentData, theme, styles, isMobile);

  static sizeClassName = (componentData, theme, styles, isMobile) =>
    sizeClassName(componentData, theme, styles, isMobile);

  constructor(props) {
    super(props);
    const {
      componentData: { button },
    } = this.props;
    this.state = {
      style: button,
    };
  }

  render() {
    const colors = this.props?.settings?.colors || COLORS;
    const {
      componentData: { button },
      buttonObj,
    } = this.props;
    const { anchorTarget = '_self', relValue = '', theme } = this.context || this.props;
    let buttonText = button.buttonText;
    let rel = '';
    let url = '';
    let style = {
      border: '0px solid blue',
      ...this.props.style,
    };

    const target =
      typeof button.target === 'undefined' ? anchorTarget : button.target ? '_blank' : '_self';
    rel = typeof button.rel === 'undefined' ? relValue : button.rel ? 'nofollow' : '';
    style = {
      ...style,
      borderWidth: button.borderWidth + 'px',
      padding: button.padding + 'px',
      borderRadius: button.borderRadius,
      color: button.textColor ? button.textColor : colors.color1,
      background: button.backgroundColor ? button.backgroundColor : colors.color8,
      borderColor: button.borderColor ? button.borderColor : colors.color8,
    };
    url = button.url;
    if (buttonObj) {
      style = {
        ...style,
        borderWidth: buttonObj.design.borderWidth + 'px',
        padding: buttonObj.design.padding + 'px',
        borderRadius: buttonObj.design.borderRadius,
        color: buttonObj.design.textColor,
        background: buttonObj.design.backgroundColor,
        borderColor: buttonObj.design.borderColor,
      };
      buttonText = buttonObj.data.buttonText;
    }

    return (
      <ButtonViewer
        url={normalizeUrl(url)}
        style={style}
        target={target}
        rel={rel}
        buttonText={buttonText}
        theme={theme}
      />
    );
  }
}

ButtonComponent.propTypes = {
  componentData: PropTypes.object,
  style: PropTypes.object,
  buttonObj: PropTypes.object,
  settings: PropTypes.object.isRequired,
  blockProps: PropTypes.object,
};

ButtonComponent.contextType = Context.type;

export default ButtonComponent;
