define({
  "loading": {
    "general": "Chargement",
    "initializing": "Chargement du récit",
    "map": "Chargement de la carte"
  },
  "common": {
    "or": "ou",
    "appNamePrepend": "Story Map",
    "appName": "Crowdsource",
    "buttons": {
      "save": "Enregistrer",
      "saving": "Enregistrement",
      "close": "Fermer"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Mettre à jour le récit",
      "hide": "Masquer"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Partager sur Facebook",
      "twitter": "Partager sur Twitter",
      "link": "Obtenir le code incorporé ou copier un lien court"
    },
    "link": {
      "title": "Partager",
      "copied": "Copié",
      "linkHeader": "Lien vers le récit",
      "linkHelper": "Partagez ce récit par e-mail ou sur les réseaux sociaux en cliquant sur le lien ci-après.",
      "copyShortLink": "Copier un lien court",
      "showShortLink": "Afficher un lien court",
      "copyFullLink": "Copier l’URL complète",
      "showFullLink": "Afficher le lien complet",
      "embedSizeHelper": "Taille (largeur/hauteur)",
      "embedCodeHeader": "Incorporer dans un site web",
      "embedCodeHelper": "Utilisez le code HTML suivant pour incorporer le récit dans une page web.",
      "copyEmbedCode": "Copier le code incorporé"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Afficher la carte",
        "galleryView": "Afficher la galerie"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Accueil",
      "map": "Carte",
      "gallery": "Bibliothèque",
      "participate": "Participer"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Choisissez une option..."
    },
    "photo": {
      "loading": "Chargement de la photo",
      "resizing": "Redimensionnement de la photo"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Accéder à l'emplacement d’accueil"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Agrandir",
    "review": {
      "title": "Vérifier l’élément",
      "options": {
        "approve": "Approuver",
        "reject": "Refuser"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Se connecter",
      "services": {
        "arcgis": "Se connecter avec ArcGIS",
        "facebook": "Se connecter avec Facebook",
        "google": "Se connecter avec Google",
        "guest": "Continuer comme invité"
      },
      "loginDescription": "Pour participer, utilisez l’une des options ci-dessus.",
      "loginDescriptionSingle": "Pour participer, utilisez l’option ci-dessus."
    },
    "form": {
      "photo": {
        "pickFile": "Cliquez ici pour choisir un fichier",
        "choosePhoto": "Télécharger une photo",
        "selectNew": "Utiliser une photo différente",
        "photoTooSmall": "Votre photo est trop petite. Le côté le plus petit doit mesurer au moins"
      },
      "location": {
        "gettingLocation": "Localisation",
        "locate": "Localiser mon emplacement",
        "findOnMap": "Rechercher sur la carte",
        "findOnMapTooltip": "Cliquez sur la carte ou faites glisser ce point pour préciser votre emplacement.",
        "saveLocation": "Enregistrer l’emplacement",
        "search": "Rechercher",
        "longitude": "Longitude",
        "latitude": "Latitude",
        "nullIsland": "Ilot Null",
        "photoLocation": "Voulez-vous utiliser l’emplacement où votre photo a été prise ?"
      },
      "termsAndConditions": {
        "buttonShow": "Afficher les conditions d'utilisation",
        "buttonHide": "Masquer les conditions d'utilisation"
      },
      "save": "Accepter les conditions et envoyer",
      "saving": "Envoi",
      "requiredWarning": "Champs requis",
      "changedCloseWarning": "Vouez-vous vraiment fermer ? Vos modifications seront perdues."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Merci de votre participation.",
        "body": "Votre contribution a été envoyée. Elle s’affichera sur la carte lorsqu’elle aura été vérifiée et approuvée. Vérifiez à nouveau ultérieurement.",
        "confirmBtn": "OK"
      },
      "contributionError": {
        "title": "Attention",
        "body": "Une erreur inconnue s’est produite et votre contribution n’a pas pu être enregistrée. Actualisez votre navigateur et essayez à nouveau.",
        "confirmBtn": "OK"
      }
    }
  },
  "validations": {
    "fix": "Corriger !",
    "basic": {
      "noValue": "Aucune valeur n’a été fournie",
      "required": "Un <% attribute %> est requis.",
      "regex": "L’<% attribute %> ne correspond pas au modèle requis.",
      "max": {
        "string": "L’<% attribute %> ne peut pas contenir plus de <% max %> caractères.",
        "number": "L’<% attribute %> doit être inférieur ou égal à <% max %>."
      },
      "acceptedTerms": "Vous devez accepter les conditions d’utilisation avant de partager.",
      "https": "L’<% attribute %> doit être chargé via une connexion sécurisée. L’URL doit commencer par « https:// » ou « // » pour que le chargement soit correct.",
      "imageUrl": "L’<% attribute %> doit être une URL d’image valide. Dans la plupart des cas, l’URL termine par une extension « .jpg », « .gif » ou « .png »."
    },
    "pattern": {
      "commaSeparated": "L’<% attribute %> ne peut pas contenir d’espaces.",
      "noNewLine": "L’<% attribute %> ne peut pas contenir de sauts de ligne."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "L’<% attribute %> contient du HTML non pris en charge."
      },
      "location": {
        "notValid": "L’emplacement que vous avez saisi n’est pas valide, essayez à nouveau.",
        "noResults": "L’emplacement recherché est introuvable. Essayez à nouveau en étant aussi précis que possible."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Commencer à créer un nouveau récit Crowdsource"
    },
    "loading": {
      "heading": "Attention",
      "invalidConfig": "Configuration non valide",
      "inaccessibleApp": "L’application de cartographie web n'existe pas ou est inaccessible.",
      "invalidConfigNoApp": "Aucun ID d’application de cartographie web n’est précisé dans le fichier index.html de l’application ou l’URL. Corrigez l’appid et essayez à nouveau.",
      "unspecifiedConfigOwner": "Le propriétaire autorisé n'est pas configuré.",
      "invalidConfigOwner": "Le propriétaire du récit n'est pas autorisé.",
      "createMap": "Impossible de créer la carte",
      "notAuthorizedApp": "Vous n'êtes pas autorisé à accéder à ce récit.",
      "notAuthorizedMap": "Vous n'êtes pas autorisé à accéder à la carte web dans ce récit.",
      "notAuthorizedLayers": "Vous n'êtes pas autorisé à afficher une ou plusieurs couches dans la carte web",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Mettez à jour votre navigateur</a>.",
      "mapLoadingFail": "Une erreur s'est produite et la carte n'a pas été chargée correctement.",
      "appLoadingFail": "Une erreur s'est produite et l’application n'a pas été chargée correctement.",
      "crowdsourceLayerNotFound": "Une erreur s'est produite, le récit n’a pas trouvé ou chargé la couche de carte Crowdsource correctement."
    },
    "sharing": {
      "localhost": "Les URL avec « localhost » ne peuvent pas être partagées."
    },
    "selectedDisplay": {
      "noPhoto": "Erreur : la photo n'existe pas ou est inaccessible."
    }
  }
});