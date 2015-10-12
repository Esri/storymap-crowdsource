(function() {

  var internals = {
    isProduction: app.version.search('dev') < 0 ? true : false
  };

  internals.configUrlString = function(url, isExternal) {

    var newUrl;

    if (isExternal) {
      newUrl = document.location.protocol === 'file:' ? 'http:' + url : url;
    } else {
      newUrl = url + '?v=' + app.version;
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
      useDeferredInstrumentation: true,
      paths: {
        storymaps: path1 + 'app/storymaps',
        lib: path1 + 'lib',
        jquery: path1 + 'lib/jquery/dist/jquery',
        react: path1 + 'lib/react/build/react',
        babel: path1 + 'build/app/storymaps',
        // AMD Loader Plugins
        use: path1 + 'lib/use-amd/use'
      },
      use: {
        jquery: {
          attach: '$'
        }
      }
    };

  };

  app.indexCfg = configOptions;

  app.mode = {
    isProduction: internals.isProduction,
    isBuilder: internals.getUrlVar('edit') || internals.getUrlVar('fromScratch') || internals.getUrlVar('fromscratch'),
    isDebug: internals.getUrlVar('debug')
  };

  // Load ArcGIS API for JavaScript
  internals.defineDojoConfig();
  internals.loadCSS(app.pathJSAPI + 'esri/css/esri.css', true);
  internals.loadCSS(app.pathJSAPI + 'dijit/themes/claro/claro.css', true);
  internals.loadJS(app.pathJSAPI + 'init.js', true);

  // Load Bootstrap
  internals.loadCSS('app/storymaps/calcite-bootstrap/calcite-bootstrap.css');

  // Load App Specific Files
  internals.loadJS('app/config.js');
  internals.loadJS('app/main-app.js');
  internals.loadCSS('build/app/storymaps/App.css');

  // Enable Google Analytics on storymaps.esri.com
  if (app.isProduction && window.location.href.toLowerCase().indexOf('storymaps.esri.com') >= 0) {
  	var _gaq = _gaq || [];

  	_gaq.push(['_setAccount', 'UA-26529417-1']);
  	_gaq.push(['_trackPageview']);

  	(function() {
  		var ga = document.createElement('script');

      ga.type = 'text/javascript'; ga.async = true;

  		ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  		var s = document.getElementsByTagName('script')[0];

      s.parentNode.insertBefore(ga, s);
  	})();
  }

})();
