import React from 'react'; // eslint-disable-line no-unused-vars
import Deferred from 'dojo/Deferred';
import Helper from 'babel/utils/helper/Helper';
import {getIcon} from 'babel/utils/helper/icons/IconGenerator';
import FormGroup from 'babel/components/forms/base/FormGroup';
import ViewerText from 'i18n!translations/viewer/nls/template';
import SmartCrop from 'lib/smartcrop/smartcrop';
import 'lib/resample-hermite/hermite';
import 'lib/cropperjs/dist/cropper';
import 'lib/loader/dist/loader';

export default class Photo extends FormGroup {

  constructor(props) {
    super(props);

    this.input = {
      value: false
    };

    this.fileChange = this.fileChange.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.resetPicker = this.resetPicker.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.rotateLeft = this.rotateLeft.bind(this);
    this.rotateRight = this.rotateRight.bind(this);
    this.loadImageFromFile = this.loadImageFromFile.bind(this);
    this.saveCropValue = this.saveCropValue.bind(this);
  }

  componentDidUpdate(prevProps,prevState) {// eslint-disable-line no-unused-vars
    if (this.state.imageUrl && !this.cropper) {
      this.createCropper();
    } else if (this.state.imageUrl && (!prevState.imageUrl || prevState.imageUrl !== this.state.imageUrl)) {
      this.cropper.replace(this.state.imageUrl);
    }
    this.validator.setValidations(this.getValidations());
    this.updateValue();
  }

  componentWillUnmount() {
    if (this.cropper) {
      this.cropper.destroy();
    }
  }

