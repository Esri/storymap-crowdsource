import arcgisUtils from 'esri/arcgis/utils';
import Logger from 'babel/utils/logging/Logger';
import ArcgisActions from 'babel/actions/ArcgisActions';
import AppActions from 'babel/actions/AppActions';

const _logger = new Logger({source: 'ArcGIS - AppItem'});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

export const getDataById = function getDataById(item) {
  arcgisUtils.getItem(item).then((res) => {

    if (res.item && res.itemData && res.itemData.values) {
      ArcgisActions.receiveAppItem({
        item: res.item,
        itemData: res.itemData
      });
    } else {
      AppActions.showLoadingError('appLoadingFail');
      _onError(res);
    }
  },(err) => {
    if (err.toString().search('You do not have access') > -1) {
      AppActions.showLoadingError('notAuthorizedApp');
    } else if (err.toString().search('Item does not exist or is inaccessible') > -1) {
      AppActions.showLoadingError('inaccessibleApp');
    } else {
      AppActions.showLoadingError('appLoadingFail');
    }
    _onError(err);
  });
};

export default {
  getDataById
};
