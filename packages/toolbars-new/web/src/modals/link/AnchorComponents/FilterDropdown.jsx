import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../anchor-panel.scss';
import { Dropdown } from 'wix-rich-content-ui-components';
import { ANCHORABLE_BLOCKS } from './consts';
import FilterDropdownElement from './FilterDropdownElement';

class FilterDropdown extends Component {
  constructor(props) {
    super(props);
    const { theme } = props;
    this.styles = mergeStyles({ styles, theme });
  }

  createFilterDropdownOption = ({ value, label }) => {
    return {
      value,
      component: () => <FilterDropdownElement label={label} theme={this.styles} />,
    };
  };

  filterDropdownOptions = options => {
    const { t } = this.props;
    const optionsArray = options.map(option =>
      this.createFilterDropdownOption({
        value: option,
        label: t(ANCHORABLE_BLOCKS[option].filter),
      })
    );
    const allOption = this.createFilterDropdownOption({
      value: 'all',
      label: t('LinkTo_Modal_Section_Filter_All'),
    });
    return [allOption, ...optionsArray];
  };

  render() {
    const { styles } = this;
    const { anchorableBlocksData, theme, filterChanged, filter } = this.props;
    const { pluginsIncluded } = anchorableBlocksData;

    return (
      <div className={styles.AnchorPanel_dropdownWrapper}>
        <Dropdown
          theme={theme}
          value={filter}
          options={this.filterDropdownOptions(pluginsIncluded)}
          controlClassName={styles.AnchorPanel_dropdownControl}
          menuClassName={styles.AnchorPanel_dropdownMenu}
          onChange={filterChanged}
          tabIndex={0}
        />
      </div>
    );
  }
}

FilterDropdown.propTypes = {
  anchorableBlocksData: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  filterChanged: PropTypes.func,
  filter: PropTypes.object,
};
export default FilterDropdown;
