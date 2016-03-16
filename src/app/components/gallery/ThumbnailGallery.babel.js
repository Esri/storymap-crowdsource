import React from 'react';
import ReactDOM from 'reactDom';
import Helper from 'babel/utils/helper/Helper';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';
import ThumbnailGalleryController from 'babel/components/gallery/ThumbnailGalleryController';

export const ThumbnailGallery = class ThumbnailGallery extends React.Component {

  constructor(props) {
    super(props);

    // Autobind methods
    this.onSelect = this.onSelect.bind(this);

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
      'thumbnail-gallery': true,
      'selection': this.props.selected.length > 0
    }]);

    return (
      <div className={galleryClass} onClick={this.onSelect.bind(null,false)}>
        <ul className="gallery-list">
          {this.props.items.map((item,index) => {
              const attr = this.props.attributePath ? Helper.objectUtils.getDescendentProperty(item,this.props.attributePath) : item;
              const endTile = index % this.state.tileSettings.tilesPerRow === 0;
              const photoUrl = Helper.attachmentUtils.checkForCredential({
                url: this.props.thumbnailUrlPrepend + attr[this.props.thumbnailField] + this.props.thumbnailUrlAppend,
                layer: this.props.layer
              });
              const itemStyle = {
                height: this.state.tileSettings.tileSize,
                width: endTile ? this.state.tileSettings.tileSize - 0.1 : this.state.tileSettings.tileSize
              };

              const itemClasses = Helper.classnames(['gallery-item', {
                selected: this.props.selected.indexOf(attr[this.props.idField]) >= 0
              }]);

              return (
                <li className={itemClasses} key={attr[this.props.idField]} style={itemStyle} onClick={this.onSelect.bind(null,attr[this.props.idField])} data-thumbnail={photoUrl}>
                  <LazyImage className="background-image" src={photoUrl}></LazyImage>
                  <div className="info-card background-fill">
                    <h6>{attr[this.props.primaryField]}</h6>
                    <p>{attr[this.props.secondaryField]}</p>
                  </div>
                </li>
              );
          })}
        </ul>
      </div>
    );

  }

  onSelect(selection,e) {
    e.stopPropagation();
    this.props.selectAction(selection);
    if (selection) {
      this.props.selectAction(selection);
    }
  }
};

ThumbnailGallery.propTypes = {
  items: React.PropTypes.array,
  attributePath: React.PropTypes.string.isRequired,
  idField: React.PropTypes.string.isRequired,
  primaryField: React.PropTypes.string.isRequired,
  secondaryField: React.PropTypes.string.isRequired,
  size: React.PropTypes.number.isRequired,
  thumbnailField: React.PropTypes.string,
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
  ]),
  selected: React.PropTypes.array,
  selectAction: React.PropTypes.func
};

ThumbnailGallery.defaultProps = {
  items: [],
  selected: [],
  selectAction: () => {},
  size: 200,
  thumbnailUrlPrepend: '',
  thumbnailUrlAppend: ''
};

export default ThumbnailGallery;
