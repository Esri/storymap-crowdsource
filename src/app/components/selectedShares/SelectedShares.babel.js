import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';
import Autolinker from 'babel/components/helper/autolinker/Autolinker';
import viewerText from 'i18n!translations/viewer/nls/template';
import builderText from 'mode!isBuilder?i18n!translations/builder/nls/template';

export default class SelectedShares extends React.Component {

  constructor(props) {
    super(props);

    // autobind methods
    this.getMedia = this.getMedia.bind(this);
    this.getFieldLayout = this.getFieldLayout.bind(this);
  }

  render() {

    const mainClasses = Helper.classnames([this.props.className,this.props.classNames,
      'selected-shares'
    ]);

    const closeBtnClasses = Helper.classnames(['btn','btn-primary','btn-block','close-btn']);

    return (
      <div className={mainClasses}>
        <div className="close-button-wrapper">
          <button type="button" className="close" aria-label="Close" onClick={this.props.closeAction}>
            <span aria-hidden="true" dangerouslySetInnerHTML={{__html: '&times;'}}></span>
          </button>
        </div>
        <ul className="cards-list">
          {this.props.items.map((current) => {

            const attributes = current[this.props.attributePath];

            return (
              <li key={attributes[this.props.idField]}>
                <article className="card">
                  { this.getMedia(current) }
                  <div className="info-section">
                    <h4 className="share-title">{attributes[this.props.primaryField]}</h4>
                    <p><small className="share-location">{attributes[this.props.secondaryField]}</small></p>
                  { this.props.displayOrder.map(this.getFieldLayout.bind(this,attributes))}
                  </div>
                  {this.props.reviewEnabled ? (
                    <div className="review-section bg-info">
                      <h6 className="review-header">{builderText.review.selectedShare.header}</h6>
                      <div className="btn-group">
                        <button type="button" className={Helper.classnames(['btn'],{
                            'btn-default': attributes[this.props.vettedField] !== 1,
                            'btn-primary': attributes[this.props.vettedField] === 1
                          })} onClick={this.props.approveAction.bind(null,attributes[this.props.idField])}>{viewerText.selectedShares.review.options.approve}</button>
                        <button type="button" className={Helper.classnames(['btn'],{
                            'btn-default': attributes[this.props.vettedField] !== 2,
                            'btn-danger': attributes[this.props.vettedField] === 2
                          })} onClick={this.props.rejectAction.bind(null,attributes[this.props.idField])}>{viewerText.selectedShares.review.options.reject}</button>
                      </div>
                    </div>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ul>
        <button type="button" className={closeBtnClasses} onClick={this.props.closeAction}>
          { viewerText.common.buttons.close }
        </button>
      </div>
    );
  }

  getMedia(item) {
    const media = this.props.media;
    const attributes = item[this.props.attributePath];
    const fieldProps = this.props.fields.filter((current) => {
      return current.fieldID === media.field;
    })[0];

    switch (media.type) {
      case 'video':
        // add video
        break;
      default:
        let photoUrl;

        if (fieldProps.isAttachment) {
          const attachmentUrl = Helper.attachmentUtils.getAttachmentUrlsByStringMatch({
            layer: this.props.layer,
            feature: item,
            match: media.field,
            position: 0
          })[0] || '';

          photoUrl = Helper.attachmentUtils.checkForCredential({
            url: attachmentUrl,
            layer: this.props.layer
          });
        } else {
          photoUrl = Helper.attachmentUtils.checkForCredential({
            url: this.props.thumbnailUrlPrepend + attributes[media.field] + this.props.thumbnailUrlAppend,
            layer: this.props.layer
          });
        }

        return (
          <div className="media-section">
            <LazyImage className="media-photo"
              autoSizeDiv={true}
              src={photoUrl}>
            </LazyImage>
            {/*<div className="card-options">
              <button type="button" className="open-btn">{viewerText.selectedShares.enlargePhotoButton}</button>
            </div>*/}
          </div>
        );
    }
  }

  getFieldLayout(attributes,current) {

      if (typeof current === 'string') {
        const fieldClasses = Helper.classnames(['field-display', 'field-' + current]);
        const fieldProps = this.props.fields.filter((fCurrent) => {
          return fCurrent.fieldID === current;
        })[0];

        if (fieldProps && fieldProps.type === 'textarea') {
          return (<Autolinker key={current} className={fieldClasses} text={attributes[current]}></Autolinker>);
        } else {
          return (<p key={current} className={fieldClasses}>{attributes[current]}</p>);
        }
      }
  }

}

SelectedShares.propTypes = {
  reviewEnabled: React.PropTypes.bool,
  approveAction: React.PropTypes.func,
  rejectAction: React.PropTypes.func,
  closeAction: React.PropTypes.func,
  items: React.PropTypes.array,
  displayOrder: React.PropTypes.array,
  attributePath: React.PropTypes.string.isRequired,
  idField: React.PropTypes.string.isRequired,
  primaryField: React.PropTypes.string.isRequired,
  secondaryField: React.PropTypes.string.isRequired,
  vettedField: React.PropTypes.string,
  media: React.PropTypes.shape({
    type: React.PropTypes.string,
    field: React.PropTypes.string
  }),
  thumbnailUrlPrepend: React.PropTypes.string,
  thumbnailUrlAppend: React.PropTypes.string,
  layer: React.PropTypes.oneOfType([
    React.PropTypes.shape({
      url: React.PropTypes.string,
      credential: React.PropTypes.shape({
        server: React.PropTypes.string,
        token: React.PropTypes.string
      })
    }),
    React.PropTypes.bool
  ])
};

SelectedShares.defaultProps = {
  items: [],
  displayOrder: [],
  thumbnailUrlPrepend: '',
  thumbnailUrlAppend: '',
  reviewEnabled: false,
  approveAction: () => {},
  rejectAction: () => {},
  closeAction: () => {}
};
