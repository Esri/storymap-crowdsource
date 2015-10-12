app.cfg = {
	defaults: {
		appData: {
			settings: {
				header: {
					logo: {
						url: 'resources/images/logo/esri-logo.svg',
						link: 'http://www.esri.com/'
					}
				},
				globals: {
					participateShort: 'Participate',
	        participateLong: 'Share your experience',
	        exploreText: 'Explore',
	        social: {
						facebook: true,
						twitter: true,
	          bitly: true
	        }
				}
			}
		}
	},
  // Edit those to set a custom sharing or proxy URL
	// You have to edit those only if your webmap is deployed on Portal for ArcGIS instance and if you are not deploying the template on the Portal webserver
	// If you are using ArcGIS Online or deploying the template on a Portal instance, you don't have to edit those URL
	DEFAULT_SHARING_URL: '//www.arcgis.com/sharing/content/items',
  //DEFAULT_SHARING_URL: '//portal.internal.com/arcgis/sharing/content/items',
	DEFAULT_PROXY_URL: '//www.arcgis.com/sharing/proxy'
	//DEFAULT_PROXY_URL: '//portal.internal.com/arcgis/sharing/proxy'
};
