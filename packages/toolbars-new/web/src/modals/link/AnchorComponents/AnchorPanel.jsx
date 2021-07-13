import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../anchor-panel.scss';
import { filterAnchorableBlocks } from './anchorUtils';
import FilterDropdownElement from './FilterDropdownElement';
import AnchorableElement from './AnchorableElement';
import FilterDropdown from './FilterDropdown';

class AnchorPanel extends Component {
  constructor(props) {
    super(props);
    const { theme, t } = props;
    this.styles = mergeStyles({ styles, theme });
    this.state = {
      filter: {
        value: 'all',
        component: () => (
          <FilterDropdownElement label={t('LinkTo_Modal_Section_Filter_All')} theme={this.styles} />
        ),
      },
    };
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    this.scrollPanelToSelectedAnchor();
  }

  scrollPanelToSelectedAnchor = () => {
    const { anchorValues } = this.props;
    if (anchorValues.anchor) {
      const target = this.scrollRef.current;
      target.parentNode.scrollTop = target.offsetTop - target.parentNode.offsetTop;
    }
  };

  onChange = (changes, options = {}) => {
    this.props.onChange({
      anchor: changes.key,
      defaultName: options.defaultName,
    });
  };

  filterChanged = newFilter => {
    this.setState({ filter: newFilter });
  };

  renderEmptyState = () => {
    const { styles } = this;
    const { t } = this.props;
    return (
      <div className={styles.AnchorPanel_emptyStateContainer}>
        <div className={styles.AnchorPanel_emptyStateTitle}>
          {t('LinkTo_Modal_Section_EmptyState_Title')}
        </div>
        <div className={styles.AnchorPanel_emptyStateText}>
          {t('LinkTo_Modal_Section_EmptyState_Text')}
        </div>
      </div>
    );
  };

  anchorableElementClicked = (block, { defaultName }) => {
    const { anchorValues } = this.props;
    const isSelected = anchorValues.anchor === block.key;
    if (isSelected) {
      const { onEnter } = this.props;
      onEnter && onEnter();
    } else {
      this.onChange(block, { defaultName });
    }
  };

  render() {
    const { styles } = this;
    const { filter } = this.state;
    const { ariaProps, t, anchorValues, anchorableBlocksData, theme, blockPreview } = this.props;
    const { anchorableBlocks } = anchorableBlocksData;
    const filteredAnchorableBlocks =
      filter.value === 'all'
        ? anchorableBlocks
        : filterAnchorableBlocks(anchorableBlocks, filter.value);

    return anchorableBlocks.length === 0 ? (
      this.renderEmptyState()
    ) : (
      <div className={styles.AnchorPanel_Content} {...ariaProps} role="form">
        <div className={styles.AnchorPanel_header}>
          <div className={styles.AnchorPanel_title}>{t('LinkTo_Modal_Section_Title')}</div>
          <FilterDropdown
            anchorableBlocksData={anchorableBlocksData}
            t={t}
            theme={theme}
            filterChanged={this.filterChanged}
            filter={filter}
          />
        </div>
        <div className={styles.AnchorPanel_anchorsElementsContainer}>
          {filteredAnchorableBlocks.map(block => (
            <div
              key={block.key}
              ref={anchorValues.anchor === block.key ? this.scrollRef : undefined}
            >
              <AnchorableElement
                dataHook={block.key}
                block={block}
                theme={styles}
                onClick={args => this.anchorableElementClicked(block, { ...args })}
                isSelected={anchorValues.anchor === block.key}
                t={t}
                blockPreview={blockPreview}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

AnchorPanel.propTypes = {
  anchorableBlocksData: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  anchorValues: PropTypes.shape({
    anchor: PropTypes.string,
  }).isRequired,
  ariaProps: PropTypes.object,
  onEnter: PropTypes.func,
  onEscape: PropTypes.func,
  placeholder: PropTypes.string,
  blockPreview: PropTypes.func,
};
export default AnchorPanel;
