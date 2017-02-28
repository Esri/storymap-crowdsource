define({
  "loading": {
    "general": "Ielādē",
    "initializing": "Ielādē stāstu",
    "map": "Ielādē karti"
  },
  "common": {
    "or": "vai",
    "appNamePrepend": "Story Map",
    "appName": "Crowdsource",
    "buttons": {
      "save": "Saglabāt",
      "saving": "Saglabā",
      "close": "Aizvērt"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Labot stāstu",
      "hide": "Paslēpt"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Kopīgot Facebook",
      "twitter": "Kopīgot Twitter",
      "link": "Iegūt iedarināto kodu vai kopēt īsu saiti"
    },
    "link": {
      "title": "Kopīgot",
      "copied": "Nokopēts",
      "linkHeader": "Saite uz stāstu",
      "linkHelper": "Kopīgot šo stāstu, e-pastā vai sociālajos tīklos, nosūtot tālāk norādīto saiti.",
      "copyShortLink": "Kopēt īso saiti",
      "showShortLink": "Rādīt īso saiti",
      "copyFullLink": "Kopēt pilno vietrādi URL",
      "showFullLink": "Rādīt pilno saiti",
      "embedSizeHelper": "Izmērs (platums/augstums)",
      "embedCodeHeader": "Iedarināt tīmekļa vietnē",
      "embedCodeHelper": "Lai iedarinātu stāstu web lapā, izmantojiet šo HTML kodu.",
      "copyEmbedCode": "Kopēt iedarināto kodu"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Skatīt karti",
        "galleryView": "Skatīt galeriju"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Sākums",
      "map": "Karte",
      "gallery": "Galerija",
      "participate": "Piedalīties"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Izvēlieties iespēju..."
    },
    "photo": {
      "loading": "Foto ielādēšana",
      "resizing": "Foto izmēru maiņa"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Doties uz sākuma izvietojumu"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Skatīt lielāku",
    "review": {
      "title": "Pārskatīt vienību",
      "options": {
        "approve": "Apstiprināt",
        "reject": "Noraidīt"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Pierakstīties",
      "services": {
        "arcgis": "Pierakstīties ar ArcGIS",
        "facebook": "Pierakstīties ar Facebook",
        "google": "Pierakstīties ar Google",
        "guest": "Turpināt kā viesim"
      },
      "loginDescription": "Lai piedalītos, izmantojiet vienu no augstāk norādītajām izvēlnēm.",
      "loginDescriptionSingle": "Lai piedalītos, izmantojiet augstāk norādīto izvēlni."
    },
    "form": {
      "photo": {
        "pickFile": "Noklikšķiniet, lai izvēlētos failu",
        "choosePhoto": "Augšupielādēt foto",
        "selectNew": "Izmantot citu foto",
        "photoTooSmall": "Jūsu foto ir pārāk mazs. Mazākajai pusei ir jābūt vismaz"
      },
      "location": {
        "gettingLocation": "Meklē novietojumu",
        "locate": "Noteikt manu atrašanās vietu",
        "findOnMap": "Atrast kartē",
        "findOnMapTooltip": "Lai precizētu jūsu novietojumu, noklikšķiniet kartē vai velciet šo punktu.",
        "saveLocation": "Saglabāt novietojumu",
        "search": "Meklēt",
        "longitude": "Garums",
        "latitude": "Platums",
        "nullIsland": "Null Island",
        "photoLocation": "Vai vēlaties izmantot novietojumu, kur ticis uzņemts foto?"
      },
      "termsAndConditions": {
        "buttonShow": "Rādīt noteikumus un nosacījumus",
        "buttonHide": "Paslēpt noteikumus un nosacījumus"
      },
      "save": "Piekrist noteikumiem un iesniegt",
      "saving": "Iesniegšana",
      "requiredWarning": "Obligāti aizpildāmie lauki",
      "changedCloseWarning": "Vai tiešām vēlaties aizvērt? Jūsu veiktās izmaiņas zudīs."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Paldies par līdzdalību!",
        "body": "Jūsu pienesums ir iesniegts, un pēc izskatīšanas un apstiprināšanas tas parādīsies kartē. Atgriezieties atkal vēlāk.",
        "confirmBtn": "Labi"
      },
      "contributionError": {
        "title": "Uzmanību!",
        "body": "Radusies nezināma kļūda, un jūsu pienesumu nevarēja saglabāt. Atjaunojiet pārlūku un mēģiniet vēlreiz.",
        "confirmBtn": "Labi"
      }
    }
  },
  "validations": {
    "fix": "Labot!",
    "basic": {
      "noValue": "Nav norādīta neviena vērtība",
      "required": "Ir jānorāda <% attribute %>.",
      "regex": "<% attribute %> neatbilst paredzētajam modelim.",
      "max": {
        "string": "<% attribute %> nevar būt vairāk kā <% max %> rakstzīmju.",
        "number": "<% attribute %> ir jābūt mazākam par vai vienādam ar <% max %>."
      },
      "acceptedTerms": "Pirms kopīgošanas ir jāpiekrīt noteikumiem un nosacījumiem.",
      "https": "<% attribute %> ir jāielādē, izmantojot drošu savienojumu. Lai ielāde notiktu pareizi, vietrādim URL ir jāsākas ar \"https://\" vai \"//\".",
      "imageUrl": "<% attribute %> jābūt derīgam attēla URL. Vairākumā gadījumu vietrādis beidzas ar paplašinājumu \".jpg\", \".gif\"., vai \".png\"."
    },
    "pattern": {
      "commaSeparated": "<% attribute %> nevar saturēt atstarpes.",
      "noNewLine": "<% attribute %> nevar saturēt rindiņu pārtraukumus."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "<% attribute %> satur neatbalstītu HTML."
      },
      "location": {
        "notValid": "Jūsu ievadītais izvietojums nav derīgs; mēģiniet vēlreiz.",
        "noResults": "Jūsu meklēto izvietojumu nevar atrast. Mēģiniet norādīt pēc iespējas precīzāk."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Sākt veidot jaunu Crowdsource Story"
    },
    "loading": {
      "heading": "Uzmanību!",
      "invalidConfig": "Nederīga konfigurācija",
      "inaccessibleApp": "Tīmekļa kartēšanas lietotne neeksistē vai nav pieejama.",
      "invalidConfigNoApp": "Lietotnes index.html failā vai vietrādī URL nav norādīts derīgs tīmekļa kartēšanas lietotnes ID. Izlabojiet appid un mēģiniet vēlreiz.",
      "unspecifiedConfigOwner": "Pilnvarotais īpašnieks nav konfigurēts.",
      "invalidConfigOwner": "Stāsta īpašnieks nav pilnvarots.",
      "createMap": "Nevar izveidot karti",
      "notAuthorizedApp": "Jūs neesat pilnvarots piekļūt šim stāstam",
      "notAuthorizedMap": "Jūs neesat pilnvarots piekļūt tīmekļa kartei šajā stāstā",
      "notAuthorizedLayers": "Jūs neesat pilnvarots skatīt vienu vai vairākus slāņus tīmekļa kartē",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Atjaunojiet savu pārlūku</a>.",
      "mapLoadingFail": "Radās kļūda — karte netika ielādēta pareizi.",
      "appLoadingFail": "Radās kļūda — lietotne netika ielādēta pareizi.",
      "crowdsourceLayerNotFound": "Radusies kāda kļūda — stāsts nevarēja atrast vai pareizi ielādēt Crowdsource kartes slāni."
    },
    "sharing": {
      "localhost": "Vietrāžus URL ar \"localhost\" nevar kopīgot."
    },
    "selectedDisplay": {
      "noPhoto": "Kļūda. Foto nepastāv vai tam nevar piekļūt."
    }
  }
});