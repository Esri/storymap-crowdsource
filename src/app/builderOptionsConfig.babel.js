import Helper from 'babel/utils/helper/Helper';
import builderText from 'i18n!translations/builder/nls/template';

export const builderDefaults = {
	defaults: {
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
						webmap: '979c6cc89af9449cbeb5342a439c6a76',
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
					type: 'scroll',
					font: "DEFAULT_FONT_CSS_APPENDED_HERE",
					styles: "SCROLL_LAYOUT_CSS_APPENDED_HERE",
					theme: "DEFAULT_THEME_CSS_APPENDED_HERE"
				}
			}
		}
	}
};

export default {
	builderDefaults
};
