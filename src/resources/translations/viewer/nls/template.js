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
    forms: {
      select: {
        noDefaultSelection: 'Please choose an option...'
      }
    },
    validations: {
      defaultMessages: {
        'accepted': 'The :attribute must be accepted.',
        'alpha': 'The :attribute field must contain only alphabetic characters.',
        'alpha_dash': 'The :attribute field may only contain alpha-numeric characters, as well as dashes and underscores.',
        'alpha_num': 'The :attribute field must be alphanumeric.',
        'between': 'The :attribute field must be between :min and :max.',
        'confirmed': 'The :attribute confirmation does not match.',
        'email': 'The :attribute format is invalid.',
        'def': 'The :attribute attribute has errors.',
        'digits': 'The :attribute must be :digits digits.',
        'different': 'The :attribute and :different must be different.',
        'in': 'The selected :attribute is invalid.',
        'integer': 'The :attribute must be an integer.',
        'min': {
          numeric: 'The :attribute must be at least :min.',
          string: 'The :attribute must be at least :min characters.'
        },
        'max': {
          numeric: 'The :attribute must be less than :max.',
          string: 'The :attribute must be less than :max characters.'
        },
        'not_in': 'The selected :attribute is invalid.',
        'numeric': 'The :attribute must be a number.',
        'required': 'The :attribute field is required.',
        'required_if': 'The :attribute field is required when :other is :value.',
        'same': 'The :attribute and :same fields must match.',
        'size': {
          numeric: 'The :attribute must be :size.',
          string: 'The :attribute must be :size characters.'
        },
        'url': 'The :attribute format is invalid.',
        'regex': 'The :attribute format is invalid',
        'attributes': {}
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
