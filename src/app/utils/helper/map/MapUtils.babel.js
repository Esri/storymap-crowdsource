import $ from 'jquery';
import Extent from 'esri/geometry/Extent';
import MoveableGraphic from './MoveableGraphic';
import webMercatorUtils from 'esri/geometry/webMercatorUtils';

export const serializeExtentToItem = function (options) {
  const defaults = {
    type: 'array'
  };
  const settings = $.extend(true,{},defaults,options);

  if (!settings.extent || !settings.extent.spatialReference) {
		return null;
  }

  const extentObj = settings.extent.getCenter ? settings.extent : new Extent(settings.extent);
	const extentWgs = settings.extent.spatialReference.wkid === 4326 ? settings.extent : webMercatorUtils.webMercatorToGeographic(extentObj);
  const extentRounded = [
		[Math.round(extentWgs.xmin*10000)/10000, Math.round(extentWgs.ymin*10000)/10000],
		[Math.round(extentWgs.xmax*10000)/10000, Math.round(extentWgs.ymax*10000)/10000]
	];

  if (settings.type === 'string') {
    return extentRounded.toString();
  }
	return extentRounded;
};

export default {
  serializeExtentToItem,
  MoveableGraphic
};
