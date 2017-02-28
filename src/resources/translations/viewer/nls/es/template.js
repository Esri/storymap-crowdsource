define({
  "loading": {
    "general": "Cargando",
    "initializing": "Cargando historia",
    "map": "Cargando mapa"
  },
  "common": {
    "or": "o",
    "appNamePrepend": "Story Map",
    "appName": "Crowdsource",
    "buttons": {
      "save": "Guardar",
      "saving": "Guardando",
      "close": "Cerrar"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Editar historia",
      "hide": "Ocultar"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Compartir en Facebook",
      "twitter": "Compartir en Twitter",
      "link": "Obtener código integrado o copiar un vínculo corto"
    },
    "link": {
      "title": "Compartir",
      "copied": "Copiado",
      "linkHeader": "Vínculo a la historia",
      "linkHelper": "Comparta esta historia por correo electrónico o en las redes sociales con el vínculo siguiente.",
      "copyShortLink": "Copiar vínculo corto",
      "showShortLink": "Mostrar vínculo corto",
      "copyFullLink": "Copiar dirección URL completa",
      "showFullLink": "Mostrar vínculo completo",
      "embedSizeHelper": "Tamaño (ancho/alto)",
      "embedCodeHeader": "Integrar en el sitio web",
      "embedCodeHelper": "Use el siguiente código HTML para integrar la historia en una página web.",
      "copyEmbedCode": "Copiar código integrado"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Ver mapa",
        "galleryView": "Ver galería"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Inicio",
      "map": "Mapa",
      "gallery": "Galería",
      "participate": "Participar"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Elija una opción..."
    },
    "photo": {
      "loading": "Cargando foto",
      "resizing": "Ajustando tamaño de foto"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Ir a la ubicación de inicio"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Ver más grande",
    "review": {
      "title": "Revisar elemento",
      "options": {
        "approve": "Aprobar",
        "reject": "Rechazar"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Iniciar sesión",
      "services": {
        "arcgis": "Iniciar sesión con ArcGIS",
        "facebook": "Iniciar sesión con Facebook",
        "google": "Iniciar sesión con Google",
        "guest": "Continuar como invitado"
      },
      "loginDescription": "Para participar, use una de las opciones anteriores.",
      "loginDescriptionSingle": "Para participar, use la opción anterior."
    },
    "form": {
      "photo": {
        "pickFile": "Haga clic para seleccionar un archivo",
        "choosePhoto": "Cargar una foto",
        "selectNew": "Usar una foto diferente",
        "photoTooSmall": "La foto es demasiado pequeña. El lado más pequeño debe tener al menos"
      },
      "location": {
        "gettingLocation": "Localizando",
        "locate": "Localizarme",
        "findOnMap": "Buscar en el mapa",
        "findOnMapTooltip": "Haga clic en el mapa o arrastre este punto para precisar su ubicación.",
        "saveLocation": "Guardar ubicación",
        "search": "Buscar",
        "longitude": "Longitud",
        "latitude": "Latitud",
        "nullIsland": "Null Island",
        "photoLocation": "¿Desea usar la ubicación en la que se tomó la foto?"
      },
      "termsAndConditions": {
        "buttonShow": "Mostrar términos y condiciones",
        "buttonHide": "Ocultar términos y condiciones"
      },
      "save": "Aceptar términos y enviar",
      "saving": "Enviando",
      "requiredWarning": "Campos requeridos",
      "changedCloseWarning": "¿Está seguro de que desea cerrar? Los cambios se perderán."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Gracias por participar.",
        "body": "Su contribución se ha enviado y aparecerá en el mapa cuando se haya revisado y aprobado. Vuelva a comprobarlo más tarde.",
        "confirmBtn": "Aceptar"
      },
      "contributionError": {
        "title": "Atención",
        "body": "Se ha producido un error desconocido y su error no se ha podido guardar. Actualice el navegador y vuelva a intentarlo.",
        "confirmBtn": "Aceptar"
      }
    }
  },
  "validations": {
    "fix": "Solucionar",
    "basic": {
      "noValue": "No se ha proporcionado ningún valor",
      "required": "Se necesita un <% attribute %>.",
      "regex": "El <% attribute %> no coincide con el patrón requerido.",
      "max": {
        "string": "El <% attribute %> no puede contener más de <% max %> caracteres.",
        "number": "El <% attribute %> debe ser menor o igual a <% max %>."
      },
      "acceptedTerms": "Debe aceptar los términos y condiciones antes de compartir.",
      "https": "El <% attribute %> se debe cargar a través de una conexión segura. La dirección URL debe empezar con \"https://\" o \"//\" para que se cargue correctamente.",
      "imageUrl": "El <% attribute %> debe ser una dirección URL de imagen válida. En la mayoría de los casos, la dirección URL terminará con una extensión \".jpg\", \".gif\", o \".png\"."
    },
    "pattern": {
      "commaSeparated": "El <% attribute %> no puede contener ningún espacio.",
      "noNewLine": "El <% attribute %> no puede contener saltos de línea"
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "El <% attribute %> contiene HTML no compatible."
      },
      "location": {
        "notValid": "La ubicación que ha introducido no es válida. Vuelva a intentarlo.",
        "noResults": "La ubicación que ha buscado no se puede encontrar. Vuelva a intentarlo y sea lo más concreto posible."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Empezar a crear una nueva historia de Crowdsource"
    },
    "loading": {
      "heading": "Atención",
      "invalidConfig": "Configuración no válida",
      "inaccessibleApp": "La aplicación de representación cartográfica en la red no existe o es inaccesible.",
      "invalidConfigNoApp": "No se ha especificado un Id. válido de la aplicación de representación cartográfica en la red en el archivo index.html o en la dirección URL de la aplicación. Corrija el appid y vuelva a intentarlo.",
      "unspecifiedConfigOwner": "El propietario autorizado no se ha configurado.",
      "invalidConfigOwner": "El propietario de la historia no está autorizado.",
      "createMap": "No se puede crear el mapa",
      "notAuthorizedApp": "No tiene autorización para acceder a esta historia",
      "notAuthorizedMap": "No tiene autorización para acceder al mapa web de esta historia",
      "notAuthorizedLayers": "No tiene autorización para ver una o varias capas del mapa web",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Actualice el navegador</a>.",
      "mapLoadingFail": "Se ha producido un error, el mapa no se ha cargado correctamente.",
      "appLoadingFail": "Se ha producido un error, la aplicación no se ha cargado correctamente.",
      "crowdsourceLayerNotFound": "Se ha producido un error, la historia no puede encontrar o cargar la capa de mapa de Crowdsource correctamente."
    },
    "sharing": {
      "localhost": "Las direcciones URL con \"localhost\" no se pueden compartir."
    },
    "selectedDisplay": {
      "noPhoto": "Error: la foto no existe o es inaccesible."
    }
  }
});