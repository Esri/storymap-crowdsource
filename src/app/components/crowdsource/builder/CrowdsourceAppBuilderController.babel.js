import $ from 'jquery';
import React from 'react'; //eslint-disable-line no-unused-vars
import EventsEmitter from 'lib/eventEmitter/EventEmitter';
import AppDataStore from 'babel/stores/AppDataStore';
import PortalStore from 'babel/stores/PortalStore';
import CrowdsourceBuilderAppStore from 'babel/stores/CrowdsourceBuilderAppStore';
import IconTooltip from 'babel/components/helper/tooltip/IconTooltip';
import builderText from 'i18n!translations/builder/nls/template';
// import {Components} from 'babel/constants/CrowdsourceAppConstants';
// import {Events} from 'babel/constants/CrowdsourceAppConstants';

export const CrowdsourceAppController = class CrowdsourceAppController extends EventsEmitter {

  constructor(options) {
    super(options);

    this.onChange = this.onChange.bind(this);

    const defaults = {};

    this._settings = $.extend(true, {}, defaults, options);
  }

  get appState() {
    const settingsModal = this.getModalContent(CrowdsourceBuilderAppStore.settingsModal);
    const authorized = CrowdsourceBuilderAppStore.authorized;
    let hideBannerContent = false;

    if (settingsModal) {
      hideBannerContent = true;
    }
    if (!authorized) {
      hideBannerContent = true;
    }

    return {
      settingsModal,
      hideBannerContent
    };
  }

  mount() {
    // Add listeners
    AppDataStore.addChangeListener(this.onChange);
    PortalStore.addChangeListener(this.onChange);
    CrowdsourceBuilderAppStore.addChangeListener(this.onChange);
  }

  unmount() {
    // Remover listeners
    AppDataStore.removeChangeListener(this.onChange);
    PortalStore.removeChangeListener(this.onChange);
    CrowdsourceBuilderAppStore.addChangeListener(this.onChange);
  }

  getModalContent(type) {
    switch (type) {
      case 'layout':
        const layouts = builderText.settingsModals.layout.selection;

        return {
          classNames: ['layout'],
          headerStyle: {
            backgroundSize: 'auto',
            backgroundRepeat: 'repeat-x',
            backgroundImage: 'url(resources/images/builder/builder-banner-background.png)'
          },
          title: (
            <div className="container-fluid">
              <div className="row">
                <h4 className="title col-xs-12">
                  {builderText.settingsModals.layout.welcome} <strong>{builderText.common.appName}</strong> {builderText.common.appNameAppend}
                </h4>
              </div>
            </div>
          ),
          body: (
            <div className="container-fluid">
              <div className="row">
                <h5 className="col-xs-12">
                  {builderText.settingsModals.layout.header + ' '}
                  <IconTooltip content={builderText.settingsModals.layout.headerHint} placement="right" />
                </h5>
              </div>
              {Object.keys(layouts).map((layout,index) => {
                const layoutImg = 'resources/images/builder/layouts/' + layout + '.jpg';
                const altText = layouts[layout].name + ' ' + builderText.settingsModals.layout.commonAltText;

                return (
                  <div className="layout-option row" key={index}>
                    <div className="col-xs-12 col-md-5">
                      <img className="layout-thumbnail" alt={altText} src={layoutImg} />
                    </div>
                    <div className="col-xs-12 col-md-7">
                      <h4 className="layout-name">{layouts[layout].name}</h4>
                      <p className="layout-description">{layouts[layout].description}</p>
                      <a href="http://www.example.com" className="btn btn-link btn-sm" target="_blank">{builderText.settingsModals.layout.preview}</a>
                    </div>
                  </div>
                );
              })}
            </div>
          ),
          footer: <button type="button" className="btn btn-primary">{builderText.common.buttons.next}</button>
        };
      default:
        return false;
    }
  }

  onChange(type) {
    switch (type) {
      default:
        const state = this.appState;

        this.emit('state-change',state);
    }
  }

};

export default CrowdsourceAppController;
