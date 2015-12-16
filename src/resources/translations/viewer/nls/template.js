define({
  root: {
    loading: {
      initializing: 'Application is initializing',
      map: 'Loading map'
    },
    intro: {
      or: 'Or'
    },
    social: {
      buttonTitleAttr: {
        facebook: 'Share on Facebook',
        twitter: 'Share on Twitter',
        link: 'Get embed code or copy a short link'
      }
    },
    layouts: {
      stacked: {
        changeView: {
          mapView: 'Map View',
          galleryView: 'Thumbnail View'
        }
      }
    },
    errors: {
      loading: {
        heading: 'An Error Has Occured',
        invalidConfig: 'Invalid configuration',
				invalidConfigNoApp: 'Web Mapping Application identifier not specified in index.html.',
				unspecifiedConfigOwner: 'Authorized owner hasn\'t been configured.',
				invalidConfigOwner: 'Story owner is not authorized.',
				createMap: 'Unable to create map',
        notAuthorizedApp: 'You are not authorized to access this story',
        notAuthorizedMap: 'You are not authorized to access the web map in this story',
        notAuthorizedLayers: 'You are not authorized to some or all the layers in the web map',
				upgradeBrowser: '<a href="http://browsehappy.com/" target="_blank">Please update your browser</a>.',
				mapLoadingFail: 'Something went wrong, the map did not load correctly.',
        appLoadingFail: 'Something went wrong, the app did not load correctly.',
        crowdsourceLayerNotFound: 'Something went wrong, the app could not find or load the crowdsource map layer correctly.'
      }
    }
  }
});
