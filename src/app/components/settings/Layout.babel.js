import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import IconTooltip from 'babel/components/helper/tooltip/IconTooltip';
import builderText from 'i18n!translations/builder/nls/template';
import BuilderAction from 'babel/actions/BuilderActions';

export const SettingsLayout = class SettingsLayout extends React.Component {

  constructor(props) {
    super(props);

    this.selectLayout = this.selectLayout.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);
  }

  render() {
    const layouts = builderText.settingsModals.layout.selection;
    const selectedIcon = getIcon('selected');
    const selectedIconHtml = {
      __html: selectedIcon
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <h5 className="col-xs-12">
            {builderText.settingsModals.layout.header}
            {this.props.alwaysChangeHint ? <IconTooltip className="always-change-hint" content={builderText.settingsModals.layout.headerHint} placement="right" /> : null}
          </h5>
        </div>
        {Object.keys(layouts).map((layout,index) => {
          const layoutClasses = Helper.classnames(['layout-option','row'],{
            selected: layout === this.props.selected
          });
          const layoutImg = 'resources/images/builder/layouts/' + layout + '.png';
          const altText = layouts[layout].name + ' ' + builderText.settingsModals.layout.commonAltText;

          return (
            <div className={layoutClasses} key={index} onClick={this.selectLayout.bind(this,layout)}>
              <div className="col-xs-12 col-md-5">
                <div className="selected-icon" dangerouslySetInnerHTML={selectedIconHtml}></div>
                <img className="layout-thumbnail" alt={altText} src={layoutImg} />
              </div>
              <div className="col-xs-12 col-md-7">
                <h4 className="layout-name">{layouts[layout].name}</h4>
                <p className="layout-description">{layouts[layout].description}</p>
              <a href="http://www.example.com" className="view-live btn btn-link btn-sm" target="_blank" onClick={this.stopPropagation}>{builderText.settingsModals.layout.preview}</a>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  selectLayout(layout) {
    BuilderAction.updateAppData('values.layout.id',layout);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

};

SettingsLayout.propTypes = {
  alwaysChangeHint: React.PropTypes.bool,
  selected: React.PropTypes.string
};

SettingsLayout.defaultProps = {
  alwaysChangeHint: false,
  selected: ''
};

export default SettingsLayout;
