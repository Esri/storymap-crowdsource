import ArcgisPortal from 'esri/arcgis/Portal';
import Logger from 'babel/utils/logging/Logger';

const _logger = new Logger({source: 'ArcGIS - Portal'});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

export const Portal = class Portal extends ArcgisPortal.Portal{

  constructor(url) {
    super(url);
  }

};

export default Portal;
