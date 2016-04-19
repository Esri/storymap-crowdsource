/*eslint-env node*/
/*eslint prefer-arrow-callback: 0*/
var internals = {};

internals.sassFilePath = 'src/resources/fonts/google/css/';

internals.googleFontsGruntOptions = {
  fontPath: 'src/resources/fonts/google',
  httpPath: 'resources/fonts/google/'
};

internals.fontsGroups = [
  {
    longName: 'Open Sans',
    shortName: 'openSans',
    sassVariables: {
      primaryFontSanserif: 'Open Sans',
      primaryFontSerif: 'Open Sans',
      primaryHeadingsWeight: 300
    },
    fonts: [{
      family: 'Open Sans',
      styles: [300,'300italic',600,'600italic']
    }]
  },
  {
    longName: 'Lato and Merriweather',
    shortName: 'latoMerriweather',
    sassVariables: {
      primaryFontSanserif: 'Lato',
      primaryFontSerif: 'Merriweather',
      primaryHeadingsWeight: 300
    },
    fonts: [{
      family: 'Lato',
      styles: [300,'300italic',700,'700italic']
    },{
      family: 'Merriweather',
      styles: [300,'300italic',700,'700italic']
    }]
  }
];

module.exports = internals.Fonts = function() {

  var _getGoogleFontsConfig = function getGoogleFontsConfig() {
    var config = {
      options: internals.googleFontsGruntOptions
    };

    internals.fontsGroups.map(function(font) {
      config[font.shortName] = {
        options: {
          cssFile: internals.sassFilePath + font.shortName + '.scss',
          fonts: font.fonts
        }
      };
    });

    return config;
  };

  var _getSassVariables = function getSassVariables (fontName) {
    var variable = {};

    var font = internals.fontsGroups.filter(function(font) {
      return font.shortName === fontName;
    })[0];

    if (!font || font.length < 1) {
      font = internals.fontsGroups[0];
    }

    variable.primaryFontSanserif = font.sassVariables.primaryFontSanserif || '';
    variable.primaryFontSerif = font.sassVariables.primaryFontSerif || '';
    variable.primaryFontMonospace = font.sassVariables.primaryFontMonospace || '';
    variable.primaryHeadingsWeight = font.sassVariables.primaryHeadingsWeight || 300;

    var variableStr = '\
      $primary-font-sanserif: "' + variable.primaryFontSanserif + '";\
      $primary-font-serif: "' + variable.primaryFontSerif + '";\
      $primary-font-monospace: "' + variable.primaryFontMonospace + '";\
      $primary-headings-weight: ' + variable.primaryHeadingsWeight + ';';

    return variableStr;
  };

  return {
    getGoogleFontsConfig: _getGoogleFontsConfig,
    getSassVariables: _getSassVariables
  };

};