  render() {

    const inputClasses = Helper.classnames([this.props.className,'photo-input','form-group',{
      'required': this.props.required,
      'has-error': !this.state.isValid,
      'cropping': this.state.imageUrl ? true : false
    }]);

    const uploaderClasses = Helper.classnames([this.props.className,'uploader','alert',{
      'alert-default': !this.state.dragging,
      'alert-info': this.state.dragging
    }]);

    return (
      <div className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        <div className={uploaderClasses} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}>
          <h6>
            {this.props.placeholder}
            <br></br>
            {ViewerText.common.or}
          </h6>
          <button type="button" className="btn btn-default btn-file" onBlur={this.onBlur}>
            {ViewerText.contribute.photo.pickFile}
            <input id={this.props.id} {...this.props.inputAttr} tabIndex="-1" onChange={this.fileChange}></input>
          </button>
        </div>
        <div className="cropper-pane">
          <div className="btn-toolbar photo-controls" role="toolbar">
            <div className="btn-group zoom-group" role="group">
              <button type="button" className="btn btn-default" dangerouslySetInnerHTML={this.getIconHtml('zoom-in')} onClick={this.zoomIn}></button>
              <button type="button" className="btn btn-default" dangerouslySetInnerHTML={this.getIconHtml('zoom-out')} onClick={this.zoomOut}></button>
            </div>
            <div className="btn-group rotate-group" role="group">
              <button type="button" className="btn btn-default" dangerouslySetInnerHTML={this.getIconHtml('rotate-right')} onClick={this.rotateRight}></button>
              <button type="button" className="btn btn-default" dangerouslySetInnerHTML={this.getIconHtml('rotate-left')} onClick={this.rotateLeft}></button>
            </div>
          </div>
          <img ref={(ref) => this.imagePreview = ref} src={this.state.imageUrl} alt=""></img>
          <div className="alert alert-default">
            <button type="button" className="btn btn-default btn-block" onClick={this.resetPicker}>
              {ViewerText.contribute.photo.selectNew}
            </button>
          </div>
        </div>
        {this.getErrorMessage ? this.getErrorMessage() : null}
      </div>
    );

  }

  getIconHtml(icon) {
    return {__html: getIcon(icon)};
  }

  fileChange(e) {
    const files = e.target.files;

    if (files && files.length) {
      this.loadImageFromFile(files[0]);
    }
  }

  onDragOver(e) {
    e.preventDefault();
		e.stopPropagation();
    this.setState({
      dragging: true
    });
  }

  onDragLeave(e) {
    e.preventDefault();
		e.stopPropagation();
    this.setState({
      dragging: false
    });
  }

  onDrop(e) {
    this.setState({
      dragging: false
    });
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
			e.preventDefault();
			e.stopPropagation();
      this.loadImageFromFile(e.dataTransfer.files[0]);
		}
  }

  loadImageFromFile(file) {
    const self = this;
    let image;
    let URL = window.URL || window.webkitURL;

    if (URL) {
      image = new Image();

      image.onload = function () {
        this.onload = null;
        URL.revokeObjectURL(file);
      };

      image.src = URL.createObjectURL(file);

      return new window.Loader(image,{
        minWidth: 500,
        minHeight: 500,
        maxWidth: 2000,
        maxHeight: 2000,
        done: function(newImg) {
          self.setState({
            imageUrl: newImg.src
          });
        }
      });
    }
  }

  createCropper() {
    this.cropper = new window.Cropper(this.imagePreview, {
      dragMode: 'crop',
      guides: true,
      center: false,
      highlight: false,
      zoomOnWheel: false,
      built: this.saveCropValue,
      cropend: this.saveCropValue
    });
  }

  zoomIn() {
    if (this.cropper) {
      this.cropper.zoom(0.1);
      this.saveCropValue;
    }
  }

  zoomOut() {
    if (this.cropper) {
      this.cropper.zoom(-0.1);
      this.saveCropValue;
    }
  }

  rotateLeft() {
    if (this.cropper) {
      this.cropper.rotate(-90);
      this.saveCropValue;
    }
  }

  rotateRight() {
    if (this.cropper) {
      this.cropper.rotate(90);
      this.saveCropValue;
    }
  }

  resetPicker() {
    this.input.value = false;
    this.setState({
      imageUrl: ''
    });
    this.validateForm();
  }

  saveCropValue() {
    this.input.value = false;
    clearTimeout(this.cropDelay);
    this.cropDelay = setTimeout(() => {
      const canvas = this.cropper.getCroppedCanvas({
        fillColor: '#000'
      });

      const optimizeSize = 1000;
      const thumbnailSize = 200;

      const value = this.generateOptimizedPhotos(canvas,optimizeSize,thumbnailSize);

      if (value.then) {
        value.then((res) => {
          this.input.value = res;
          this.validateForm();
        });
      } else {
        this.input.value = value;
        this.validateForm();
      }
    },500);
  }

  generateOptimizedPhotos(canvas,optimizedSize,thumbnailSize) {
    const originalHeight = canvas.height;
    const originalWidth = canvas.width;
    const aspectRatio = originalHeight / originalWidth;
    const optimizedHeight = Math.floor(aspectRatio < 1 ? optimizedSize : (optimizedSize * aspectRatio));
    const optimizedWidth = Math.floor(aspectRatio < 1 ? (optimizedSize / aspectRatio) : optimizedSize);
    const optimizedCanvas = document.createElement('canvas');
    const optimizedContext = optimizedCanvas.getContext('2d');

    optimizedCanvas.width = canvas.width;
    optimizedCanvas.height = canvas.height;
    optimizedContext.drawImage(canvas, 0, 0);
    window.resample_hermite(optimizedCanvas,originalWidth,originalHeight,optimizedWidth,optimizedHeight);

    if (thumbnailSize && this.props.extras && this.props.extras.storeAsThumbnail) {
      const dfd = new Deferred();
      const thumbnailResizeCanvas = document.createElement('canvas');
      const thumbnailResizeContext = thumbnailResizeCanvas.getContext('2d');
      const thumbnailResizeHeight = Math.floor(aspectRatio < 1 ? thumbnailSize : (thumbnailSize * aspectRatio));
      const thumbnailResizeWidth = Math.floor(aspectRatio < 1 ? (thumbnailSize / aspectRatio) : thumbnailSize);

      thumbnailResizeCanvas.width = optimizedCanvas.width;
      thumbnailResizeCanvas.height = optimizedCanvas.height;
      thumbnailResizeContext.drawImage(optimizedCanvas, 0, 0);
      window.resample_hermite(thumbnailResizeCanvas,optimizedWidth,optimizedHeight,thumbnailResizeWidth,thumbnailResizeHeight);

      SmartCrop.crop(thumbnailResizeCanvas,{
        width: thumbnailSize,
        height: thumbnailSize
      },(cropResult) => {
        const thumbnailCanvas = document.createElement('canvas');
        const thumbnailContext = thumbnailCanvas.getContext('2d');

        thumbnailCanvas.width = thumbnailSize;
        thumbnailCanvas.height = thumbnailSize;
        thumbnailContext.drawImage(thumbnailResizeCanvas, cropResult.topCrop.x, cropResult.topCrop.y,thumbnailSize,thumbnailSize,0,0,thumbnailSize,thumbnailSize);

        dfd.resolve({
          optimized: optimizedCanvas.toDataURL(),
          thumbnail: thumbnailCanvas.toDataURL()
        });
      });
      return dfd;
    } else {
      return {
        optimized: optimizedCanvas.toDataURL()
      };
    }
  }

}
