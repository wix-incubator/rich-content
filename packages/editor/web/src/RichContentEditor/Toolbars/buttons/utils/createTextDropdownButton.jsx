import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TextButton from '../TextButton';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../../../../../statics/styles/inline-toolbar-dropdown-button.scss';
import ClickOutside from 'react-click-outsider';

export default ({ buttons, activeItem, onChange, tooltipTextKey }) =>
  class TextDropdownButton extends PureComponent {
    static propTypes = {
      getEditorState: PropTypes.func.isRequired,
      setEditorState: PropTypes.func.isRequired,
      theme: PropTypes.object.isRequired,
      defaultTextAlignment: PropTypes.string,
      isVisible: PropTypes.bool,
      isMobile: PropTypes.bool,
      t: PropTypes.func,
      tabIndex: PropTypes.number,
      helpers: PropTypes.object,
    };

    constructor(props) {
      super(props);
      const { defaultTextAlignment, getEditorState } = this.props;
      this.state = {
        isOpen: false,
        selected: activeItem({ getEditorState, defaultValue: defaultTextAlignment }),
      };

      const theme = props.theme || {};
      /* eslint-disable camelcase*/
      this.theme = {
        ...theme,
        buttonStyles: {
          inlineToolbarButton_wrapper: classNames(
            styles.inlineToolbarDropdownButton_wrapper,
            theme && theme.inlineToolbarDropdownButton_wrapper
          ),
          inlineToolbarButton: classNames(
            styles.inlineToolbarDropdownButton,
            theme && theme.inlineToolbarDropdownButton
          ),
          inlineToolbarButton_icon: classNames(
            styles.inlineToolbarDropdownButton_icon,
            theme && theme.inlineToolbarDropdownButton_icon
          ),
          inlineToolbarButton_active: classNames(
            styles.inlineToolbarButton_active,
            theme && theme.inlineToolbarDropdownButton_active
          ),
        },
      };
      this.styles = mergeStyles({ styles, theme: this.theme });
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.isVisible === true && nextProps.isVisible === false) {
        this.setState({ isOpen: false });
      }
    }

    showOptions = () => this.setState({ isOpen: true });

    renderOptions = () => {
      const { getEditorState, setEditorState, t, helpers } = this.props;
      const { selected } = this.state;
      const onClick = value => {
        const tooltipText = t(tooltipTextKey);
        const textForHooks = tooltipText.replace(/\s+/, '');
        helpers?.onToolbarButtonClick?.({
          type: 'FORMATTING',
          buttonName: textForHooks,
          value,
        });
        onChange(getEditorState, setEditorState, value);
        this.setState({ selected: activeItem({ value }), isOpen: false });
      };

      const typeKey = Object.keys(selected).filter(k => k !== 'Icon')[0];
      const buttonProps = {
        [typeKey]: selected[typeKey],
        onClick,
        ...this.props,
        theme: this.theme,
      };
      return (
        <ClickOutside
          onClickOutside={() => this.setState({ isOpen: false })}
          className={this.styles.inlineToolbarDropdown_options}
        >
          {buttons.map((Button, i) => (
            <Button key={i} tabIndex="0" {...buttonProps} />
          ))}
        </ClickOutside>
      );
    };

    render() {
      const {
        selected: { Icon },
        isOpen,
      } = this.state;
      const { isMobile, tabIndex, t, helpers } = this.props;
      const tooltipText = t(tooltipTextKey);
      const textForHooks = tooltipText.replace(/\s+/, '');
      const dataHookText = `textDropDownButton_${textForHooks}`;
      const onClick = () => {
        helpers?.onToolbarButtonClick?.({
          type: 'FORMATTING',
          buttonName: textForHooks,
        });
        this.showOptions();
      };

      return (
        <div className={this.styles.inlineToolbarDropdown_wrapper}>
          <TextButton
            icon={Icon}
            theme={this.theme}
            isMobile={isMobile}
            dataHook={dataHookText}
            onClick={onClick}
            tabIndex={tabIndex}
            tooltipText={tooltipText}
            tooltipOffset={{ y: -10 }}
          />
          {isOpen && this.renderOptions()}
        </div>
      );
    }
  };
