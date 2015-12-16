define({
  root: {
    common: {
      appName: 'Crowdsource',
      appNameAppend: 'Builder',
      buttons: {
        next: 'Next'
      }
    },
    banner: {
      buttons: {
        help: 'Help',
        preview: 'View Live',
        share: 'Share',
        settings: 'Settings',
        save: 'Save'
      },
      hintText: {
        notSaved: 'Story isn\'t saved yet'
      }
    },
    settingsModals: {
      layout: {
        welcome: 'Welcome to',
        header: 'Which layout do you want to use?',
        headerHint: 'You can change the layout anytime from the settings dialog.',
        preview: 'View a live example',
        commonAltText: 'layout preview.',
        selection: {
          stacked: {
            name: 'Stacked',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, doloremque!'
          },
          sidePanel: {
            name: 'Side Panel',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, doloremque!'
          }
        }
      }
    },
    appDataPlaceholderText: {
      intro: {
        title: 'Add your title here',
        subtitle: 'Add your your subtitle here'
      },
      header: {
        title: 'Add a banner title here'
      },
      globals: {
        participateShort: 'Participate',
        participateLong: 'Share your experience',
        exploreText: 'Explore the map'
      }
    },
    itempageDefaults: {
      webmap: {
        titleAppend: 'web map'
      },
      featureService: {
        titleAppend: 'feature service'
      }
    },
    errors: {
      loading: {
        notAuthorizedCreateNew: 'You are not authorized to create a new story. You must have access to create new items and publish new hosted feature services in your organization. Contact your ArcGIS Online Organiztion administrator for more privileges.',
        notAuthorizedEdit: 'You are not authorized to edit this story. If you are not the owner, make sure you have been <a href="http://blogs.esri.com/esri/arcgis/2015/07/14/enable-colleagues-to-update-your-maps-and-apps/" target="-blank">given edit permissions</a> by the owner. You must also have access to edit items and publish new hosted feature services in your organization. Contact your ArcGIS Online Organiztion administrator for more privileges.',
        crowdsourceLayerNotFound: 'Something went wrong, the app could not find or load the crowdsource map layer correctly. Make sure you have permission to view the feature service.'
      }
    }
  }
});
