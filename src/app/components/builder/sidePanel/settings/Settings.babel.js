import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import componentNames from 'babel/constants/componentNames/ComponentNames';
import builderText from 'i18n!translations/builder/nls/template';
import viewerText from 'i18n!translations/viewer/nls/template';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class SidePanelSettings extends React.Component {

  constructor() {
    super();

    // Autobind methods
    this.changeSettingsPane = this.changeSettingsPane.bind(this);
    this.goToNext = this.goToNext.bind(this);
  }

  componentDidMount() {
    if (!this.getVisibleSettingsPane()) {
      this.changeSettingsPane(this.props.settingsPanes[0].id);
    }
  }

  componentDidUpdate(prevProps) {
    const add = this.props.visibleComponents.filter((current) => {
      return current.search(componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH) >= 0 &&
      prevProps.visibleComponents.indexOf(current) < 0;
    });
    const remove = prevProps.visibleComponents.filter((current) => {
      return current.search(componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH) >= 0 &&
      this.props.visibleComponents.indexOf(current) >= 0;
    });

    if (add.length > 0) {
      remove.forEach((current) => {
        this.props.hideComponent(current);
      });
    }
  }

  componentWillUnmount() {
    this.props.hideComponentByString(componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH);
  }

  getVisibleSettingsPane() {
    return this.props.visibleComponents.filter((fC) => {
      return fC.search(componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH) >= 0;
    })[0];
  }

  changeSettingsPane(settingsPane) {
    this.props.showComponent(componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH + settingsPane);
  }

  goToNext() {
    const ids = this.props.settingsPanes.reduce((prev,current) => {
      return prev.concat(current.id);
    },[]);
    const visiblePane = this.getVisibleSettingsPane();
    const selectedPane = this.props.settingsPanes.filter((current) => {
      return componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH + current.id === visiblePane;
    })[0];

    if (ids.indexOf(selectedPane.id) === this.props.settingsPanes.length - 1) {
      this.changeSettingsPane(ids[0]);
    } else {
      this.changeSettingsPane(ids[ids.indexOf(selectedPane.id) + 1]);
    }
  }

  render() {
    const settingsClasses = Helper.classnames([this.props.className,this.props.classNames,'side-panel','settings','container-fluid']);
    const nextBtnClasses = Helper.classnames(['btn','btn-success','btn-block','close-btn']);
    const closeBtnClasses = Helper.classnames(['btn','btn-primary','btn-block','close-btn']);

    const ids = this.props.settingsPanes.reduce((prev,current) => {
      return prev.concat(current.id);
    },[]);
    const visiblePane = this.getVisibleSettingsPane();
    const selectedPane = this.props.settingsPanes.filter((current) => {
      return componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH + current.id === visiblePane;
    })[0];

    return (
      <div className={settingsClasses}>
        <div className="close-button-wrapper">
          <button type="button" className="close-btn btn text-btn" aria-label="Close" onClick={this.props.closeAction}>
            <span aria-hidden="true" dangerouslySetInnerHTML={{__html: getIcon('close')}}></span>
          </button>
        </div>
          { selectedPane ? (
          <div className="row">
            <div className="col-xs-12">
              <div className="dropdown settings-selector">
                <button type="button" className="text-btn dropdown-toggle" data-toggle="dropdown">
                  <h2>
                    <span className="main">{builderText.settings.title}</span>
                    <span className="selected text-primary">{selectedPane.title}<span className="caret"></span></span>
                  </h2>
                </button>
                <ul className="dropdown-menu">
                  {this.props.settingsPanes.map((current) => {
                    if (current.title === selectedPane.title) {
                      return <li className="active" key={'selector_' + current.id} onClick={this.changeSettingsPane.bind(this,current.id)}><a href="#">{current.title}</a></li>;
                    } else {
                      return <li key={'selector_' + current.id} onClick={this.changeSettingsPane.bind(this,current.id)}><a href="#">{current.title}</a></li>;
                    }
                  })}
                </ul>
              </div>
              <ReactCSSTransitionGroup
                className="inner-settings"
                component="div"
                transitionName="side-panel-settings"
                transitionEnter={false}
                transitionLeave={false}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                {this.props.settingsPanes.map((current) => {
                  if (current.id === selectedPane.id) {
                    return <div key={current.id} className="settingsPane">
                      {current.component}
                    </div>;
                  }
                })}
              </ReactCSSTransitionGroup>
              <button type="button" className={nextBtnClasses} onClick={this.goToNext}>
                { ids.indexOf(selectedPane.id) === this.props.settingsPanes.length - 1 ? builderText.settings.buttons.backTo + ' ' + this.props.settingsPanes[0].title : builderText.common.buttons.next }
              </button>
              <button type="button" className={closeBtnClasses} onClick={this.props.closeAction}>
                { viewerText.common.buttons.close }
              </button>
            </div>
          </div>
        ) : null }
      </div>
    );
  }
}

SidePanelSettings.propTypes = {
  closeAction: React.PropTypes.func,
  hideComponentByString: React.PropTypes.func,
  hideComponent: React.PropTypes.func,
  showComponent: React.PropTypes.func,
  settingsPanes: React.PropTypes.array,
  visibleComponents: React.PropTypes.array
};

SidePanelSettings.defaultProps = {
  closeAction: () => {},
  hideComponentByString: () => {},
  hideComponent: () => {},
  showComponent: () => {},
  settingsPanes: [],
  visibleComponents: []
};
