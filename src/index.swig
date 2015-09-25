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

  <script type="text/javascript">
		//-------------------------------------------------------------------------------------------
		//     Application configuration (ignored on ArcGIS Online, Portal and during development)
		//-------------------------------------------------------------------------------------------
		var configOptions = {
			// Enter an application ID created through the Map Series builder
			appid: "fe63852d4c474da09240fa218dae9b99",
			// Optionally to secure Series's access, use an OAuth application ID (example: 6gyOg377fLUhUk6f)
			// User will need to sign-in to access the viewer even if your application is public
			oAuthAppId: "",
			// Optionally to be able to use the appid URL parameter, configure here the list of application author
			//  whose application are allowed to be viewed by this Map Series deployment
			// This is the Portal username of the Series owner (e.g. ["user1"], ["user1", "user2"])
			authorizedOwners: [""]
		};
		// Optionally sharing and proxy URLs can be configured in app/config.js. This is only required
		//  when the webmap is not hosted on ArcGIS Online or a Portal for ArcGIS instance and the application isn't deployed as /home/MapSeries/ or /apps/MapSeries/.
		// Optionally Bing Maps key, Geometry and Geocode service's URLs can be configured in app/commonConfig.js. This is only required
		//  if the Organization or Portal for ArcGIS instance default configuration has to be overwritten. If the application is deployed
		//  on Portal for ArcGIS as /home/MapSeries/ or /apps/MapSeries/, that configuration is available in ../commonConfig.js
	</script>

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

  <div id="app">

    <header class="navbar">
      <div class="container">Story Map Crowdsource - ALPHA</div>
    </header>

    <div id="map" class="map"></div><!--/map-->

  </div><!--/app-->

  <script type="text/javascript">
    var app = {
      version: '{{ versionStr }}',
      pathJSAPI: '//jsdev.arcgis.com/3.15/'
    };
  </script>
  <script type="text/javascript" src="app/main-config.js"></script>
  {% if environment === 'dev' %}<script src="//localhost:35729/livereload.js"></script>{% endif %}

</body>
</html>
