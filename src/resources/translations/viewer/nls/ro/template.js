define({
  "loading": {
    "general": "Se încarcă",
    "initializing": "Se încarcă povestea",
    "map": "Se încarcă harta"
  },
  "common": {
    "or": "sau",
    "appNamePrepend": "Hartă informativă",
    "appName": "Colectare de date de la public",
    "buttons": {
      "save": "Salvare",
      "saving": "Se salvează",
      "close": "Închidere"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Editare poveste",
      "hide": "Ascundere"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Partajare pe Facebook",
      "twitter": "Partajare pe Twitter",
      "link": "Obţineţi un cod de încorporare sau copiaţi o legătură scurtă"
    },
    "link": {
      "title": "Partajare",
      "copied": "Copiat",
      "linkHeader": "Legătură către poveste",
      "linkHelper": "Partajaţi această poveste prim e-mail sau reţelele de socializare cu legătură următoare",
      "copyShortLink": "Copiere legătură scurtă",
      "showShortLink": "Afişare legătură scurtă",
      "copyFullLink": "Copiere adresă URL completă",
      "showFullLink": "Afişare legătură completă",
      "embedSizeHelper": "Dimensiune (lăţime/înălţime)",
      "embedCodeHeader": "Încorporare în site web",
      "embedCodeHelper": "Utilizaţi următorul cod HTML pentru a încorpora povestea într-o pagină web.",
      "copyEmbedCode": "Copiere cod încorporat"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Vizualizare hartă",
        "galleryView": "Vizualizare galerie"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Prima pagină",
      "map": "Hartă",
      "gallery": "Galerie",
      "participate": "Participaţi"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Vă rugăm să alegeţi o opţiune"
    },
    "photo": {
      "loading": "Se încarcă fotografia",
      "resizing": "Se redimensionează fotografia"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Accesare locaţie pornire"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Vizualizare mai mare",
    "review": {
      "title": "Verificare element",
      "options": {
        "approve": "Aprobare",
        "reject": "Respingere"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Autentificare",
      "services": {
        "arcgis": "Autentificare cu ArcGIS",
        "facebook": "Autentificare cu Facebook",
        "google": "Autentificare cu Google",
        "guest": "Continuare ca Oaspete"
      },
      "loginDescription": "Pentru a participa, vă rugăm să utilizaţi una dintre opţiunile de deasupra.",
      "loginDescriptionSingle": "Pentru a participa, vă rugăm să utilizaţi opţiunea de deasupra."
    },
    "form": {
      "photo": {
        "pickFile": "Faceţi clic pentru a alege un fişier",
        "choosePhoto": "Încărcaţi o fotografie",
        "selectNew": "Utilizaţi altă fotografie",
        "photoTooSmall": "Fotografia dvs. este prea mică. Latura scurtă trebuie să aibă o lungime de cel puţin"
      },
      "location": {
        "gettingLocation": "Se localizează",
        "locate": "Localizare proprie",
        "findOnMap": "Găsire pe hartă",
        "findOnMapTooltip": "Faceţi clic pe hartă sau trageţi acest punct pentru a rafina locaţia dvs.",
        "saveLocation": "Salvare locaţie",
        "search": "Căutare",
        "longitude": "Longitudine",
        "latitude": "Latitudine",
        "nullIsland": "Insulă nulă",
        "photoLocation": "Doriţi să utilizaţi locaţia în care a fost realizată fotografia?"
      },
      "termsAndConditions": {
        "buttonShow": "Afişare termeni şi condiţii",
        "buttonHide": "Ascundere termeni şi condiţii"
      },
      "save": "Acceptare termeni şi trimitere",
      "saving": "Se trimite",
      "requiredWarning": "Câmpuri obligatorii",
      "changedCloseWarning": "Sigur doriţi să închideţi? Modificările dvs. se vor pierde."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Mulţumim pentru participare.",
        "body": "Contribuţia dvs. a fost trimisă şi va apărea pe hartă după ce a fost verificată şi aprobată. Vă rugăm să reveniţi mai târziu.",
        "confirmBtn": "OK"
      },
      "contributionError": {
        "title": "Atenţie",
        "body": "A apărut o eroare necunoscută şi contribuţia dvs. nu a putut fi salvată. Reîmprospătaţi browserul şi încercaţi din nou.",
        "confirmBtn": "OK"
      }
    }
  },
  "validations": {
    "fix": "Rezolvaţi-o!",
    "basic": {
      "noValue": "Nu a fost introdusă nicio valoare",
      "required": "Un <% attribute %> este necesar.",
      "regex": "<% attribute %> nu corespunde cu perechea modelului solicitat.",
      "max": {
        "string": "<% attribute %> nu poate conţine mai mult de <% max %> caractere.",
        "number": "<% attribute %> trebuie să fie mai mic sau egal cu <% max %>."
      },
      "acceptedTerms": "Trebuie să acceptaţi termenii şi condiţiile înainte de partajare.",
      "https": "<% attribute %> trebuie încărcat printr-o conexiune securizată. Adresa URL trebuie să înceapă cu „https://” sau cu „//” pentru a se încărca în mod corect.",
      "imageUrl": "<% attribute %> trebuie să fie o adresă URL de imagine validă. În cele mai multe cazuri adresa URL se va termina cu extensia „.jpg”, „.gif”, sau „.png”."
    },
    "pattern": {
      "commaSeparated": "<% attribute %> nu poate conţine spaţii.",
      "noNewLine": "<% attribute %> nu poate conţine întreruperi de linii."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "<% attribute %> conţine HTML care nu este suportat."
      },
      "location": {
        "notValid": "Locaţia introdusă nu este validă, vă rugăm să încercaţi din nou.",
        "noResults": "Locaţia pe care aţi căutat-o nu poate fi găsită. Vă rugăm să încercaţi din nou şi să fiţi cât de exact cu putinţă."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Începeţi să creaţi o poveste Crowdsource nouă"
    },
    "loading": {
      "heading": "Atenţie",
      "invalidConfig": "Configurare incorectă",
      "inaccessibleApp": "Aplicaţia de cartografiere web nu există sau este inaccesibilă.",
      "invalidConfigNoApp": "Nu a fost specificat un ID de aplicaţie de cartografiere web valid în fişierul index.html sau în adresa URL a aplicaţiei. Corectaţi appid şi încercaţi din nou.",
      "unspecifiedConfigOwner": "Proprietarul autorizat nu a fost configurat.",
      "invalidConfigOwner": "Proprietarul poveştii nu este autorizat.",
      "createMap": "Imposibil de creat harta",
      "notAuthorizedApp": "Nu sunteţi autorizat să accesaţi această poveste",
      "notAuthorizedMap": "Nu sunteţi autorizat să accesaţi harta web în această poveste",
      "notAuthorizedLayers": "Nu sunteţi autorizat să vizualizaţi unul sau mai multe straturi tematice în harta web",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Actualizaţi browserul</a>.",
      "mapLoadingFail": "Ceva nu a mers bine şi harta nu a fost încărcată corect.",
      "appLoadingFail": "Ceva nu a mers bine şi aplicaţia încărcată corect.",
      "crowdsourceLayerNotFound": "Ceva nu a mers bine, povestea nu a putut găsi sau încărca în mod corect stratul tematic de hartă crowdsource."
    },
    "sharing": {
      "localhost": "Adresele URL cu „localhost” nu pot fi partajate."
    },
    "selectedDisplay": {
      "noPhoto": "Eroare: Fotografia nu există sau nu este accesibilă."
    }
  }
});