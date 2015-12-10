import Helper from 'babel/utils/helper/Helper';
import builderText from 'i18n!translations/builder/nls/template';

export const builderDefaults = {
	appData: {
		values: {
			settings: {
				intro: {
					title: builderText.appDataPlaceholderText.intro.title,
					subtitle: builderText.appDataPlaceholderText.intro.subtitle,
					background: {
						type: 'photo',
						source: 'resources/images/splash/splash' + Helper.mathUtils.getRandomIntInclusive(1,12) + '.jpg'
					}
				},
				header: {
					title: builderText.appDataPlaceholderText.header.title,
					logo: {
						source: 'resources/images/logo/esri-logo-reversed.svg',
						link: 'http://www.esri.com/'
					}
				},
				map: {
					crowdsourceLayer: {},
					webmap: '8b3d38c0819547faa83f7b7aca80bd76',
					webmapOptions: {
						ignorePopups: true,
						mapOptions: {}
					}
				},
				globals: {
					participateShort: builderText.appDataPlaceholderText.globals.participateShort,
					participateLong: builderText.appDataPlaceholderText.globals.participateLong,
					exploreText: builderText.appDataPlaceholderText.globals.exploreText,
					social: {
						facebook: true,
						twitter: true,
						link: true
					}
				}
			},
			layout: {
				id: 'scroll',
				font: "DEFAULT_FONT_CSS_APPENDED_HERE",
				styles: "SCROLL_LAYOUT_CSS_APPENDED_HERE",
				theme: "DEFAULT_THEME_CSS_APPENDED_HERE"
			}
		}
	}
};

export const appItemDefaults = {
	tags: ['Story Map, Story Maps, Crowdsource'],
	type: 'Web Mapping Application',
	typeKeywords: ['Story Map', 'Story Maps', 'Crowdsource','StoryMap-Crowdsource', 'JavaScript', 'Map', 'Mapping Site', 'Online Map', 'Ready To Use', 'selfConfigured', 'Web Map']
};

export const featureServiceDefaults = {
	capabilities: 'Query,Sync',
	supportsDisconnectedEditing: true,
	spatialReference: {
		wkid: 4326
	},
	initialExtent: {
		xmin: -179,
		ymin: -80,
		xmax: 179,
		ymax: 80,
		spatialReference: {
			wkid: 4326
		}
	},
	units: 'esriDecimalDegrees',
	editorTrackingInfo: {
		enableEditorTracking: true,
		enableOwnershipAccessControl: false,
		allowOthersToQuery: true,
		allowOthersToUpdate: false,
		allowOthersToDelete: false
	},
	xssPreventionInfo: {
		xssPreventionEnabled: true,
		xssPreventionRule: 'InputOnly',
		xssInputRule: 'sanitizeInvalid'
	}
};

export const featureServiceItemDefaults = {
	tags: ['Story Map, Story Maps, Crowdsource'],
	type: 'Web Map',
	typeKeywords: ['Story Map', 'Story Maps', 'Crowdsource','StoryMap-Crowdsource-Webmap', 'Feature Service']
};

export const crowdsourceLayerDefinition = {
	layers: [{
		id: 0,
		name: 'crowdsourceFeatures',
		type: 'Feature Layer',
		ownershipBasedAccessControlForFeatures: {
			allowOthersToQuery: true,
			allowOthersToDelete: false,
			allowOthersToUpdate: false
		},
		editFieldsInfo: {
			creationDateField: 'CreationDate',
			creatorField: 'Creator',
			editDateField: 'EditDate',
			editorField: 'Editor'
		},
		drawingInfo: {
			renderer: {
				type: 'simple',
				symbol: {
					type: 'esriSMS',
					style: 'esriSMSCircle',
					color: [133, 0, 11, 255],
					size: 4,
					angle: 0,
					xoffset: 0,
					yoffset: 0,
					outline: {
						color: [0, 0, 0, 255],
						width: 1
					}
				},
				label: '',
				description: ''
			},
			transparency: 0,
			labelingInfo: null
		},
		capabilities: 'Create,Query,Editing,Sync',
		hasAttachments: true,
		objectIdField: 'objectid',
		fields: [{
      name: 'objectid',
      type: 'esriFieldTypeOID',
      alias: 'Object ID',
      sqlType: 'sqlTypeOther',
      nullable: false,
      editable: false,
      domain: null,
      defaultValue: null
    },
    {
      name: 'CreationDate',
      type: 'esriFieldTypeDate',
      alias: 'CreationDate',
      sqlType: 'sqlTypeOther',
      length: 8,
      nullable: true,
      editable: false,
      domain: null,
      defaultValue: null
    },
    {
      name: 'Creator',
      type: 'esriFieldTypeString',
      alias: 'Creator',
      sqlType: 'sqlTypeOther',
      length: 50,
      nullable: true,
      editable: false,
      domain: null,
      defaultValue: null
    },
    {
      name: 'EditDate',
      type: 'esriFieldTypeDate',
      alias: 'EditDate',
      sqlType: 'sqlTypeOther',
      length: 8,
      nullable: true,
      editable: false,
      domain: null,
      defaultValue: null
    },
    {
      name: 'Editor',
      type: 'esriFieldTypeString',
      alias: 'Editor',
      sqlType: 'sqlTypeOther',
      length: 50,
      nullable: true,
      editable: false,
      domain: null,
      defaultValue: null
    }]
	}]
};

export const webmapItemDefaults = {
	tags: ['Story Map, Story Maps, Crowdsource'],
	type: 'Web Map',
	typeKeywords: ['Story Map', 'Story Maps', 'Crowdsource','StoryMap-Crowdsource-Webmap', 'Web Map']
};

export const crowdsourceLayerWebmapDefinition = {
	visibility: true,
	opacity: 1,
	mode: 0
};

export const basemapsWebmapDefinitions = {
	lightGray: {
		baseMapLayers: [{
			id: 'World_Light_Gray_Base_7270',
			opacity: 1,
			visibility: true,
			url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer'
		}, {
			id: 'World_Light_Gray_Reference_6243',
			isReference: true,
			opacity: 1,
			visibility: true,
			url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer'
		}],
		title: "Light Gray Canvas"
	}
};

export const builderOptions = {
	layouts: [{
		id: 'scroll',
		style: "SCROLL_LAYOUT_CSS_APPENDED_HERE"
	}],
	fonts: [{
		id: 'latoMerriweather',
		name: 'Lato and Merriweather',
		css: "DEFAULT_FONT_CSS_APPENDED_HERE"
	}]
};

export default {
	appItemDefaults,
	basemapsWebmapDefinitions,
	builderDefaults,
	builderOptions,
	crowdsourceLayerDefinition,
	crowdsourceLayerWebmapDefinition,
	featureServiceItemDefaults,
	featureServiceDefaults,
	webmapItemDefaults
};
