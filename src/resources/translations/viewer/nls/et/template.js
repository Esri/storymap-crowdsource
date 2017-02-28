define({
  "loading": {
    "general": "Laadimine",
    "initializing": "Loo laadimine",
    "map": "Kaardi laadimine"
  },
  "common": {
    "or": "või",
    "appNamePrepend": "Kaardilugu",
    "appName": "Ühisloome",
    "buttons": {
      "save": "Salvesta",
      "saving": "Salvestamine",
      "close": "Sule"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Redigeeri lugu",
      "hide": "Peida"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Jaga Facebookis",
      "twitter": "Jaga Twitteris",
      "link": "Hangi manustatud kood või kopeeri lühilink"
    },
    "link": {
      "title": "Jaga",
      "copied": "Kopeeritud",
      "linkHeader": "Loo link",
      "linkHelper": "Jaga seda lugu e-posti teel või allpool toodud lingi kaudu sotsiaalmeedias.",
      "copyShortLink": "Kopeeri lühilink",
      "showShortLink": "Näita lühilinki",
      "copyFullLink": "Kopeeri täielik URL",
      "showFullLink": "Näita täislinki",
      "embedSizeHelper": "Suurus (laius/kõrgus)",
      "embedCodeHeader": "Lisa veebisaidile",
      "embedCodeHelper": "Kasutage loo veebilehele lisamiseks järgmist HTML-koodi.",
      "copyEmbedCode": "Kopeeri lisatud kood"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Kuva kaart",
        "galleryView": "Kuva galerii"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Kodu",
      "map": "Kaart",
      "gallery": "Galerii",
      "participate": "Osale"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Valige suvand"
    },
    "photo": {
      "loading": "Foto laadimine",
      "resizing": "Foto suuruse muutmine"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Ava kodu asukoht"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Kuva suurem kaart",
    "review": {
      "title": "Kuva üksus uuesti",
      "options": {
        "approve": "Kinnita",
        "reject": "Lükka tagasi"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Logi sisse",
      "services": {
        "arcgis": "Logige sisse ArcGIS kasutajana",
        "facebook": "Logige sisse Facebooki konto kaudu",
        "google": "Logi sisse Google'i kontoga",
        "guest": "Jätka külalisena"
      },
      "loginDescription": "Osalemiseks valige palun üks ülaltoodud suvanditest.",
      "loginDescriptionSingle": "Osalemiseks valige palun ülaltoodud suvand."
    },
    "form": {
      "photo": {
        "pickFile": "Faili valimiseks klõpsake",
        "choosePhoto": "Laadi foto üles",
        "selectNew": "Kasuta mõnda teist fotot",
        "photoTooSmall": "Foto on liiga väike. Väiksem külg peab olema vähemalt"
      },
      "location": {
        "gettingLocation": "Paigutamine",
        "locate": "Määra minu asukoht",
        "findOnMap": "Leia kaardil",
        "findOnMapTooltip": "Asukoha täpsustamiseks klõpsake kaardil või lohistage seda punkti.",
        "saveLocation": "Salvesta asukoht",
        "search": "Otsi",
        "longitude": "Pikkuskraad",
        "latitude": "Laiuskraad",
        "nullIsland": "Nullsaar",
        "photoLocation": "Kas soovite kasutada foto tegemise kohta?"
      },
      "termsAndConditions": {
        "buttonShow": "Kuva tingimused",
        "buttonHide": "Peida tingimused"
      },
      "save": "Nõustu tingimustega ja saada",
      "saving": "Saadan...",
      "requiredWarning": "Nõutavad väljad",
      "changedCloseWarning": "Kas olete kindel, et soovite tegevuse sulgeda? Teie tehtud muudatused lähevad kaotsi."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Täname osalemise eest.",
        "body": "Teie kaastöö on saadetud ja ilmub kaardile pärast kontrollimist ja kinnitamist. Palun kontrollige kaarti hiljem.",
        "confirmBtn": "OK"
      },
      "contributionError": {
        "title": "Tähelepanu!",
        "body": "Tekkis tundmatu viga ja teie kaastööd ei olnud võimalik salvestada. Värskendage oma brauserit ja proovige uuesti.",
        "confirmBtn": "OK"
      }
    }
  },
  "validations": {
    "fix": "Parandage seda!",
    "basic": {
      "noValue": "Ühtegi väärtust ei esitatud",
      "required": "Nõutav on <% atribuut %>.",
      "regex": "<% Atribuut %> ei vasta nõutud mustrile.",
      "max": {
        "string": "<% Atribuut %> ei tohi sisaldada üle <% max %> märgi.",
        "number": "<% Atribuut %> peab olema võrdne või väiksem kui <% max %>."
      },
      "acceptedTerms": "Enne jagamist peate tingimused heaks kiitma.",
      "https": "<% Atribuut %> tuleb laadida turvalise ühenduse kaudu. Õigeks laadimiseks peab URL-i alguses olema \"https://\" või\"//\".",
      "imageUrl": "<% Atribuut %> peab olema kehtiva kujutise URL. Enamikel juhtudel lõpeb URL laienditega \".jpg\", \".gif\" või \".png\"."
    },
    "pattern": {
      "commaSeparated": "<% Atribuut %> ei tohi sisaldada tühikuid.",
      "noNewLine": "<% Atribuut %> ei tohi reavahetusi."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "<% Atribuut %> sisaldab toetuseta HTML-i."
      },
      "location": {
        "notValid": "Sisestasite kehtetu asukoha; palun proovige uuesti.",
        "noResults": "Teie otsitud asukohta ei leitud. Palun proovige uuesti ja sisestage võimalikult täpsed andmed."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Hakake looma uut ühisloome lugu"
    },
    "loading": {
      "heading": "Tähelepanu!",
      "invalidConfig": "Vigane konfiguratsioon",
      "inaccessibleApp": "Veebikaardi rakendust ei eksisteeri või see pole kättesaadav.",
      "invalidConfigNoApp": "Veebikaardi rakenduse kehtiv ID ei ole rakenduse index.html failis või URL-is määratud. Sisestage rakenduse õige ID ja proovige uuesti.",
      "unspecifiedConfigOwner": "Omanikuõigusi pole määratud.",
      "invalidConfigOwner": "Loo omanikul puuduvad õigused.",
      "createMap": "Kaarti ei saa luua",
      "notAuthorizedApp": "Teil puudub õigus sellele loole juurde pääseda",
      "notAuthorizedMap": "Teil puudub õigus selle loo veebikaardile juurde pääseda.",
      "notAuthorizedLayers": "Teil puudub õigus vaadata veebikaardi üht või mitut kihti.",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Palun uuendage oma veebibrauserit</a>.",
      "mapLoadingFail": "Midagi läks valesti ja kaarti ei laaditud õigesti.",
      "appLoadingFail": "Midagi läks valesti ja rakendust ei laaditud õigesti.",
      "crowdsourceLayerNotFound": "Midagi läks valesti; lugu ei suuda leida või laadida ühisloome kaardikihti õigesti."
    },
    "sharing": {
      "localhost": "\"Kohaliku hosti\" URL-e ei saa jagada."
    },
    "selectedDisplay": {
      "noPhoto": "Tõrge: fotot ei eksisteeri või see pole kättesaadav."
    }
  }
});