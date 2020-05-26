import React, { Component, PureComponent, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/link-panel.scss';
import { mergeStyles } from 'wix-rich-content-common';
// import { FixedSizeList as List } from 'react-window';
// import Downshift from 'downshift/dist/downshift.cjs.js';
import { isUndefined } from 'lodash';

function isSubString(str, subStr) {
  return str.toLowerCase().includes(subStr.toLowerCase());
}

function filterItems(items, str) {
  return str
    ? items.filter(({ value, label }) => isSubString(value, str) || isSubString(label, str))
    : items;
}

class ItemRenderer extends PureComponent {
  render() {
    const {
      items,
      getItemProps,
      highlightedIndex,
      selectedItem,
      formatMenuItem,
      inputValue,
    } = this.props.data;
    const { index, style } = this.props;
    const item = items[index];
    return (
      <div
        {...getItemProps({
          item,
          index,
          key: item.value,
          style: {
            backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
            fontWeight: selectedItem === item ? 'bold' : 'normal',
            ...style,
          },
        })}
      >
        {formatMenuItem(item, inputValue)}
      </div>
    );
  }

  static propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    style: PropTypes.object,
  };
}

export class LinkPanelDropdown extends Component {
  state = {
    selectedItem: { value: this.props.initialValue },
    items: this.props.getItems(),
    List: false,
    Downshift: false,
  };
  styles = mergeStyles({ styles, theme: this.props.theme });

  componentDidMount() {
    const List = lazy(() =>
      import('react-window').then(({ FixedSizeList }) => ({
        default: FixedSizeList,
      }))
    );
    const dummy = '';
    const Downshift = lazy(() =>
      import(`downshift/dist/downshift${dummy}.cjs.js`).then(Downshift => ({
        default: Downshift.default,
      }))
    );

    this.setState({ List, Downshift });
  }
  handleDropDownStateChange = changes => {
    if (!isUndefined(changes.selectedItem)) {
      this.setState({ selectedItem: changes.selectedItem });
    }
    if (!isUndefined(changes.inputValue)) {
      const { inputValue } = changes;
      if (!this.state.selectedItem || this.state.selectedItem.value !== inputValue) {
        this.setState({ selectedItem: { value: inputValue } });
      }
      this.setState({
        items: filterItems(this.props.getItems(), inputValue),
        inputValue,
      });
      this.props.onChange(inputValue);
    }
  };

  render() {
    const { itemToString, formatMenuItem, itemHeight, textInputProps } = this.props;
    const { selectedItem, items, List, Downshift } = this.state;
    return (
      Downshift && (
        <Suspense fallback={<div>Loading...</div>}>
          <Downshift
            selectedItem={selectedItem}
            onStateChange={this.handleDropDownStateChange}
            itemToString={itemToString}
          >
            {({
              getInputProps,
              getItemProps,
              // getLabelProps,
              getMenuProps,
              isOpen,
              highlightedIndex,
              inputValue,
            }) => (
              <div>
                {/*<label {...getLabelProps()}>Enter a fruit</label>*/}
                <input {...getInputProps(textInputProps)} />
                {(isOpen || this.props.isOpen) && List && (
                  <Suspense fallback={<div>Loading...</div>}>
                    <List
                      className={styles.linkPanel_dropdownList}
                      style={{ borderTop: '0', position: 'absolute' }}
                      height={Math.min(items.length * itemHeight + 1, 200)}
                      itemCount={items.length}
                      itemSize={itemHeight}
                      itemData={{
                        items,
                        getItemProps,
                        highlightedIndex,
                        selectedItem,
                        formatMenuItem,
                        inputValue,
                      }}
                      {...getMenuProps()}
                    >
                      {ItemRenderer}
                    </List>
                  </Suspense>
                )}
              </div>
            )}
          </Downshift>
        </Suspense>
      )
    );
  }

  static propTypes = {
    theme: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    getItems: PropTypes.func,
    itemToString: PropTypes.func,
    initialValue: PropTypes.string,
    formatMenuItem: PropTypes.func,
    itemHeight: PropTypes.number,
    textInputProps: PropTypes.object,
    isOpen: PropTypes.bool,
  };
}
