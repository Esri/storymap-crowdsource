import React from 'react';
import Helper from 'babel/utils/helper/Helper';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';
import ThumbnailGalleryController from 'babel/components/gallery/ThumbnailGalleryController';

export const ThumbnailGallery = class ThumbnailGallery extends React.Component {

  constructor(props) {
    super(props);

    this._galleryController = new ThumbnailGalleryController();
    this._galleryController.on('resize',(tileSettings) => {
      this.setState({tileSettings: tileSettings});
    });
    this.state = {
      tileSettings: this._galleryController.getTileSettings()
    };
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
              const photoUrl = this.props.thumbnailUrlPrepend + 'http://pipsum.com/300x300.jpg?' + (index % 20) +/*attr[this.props.thumbnailKey]*/ + this.props.thumbnailUrlAppend;
              const itemStyle = {
                height: this.state.tileSettings.tileSize,
                width: endTile ? this.state.tileSettings.tileSize - 0.1 : this.state.tileSettings.tileSize
              };

              return (
                <li className="gallery-item" key={attr[this.props.idKey]} style={itemStyle} data-thumbnail={photoUrl}>
                  <LazyImage className="background-image" src={photoUrl}></LazyImage>
                  <div className="info-card">
                    <h6>{attr[this.props.titleKey]}</h6>
                    <p>{attr[this.props.locationKey]}</p>
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
  idKey: React.PropTypes.string,
  itemAttributePath: React.PropTypes.string,
  items: React.PropTypes.array,
  locationKey: React.PropTypes.string,
  size: React.PropTypes.number,
  titleKey: React.PropTypes.string,
  thumbnailKey: React.PropTypes.string,
  thumbnailUrlPrepend: React.PropTypes.string,
  thumbnailUrlAppend: React.PropTypes.string
};

ThumbnailGallery.defaultProps = {
  idKey: 'FID',
  itemAttributePath: '',
  items: [],
  locationKey: 'location',
  size: 200,
  titleKey: 'title',
  thumbnailKey: 'thumbnail',
  thumbnailUrlPrepend: '',
  thumbnailUrlAppend: ''
};

export default ThumbnailGallery;
