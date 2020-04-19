import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { validate, verticalEmbedSchema } from 'wix-rich-content-common';

class VerticalEmbedComponent extends PureComponent {
  constructor(props) {
    super(props);
    validate(props.componentData, verticalEmbedSchema);
  }

  render() {
    const { componentData, className } = this.props;
    const { selectedProduct } = componentData;
    const { html } = selectedProduct;

    return (
      <div className={className} data-hook="vertical-embed">
        {/* eslint-disable-next-line react/no-danger*/}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }
}

VerticalEmbedComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default VerticalEmbedComponent;
