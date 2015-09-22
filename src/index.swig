<!DOCTYPE html>
<html>
<head>

  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">

  <meta name="fragment" content="!">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

  <link type="image/ico" rel="shortcut icon" href="//resources.esri.com/favicon.ico">
  <link type="image/ico" rel="icon"  href="//resources.esri.com/favicon.ico">

  <!--
    To correctly reference your Story Maps Crowdsource App in search engine:
     - create and fill out extensively an ArcGIS Online item that link to your final application
     - edit the following four tags as well as the title tag above on line 5
  -->
  <meta name="description" content="">

  <!-- Social Sharing -->
  <meta property="og:type" content="article"/>
  <meta property="og:title" content=""/>
  <meta property="og:description" content=""/>
  <meta property="og:image" content=""/>
  <!-- END Social Sharing -->

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

</head>
<body>

  <div id="app"></div>

  <script type="text/javascript">
    var app = {
      version: '{{ versionStr }}',
      pathJSAPI: '//jsdev.arcgis.com/3.15/'
    };
  </script>
  <script type="text/javascript" src="app/main-config.js"></script>

</body>
</html>
