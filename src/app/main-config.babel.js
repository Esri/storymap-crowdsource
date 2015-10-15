(function() {

  var internals = {
    isProduction: window.app.version.search('dev') < 0 ? true : false,
    head: document.getElementsByTagName('head')[0]
  };

  internals.configUrlString = function(url, isExternal) {

    var newUrl;

    if (isExternal) {
      newUrl = document.location.protocol === 'file:' ? 'http:' + url : url;
    } else {
      newUrl = url + '?v=' + window.app.version;
    }

    return newUrl;

  };

  internals.loadCSS = function(url, isExternal) {

    var el = window.document.createElement('link');

    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('type', 'text/css');
    el.setAttribute('href', internals.configUrlString(url, isExternal));
    window.document.getElementsByTagName('head')[0].appendChild(el);

  };

  internals.loadJS = function(url, isExternal) {
    window.document.write('<script language="javascript" type="text/javascript" src="' + internals.configUrlString(url, isExternal) + '"><\/script>');
  };

  internals.getUrlVar = function(name) {

    var vars = [];
    var hash;

    if (window.location.href.indexOf('?') === -1) {
      return null;
    }

    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      hash[0] = hash[0].split('#')[0];
      vars.push(hash[0]);
      vars[hash[0]] = (hash[1] === undefined) ? true : hash[1];
    }

    return vars[name];

  };

  internals.defineDojoConfig = function() {

    var path1 = location.pathname.replace(/\/[^/]+$/, '/');

    window.dojoConfig = {
      parseOnLoad: true,
      isDebug: false,
      async: true,
      useDeferredInstrumentation: true,
      paths: {
        storymaps: path1 + 'app/storymaps',
        babel: path1 + 'build/app/storymaps',
        lib: path1 + 'lib',
        jquery: path1 + 'lib/jquery/dist/jquery',
        react: path1 + 'lib/react/build/react',
        reactDom: path1 + 'lib/react/build/react-dom',
        // AMD Loading plugins
        text: path1 + 'lib/text/text'
      }
    };

  };

  window.app.indexCfg = window.configOptions;

  window.app.mode = {
    isProduction: internals.isProduction,
    isBuilder: internals.getUrlVar('edit') || internals.getUrlVar('fromScratch') || internals.getUrlVar('fromscratch'),
    isDebug: internals.getUrlVar('debug')
  };

  // Load ArcGIS API for JavaScript
  internals.defineDojoConfig();
  internals.loadCSS(window.app.pathJSAPI + 'esri/css/esri.css', true);
  internals.loadCSS(window.app.pathJSAPI + 'dijit/themes/claro/claro.css', true);
  internals.loadJS(window.app.pathJSAPI + 'init.js', true);

  var pathMods = {
    amdDir: internals.isProduction ? '' : '/storymaps',
    minPath: internals.isProduction ? '.min' : '',
    resourcePath: internals.isProduction ? '' : 'build/'
  };

  // Load Bootstrap
  internals.loadCSS('app' + pathMods.amdDir + '/calcite-bootstrap/calcite-bootstrap' + pathMods.minPath + '.css');

  // Load App Specific Files
  internals.loadCSS(pathMods.resourcePath + 'app' + pathMods.amdDir + '/App' + pathMods.minPath + '.css');
  internals.loadJS(pathMods.resourcePath + 'app/config' + pathMods.minPath + '.js');
  if (internals.isProduction){
    internals.loadJS('app/App.min.js');
  } else {
    internals.loadJS('app/main-app.js');
  }

  // Enable Google Analytics on storymaps.esri.com
  if (internals.isProduction && window.location.href.toLowerCase().indexOf('storymaps.esri.com') >= 0) {
    var _gaq = _gaq || [];

    _gaq.push(['_setAccount', 'UA-26529417-1']);
    _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script');

      ga.type = 'text/javascript'; ga.async = true;

      ga.src = (document.location.protocol === 'https:' ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0];

      s.parentNode.insertBefore(ga, s);
    })();
  }

})();
