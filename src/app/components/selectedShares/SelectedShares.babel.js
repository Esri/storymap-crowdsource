import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';
import viewerText from 'i18n!translations/viewer/nls/template';

export default class SelectedShares extends React.Component {

  constructor(props) {
    super(props);

    // autobind methods
    this.getMedia = this.getMedia.bind(this);
  }

  render() {

    const mainClasses = Helper.classnames([this.props.className,this.props.classNames,
      'selected-shares'
    ]);

    const closeBtnClasses = Helper.classnames(['btn','btn-default','btn-block','close-btn']);

    return (
      <div className={mainClasses}>
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
                    { this.props.displayOrder.map((current) => {

                      if (typeof current === 'string') {
                        const fieldClasses = Helper.classnames(['field-display', 'field-' + current]);

                        return (<p key={current} className={fieldClasses}>{attributes[current]}</p>);
                      }

                    })}
                  </div>
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

    switch (media.type) {
      case 'video':
        // add video
        break;
      default:
        const photoUrl = Helper.attachmentUtils.checkForCredential({
          url: this.props.thumbnailUrlPrepend + attributes[media.field] + this.props.thumbnailUrlAppend,
          layer: this.props.layer
        });

        return (
          <div className="media-section">
            <LazyImage className="media-photo"
              autoSizeDiv={true}
              src={photoUrl}>
            </LazyImage>
            {/*<div className="card-options">
              <button type="button" className="open-btn" data-ember-action="501">{viewerText.selectedShares.enlargePhotoButton}</button>
            </div>*/}
          </div>
        );
    }
  }

}

SelectedShares.propTypes = {
  closeAction: React.PropTypes.func,
  items: React.PropTypes.array,
  displayOrder: React.PropTypes.array,
  attributePath: React.PropTypes.string.isRequired,
  idField: React.PropTypes.string.isRequired,
  primaryField: React.PropTypes.string.isRequired,
  secondaryField: React.PropTypes.string.isRequired,
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
  closeAction: () => {}
};
