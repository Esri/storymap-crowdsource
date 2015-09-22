(function () {

  var internals = {
    isProduction: app.version.search('dev') < 0 ? true : false
  };

  internals.configUrlString = function (url, isExternal) {

    var newUrl;

    if (isExternal) {
      newUrl = document.location.protocol === 'file:' ? 'http:' + url : url;
    } else {
      newUrl = url + '?v=' + app.version;
    }

  };

  internals.loadCSS = function (url, isExternal) {

    var el = window.document.createElement('link');

    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('type', 'text/css');
    el.setAttribute('href', internals.configUrlString(url, isExternal));
    window.document.getElementsByTagName('head')[0].appendChild(el);

  };

  internals.loadJS = function (url, isExternal) {

    var ref = window.document.getElementsByTagName('script')[0];
    var script = window.document.createElement('script');

    script.src = internals.configUrlString(url, isExternal);
    script.async = true;
    ref.parentNode.insertBefore(script, ref);

    return script;

  };

  internals.getUrlVar = function (name) {

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

})();
