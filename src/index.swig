<!DOCTYPE html>
<html>
<head>

  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">

  <meta name="fragment" content="!">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

  <link type="image/ico" rel="shortcut icon" href="//resources.esri.com/favicon.ico">
  <link type="image/ico" rel="icon"  href="//resources.esri.com/favicon.ico">

  <!-- htmlmin:ignore -->
  <!--
    To correctly reference your Story Maps Crowdsource App in search engine:
     - create and fill out extensively an ArcGIS Online item that link to your final application
     - edit the following six tags. For more information, see the following blog post:
      (https://medium.com/@ssylviageo/grow-your-story-maps-audience-with-open-graph-tags-b7639cb65d5c)
  -->
  <title></title>
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
			// Enter an application ID created through the Crowdsource builder
			appid: "fe63852d4c474da09240fa218dae9b99",
			// Optionally to secure Series's access, use an OAuth application ID (example: 6gyOg377fLUhUk6f)
			// User will need to sign-in to access the viewer even if your application is public
			oAuthAppId: "",
			// Optionally to be able to use the appid URL parameter, configure here the list of application author
			//  whose application are allowed to be viewed by this Crowdsource deployment
			// This is the Portal username of the Series owner (e.g. ["user1"], ["user1", "user2"])
			authorizedOwners: [""],
      // By default the crowdsource app will container styling from Esri's Calcite (http://esri.github.io/calcite-bootstrap/)
      // library which is a customized version of the Bootstrap library (http://getbootstrap.com/). You can choose to override
      // this by with either the default bootstrap theme or your own customized themes
      // To use default theme use "default",
      // To use a customized bootstrap theme provide the path .css file (the best place to put this is in the resources directory,
      // e.g. resources/bootstrap/custom-bootstrap.css) or provide the full http path to a hosted version. Required JavaScript is
      // already loaded; only the css is required.
      bootstrapTheme: ""
		};
		// Optionally sharing and proxy URLs can be configured in app/config.js. This is only required
		//   when the webmap is not hosted on ArcGIS Online or a Portal for ArcGIS instance and the application isn't deployed as /home/MapSeries/ or /apps/MapSeries/.
		// Optionally Bing Maps key, Geometry and Geocode service's URLs can be configured in app/commonConfig.js. This is only required
		//   if the Organization or Portal for ArcGIS instance default configuration has to be overwritten. If the application is deployed
		//   on Portal for ArcGIS as /home/MapSeries/ or /apps/MapSeries/, that configuration is available in ../commonConfig.js
	</script>

  <!-- htmlmin:ignore -->
  <!--[if lt IE 9]>
  <script type="text/javascript">
    alert('This app requires a modern browsers to run properly. Please update your browser then visit this page again.');
    window.location = "http://browsehappy.com/";
  </script>
  <![endif]-->

</head>
<body class="claro">
  <!-- htmlmin:ignore -->
  <style>
    /* CUSTOM CSS RULES */
  </style>
  <!-- htmlmin:ignore -->

  <div id="app"></div>

  <!-- Loading -->
	<style>
    html,body {
      margin: 0;
      padding: 0;
    }

		#loadingOverlay {
			z-index: 1100;
			width: 100vw;
			height: 100vh;
			background-color: #E5E5E5;
			-webkit-box-shadow: inset 0px 0px 82px 19px rgba(0,0,0,0.3);
			-moz-box-shadow: inset 0px 0px 82px 19px rgba(0,0,0,0.3);
			box-shadow: inset 0px 0px 82px 19px rgba(0,0,0,0.3);
		}

		#loadingIndicator {
			position: fixed;
      margin: -30px 0 0 -30px;
			top: 50%;
			left: 50%;
			z-index: 1102;
		}

    #loadingIndicator img {
			height: 60px;
      width: 60px;
		}
	</style>

	<div id="loadingOverlay">
    <div id="loadingIndicator" class="loadingIndicator">
      <img src="resources/images/loader-light.gif" />
    </div>
  </div>

  <script type="text/javascript">
    var app = {
      version: '{{ versionStr }}',
      pathJSAPI: '//jsdev.arcgis.com/3.15/'
    };
  </script>
  <script type="text/javascript" src="{{ pathMods.resourcePath }}app/main-config{{ pathMods.minPath }}.js"></script>
  {% if environment === 'dev' %}<script src="//localhost:35729/livereload.js"></script>{% endif %}

</body>
</html>
