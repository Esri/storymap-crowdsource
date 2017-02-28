define({
  "loading": {
    "general": "Caricamento in corso",
    "initializing": "Caricamento della storia in corso",
    "map": "Caricamento della mappa in corso"
  },
  "common": {
    "or": "o",
    "appNamePrepend": "Story Map",
    "appName": "Crowdsource",
    "buttons": {
      "save": "Salva",
      "saving": "Salvataggio in corso",
      "close": "Chiudi"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Modifica storia",
      "hide": "Nascondi"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Condividi su Facebook",
      "twitter": "Condividi su Twitter",
      "link": "Ottieni codice integrato o copia un collegamento breve"
    },
    "link": {
      "title": "Condividi",
      "copied": "Copiato",
      "linkHeader": "Collegamento alla storia",
      "linkHelper": "Condividere la storia tramite e-mail o sui social media con il collegamento seguente.",
      "copyShortLink": "Copia collegamento breve",
      "showShortLink": "Mostra collegamento breve",
      "copyFullLink": "Copia URL completo",
      "showFullLink": "Mostra collegamento completo",
      "embedSizeHelper": "Dimensioni (larghezza/altezza)",
      "embedCodeHeader": "Incorporare nel sito Web",
      "embedCodeHelper": "Utilizzare il seguente codice HTML per incorporare la storia in una pagina Web.",
      "copyEmbedCode": "Copia codice incorporato"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Visualizza mappa",
        "galleryView": "Visualizza la galleria"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Home",
      "map": "Mappa",
      "gallery": "Galleria",
      "participate": "Partecipa"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Scegliere un'opzione..."
    },
    "photo": {
      "loading": "Caricamento foto in corso",
      "resizing": "Ridimensionamento foto in corso"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Vai a posizione home"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Ingrandisci",
    "review": {
      "title": "Esamina elemento",
      "options": {
        "approve": "Approva",
        "reject": "Rifiuta"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Accedi",
      "services": {
        "arcgis": "Accedi con ArcGIS",
        "facebook": "Accedi con Facebook",
        "google": "Accedi con Google",
        "guest": "Continua come ospite"
      },
      "loginDescription": "Per partecipare, scegliere una delle opzioni precedenti.",
      "loginDescriptionSingle": "Per partecipare, scegliere l'opzione precedente."
    },
    "form": {
      "photo": {
        "pickFile": "Fare clic per selezionare un file",
        "choosePhoto": "Carica una foto",
        "selectNew": "Usa un'altra foto",
        "photoTooSmall": "La foto è troppo piccola. La dimensione minima consentita è"
      },
      "location": {
        "gettingLocation": "Trova",
        "locate": "Trova la mia posizione",
        "findOnMap": "Trova sulla mappa",
        "findOnMapTooltip": "Fare clic sulla mappa o trascinare questo punto per rifinire la posizione.",
        "saveLocation": "Salva posizione",
        "search": "Cerca",
        "longitude": "Longitudine",
        "latitude": "Latitudine",
        "nullIsland": "Isola Null",
        "photoLocation": "Utilizzare il luogo in cui la foto è stata scattata?"
      },
      "termsAndConditions": {
        "buttonShow": "Mostra termini e condizioni",
        "buttonHide": "Nascondi termini e condizioni"
      },
      "save": "Accetta le condizioni e invia",
      "saving": "Invio in corso",
      "requiredWarning": "Campi obbligatori",
      "changedCloseWarning": "Continuare? Le modifiche andranno perdute."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Grazie per la partecipazione.",
        "body": "Il tuo contributo è stato inviato e comparirà sulla mappa dopo che sarà stato rivisto e approvato. Controlla in seguito.",
        "confirmBtn": "OK"
      },
      "contributionError": {
        "title": "Attenzione",
        "body": "Si è verificato un errore sconosciuto e il contributo non è stato salvato. Aggiornare e riprovare.",
        "confirmBtn": "OK"
      }
    }
  },
  "validations": {
    "fix": "Risolvi il problema",
    "basic": {
      "noValue": "Nessun valore indicato",
      "required": "È necessario indicare un <% attribute %>.",
      "regex": "<% attribute %> non corrisponde al modello richiesto.",
      "max": {
        "string": "<% attribute %> non può contenere più di <% max %> caratteri.",
        "number": "<% attribute %> deve essere inferiore o uguale a <% max %>."
      },
      "acceptedTerms": "È necessario accettare i termini e le condizioni prima di condividere.",
      "https": "È necessario caricare <% attribute %> utilizzando una connessione sicura. L'URL deve iniziare con \"https://\" o \"//\" affinché il caricamento avvenga correttamente.",
      "imageUrl": "<% attribute %> deve essere un URL valido per l'immagine. Nella maggior parte dei casi, l'URL termina con l'estensione \".jpg\", \".gif\" o \".png\"."
    },
    "pattern": {
      "commaSeparated": "<% attribute %> non può contenere spazi.",
      "noNewLine": "<% attribute %> non può contenere interruzioni di linea."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "<% attribute %> contiene HTML non supportato."
      },
      "location": {
        "notValid": "La posizione immessa non è valida. Riprovare.",
        "noResults": "Impossibile trovare la posizione ricercata. Riprovare cercando di essere più specifici."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Iniziare a creare una nuova storia Crowdsource"
    },
    "loading": {
      "heading": "Attenzione",
      "invalidConfig": "Configurazione non valida",
      "inaccessibleApp": "L'applicazione di mappatura Web non esiste o non è accessibile.",
      "invalidConfigNoApp": "Non è stato specificato un ID dell'applicazione di mappatura Web valido nel file index.html dell'applicazione o URL. Correggere l'ID dell'applicazione e riprovare.",
      "unspecifiedConfigOwner": "Il proprietario autorizzato non è stato configurato.",
      "invalidConfigOwner": "Il proprietario della storia non è autorizzato.",
      "createMap": "Impossibile creare la mappa",
      "notAuthorizedApp": "Non si è autorizzati ad accedere alla storia.",
      "notAuthorizedMap": "Non si è autorizzati ad accedere alla mappa Web in questa storia.",
      "notAuthorizedLayers": "Non si è autorizzati a visualizzare uno o più layer nella mappa Web",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Aggiornare il browser</a>.",
      "mapLoadingFail": "Si è verificato un errore. La mappa non è stata caricata correttamente.",
      "appLoadingFail": "Si è verificato un errore. L'app non è stata caricata correttamente.",
      "crowdsourceLayerNotFound": "Si è verificato un errore. Impossibile trovare la storia o caricare il layer mappa di crowdsourcing correttamente."
    },
    "sharing": {
      "localhost": "Impossibile condividere gli URL con l'host locale."
    },
    "selectedDisplay": {
      "noPhoto": "Errore. La foto non esiste o è inaccessibile."
    }
  }
});