import {getAppItem} from 'babel/utils/arcgis/AppItem';
import EnvConfig from 'babel/utils/arcgis/EnvironmentConfig';

EnvConfig.configSharingUrl();

export default {
  getAppItem: getAppItem
};
