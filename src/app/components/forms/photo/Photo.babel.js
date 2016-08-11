import $ from 'jquery';
import React from 'react'; // eslint-disable-line no-unused-vars
import Deferred from 'dojo/Deferred';
import Helper from 'babel/utils/helper/Helper';
import FormGroup from 'babel/components/forms/base/FormGroup';
import ViewerText from 'i18n!translations/viewer/nls/template';
import SmartCrop from 'lib/smartcrop/smartcrop';
import loadImage from 'lib/javascript-load-image/js/load-image';
import 'lib/javascript-load-image/js/load-image-orientation';
import 'lib/javascript-load-image/js/load-image-meta';
import 'lib/javascript-load-image/js/load-image-exif';
import 'lib/javascript-load-image/js/load-image-exif-map';
import 'lib/resample-hermite/hermite';

export default class Photo extends FormGroup {

  constructor(props) {
    super(props);

    this.input = {
      value: false
    };

    this.isMobileDevice = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);

    this.fileChange = this.fileChange.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.captureImageExif = this.captureImageExif.bind(this);
    this.loadImageFromFile = this.loadImageFromFile.bind(this);
    this.loadImageFromFileForResample = this.loadImageFromFileForResample.bind(this);
    this.resetPicker = this.resetPicker.bind(this);
    this.saveInputValue = this.saveInputValue.bind(this);
    this.generatePhotos = this.generatePhotos.bind(this);
    this.generateOptimizedPhoto = this.generateOptimizedPhoto.bind(this);
  }

  componentDidUpdate(prevProps,prevState) {// eslint-disable-line no-unused-vars
    this.validator.setValidations(this.getValidations());
    this.updateValue();
  }

  render() {

    const inputClasses = Helper.classnames([this.props.className,'photo-input','form-group',{
      'required': this.props.required,
      'has-error': !this.state.isValid
    }]);

    const uploaderClasses = Helper.classnames([this.props.className,'drag-area','uploader','alert',{
      'alert-default': !this.state.dragging,
      'alert-info': this.state.dragging
    }]);

    const fileUploader = (
        <div>
        {!this.isMobileDevice && 'draggable' in document.createElement('span') && typeof(window.FileReader) !== 'undefined' ? (
          <div className={uploaderClasses}>
            <h4>
              {this.props.placeholder}
            </h4>
            {ViewerText.common.or}
            <br />
            {ViewerText.contribute.form.photo.pickFile}
            <label className="btn-file" tabIndex="-1" onBlur={this.onBlur}>
              <input id={this.props.id} style={{display: 'none'}} type="file" tabIndex="-1" accept="image/*" capture={navigator.userAgent.match(/iPad|iPhone|iPod/g) ? 'camera' : false} onChange={this.fileChange}></input>
            </label>
          </div>
        ) : (
          <button type="button" className="uploader btn btn-default btn-file btn-block" onBlur={this.onBlur}>
            {ViewerText.contribute.form.photo.choosePhoto}
            <input id={this.props.id} type="file" accept="image/*" capture={navigator.userAgent.match(/iPad|iPhone|iPod/g) ? 'camera' : false} tabIndex="-1" onChange={this.fileChange}></input>
          </button>
        )}
        { this.state.loadingPhoto ? (
          <p className="loading-photo-message">
            <small>{ ViewerText.forms.photo.loading }</small>
          </p>
        ) : null }
      </div>
    );

    const previewPane = (
      <div className="preview-pane">
        <img ref={(ref) => this.imagePreview = ref} src={this.state.imageUrl} alt=""></img>
        <div className="alert alert-default">
          <button type="button" className="btn btn-default btn-block" onClick={this.resetPicker}>
            {ViewerText.contribute.form.photo.selectNew}
          </button>
        </div>
      </div>
    );

    return (
      <div className={inputClasses} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}>
        <label htmlFor={this.props.id} className="control-label">{this.props.label}</label>
        { this.state.imageUrl ? null : fileUploader }
        { this.state.imageUrl ? previewPane : null }
        { this.state.resizingPhoto ? (
          <p className="loading-photo-message">
            <small>{ ViewerText.forms.photo.resizing }</small>
          </p>
        ) : null }
        {this.getErrorMessage ? this.getErrorMessage() : null}
      </div>
    );

  }

  fileChange(e) {
    const files = e.target.files;

    if (files && files.length) {
      this.captureImageExif(files[0]);
    }

    this.setState({
      loadingPhoto: true
    });
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
      this.captureImageExif(e.dataTransfer.files[0]);
		}
  }

  captureImageExif(file) {
    loadImage.parseMetaData(file,(data) => {
      const exif = data.exif ? data.exif.getAll() : {};
      const orientation = data.exif ? data.exif.get('Orientation') : null;

      let location = null;

      const convertCoords = function(coord, ref) {
        const DD = parseFloat(coord[0]) + ((parseFloat(coord[1]) + (parseFloat(coord[2])/60))/60);

        if (ref === 'S' || ref === 'W') {
          return Math.abs(DD) * -1;
        } else {
          return Math.abs(DD);
        }
      };

      if (exif.GPSLatitudeRef && exif.GPSLatitude && exif.GPSLongitudeRef && exif.GPSLongitude) {
        const latitudeArray = exif.GPSLatitude.split(',');
        const longitudeArray = exif.GPSLongitude.split(',');

        location = {
          latitude: convertCoords(latitudeArray,exif.GPSLatitudeRef),
          longitude: convertCoords(longitudeArray,exif.GPSLongitudeRef)
        };

      }

      this.loadImageFromFile(file,orientation,location);
    });
  }

  loadImageFromFile(file,orientation,location) {
    loadImage(file,(canvas) => {
      if (canvas && canvas.toDataURL) {
        if (canvas.width < this.props.extras.minimumSize, canvas.height < this.props.extras.minimumSize) {
          this.setState({
            loadingPhoto: false
          });
          alert(ViewerText.contribute.form.photo.photoTooSmall + ' ' + this.props.extras.minimumSize + 'px.'); //eslint-disable-line no-alert
        } else {
          const imgDataUrl = canvas.toDataURL('image/jpeg');

          this.setState({
            imageUrl: imgDataUrl
          });
          this.loadImageFromFileForResample(file,orientation,canvas,location);
        }
      }
    },{
      canvas: true,
      orientation
    });
  }

  loadImageFromFileForResample(file,orientation,rawPhotoCanvas,location) {
    loadImage(file,(canvas) => {
      if (canvas && canvas.toDataURL) {

        this.setState({
          loadingPhoto: false
        });
        this.saveInputValue(rawPhotoCanvas,canvas,location);
      }
    },{
      canvas: true,
      maxHeight: 2000,
      maxWidth: 2000,
      minHeight: this.props.extras.minimumSize,
      minWidth: this.props.extras.minimumSize,
      orientation
    });
  }

  resetPicker() {
    this.input.value = false;
    this.setState({
      imageUrl: ''
    });
    this.validateForm();
  }

  saveInputValue(rawPhotoCanvas,optimizedPhotoCanvas,location) {
    this.input.value = false;

    const value = this.generatePhotos(rawPhotoCanvas,optimizedPhotoCanvas);

    if (value.then) {
      value.then((res) => {
        this.input.value = {
          photos: res,
          location
        };
        this.validateForm();
      });
    } else {
      this.input.value = {
        photos: value,
        location
      };
      this.validateForm();
    }
  }

  generatePhotos(rawPhotoCanvas,optimizedPhotoCanvas) {
    const value = {};

    this.setState({
      resizingPhoto: true
    });

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
          const options = $.extend(true,{},{rawPhotoCanvas,optimizedPhotoCanvas},photoSettings);
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
                  this.setState({
                    resizingPhoto: false
                  });
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
                this.setState({
                  resizingPhoto: false
                });
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
          this.setState({
            resizingPhoto: false
          });
          return value;
        }
      } else if (typeof this.props.extras.photoSettings === 'object') {
        const options = $.extend(true,{},{rawPhotoCanvas,optimizedPhotoCanvas},this.props.extras.photoSettings);
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

    if (settings.optimizedPhotoCanvas && settings.rawPhotoCanvas) {
      const originalHeight = settings.optimizedPhotoCanvas.height;
      const originalWidth = settings.optimizedPhotoCanvas.width;
      const originalAspectRatio = originalHeight / originalWidth;
      const resizeCanvas = document.createElement('canvas');
      const resizeContext = resizeCanvas.getContext('2d');

      resizeCanvas.height = originalHeight;
      resizeCanvas.width = originalWidth;
      resizeContext.drawImage(settings.optimizedPhotoCanvas, 0, 0);

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
      } else if (resizeOptions.resize === false) {
        return {
          ext: imageType.ext,
          source: settings.rawPhotoCanvas.toDataURL(imageType.dataUrlStr,settings.quality)
        };
      }

    } else {
      return false;
    }

  }

}
