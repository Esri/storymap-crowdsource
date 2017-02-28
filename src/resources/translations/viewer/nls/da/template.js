define({
  "loading": {
    "general": "Indlæser",
    "initializing": "Indlæser historie",
    "map": "Indlæser kort"
  },
  "common": {
    "or": "eller",
    "appNamePrepend": "Story Map",
    "appName": "Crowdsource",
    "buttons": {
      "save": "Gem",
      "saving": "Gemmer",
      "close": "Luk"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Redigér historie",
      "hide": "Skjul"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Del på Facebook",
      "twitter": "Del på Twitter",
      "link": "Hent indlejret kode, eller kopier et kort link"
    },
    "link": {
      "title": "Opdatér",
      "copied": "Kopieret",
      "linkHeader": "Link til historie",
      "linkHelper": "Del denne historie via e-mail eller sociale medier med linket nedenfor.",
      "copyShortLink": "Kopiér kort link",
      "showShortLink": "Vis kort link",
      "copyFullLink": "Kopiér hele URL'en",
      "showFullLink": "Vis hele linket",
      "embedSizeHelper": "Størrelse (bredde/højde)",
      "embedCodeHeader": "Indlejre på websted",
      "embedCodeHelper": "Brug følgende HTML-kode til at indlejre historien i en webside.",
      "copyEmbedCode": "Kopiér indlejret kode"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Vis kort",
        "galleryView": "Vis galleri"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Hjem",
      "map": "Kort",
      "gallery": "Galleri",
      "participate": "Deltag"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Vælg en indstilling..."
    },
    "photo": {
      "loading": "Indlæser foto",
      "resizing": "Ændrer størrelse på foto"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Gå til hjem-position"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Vis større",
    "review": {
      "title": "Gennemse element",
      "options": {
        "approve": "Godkend",
        "reject": "Afvis"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Log ind",
      "services": {
        "arcgis": "Log ind med ArcGIS",
        "facebook": "Log ind med Facebook",
        "google": "Log ind med Google",
        "guest": "Fortsæt som gæst"
      },
      "loginDescription": "Hvis du vil deltage, skal du bruge en af indstillingerne ovenfor.",
      "loginDescriptionSingle": "Hvis du vil deltage, skal du bruge indstillingen ovenfor."
    },
    "form": {
      "photo": {
        "pickFile": "Klik for at vælge en fil",
        "choosePhoto": "Overfør et foto",
        "selectNew": "Brug et andet foto",
        "photoTooSmall": "Dit foto er for lille. Den korteste side skal være mindst"
      },
      "location": {
        "gettingLocation": "Finder",
        "locate": "Find mig",
        "findOnMap": "Find på kort",
        "findOnMapTooltip": "Klik på kortet, eller træk dette punkt for at indsnævre din position.",
        "saveLocation": "Gem position",
        "search": "Søg",
        "longitude": "Længde",
        "latitude": "Bredde",
        "nullIsland": "Ingen ø",
        "photoLocation": "Vil du bruge den position, hvor dit foto er taget?"
      },
      "termsAndConditions": {
        "buttonShow": "Vis vilkår og betingelser",
        "buttonHide": "Skjul vilkår og betingelser"
      },
      "save": "Acceptér Vilkår og send",
      "saving": "Sender",
      "requiredWarning": "Obligatoriske felter:",
      "changedCloseWarning": "Er du sikker på, at du vil lukke? Dine ændringer vil gå tabt."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Tak for din deltagelse.",
        "body": "Dit bidrag er blevet afsendt, og det vil blive vist på kortet, når det er blevet gennemgået og godkendt. Kom tilbage senere.",
        "confirmBtn": "OK"
      },
      "contributionError": {
        "title": "Bemærk",
        "body": "Der er opstået en ukendt fejl, og dit bidrag kunne ikke gemmes. Opdatér din browser, og prøv igen.",
        "confirmBtn": "OK"
      }
    }
  },
  "validations": {
    "fix": "Ret det!",
    "basic": {
      "noValue": "Ingen værdi angivet",
      "required": "En <% attribut %> er påkrævet.",
      "regex": "<% attributten %> matcher ikke det påkrævede mønster.",
      "max": {
        "string": "<% attributten %> kan ikke indeholde mere end <% maks.%> tegn.",
        "number": "<% attributten %> skal være mindre end eller lig med <% maks %>."
      },
      "acceptedTerms": "Du skal acceptere vilkårene og betingelserne, før du deler.",
      "https": "<% attributten %> skal være indlæst via en sikker forbindelse. URL'en må ikke begynde med \"https://\" eller \"//\" for at blive indlæst korrekt.",
      "imageUrl": "<% attributten %> skal være en gyldig billede-URL. I de fleste tilfælde slutter URL'en med filtypenavnet \".jpg\", \".gif\" eller \".png\"."
    },
    "pattern": {
      "commaSeparated": "<% attributten %> må ikke indeholde mellemrum.",
      "noNewLine": "<% attributten %> må ikke indeholde linjeskift."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "<% attributten %> indeholder ikke-understøttet HTML-kode."
      },
      "location": {
        "notValid": "Den angivne position er ikke gyldig. Prøv igen.",
        "noResults": "Den position, du søgte efter, blev ikke fundet. Prøv igen, og vær så præcis, som du kan."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Begynd med at udvikle en ny Crowdsource-historie"
    },
    "loading": {
      "heading": "Bemærk",
      "invalidConfig": "Ugyldig konfiguration",
      "inaccessibleApp": "Webkortapplikationen findes ikke eller er utilgængelig.",
      "invalidConfigNoApp": "Der er ikke angivet et gyldigt webkortapplikations-ID i applikationens index.html-fil eller URL. Korrigér appid, og prøv igen.",
      "unspecifiedConfigOwner": "Der er ikke konfigureret en uautoriseret ejer.",
      "invalidConfigOwner": "Historieejeren er ikke autoriseret.",
      "createMap": "Kan ikke oprette kort",
      "notAuthorizedApp": "Du er ikke autoriseret til at få adgang til denne historie",
      "notAuthorizedMap": "Du er ikke autoriseret til at få adgang til webkortet i denne historie",
      "notAuthorizedLayers": "Du er ikke autoriseret til at vise et eller flere lag i dette webkort",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Opdater din browser</a>.",
      "mapLoadingFail": "Noget gik galt, kortet blev ikke indlæst korrekt.",
      "appLoadingFail": "Noget gik galt, app'en blev ikke indlæst korrekt.",
      "crowdsourceLayerNotFound": "Noget gik galt, historien kunne ikke finde eller indlæse crowdsource-kortlaget korrekt."
    },
    "sharing": {
      "localhost": "URL'er med \"localhost\" kan ikke deles."
    },
    "selectedDisplay": {
      "noPhoto": "Fejl: Foto findes ikke eller er utilgængeligt."
    }
  }
});