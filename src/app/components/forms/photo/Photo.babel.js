import $ from 'jquery';
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
    this.generatePhotos = this.generatePhotos.bind(this);
    this.generateOptimizedPhoto = this.generateOptimizedPhoto.bind(this);
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

    const uploaderClasses = Helper.classnames([this.props.className,'drag-area','uploader','alert',{
      'alert-default': !this.state.dragging,
      'alert-info': this.state.dragging
    }]);

    const fileUploader = !navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i) && 'draggable' in document.createElement('span') && typeof(window.FileReader) !== 'undefined' ? (
      <div className={uploaderClasses} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}>
        <h6>
          {this.props.placeholder}
          <br></br>
          {ViewerText.common.or}
        </h6>
        <button type="button" className="btn btn-default btn-file" onBlur={this.onBlur}>
          {ViewerText.contribute.form.photo.pickFile}
          <input id={this.props.id} type="file" accept="image/*" capture={navigator.userAgent.match(/iPad|iPhone|iPod/g) ? 'camera' : false} tabIndex="-1" onChange={this.fileChange}></input>
        </button>
      </div>
    ) : (
      <button type="button" className="uploader btn btn-default btn-file btn-block" onBlur={this.onBlur}>
        {ViewerText.contribute.form.photo.choosePhoto}
        <input id={this.props.id} type="file" accept="image/*" capture={navigator.userAgent.match(/iPad|iPhone|iPod/g) ? 'camera' : false} tabIndex="-1" onChange={this.fileChange}></input>
      </button>
    );

    return (
      <div className={inputClasses}>
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        {fileUploader}
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
              {ViewerText.contribute.form.photo.selectNew}
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
      autoCropArea: 1,
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
      this.saveCropValue();
    }
  }

  zoomOut() {
    if (this.cropper) {
      this.cropper.zoom(-0.1);
      this.saveCropValue();
    }
  }

  rotateLeft() {
    if (this.cropper) {
      this.cropper.rotate(-90);
      this.saveCropValue();
    }
  }

  rotateRight() {
    if (this.cropper) {
      this.cropper.rotate(90);
      this.saveCropValue();
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

      const value = this.generatePhotos(canvas);

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

  generatePhotos(canvas) {
    const value = {};

    if (this.props.extras && this.props.extras.photoSettings) {
      if ($.isArray(this.props.extras.photoSettings) && this.props.extras.photoSettings.length > 0) {
        let dfd = false;
        let self = this;
        const isFinished = function isFinished() {
          let finished = true;
          const results = Object.keys(value);

          if (results.length === self.props.extras.photoSettings.length) {
            results.forEach((currentVal) => {
              if (!currentVal) {
                finished = false;
              }
            });
          } else {
            finished = false;
          }

          return finished;
        };

        this.props.extras.photoSettings.forEach((photoSettings,index) => {
          const name = photoSettings.name ? photoSettings.name : 'photo' + index;
          const options = $.extend(true,{},{canvas},photoSettings);
          const photo = this.generateOptimizedPhoto(options);

          value[name] = false;

          if (photo.then) {
            if (!dfd) {
              dfd = new Deferred();
            }
            photo.then((res) => {
              value[name] = res;
              if (isFinished()) {
                if (dfd) {
                  dfd.resolve(value);
                } else {
                  return value;
                }
              }
            });
          } else {
            value[name] = photo;
            if (isFinished()) {
              if (dfd) {
                dfd.resolve(value);
              } else {
                return value;
              }
            }
          }
        });

        if (dfd) {
          return dfd;
        } else {
          return value;
        }
      } else if (typeof this.props.extras.photoSettings === 'object') {
        const options = $.extend(true,{},{canvas},this.props.extras.photoSettings);
        const photo = this.generateOptimizedPhoto(options);

        if (photo.then) {
          const dfd = new Deferred();

          photo.then((res) => {
            dfd.resolve(res);
          });
          return dfd;
        } else {
          return value;
        }
      }
    }
  }

  generateOptimizedPhoto(options) {
    const defaults = {
      minSide: 1000,
      type: 'jpeg',
      quality: 0.8
    };
    const settings = $.extend(true,{},defaults,options);
    let imageType;

    switch (settings.type) {
      case 'png':
        imageType = {
          ext: '.png',
          dataUrlStr: 'image/png'
        };
        break;
      default:
      imageType = {
        ext: '.jpeg',
        dataUrlStr: 'image/jpeg'
      };
    }

    if (settings.canvas) {
      const originalHeight = settings.canvas.height;
      const originalWidth = settings.canvas.width;
      const originalAspectRatio = originalHeight / originalWidth;
      const resizeCanvas = document.createElement('canvas');
      const resizeContext = resizeCanvas.getContext('2d');

      resizeCanvas.height = originalHeight;
      resizeCanvas.width = originalWidth;
      resizeContext.drawImage(settings.canvas, 0, 0);

      const resizeOptions = {};

      if (settings.width && settings.height && originalAspectRatio !== (settings.height / settings.width)) {
        resizeOptions.smartcrop = true;
        resizeOptions.resize = true;
        resizeOptions.height = Math.floor(originalAspectRatio < 1 ? settings.height : (settings.height * originalAspectRatio));
        resizeOptions.width = Math.floor(originalAspectRatio < 1 ? (settings.height / originalAspectRatio) : settings.height);
      } else if (settings.width && settings.height) {
        resizeOptions.resize = true;
        resizeOptions.height = settings.height;
        resizeOptions.width = settings.width;
      } else if (settings.height) {
        resizeOptions.resize = true;
        resizeOptions.height = settings.height;
        resizeOptions.width = (settings.height / originalAspectRatio);
      } else if (settings.width) {
        resizeOptions.resize = true;
        resizeOptions.height = (settings.width * originalAspectRatio);
        resizeOptions.width = settings.width;
      } else if (settings.largestSide) {
        resizeOptions.resize = true;
        resizeOptions.height = Math.floor(originalAspectRatio < 1 ?  (settings.largestSide * originalAspectRatio) : settings.largestSide);
        resizeOptions.width = Math.floor(originalAspectRatio < 1 ? settings.largestSide : (settings.largestSide / originalAspectRatio));
      } else if (settings.smallestSide) {
        resizeOptions.resize = true;
        resizeOptions.height = Math.floor(originalAspectRatio < 1 ? settings.smallestSide : (settings.smallestSide * originalAspectRatio));
        resizeOptions.width = Math.floor(originalAspectRatio < 1 ? (settings.smallestSide / originalAspectRatio) : settings.smallestSide);
      } else {
        resizeOptions.resize = false;
      }

      if (resizeOptions.resize && resizeOptions.smartcrop) {
        const dfd = new Deferred();

        window.resample_hermite(resizeCanvas,originalWidth,originalHeight,resizeOptions.width,resizeOptions.height);
        SmartCrop.crop(resizeCanvas,{
          width: settings.width,
          height: settings.height
        },(cropResult) => {
          const thumbnailCanvas = document.createElement('canvas');
          const thumbnailContext = thumbnailCanvas.getContext('2d');

          thumbnailCanvas.width = settings.width;
          thumbnailCanvas.height = settings.height;
          thumbnailContext.drawImage(resizeCanvas, cropResult.topCrop.x, cropResult.topCrop.y, settings.width, settings.height, 0, 0, settings.width, settings.height);

          dfd.resolve({
            ext: imageType.ext,
            source: thumbnailCanvas.toDataURL(imageType.dataUrlStr,settings.quality)
          });
        });
        return dfd;
      } else if (resizeOptions.resize) {
        window.resample_hermite(resizeCanvas,originalWidth,originalHeight,resizeOptions.width,resizeOptions.height);
        return {
          ext: imageType.ext,
          source: resizeCanvas.toDataURL(imageType.dataUrlStr,settings.quality)
        };
      }

    } else {
      return false;
    }

  }

}
