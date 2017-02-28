define({
  "loading": {
    "general": "Laster inn",
    "initializing": "Laster inn historien",
    "map": "Laster inn kart"
  },
  "common": {
    "or": "eller",
    "appNamePrepend": "Fortellingskart",
    "appName": "Crowdsource",
    "buttons": {
      "save": "Lagre",
      "saving": "Lagrer",
      "close": "Ja"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Rediger historie",
      "hide": "Skjul"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Del på Facebook",
      "twitter": "Del på Twitter",
      "link": "Få innbyggingskoden eller kopier en kort kobling"
    },
    "link": {
      "title": "Del",
      "copied": "Kopiert",
      "linkHeader": "Koble til historien",
      "linkHelper": "Del denne historien via e-post eller sosiale medier med koblingen nedenfor.",
      "copyShortLink": "Kopier kort kobling",
      "showShortLink": "Vis kort kobling",
      "copyFullLink": "Kopier komplett URL",
      "showFullLink": "Vis komplett kobling",
      "embedSizeHelper": "Størrelse (bredde/høyde)",
      "embedCodeHeader": "bygge inn på webområde",
      "embedCodeHelper": "Bruk følgende HTML-kode for å bygge inn historien på en webside.",
      "copyEmbedCode": "Kopier innebygd kode"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Vis kart",
        "galleryView": "Vis galleri"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Hjem",
      "map": "Kart",
      "gallery": "Galleri",
      "participate": "Delta"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Velg et alternativ ..."
    },
    "photo": {
      "loading": "Laster inn foto",
      "resizing": "Endrer størrelsen på foto"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Gå til startlokasjonen"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Vis større",
    "review": {
      "title": "Vurder element",
      "options": {
        "approve": "Godkjenn",
        "reject": "Avvis"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Logg inn",
      "services": {
        "arcgis": "Logg på med ArcGIS",
        "facebook": "Logg på med Facebook",
        "google": "Logg på med Google",
        "guest": "Fortsett som gjest"
      },
      "loginDescription": "Bruk et av alternativene nedenfor til å bli med.",
      "loginDescriptionSingle": "Bruk alternativet ovenfor for å bli med."
    },
    "form": {
      "photo": {
        "pickFile": "Klikk for å velge en fil",
        "choosePhoto": "Last opp et bilde",
        "selectNew": "Bruke et annet bilde",
        "photoTooSmall": "Bildet er for lite. Den minste siden må være minst"
      },
      "location": {
        "gettingLocation": "Lokaliserer",
        "locate": "Finn meg",
        "findOnMap": "Finn på kart",
        "findOnMapTooltip": "Klikk på kartet eller dra dette punktet for å avgrense lokasjonen din.",
        "saveLocation": "Lagre lokasjon",
        "search": "Søk",
        "longitude": "Lengdegrad",
        "latitude": "Breddegrad",
        "nullIsland": "Null Øy",
        "photoLocation": "Vil du bruke lokasjonen der bildet ble tatt?"
      },
      "termsAndConditions": {
        "buttonShow": "Vis vilkår",
        "buttonHide": "Skjul vilkår"
      },
      "save": "Godta vilkårene og send inn",
      "saving": "Sender inn",
      "requiredWarning": "Obligatoriske felter",
      "changedCloseWarning": "Er du sikker på at du vil lukke? Du mister endringene."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Takk for deltakelsen.",
        "body": "Bidraget er sendt inn og vil vises på kartet etter at det er blitt gjennomgått og godkjent. Prøv igjen senere.",
        "confirmBtn": "Ok"
      },
      "contributionError": {
        "title": "Obs!",
        "body": "En ukjent feil har oppstått, og ditt bidrag kan ikke lagres. Oppdater nettleseren og prøv igjen.",
        "confirmBtn": "Ok"
      }
    }
  },
  "validations": {
    "fix": "Fiks det!",
    "basic": {
      "noValue": "Ingen verdi ble oppgitt",
      "required": "En <% attribute %> er påkrevd.",
      "regex": "<% attribute %> samsvarer ikke med det påkrevde mønsteret.",
      "max": {
        "string": "<% attribute %> kan ikke inneholde flere enn <% max %> tegn.",
        "number": "<% attribute %> må være mindre enn eller lik <% max %>."
      },
      "acceptedTerms": "Du må godta vilkårene før deling.",
      "https": "<% attribute %> må lastes inn over en sikker tilkobling. URL-en må begynne med «https://» eller «//» for å lastes inn korrekt.",
      "imageUrl": "<% attribute %> må være en gyldig bilde-URL. I de fleste tilfeller slutter URL-en på «.jpg», «.gif» eller «.png»."
    },
    "pattern": {
      "commaSeparated": "<% attribute %> kan ikke inneholde noen mellomrom.",
      "noNewLine": "<% attribute %> kan ikke inneholde linjeskift."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "<% attribute %> inneholder HTML-kode som ikke støttes."
      },
      "location": {
        "notValid": "Lokasjonen du oppga, er ikke gyldig.",
        "noResults": "Stedet du søkte etter, ble ikke funnet. Prøv igjen, og vær så spesifikk du kan."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Begynn å bygge en ny Crowdsource-historie"
    },
    "loading": {
      "heading": "Obs!",
      "invalidConfig": "Ugyldig konfigurasjon",
      "inaccessibleApp": "Webkartapplikasjonen eksisterer ikke eller er utilgjengelig.",
      "invalidConfigNoApp": "En gyldig webkartapplikasjons-ID er ikke spesifisert i applikasjonens index.html-fil eller URL. Korriger APPID og prøv igjen.",
      "unspecifiedConfigOwner": "Godkjent eier er ikke konfigurert.",
      "invalidConfigOwner": "Historieeier er ikke godkjent.",
      "createMap": "Kan ikke opprette kart",
      "notAuthorizedApp": "Du har ikke tillatelse til å lese denne historien",
      "notAuthorizedMap": "Du har ikke godkjent tilgang til webkartet i denne historien",
      "notAuthorizedLayers": "Du har ikke godkjennelse til å se ett eller flere lag i webkartet",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Oppdater nettleseren din</a>.",
      "mapLoadingFail": "Noe gikk galt, og kartet ble ikke lastet inn på riktig måte.",
      "appLoadingFail": "Noe gikk galt, og applikasjonen ble ikke lastet inn på riktig måte.",
      "crowdsourceLayerNotFound": "Noe gikk galt, og historien kunne ikke finne eller laste inn crowdsourcekartlaget korrekt."
    },
    "sharing": {
      "localhost": "URL-er med «localhost» kan ikke deles"
    },
    "selectedDisplay": {
      "noPhoto": "Feil: Bildet eksisterer ikke eller det er utilgjengelig."
    }
  }
});