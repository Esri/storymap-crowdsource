const config = {
  bingMapsKey: '',
  helperServices: {
    geometry: {
      url: location.protocol + '//utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer'
    },
    geocode: [{
      url: location.protocol + '//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer',
      suggest: true
    }]
  }
};

commonConfig = config; // eslint-disable-line no-undef

export default config;
