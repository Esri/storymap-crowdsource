import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import builderText from 'i18n!translations/builder/nls/template';
import viewerText from 'i18n!translations/viewer/nls/template';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class SidePanelSettings extends React.Component {

  constructor() {
    super();
  }

  render() {
    const settingsClasses = Helper.classnames([this.props.className,this.props.classNames,'side-panel','settings','container-fluid']);
    const closeBtnClasses = Helper.classnames(['btn','btn-default','btn-block','close-btn']);

    const selectedPane = this.props.settingsPanes.filter((current) => {
      return current;
    })[0];

    return (
      <div className={settingsClasses}>
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
                    return current.title;
                  }
                })}
              </ul>
            </div>
            <ReactCSSTransitionGroup
              className="inner-settings"
              component="div"
              transitionName="side-panel-settings"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              {selectedPane.component}
            </ReactCSSTransitionGroup>
            <button type="button" className={closeBtnClasses} onClick={this.props.closeAction}>
              { viewerText.common.buttons.close }
            </button>
          </div>
        </div>
      </div>
    );
  }
}

SidePanelSettings.propTypes = {
  closeAction: React.PropTypes.func,
  settingsPanes: React.PropTypes.array
};

SidePanelSettings.defaultProps = {
  closeAction: () => {},
  settingsPanes: []
};
