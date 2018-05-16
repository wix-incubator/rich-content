import React from 'react';
import PropTypes from 'prop-types';
import Styles from '../default-html-styles.scss';

class EditModal extends React.Component {
  static propTypes = {
    componentData: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
    t: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps = props => {
    return {
      isSrc: !!(props.componentData && props.componentData.config && props.componentData.config.isSrc),
      src: (props.componentData && props.componentData.src) || '',
      content: (props.componentData && props.componentData.content) || '',
      t: props.t,
    };
  };

  changeIsSrc = event => {
    const isSrc = event.target.value !== 'false';
    this.setState({ isSrc });
  };

  changeIsContent = event => {
    const isSrc = !(event.target.value !== 'false');
    this.setState({ isSrc });
  };

  changeContent = event => {
    const content = event.target.value;
    this.setState({ content });
  };

  changeSrc = event => {
    const src = event.target.value;
    this.setState({ src });
  };

  updateContent = () => {
    const componentData = { ...this.props.componentData };
    componentData.config = componentData.config || {};
    componentData.src = this.state.src;
    componentData.content = this.state.content;
    componentData.config.isSrc = this.state.isSrc;
    this.props.store.set('componentData', componentData);
  };

  render = () => {
    const { t, tabIndex } = this.props;
    const sourceLabel = t('HtmlPlugin_Source');
    const codeLabel = t('HtmlPlugin_Code');
    const updateLabel = t('HtmlPlugin_Update');
    return (
      <div>
        <div className={Styles.tabs}>
          <div className={Styles.tab}>
            <label htmlFor="tab-1">
              <input
                aria-label={sourceLabel} aria-checked={this.state.isSrc} tabIndex={tabIndex}
                type="radio" id="tab-1" name="tab-group-1" checked={this.state.isSrc}
                data-hook="htmlPluginFirstRadio" onChange={this.changeIsSrc}
              />
              {sourceLabel}
            </label>

            <div className={Styles.content}>
              <input type="text" value={this.state.src} id="src" data-hook="htmlPluginFirstInput" onChange={this.changeSrc} tabIndex={tabIndex}/>
            </div>
          </div>

          <div className={Styles.tab}>
            <label htmlFor="tab-2">
              <input
                aria-label={codeLabel} aria-checked={!this.state.isSrc} tabIndex={tabIndex}
                type="radio" id="tab-2" name="tab-group-1" checked={!this.state.isSrc}
                data-hook="htmlPluginSecondRadio" onChange={this.changeIsContent}
              />
              {codeLabel}
            </label>

            <div className={Styles.content}>
              <textarea
                tabIndex={tabIndex} value={this.state.content}
                id="htmlPluginTextarea" data-hook="htmlPluginTextarea" onChange={this.changeContent}
              />
            </div>
          </div>
        </div>
        <div>
          <input
            tabIndex={tabIndex} type="button" data-hook="htmlPluginButton"
            onClick={this.updateContent} aria-label={updateLabel} value={updateLabel}
          />
        </div>
      </div>
    );
  };
}

EditModal.propTypes = {
  store: PropTypes.object.isRequired,
  helpers: PropTypes.object,
  componentData: PropTypes.object.isRequired,
  componentState: PropTypes.object.isRequired,
  t: PropTypes.func,
  tabIndex: PropTypes.number,
};

export default EditModal;
