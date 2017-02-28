define({
  "loading": {
    "general": "Laddar",
    "initializing": "Läser in berättelsen",
    "map": "Laddar karta"
  },
  "common": {
    "or": "or",
    "appNamePrepend": "Story Map",
    "appName": "Crowdsource",
    "buttons": {
      "save": "Spara",
      "saving": "Sparar",
      "close": "Stäng"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Redigera berättelse",
      "hide": "Dölj"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Dela på Facebook",
      "twitter": "Dela på Twitter",
      "link": "Hämta inbäddningskod eller kopiera en kort länk"
    },
    "link": {
      "title": "Dela",
      "copied": "Kopierad",
      "linkHeader": "Länk till berättelse",
      "linkHelper": "Dela den här berättelsen med e-post eller i sociala medier med länken nedan.",
      "copyShortLink": "Kopiera kort länk",
      "showShortLink": "Visa kort länk",
      "copyFullLink": "Kopiera fullständig URL-adress",
      "showFullLink": "Visa fullständig länk",
      "embedSizeHelper": "Storlek (bredd/höjd)",
      "embedCodeHeader": "Bädda in på webbplatser",
      "embedCodeHelper": "Använd följande HTML-kod om du vill bädda in berättelsen på en webbsida.",
      "copyEmbedCode": "Kopiera inbäddad kod"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Visa karta",
        "galleryView": "Visa galleri"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Hem",
      "map": "Karta",
      "gallery": "Galleri",
      "participate": "Delta"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Välj ett alternativ..."
    },
    "photo": {
      "loading": "Läser in foto",
      "resizing": "Ändra storlek på foton"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Gå till startplats"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Visa större",
    "review": {
      "title": "Granska objekt",
      "options": {
        "approve": "Godkänn",
        "reject": "Avvisa"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Logga in",
      "services": {
        "arcgis": "Logga in med ArcGIS",
        "facebook": "Logga in med Facebook",
        "google": "Logga in med Google",
        "guest": "Fortsätt som gäst"
      },
      "loginDescription": "Använd ett av alternativen ovan om du vill delta.",
      "loginDescriptionSingle": "Använd alternativet ovan om du vill delta."
    },
    "form": {
      "photo": {
        "pickFile": "Klicka för att välja en fil",
        "choosePhoto": "Ladda upp ett foto",
        "selectNew": "Använd ett annat foto",
        "photoTooSmall": "Ditt foto är för litet. Den minsta sidan måste vara minst"
      },
      "location": {
        "gettingLocation": "Söker",
        "locate": "Hitta mig",
        "findOnMap": "Sök på karta",
        "findOnMapTooltip": "Klicka på kartan eller dra denna punkt för att förfina din position.",
        "saveLocation": "Spara plats",
        "search": "Sök",
        "longitude": "Longitud",
        "latitude": "Latitud",
        "nullIsland": "Null Island",
        "photoLocation": "Vill du använda platsen där ditt foto togs?"
      },
      "termsAndConditions": {
        "buttonShow": "Visa villkor",
        "buttonHide": "Dölj villkor"
      },
      "save": "Godkänn villkor och skicka",
      "saving": "Skickar",
      "requiredWarning": "Obligatoriska fält",
      "changedCloseWarning": "Vill du stänga? Dina ändringar sparas inte."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Tack för att du deltar.",
        "body": "Ditt bidrag har skickats och det visas på kartan när det har granskats och godkänts. Kontrollera igen senare.",
        "confirmBtn": "OK"
      },
      "contributionError": {
        "title": "Obs!",
        "body": "Ett okänt fel har inträffat och ditt bidrag kunde inte sparas. Uppdatera din webbläsare och försök igen.",
        "confirmBtn": "OK"
      }
    }
  },
  "validations": {
    "fix": "Fixa det",
    "basic": {
      "noValue": "Inget värde har angetts",
      "required": "Ett <% attribute %> krävs.",
      "regex": "<% attribute %> matchar inte mönstret.",
      "max": {
        "string": "<% attribute %> får inte innehålla fler än <% max %> tecken.",
        "number": "<% attribute %> måste vara mindre än eller lika med <% max %>."
      },
      "acceptedTerms": "Du måste godkänna villkoren innan du delar.",
      "https": "<% attribute %> måste läsas in över en säker anslutning. Webbadressen måste börja med \"https://\" eller \"//\" för att den ska läsas in korrekt.",
      "imageUrl": "<% attribute %> måste vara en giltig bild-URL. I de flesta fallen slutar URL-adressen på något av filtilläggen \".jpg\", \".gif\" och \".png\"."
    },
    "pattern": {
      "commaSeparated": "<% attribute %> får inte innehålla några mellanslag.",
      "noNewLine": "<% attribute %> får inte innehålla några radbrytningar."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "<% attribute %> innehåller HTML som inte stöds."
      },
      "location": {
        "notValid": "Den plats som du angav är inte giltig. Försök igen.",
        "noResults": "Den plats du sökte efter går inte att hitta. Försök igen och var så specifik du kan."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Börja bygga en ny Crowdsource-berättelse"
    },
    "loading": {
      "heading": "Obs!",
      "invalidConfig": "Ogiltig konfiguration",
      "inaccessibleApp": "Webbapplikationen finns inte eller går inte att komma åt.",
      "invalidConfigNoApp": "Inget giltigt ID har angetts för webbapplikationen i programmets index.html-fil eller URL. Korrigera appid och försök igen.",
      "unspecifiedConfigOwner": "Ingen auktoriserad ägare har konfigurerats.",
      "invalidConfigOwner": "Berättelsens ägare är inte auktoriserad.",
      "createMap": "Det går inte att skapa kartan",
      "notAuthorizedApp": "Du är inte behörig att öppna den här berättelsen",
      "notAuthorizedMap": "Du är inte behörig att öppna webbkartan i den här berättelsen",
      "notAuthorizedLayers": "Du har inte behörighet att visa ett eller flera lager i webbkartan",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Uppdatera webbläsaren</a>.",
      "mapLoadingFail": "Något gick fel, kartan lästes inte in på rätt sätt.",
      "appLoadingFail": "Något gick fel. Appen lästes inte in på rätt sätt.",
      "crowdsourceLayerNotFound": "Något gick fel. Berättelsen kunde inte hitta eller läsa in crowdsource-kartlagret korrekt."
    },
    "sharing": {
      "localhost": "URL-adresser med \"localhost\" kan inte delas."
    },
    "selectedDisplay": {
      "noPhoto": "Fel: Fotot finns inte eller går inte att komma åt."
    }
  }
});