define({
  root: {
    loading: {
      initializing: 'Loading story',
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
    forms: {
      select: {
        noDefaultSelection: 'Please choose an option...'
      }
    },
    contribute: {
      photo: {
        pickFile: 'pick a file',
        selectNew: 'Use a different photo'
      },
      location: {
        search: 'Search'
      },
      termsAndConditions: {
        buttonShow: 'Show terms and conditions',
        buttonHide: 'Hide terms and conditions',
        legal: 'You warrant and represent that (1) you possess all rights, title, and ownership in the photos to be shared up to this site, and grant Esri, and its contractors the nonexclusive, royalty free right to use, copy, store, cache, host, prepare derivative works, reproduce, publicly display and perform, redistribute, rebroadcast, and retransmit the shared photo as part of this service, and (2) your sharing of photos and any associated geolocational information will not infringe or misappropriate any third party’s proprietary rights or rights of privacy or publicity. Sharing photos that could be deemed defamatory, obscene, pornographic, excessively violent, or to encourage unlawful activities are strictly prohibited.'
      },
      save: 'Accept Terms and Save'
    },
    validations: {
      fix: 'Fix it!',
      basic: {
        noValue: 'No value was provided',
        required: 'The <% attribute %> field is required.',
        regex: 'The <% attribute %> field does not match the match the required pattern.',
        max: {
          string: 'The <% attribute %> cannot contain more than <% max %> characters.',
          number: 'The <% attribute %> must be less than or equal to <% max %>.'
        },
        acceptedTerms: 'You must accept the terms and conditions before sharing.'
      },
      arcgis: {
        location: {
          notValid: 'The location you entered is not valid, please try again.',
          noResults: 'The location you searched for cannot be found. Please try again and be as specifc as you can.'
        }
      }
    },
    errors: {
      actionsBtns: {
        startFromScratch: 'Start building a new Crowdsource Story'
      },
      loading: {
        heading: 'An Error Has Occured',
        invalidConfig: 'Invalid configuration',
        inaccessibleApp: 'Web Mapping Application does not exist or is inaccessible.',
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
        crowdsourceLayerNotFound: 'Something went wrong, the story could not find or load the crowdsource map layer correctly.'
      }
    }
  }
});
