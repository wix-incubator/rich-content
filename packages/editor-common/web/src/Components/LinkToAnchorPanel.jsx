/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../statics/styles/link-panel.scss';
import Dropdown from './Dropdown';
import { getAnchorableBlocks, filterAnchorableBlocks } from '../Utils/draftUtils';
import { ANCHORABLE_BLOCKS } from '../consts';

class LinkToAnchorPanel extends Component {
  styles = mergeStyles({ styles, theme: this.props.theme });
  state = {
    showValidation: false,
    filter: {
      value: 'all',
      component: () => <FilterDropdownElement label={'All'} theme={this.styles} />,
    },
  };

  componentDidMount() {
    this.onChange({ isValid: this.isValidUrl(this.props.linkValues.url), isLinkToAnchor: true });
  }

  handleUrlChange = url => {
    this.setState({ showValidation: false });
    this.onChange({
      url,
      isValid: this.isValidUrl(url),
      isLinkToAnchor: true,
    });
  };

  onChange = changes => {
    this.props.onChange({ ...this.props.linkValues, ...changes });
  };

  handleKeyDown = e => {
    const { onEnter, onEscape } = this.props;
    if (e.key === 'Enter') {
      this.setState({ showValidation: true });
      e.preventDefault();
      onEnter && onEnter(e);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onEscape && onEscape(e);
    }
  };

  isValidUrl = () => {
    return true;
  };
  // isValidUrl = url => {
  //   return !url || this.props.anchorsEntities.some(anchor => anchor.data.name === url);
  // };

  getAnchorInputProps() {
    const { styles } = this;
    return {
      type: 'string',
      className: styles.linkPanel_textInput,
      placeholder: this.props.placeholder || this.props.t('LinkPanel_Anchor_Placeholder'),
      'data-hook': 'anchorLinkPanelInput',
      onBlur: () => this.setState({ showValidation: true }),
    };
  }

  filterChanged = newFilter => {
    this.setState({ filter: newFilter });
  };

  dropdownOptions = options => {
    const optionsArray = options.map(option => {
      return {
        value: option,
        component: () => (
          <FilterDropdownElement label={ANCHORABLE_BLOCKS[option].type} theme={this.styles} />
        ),
      };
    });
    return [
      {
        value: 'all',
        component: () => <FilterDropdownElement label={'All'} theme={this.styles} />,
      },
      ...optionsArray,
    ];
  };

  render() {
    const { styles } = this;
    const { filter } = this.state;
    const { ariaProps, t, getEditorState } = this.props;
    const anchorableBlocksData = getAnchorableBlocks(getEditorState());
    const { anchorableBlocks, pluginsIncluded } = anchorableBlocksData;
    const filteredAnchorableBlocks =
      filter.value === 'all'
        ? anchorableBlocks
        : filterAnchorableBlocks(anchorableBlocks, filter.value);

    return (
      <div className={styles.linkPanel_Content} {...ariaProps} role="form">
        <div className={styles.LinkToAnchorPanel_header}>
          <div>{t('LinkPanel_Anchor_Placeholder')}</div>
          <div className={styles.LinkToAnchorPanel_dropdownWrapper}>
            <Dropdown
              theme={styles}
              value={filter}
              options={this.dropdownOptions(pluginsIncluded)}
              controlClassName={styles.LinkToAnchorPanel_dropdownControl}
              menuClassName={styles.LinkToAnchorPanel_dropdownMenu}
              onChange={this.filterChanged}
              // className={buttonClassNames}
              // tabIndex={tabIndex}
              // dataHook={this.getDataHook()}
              // getValue={decoratedGetValue}
              // {...props}
            />
          </div>
        </div>
        <div className={styles.LinkToAnchorPanel_anchorsElementsContainer}>
          {filteredAnchorableBlocks.map((block, i) => (
            <AnchorableElement key={i} block={block} theme={styles} />
          ))}
        </div>
      </div>
    );
  }
}

LinkToAnchorPanel.propTypes = {
  getEditorState: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  linkValues: PropTypes.shape({
    url: PropTypes.string,
    isValid: PropTypes.bool,
    targetBlank: PropTypes.bool,
    nofollow: PropTypes.bool,
  }).isRequired,
  ariaProps: PropTypes.object,
  dropDown: PropTypes.object,
  onEnter: PropTypes.func,
  onEscape: PropTypes.func,
  placeholder: PropTypes.string,
};
export default LinkToAnchorPanel;

class AnchorableElement extends PureComponent {
  styles = mergeStyles({ styles, theme: this.props.theme });

  getDataToDisplayByField = field => {
    const { block } = this.props;
    return <div>{ANCHORABLE_BLOCKS[block.anchorType][field]}</div>;
  };

  getContent = () => {
    const { block } = this.props;
    if (block.type === 'atomic') {
      return <div>{`${ANCHORABLE_BLOCKS[block.anchorType].type} ${block.index}`}</div>;
    } else {
      return <div>{block.text}</div>;
    }
  };

  render() {
    return (
      <div className={this.styles.AnchorableElement_container}>
        <div className={this.styles.AnchorableElement_thumbnail}>
          {this.getDataToDisplayByField('thumbnail')}
        </div>
        <div className={this.styles.AnchorableElement_contentContainer}>
          <div className={this.styles.AnchorableElement_contentType}>
            {this.getDataToDisplayByField('type')}
          </div>
          <div>{this.getContent()}</div>
        </div>
      </div>
    );
  }

  static propTypes = {
    block: PropTypes.object,
    theme: PropTypes.object,
  };
}

class FilterDropdownElement extends PureComponent {
  styles = mergeStyles({ styles, theme: this.props.theme });
  render() {
    const { label } = this.props;
    return <div className={this.styles.FilterDropdownElement}>{label}</div>;
  }

  static propTypes = {
    label: PropTypes.string,
    theme: PropTypes.object,
  };
}
