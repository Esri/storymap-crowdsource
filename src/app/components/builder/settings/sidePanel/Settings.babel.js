import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import componentNames from 'babel/constants/componentNames/ComponentNames';
import builderText from 'i18n!translations/builder/nls/template';
import viewerText from 'i18n!translations/viewer/nls/template';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class SidePanelSettings extends React.Component {

  constructor() {
    super();
  }

  componentDidMount() {
    if (!this.getVisibleSettingsPane()) {
      this.changeSettingsPane(this.props.settingsPanes[0].id);
    }
  }

  getVisibleSettingsPane() {
    return this.props.visibleComponents.filter((fC) => {
      return fC.search(componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH) >= 0;
    })[0];
  }

  changeSettingsPane(settingsPane) {
    this.props.hideComponentByString(componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH);
    this.props.showComponent(componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH + settingsPane);
  }

  render() {
    const settingsClasses = Helper.classnames([this.props.className,this.props.classNames,'side-panel','settings','container-fluid']);
    const closeBtnClasses = Helper.classnames(['btn','btn-default','btn-block','close-btn']);

    const visiblePane = this.getVisibleSettingsPane();
    const selectedPane = this.props.settingsPanes.filter((current) => {
      return componentNames.SIDE_PANEL_SETTINGS_STRING_MATCH + current.id === visiblePane;
    })[0];

    return (
      <div className={settingsClasses}>
          { selectedPane ? (
          <div className="row">
            <div className="col-xs-12">
              <h2 className="text-primary">{builderText.settings.title}</h2>
              <div className="dropdown settings-selector">
                <button type="button" className="text-btn dropdown-toggle" data-toggle="dropdown">
                  <h4>{selectedPane.title}<span className="caret"></span></h4>
                </button>
                <ul className="dropdown-menu">
                  {this.props.settingsPanes.map((current) => {
                    if (current.title !== selectedPane.title) {
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
  showComponent: React.PropTypes.func,
  settingsPanes: React.PropTypes.array,
  visibleComponents: React.PropTypes.array
};

SidePanelSettings.defaultProps = {
  closeAction: () => {},
  hideComponentByString: () => {},
  showComponent: () => {},
  settingsPanes: [],
  visibleComponents: []
};
