(function() {

  const _isProduction = window.app.version.search('dev') < 0 ? true : false;

  const _configUrlString = function configUrlString(url, isExternal) {

    let newUrl;

    if (isExternal) {
      newUrl = document.location.protocol === 'file:' ? 'http:' + url : url;
    } else {
      newUrl = url + '?v=' + window.app.version;
    }

    return newUrl;

  };

  const _loadCSS = function loadCSS(url, isExternal) {

    const el = window.document.createElement('link');

    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('type', 'text/css');
    el.setAttribute('href', _configUrlString(url, isExternal));
    window.document.getElementsByTagName('head')[0].appendChild(el);

  };

  const _loadJS = function loadJS(url, isExternal) {
    window.document.write('<script language="javascript" type="text/javascript" src="' + _configUrlString(url, isExternal) + '"><\/script>');
  };

  const _getUrlVar = function getUrlVar(name) {

    let hash;
    const vars = [];

    if (window.location.href.indexOf('?') === -1) {
      return null;
    }

    const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for (let i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      hash[0] = hash[0].split('#')[0];
      vars.push(hash[0]);
      vars[hash[0]] = (hash[1] === undefined) ? true : hash[1];
    }

    return vars[name];

  };

  const _defineDojoConfig = function defineDojoConfig() {

    const path1 = location.pathname.replace(/\/[^/]+$/, '/');

    window.dojoConfig = {
      isBuiderMode: window.app.mode.isBuider,
      parseOnLoad: true,
      isDebug: false,
      async: true,
      useDeferredInstrumentation: true,
      map: {
        '*': {
          i18n: 'dojo/i18n'
        }
      },
      paths: {
        translations: path1 + 'resources/translations',
        babel: path1 + 'build/app',
        lib: path1 + 'lib',
        jquery: path1 + 'lib/jquery/dist/jquery',
        velocity: path1 + 'lib/velocity/velocity',
        react: path1 + 'lib/react/react-with-addons',
        reactDom: path1 + 'lib/react/react-dom',
        reactRedux: path1 + 'lib/react-redux/index',
        redux: path1 + 'lib/redux/index',
        bootstrap: path1 + 'lib/bootstrap-sass/assets/javascripts/bootstrap',
        EventEmitter: path1 + 'lib/eventEmitter/EventEmitter',
        clipboard: path1 + 'lib/clipboard/dist/clipboard',
        Autolinker: path1 + 'lib/Autolinker.js/dist/Autolinker',
        autosize: path1 + 'lib/autosize/dist/autosize',
        // AMD Plugins
        mode: path1 + 'build/app/utils/amd/plugins/AppMode'
      }
    };

  };

  window.app.indexCfg = window.configOptions;

  window.app.mode = {
    isProduction: _isProduction,
    isDebug: _getUrlVar('debug') || false,
    isBuilder: _getUrlVar('edit') || _getUrlVar('fromScratch') || _getUrlVar('fromscratch') || false,
    fromScratch: _getUrlVar('fromScratch') || _getUrlVar('fromscratch') || false
  };

  if (window.location.protocol !== 'https:' && (!window.app.mode.isBuilder || location.hostname.toLowerCase().match('arcgis.com'))) {
    location.href = location.href.replace("http://", "https://");
  }

  // Load ArcGIS API for JavaScript
  _defineDojoConfig();
  _loadCSS(window.app.pathJSAPI + 'esri/css/esri.css', true);
  _loadCSS(window.app.pathJSAPI + 'esri/themes/calcite/dijit/calcite.css', true);
  _loadJS(window.app.pathJSAPI + 'init.js', true);

  // TODO Remove when bootstrap option is available
  window.app.indexCfg.bootstrapTheme = window.app.indexCfg.bootstrapTheme ? window.app.indexCfg.bootstrapTheme : '';

  const pathMods = {
    bootstrapPath: window.app.indexCfg.bootstrapTheme === '' ? '-calcite' : '',
    cssBuilderPath: window.app.mode.isBuilder ? '-builder' : '',
    jsBuilderPath: _isProduction && window.app.mode.isBuilder ? '-builder' : '',
    mainCss: _isProduction ? '/main-app' : '/components/crowdsource/' + (window.app.mode.isBuilder ? 'builder' : 'viewer') + '/CrowdsourceApp',
    minPath: _isProduction ? '.min' : '',
    resourcePath: _isProduction ? '' : 'build/'
  };

  if (window.app.indexCfg.bootstrapTheme.toLowerCase() === 'default') {
    pathMods.bootstrapPath = '-bootstrap';
  } else if (window.app.indexCfg.bootstrapTheme && window.app.indexCfg.bootstrapTheme.match('http')) {
    _loadCSS(window.app.indexCfg.bootstrapTheme, true);
  } else if (pathMods.bootstrapPath === '') {
    _loadCSS(window.app.indexCfg.bootstrapTheme);
  }

  // Load App Specific Files
  _loadCSS(pathMods.resourcePath + 'app' + pathMods.mainCss + pathMods.cssBuilderPath + pathMods.bootstrapPath + pathMods.minPath + '.css');
  _loadJS('app/main-app' + pathMods.jsBuilderPath + pathMods.minPath + '.js');

  // Enable Google Analytics on storymaps.esri.com
  if (_isProduction && window.location.href.toLowerCase().indexOf('storymaps.esri.com') >= 0) {
    const _gaq = _gaq || [];

    _gaq.push(['_setAccount', 'UA-26529417-1']);
    _gaq.push(['_trackPageview']);

    (function() {
      const ga = document.createElement('script');

      ga.type = 'text/javascript'; ga.async = true;

      ga.src = (document.location.protocol === 'https:' ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      const s = document.getElementsByTagName('script')[0];

      s.parentNode.insertBefore(ga, s);
    })();
  }

})();
