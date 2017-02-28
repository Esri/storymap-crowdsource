define({
  "loading": {
    "general": "Ladataan",
    "initializing": "Ladataan tarinaa",
    "map": "Ladataan karttaa"
  },
  "common": {
    "or": "tai",
    "appNamePrepend": "Tarinakartta",
    "appName": "Crowdsource",
    "buttons": {
      "save": "Tallenna",
      "saving": "Tallennetaan",
      "close": "Sulje"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Muokkaa tarinaa",
      "hide": "Piilota"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Jaa Facebookissa",
      "twitter": "Jaa Twitterissä",
      "link": "Hanki upotuskoodi tai kopioi lyhyt linkki"
    },
    "link": {
      "title": "Jaa",
      "copied": "Kopioitu",
      "linkHeader": "Linkki tarinaan",
      "linkHelper": "Jaa tämä tarina sähköpostitse tai yhteisöpalvelun kautta alla olevan linkin avulla.",
      "copyShortLink": "Kopioi lyhyt linkki",
      "showShortLink": "Näytä lyhyt linkki",
      "copyFullLink": "Kopioi koko URL-osoite",
      "showFullLink": "Näytä koko linkki",
      "embedSizeHelper": "Koko (leveys/korkeus)",
      "embedCodeHeader": "Upota Web-sivustoon",
      "embedCodeHelper": "Käytä seuraavaa HTML-koodia tarinan upottamiseen Web-sivulle.",
      "copyEmbedCode": "Kopioi upotettu koodi"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Näytä kartta",
        "galleryView": "Näytä galleria"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Koti",
      "map": "Kartta",
      "gallery": "Galleria",
      "participate": "Osallistu"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Valitse asetus..."
    },
    "photo": {
      "loading": "Ladataan valokuvaa",
      "resizing": "Muutetaan valokuvan kokoa"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Siirry kodin sijaintiin"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Näytä suurempana",
    "review": {
      "title": "Tarkista kohde",
      "options": {
        "approve": "Hyväksy",
        "reject": "Hylkää"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Kirjaudu sisään",
      "services": {
        "arcgis": "Kirjaudu sisään ArcGIS-tunnuksella",
        "facebook": "Kirjaudu sisään Facebook-tunnuksella",
        "google": "Kirjaudu sisään Google-tunnuksella",
        "guest": "Jatka käyttöä vierailijana"
      },
      "loginDescription": "Jos haluat osallistua, käytä jotakin alla olevista vaihtoehdoista.",
      "loginDescriptionSingle": "Jos haluat osallistua, käytä yllä olevaa vaihtoehtoa."
    },
    "form": {
      "photo": {
        "pickFile": "Valitse tiedosto napsauttamalla",
        "choosePhoto": "Lataa valokuva",
        "selectNew": "Käytä toista valokuvaa",
        "photoTooSmall": "Valokuvasi on liian pieni. Lyhimmän sivun on oltava vähintään"
      },
      "location": {
        "gettingLocation": "Paikannetaan",
        "locate": "Paikanna minut",
        "findOnMap": "Etsi kartalta",
        "findOnMapTooltip": "Napsauta karttaa tai tarkenna sijaintia vetämällä tätä pistettä.",
        "saveLocation": "Tallenna sijainti",
        "search": "Etsi",
        "longitude": "Pituusaste",
        "latitude": "Leveysaste",
        "nullIsland": "Null Island",
        "photoLocation": "Haluatko käyttää sijaintia, jossa valokuva on otettu?"
      },
      "termsAndConditions": {
        "buttonShow": "Näytä käyttöehdot",
        "buttonHide": "Piilota käyttöehdot"
      },
      "save": "Hyväksy ehdot ja lähetä",
      "saving": "Lähetetään",
      "requiredWarning": "Pakolliset kentät",
      "changedCloseWarning": "Haluatko varmasti sulkea? Menetät tekemäsi muutokset."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Kiitos osallistumisesta.",
        "body": "Lisäyksesi on lähetetty ja se näkyy kartassa, kun se on tarkistettu ja hyväksytty. Palaa myöhemmin tarkistamaan tilanne.",
        "confirmBtn": "OK"
      },
      "contributionError": {
        "title": "Huomio",
        "body": "On ilmennyt tuntematon virhe ja lisäyksesi tallennus ei onnistunut. Päivitä selaimesi ja yritä uudelleen.",
        "confirmBtn": "OK"
      }
    }
  },
  "validations": {
    "fix": "Korjaa se!",
    "basic": {
      "noValue": "Arvoa ei ole annettu",
      "required": "Ominaisuustieto <% attribute %> on pakollinen.",
      "regex": "Ominaisuustieto <% attribute %> ei vastaa pyydettyä mallia.",
      "max": {
        "string": "Ominaisuustieto <% attribute %> ei voi sisältää enempää kuin <% max %> merkkiä.",
        "number": "Ominaisuustiedon <% attribute %> on oltava pienempi tai yhtä suuri kuin <% max %>."
      },
      "acceptedTerms": "Käyttöehdot on hyväksyttävä ennen jakamista.",
      "https": "Ominaisuustieto <% attribute %> on ladattava suojatun yhteyden kautta. URL-osoitteen alussa on oltava \"https://\" tai \"//\", jotta lataus onnistuu.",
      "imageUrl": "Ominaisuustiedon <% attribute %> on oltava kelvollinen kuvan URL-osoite. Useimmissa tapauksissa URL-osoite päättyy tunnisteeseen \".jpg\", \".gif\". tai \".png\"."
    },
    "pattern": {
      "commaSeparated": "Ominaisuustieto <% attribute %> ei saa sisältää välilyöntejä.",
      "noNewLine": "Ominaisuustieto <% attribute %> ei saa sisältää rivinvaihtomerkkejä."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "Ominaisuustieto <% attribute %> sisältää HTML-koodia, jota ei tueta."
      },
      "location": {
        "notValid": "Antamasi sijainti ei kelpaa. Yritä uudelleen.",
        "noResults": "Etsimääsi sijaintia ei löytynyt. Yritä uudelleen ja ole mahdollisimman tarkka."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Aloita uuden Crowdsource-tarinan luonti"
    },
    "loading": {
      "heading": "Huomio",
      "invalidConfig": "Virheellinen määritys",
      "inaccessibleApp": "Web-karttasovellusta ei ole tai sitä ei voi käyttää.",
      "invalidConfigNoApp": "Kelvollista Web-karttasovelluksen tunnusta ei ole määritetty sovelluksen index.html-tiedostossa tai URL-osoitteessa. Korjaa sovellustunnus ja yritä uudelleen.",
      "unspecifiedConfigOwner": "Valtuutettua omistajaa ei ole määritetty.",
      "invalidConfigOwner": "Tarinan omistajalla ei ole valtuuksia.",
      "createMap": "Karttaa ei voi luoda",
      "notAuthorizedApp": "Sinulla ei ole tämän tarinan käyttöoikeuksia",
      "notAuthorizedMap": "Sinulla ei ole tämän tarinan Web-kartan käyttöoikeuksia",
      "notAuthorizedLayers": "Sinulla ei ole vähintään yhden Web-kartan karttatason tarkasteluoikeuksia",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Päivitä selaimesi</a>.",
      "mapLoadingFail": "Tapahtui virhe, eikä kartta latautunut oikein.",
      "appLoadingFail": "Tapahtui virhe, eikä sovellus latautunut oikein.",
      "crowdsourceLayerNotFound": "Tapahtui virhe, eikä tarina löytänyt Crowdsource-kartan karttatasoa tai pystynyt lataamaan sitä oikein."
    },
    "sharing": {
      "localhost": "Localhost-määritteen sisältäviä URL-osoitteita ei voi jakaa."
    },
    "selectedDisplay": {
      "noPhoto": "Virhe: valokuvaa ei ole, tai se ei ole käytettävissä."
    }
  }
});