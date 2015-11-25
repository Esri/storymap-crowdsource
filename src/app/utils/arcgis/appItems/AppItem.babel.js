import arcgisUtils from 'esri/arcgis/utils';
import Logger from 'babel/utils/logging/Logger';
import ArcgisActions from 'babel/actions/ArcgisActions';

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
      _onError(res);
    }
  }, _onError);
};

export default {
  getDataById
};
