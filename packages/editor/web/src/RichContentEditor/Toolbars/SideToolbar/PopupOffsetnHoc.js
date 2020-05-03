import React from 'react';
import PropTypes from 'prop-types';

const PopupOffsetnHoc = ({
  children,
  elementHeight,
  elementMarginTop,
  elementMarginBottom,
  targetElement,
}) => {
  const bodyRect = document.body.getBoundingClientRect();
  const elemRect = targetElement?.getBoundingClientRect();
  const offset = bodyRect.height - elemRect?.top - elementMarginTop;
  return React.cloneElement(children, {
    top: offset < elementHeight ? elementMarginBottom - elementHeight : elementMarginTop,
  });
};

PopupOffsetnHoc.propTypes = {
  children: PropTypes.any,
  elementHeight: PropTypes.number,
  elementMarginTop: PropTypes.number.isRequired,
  elementMarginBottom: PropTypes.number.isRequired,
  targetElement: PropTypes.any,
};

export default PopupOffsetnHoc;
