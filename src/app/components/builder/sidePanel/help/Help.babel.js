import $ from 'jquery';
import React from 'react';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import Helper from 'babel/utils/helper/Helper';
import builderText from 'i18n!translations/builder/nls/template';
import viewerText from 'i18n!translations/viewer/nls/template';
import 'babel/utils/helper/strings/StringUtils';

export default class SidePanelHelp extends React.Component {

  constructor() {
    super();

    // Autobind methods
    this.getTempatedString = this.getTempatedString.bind(this);
  }

  getTempatedString(options) {
    const defaults = {
      bold: [],
      links: [],
      string: ''
    };
    const settings = $.extend(true,{},defaults,options);

    let templates = [];

    Object.keys(settings.bold).forEach((current) => {
      templates.push({
        string: '<% ' + current + ' %>',
        replace: '<strong>' + settings.bold[current] + '</strong>'
      });
    });

    Object.keys(settings.links).forEach((current) => {
      let link = '';

      switch (current) {
        case 'galleryLink':
          link = 'https://storymaps.arcgis.com/en/app-list/crowdsource/gallery/#s=0&md=storymaps-apps:crowdsource';
          break;
        case 'twitterFollowLink':
          link = 'https://twitter.com/EsriStoryMaps';
          break;
        case 'geonet':
          link = 'http://links.esri.com/storymaps/forum';
          break;
        case 'github':
          link = 'https://github.com/Esri/story-map-crowdsource';
          break;
        case 'map':
          link = this.props.webmapLink;
          break;
        case 'agoCredits':
          link = 'https://www.esri.com/software/arcgis/arcgisonline/credits';
          break;
        case 'formEditBlog':
          link = 'https://developerscorner.storymaps.arcgis.com/how-to-personalize-your-crowdsource-story-even-more-a9ccfef11af3';
          break;
      }

      templates.push({
        string: '<% ' + current + ' %>',
        replace: '<a href="' + link + '" target="_blank">' + settings.links[current] + '</a>'
      });
    });

    return settings.string.templateString({templates});
  }

  render() {
    const settingsClasses = Helper.classnames([this.props.className,this.props.classNames,'side-panel','help','container-fluid']);
    const closeBtnClasses = Helper.classnames(['btn','btn-primary','btn-block','close-btn']);

    return (
      <div className={settingsClasses}>
        <div className="close-button-wrapper">
          <button type="button" className="close-btn btn text-btn" aria-label="Close" onClick={this.props.closeAction}>
            <span aria-hidden="true" dangerouslySetInnerHTML={{__html: getIcon('close')}}></span>
          </button>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <h2>
              <span className="main">{builderText.help.title}</span>
            </h2>
            {builderText.help.sections.map((currentSection) => {
              return (
                <div className="help-section" key={currentSection.title}>
                  <h4>{currentSection.title}</h4>
                  {currentSection.paragraphs ? (
                    currentSection.paragraphs.map((paragraph) => {
                      return <p key={currentSection.title + '_' + paragraph.slice(0,15).toCamelCase()} dangerouslySetInnerHTML={{__html: this.getTempatedString({
                        bold: currentSection.bold,
                        links: currentSection.links,
                        string: paragraph
                      })}}></p>;
                    })
                  ) : null}
                  {currentSection.questions ? (
                    currentSection.questions.map((question) => {
                      return (
                        <div className="question-wrapper" key={currentSection.title + '_' + question.question.slice(0,15).toCamelCase()}>
                          <h6>{question.question}</h6>
                          <p dangerouslySetInnerHTML={{__html: this.getTempatedString({
                            bold: currentSection.bold,
                            links: currentSection.links,
                            string: question.response
                          })}}></p>
                        </div>
                      );
                    })
                  ) : null}
                </div>
              );
            })}
            <button type="button" className={closeBtnClasses} onClick={this.props.closeAction}>
              { viewerText.common.buttons.close }
            </button>
          </div>
        </div>
      </div>
    );
  }
}
 SidePanelHelp.propTypes = {
  webmapLink: React.PropTypes.string,
  closeAction: React.PropTypes.func
};
 SidePanelHelp.defaultProps = {
   webmapLink: '',
   closeAction: () => {}
};
