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
      common: {
        advancedOptions: 'Advanced Options',
        welcome: 'Welcome to'
      },
      itemName: {
        header: 'What do you want to call your Crowdsource story?',
        advancedDescription: 'A few items will be created to support this story. If you wish to rename these items or save them in a specific folder you can do so below.',
        form: {
          appName: {
            label: 'Title',
            placeholder: 'Enter title'
          },
          mapName: {
            label: 'Map Name',
            placeholder: 'Enter name'
          },
          folderSelection: {
            label: 'Folder',
            rootFolder: 'Home'
          },
          featureServiceName: {
            label: 'Layer Name',
            placeholder: 'Enter name'
          }
        }
      },
      layout: {
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
        subtitle: 'Add your your subtitle here'
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
    },
    validations: {
      arcgis: {
        naming: {
          arcgisItemName: 'The <% attribute %> may not contain < or >.',
          arcgisServiceNameFormat: 'The <% attribute %> may contain only contain letters, numbers, and underscores.'
        },
        portal: {
          unableToCheckName: 'An unknown error occured and we are unable to check if the name is available. Please try again later.',
          nameNotString: 'Name must be normal text',
          nameNotAvailableFS: 'The name you have chosen for your layer is not available. Please choose a different name.'
        }
      }
    }
  }
});
