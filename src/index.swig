<!DOCTYPE html>
<html lang="en">
<head>

  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <link type="image/ico" rel="shortcut icon" href="resources/images/meta/favicon.ico">

  <title>{{ app.meta.title | title }}</title>

  <meta name="keywords" content="{{ app.meta.keywords }}">
  <meta name="description" content="{{ app.meta.description }}">

  <!--Facebook Open Graph-->
  <meta property="og:title" content="{{ app.meta.title  | title }}">
  <meta property="og:url" content="{{ app.meta.url }}">
  <meta property="og:image" content="{{ app.meta.thumbnail }}">
  <meta property="og:description" content="{{ app.meta.description }}">
  <!--End Facebook-->

  <!--Twitter Card Data-->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@{{ app.meta.twitterHandle }}">
  <meta name="twitter:url" content="{{ app.meta.url }}">
  <meta name="twitter:title" content="{{ app.meta.title  | title }}">
  <meta name="twitter:description" content="{{ app.meta.description }}">
  <meta name="twitter:image" content="{{ app.meta.thumbnail }}">
  <!--End Facebook-->

  <!--[if lt IE 9]>
  <script type="text/javascript">
    alert('This app requires a modern browsers to run properly. Please update your browser then visit this page again.');
    window.location = "http://browsehappy.com/";
  </script>
  <![endif]-->
  <!--[if IE 9]>
  <script type="text/javascript">
    alert('This app requires a modern browsers to run properly. Please update your browser then visit this page again.');
    window.location = "http://browsehappy.com/";
  </script>
  <![endif]-->

  <link rel="stylesheet" href="{{ server.staticPaths.build }}stylesheets/app.css">

</head>
<body>

  <script src="javascript/require/require.js"></script>
  {% if environment === 'development' %}
  <script>
    require.config({
      baseUrl: {{ JSON.stringify(require.baseUrl) }},
      paths: {{ JSON.stringify(require.paths) }},
      shim: {{ JSON.stringify(require.shim) }},
      enforceDefine: true
    });
    require(['app/core/Core']);
  </script>
  {% else %}
  <script>
    require(['javascript/app.js']);
  </script>
  {% endif %}

</body>
</html>