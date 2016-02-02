import UrlUtils from 'esri/urlUtils';
import ModeActions from 'babel/actions/ModeActions';

export default class AppMode {
  constructor () {

    this.setAppMode(this.urlQuery);

  }

  get urlQuery() {
    return UrlUtils.urlToObject(window.location.href).query;
  }

  getValidatedMode(modeObj) {
    const modes = {};

    if (modeObj) {
      Object.keys(modeObj).forEach((current) => {
        switch (current.toLowerCase()) {
          case 'fromscratch':
            modes.fromScratch = true;
            modes.isBuilder = true;
            break;
          case 'edit':
            modes.isBuilder = true;
            break;
          case 'debug':
            modes.isDebug = true;
            break;
        }
      });
    }

    return modes;
  }

  setAppMode(modeObj) {
    const validModeObj = this.getValidatedMode(modeObj);

    ModeActions.updateMode(validModeObj);
  }
}
