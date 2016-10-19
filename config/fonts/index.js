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
      styles: [300,'300italic',600,'600italic'],
      subsets: ['cyrillic','greek','latin-ext','vietnamese']
    }]
  }//,
  // {
  //   longName: 'Lato and Merriweather',
  //   shortName: 'latoMerriweather',
  //   sassVariables: {
  //     primaryFontSanserif: 'Lato',
  //     primaryFontSerif: 'Merriweather',
  //     primaryHeadingsWeight: 300
  //   },
  //   fonts: [{
  //     family: 'Lato',
  //     styles: [300,'300italic',700,'700italic']
  //   },{
  //     family: 'Merriweather',
  //     styles: [300,'300italic',700,'700italic']
  //   }]
  // }
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

  var _getFontSassString = function getFontSassString (fontName) {
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

    const fontSassString = '\n\
      .font-' + fontName + ' {\n\
        h1, h2, h3, h4, h5, h6,\n\
        .h1, .h2, .h3, .h4, .h5, .h6, .tooltip, .popover {\n\
          font-family: "' + variable.primaryFontSanserif + '", "Helvetica Neue", "Helvetica", "Arial", sans-serif;\n\
        }\n\
      }\n\
      \n\
      html .font-' + fontName + ', body .font-' + fontName + ', .font-' + fontName + ' blockquote, .font-' + fontName + ' .serif-face {\n\
        font-family: "' + variable.primaryFontSerif + '", Georgia, serif;\n\
      }\n\
      \n\
      .font-' + fontName + '{\n\
        code,\n\
        kbd,\n\
        pre,\n\
        samp {\n\
          font-family: "' + variable.primaryFontMonospace + '", "Consolas", "Andale Mono", "Lucida Console", "Monaco", "Courier New", Courier, monospace;\n\
        }\n\
      }\n\
    ';

    return fontSassString;
  };

  return {
    getGoogleFontsConfig: _getGoogleFontsConfig,
    getFontSassString: _getFontSassString
  };

};
