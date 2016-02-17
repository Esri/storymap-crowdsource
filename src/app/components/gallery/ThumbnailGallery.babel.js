import React from 'react';
import ReactDOM from 'reactDom';
import URI from 'lib/urijs/src/URI';
import lang from 'dojo/_base/lang';
import Helper from 'babel/utils/helper/Helper';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';
import ThumbnailGalleryController from 'babel/components/gallery/ThumbnailGalleryController';

export const ThumbnailGallery = class ThumbnailGallery extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tileSettings: {}
    };
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);

    this._controller = new ThumbnailGalleryController({
      node
    });
    this._controller.on('resize',(tileSettings) => {
      this.setState({tileSettings: tileSettings});
    });
    this.setState({
      tileSettings: this._controller.tileSettings
    });
  }

  componentWillUnmount() {
    this._controller.unmount();
  }

  render() {

    const galleryClass = Helper.classnames([this.props.className, {
      'thumbnail-gallery': true
    }]);

    return (
      <div className={galleryClass}>
        <ul className="gallery-list">
          {this.props.items.map((item,index) => {
              const attr = this.props.itemAttributePath ? Helper.objectUtils.getDescendentProperty(item,this.props.itemAttributePath) : item;
              const endTile = index % this.state.tileSettings.tilesPerRow === 0;
              const photoUrl = new URI(this.props.thumbnailUrlPrepend + attr[this.props.thumbnailKey] + this.props.thumbnailUrlAppend);
              const itemStyle = {
                height: this.state.tileSettings.tileSize,
                width: endTile ? this.state.tileSettings.tileSize - 0.1 : this.state.tileSettings.tileSize
              };

              // Append token to URL for private photo attachments
              if (lang.getObject('credential.token',false,this.props.layer)) {
                const serverURI = new URI(lang.getObject('credential.server',false,this.props.layer));
                const matchString = serverURI.host() + serverURI.path();
                const testPhotoString = photoUrl.host() + photoUrl.path();

                if (testPhotoString.match(matchString)) {
                  photoUrl.setSearch('token', lang.getObject('credential.token',false,this.props.layer));
                }
              }

              return (
                <li className="gallery-item" key={attr[this.props.idKey]} style={itemStyle} data-object-id={attr[this.props.idKey]} data-thumbnail={photoUrl}>
                  <LazyImage className="background-image" src={photoUrl.href()}></LazyImage>
                  <div className="info-card">
                    <h6>{attr[this.props.primaryKey]}</h6>
                    <p>{attr[this.props.secondaryKey]}</p>
                    <div className="background-fill"></div>
                  </div>
                </li>
              );
          })}
        </ul>
      </div>
    );

  }
};

ThumbnailGallery.propTypes = {
  items: React.PropTypes.array,
  itemAttributePath: React.PropTypes.string.isRequired,
  idKey: React.PropTypes.string.isRequired,
  primaryKey: React.PropTypes.string.isRequired,
  secondaryKey: React.PropTypes.string.isRequired,
  size: React.PropTypes.number.isRequired,
  thumbnailKey: React.PropTypes.string,
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

ThumbnailGallery.defaultProps = {
  items: [],
  size: 200,
  thumbnailUrlPrepend: '',
  thumbnailUrlAppend: ''
};

export default ThumbnailGallery;
