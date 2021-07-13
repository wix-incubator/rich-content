import React, { Component, PureComponent, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import styles from '../link-panel.scss';
import { mergeStyles } from 'wix-rich-content-common';
import { isUndefined } from 'lodash';

const List = lazy(() =>
  import('react-window').then(({ FixedSizeList }) => ({
    default: FixedSizeList,
  }))
);
const dummy = '';
const Downshift = lazy(() => import(/* webpackChunkName: "downshift" */ `downshift${dummy}`));

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
    selectedItem: { value: this.props.value },
    items: this.props.getItems(),
    fallbackChanged: false,
  };

  styles = mergeStyles({ styles, theme: this.props.theme });

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
    const { itemToString, formatMenuItem, itemHeight, textInputProps, value } = this.props;
    const { selectedItem, items, fallbackChanged } = this.state;
    return (
      <Suspense
        fallback={
          <Input
            {...textInputProps}
            value={value}
            onChange={e => {
              this.props.onChange(e.target.value);
              this.setState({ fallbackChanged: true });
            }}
            selectText
          />
        }
      >
        <Downshift
          selectedItem={selectedItem}
          onStateChange={this.handleDropDownStateChange}
          itemToString={itemToString}
          initialInputValue={value}
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
              <Input {...getInputProps({ ...textInputProps })} selectText={!fallbackChanged} />
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
    );
  }

  static propTypes = {
    theme: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    getItems: PropTypes.func,
    itemToString: PropTypes.func,
    value: PropTypes.string,
    formatMenuItem: PropTypes.func,
    itemHeight: PropTypes.number,
    textInputProps: PropTypes.object,
    isOpen: PropTypes.bool,
  };
}

class Input extends Component {
  textInput = React.createRef();

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { selectText } = this.props;
    this.textInput.current.focus();
    if (selectText) {
      this.textInput.current.select(); //select the link in case of edit
    } else {
      this.textInput.current.selectionStart = this.textInput.current.value.length;
      this.textInput.current.selectionEnd = this.textInput.current.value.length;
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types, no-unused-vars
    const { selectText, ...inputProps } = this.props;
    return <input {...inputProps} ref={this.textInput} />;
  }
}
