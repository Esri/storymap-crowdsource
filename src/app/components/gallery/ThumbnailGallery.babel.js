import React from 'react';
import ReactDOM from 'reactDom';
import Helper from 'babel/utils/helper/Helper';
import InfiniteScroller from 'babel/components/helper/infiniteScroller/InfiniteScroller';
import LazyImage from 'babel/components/helper/lazyImage/LazyImage';
import ThumbnailGalleryController from 'babel/components/gallery/ThumbnailGalleryController';

export const ThumbnailGallery = class ThumbnailGallery extends React.Component {

  constructor(props) {
    super(props);

    // Autobind methods
    this.onSelect = this.onSelect.bind(this);
    this.onHighlight = this.onHighlight.bind(this);
    this.galleryItemRender = this.galleryItemRender.bind(this);

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
      'selection': this.props.selected || this.props.selected === 0
    }]);

    return (
      <div className={galleryClass} onClick={this.onSelect.bind(null,false)}>

        <InfiniteScroller
          className="gallery-list"
          transitionProps={{component: 'ul'}}
          type="grid"
          itemRenderMethod={this.galleryItemRender}
          elementHeight={this.state.tileSettings.tileSize}
          elementsPerRow={this.state.tileSettings.tilesPerRow}>
          {/*{this.GalleryItems}*/}
          {this.props.items}
        </InfiniteScroller>
      </div>
    );

  }

  galleryItemRender(item,index) {
    const attr = this.props.attributePath ? Helper.objectUtils.getDescendentProperty(item,this.props.attributePath) : item;
    const endTile = index % this.state.tileSettings.tilesPerRow === 0;
    let photoUrl;

    if (this.props.thumbnailIsAttachment) {
      const attachmentUrl = Helper.attachmentUtils.getAttachmentUrlsByStringMatch({
        layer: this.props.layer,
        feature: item,
        match: this.props.thumbnailField,
        position: 0
      })[0] || '';

      photoUrl = Helper.attachmentUtils.checkForCredential({
        url: attachmentUrl,
        layer: this.props.layer
      });
    } else {
      photoUrl = Helper.attachmentUtils.checkForCredential({
        url: this.props.thumbnailUrlPrepend + attr[this.props.thumbnailField] + this.props.thumbnailUrlAppend,
        layer: this.props.layer
      });
    }

    const itemStyle = {
      height: this.state.tileSettings.tileSize,
      width: endTile ? this.state.tileSettings.tileSize - 0.5 : this.state.tileSettings.tileSize
    };

    const itemClasses = Helper.classnames(['gallery-item', {
      selected: this.props.selected === attr[this.props.idField],
      highlighted: this.props.highlighted === attr[this.props.idField]
    }]);

    return (
      <li className={itemClasses}
        key={attr[this.props.idField]}
        style={itemStyle}
        onClick={this.onSelect.bind(null,attr[this.props.idField])}
        onMouseOver={this.props.isMobile ? null : this.onHighlight.bind(null,attr[this.props.idField])}
        onMouseOut={this.onHighlight.bind(null,false)}>
        <LazyImage className="background-image" src={photoUrl}></LazyImage>
        <div className="info-card background-fill">
          <h6>{attr[this.props.primaryField]}</h6>
        </div>
      </li>
    );
  }

  onSelect(selection,e) {
    e.stopPropagation();
    this.props.selectAction(selection);
    if (selection) {
      this.props.selectAction(selection);
    }
  }

  onHighlight(selection,e) {
    e.stopPropagation();
    this.props.highlightAction(selection);
    if (selection) {
      this.props.highlightAction(selection);
    }
  }
};

ThumbnailGallery.propTypes = {
  items: React.PropTypes.array,
  attributePath: React.PropTypes.string.isRequired,
  idField: React.PropTypes.string.isRequired,
  primaryField: React.PropTypes.string.isRequired,
  size: React.PropTypes.number.isRequired,
  thumbnailIsAttachment: React.PropTypes.bool,
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
  selected: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.bool
  ]),
  highlighted: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.bool
  ]),
  selectAction: React.PropTypes.func,
  highlightAction: React.PropTypes.func,
  isMobile: React.PropTypes.bool
};

ThumbnailGallery.defaultProps = {
  items: [],
  selected: false,
  highlighted: false,
  selectAction: () => {},
  highlightAction: () => {},
  size: 200,
  thumbnailIsAttachment: false,
  thumbnailUrlPrepend: '',
  thumbnailUrlAppend: ''
};

export default ThumbnailGallery;
