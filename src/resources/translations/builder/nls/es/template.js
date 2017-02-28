define({
  "betaMessage": {
    "title": "Esta es una versión beta de Story Map Crowdsource",
    "messageParagraphs": {
      "p1": "Esta versión de Story Map Crowdsource tiene completadas sus funciones básicas y es estable. Se está publicando como versión beta con el fin de que el equipo de Story Maps pueda recopilar los comentarios de los miembros de la comunidad de Esri e incorporarlos a la aplicación antes de su lanzamiento inicial.",
      "p2": "Las historias creadas con esta versión beta seguirán funcionando con las versiones posteriores a menos que modifique la aplicación o uno de sus componentes fuera del Builder.",
      "p3": "Lea la Ayuda para obtener más información sobre la forma de usar esta aplicación y la dirección a la que se deben enviar los comentarios."
    }
  },
  "common": {
    "appNameAppend": "Builder",
    "buttons": {
      "next": "Siguiente"
    }
  },
  "banner": {
    "buttons": {
      "feedback": "Comentarios",
      "help": "Ayuda",
      "preview": "Ver en directo",
      "share": "Compartir",
      "settings": "Configuración",
      "save": "Guardar",
      "toggleNav": "Alternar navegación"
    },
    "hintText": {
      "saved": "Historia guardada",
      "saving": "Guardando",
      "leavingBeforeSave": "Hay cambios sin guardar en la historia. Si sale ahora, los cambios se perderán."
    }
  },
  "header": {
    "participateBtnDisabledTooltip": "Cerrar panel Configuración para habilitar"
  },
  "introSplash": {
    "form": {
      "title": {
        "label": "Título",
        "placeholder": "Introducir título"
      },
      "subtitle": {
        "label": "mensaje de portada",
        "placeholder": "Agregar un mensaje de portada..."
      },
      "exploreButton": {
        "label": "etiqueta de botón de mapa",
        "placeholder": "Introducir etiqueta"
      }
    }
  },
  "map": {
    "editControls": {
      "homeLocation": {
        "tooltip": "Guardar ubicación de inicio"
      }
    }
  },
  "contribute": {
    "defaultTitle": "Agregue su contribución",
    "defaultForm": {
      "name": {
        "label": "Título",
        "attribute": "título",
        "placeholder": "Introduzca un título"
      },
      "description": {
        "label": "Descripción",
        "attribute": "descripción",
        "placeholder": "Introduzca una descripción (200 palabras o menos)"
      },
      "location": {
        "label": "Ubicación",
        "attribute": "ubicación",
        "placeholder": "Introduzca una ubicación"
      },
      "photo": {
        "label": "Foto",
        "placeholder": "Arrastrar y soltar",
        "attribute": "foto"
      },
      "termsAndConditions": {
        "legal": "Garantiza y declara que (1) posee todos los derechos, la titularidad y la propiedad de las fotos que se van a compartir con este sitio y concede a Esri y a sus contratistas el derecho no exclusivo y libre de royalties de usar, copiar, almacenar, guardar en caché, alojar, preparar trabajos derivados, reproducir, mostrar públicamente y ejecutar, redistribuir, transferir y retransmitir la foto compartida como parte de este servicio, y que (2) al compartir las fotos y la información de localización geográfica asociada no infringirá ni hará un uso indebido de derechos de terceros o de derechos de privacidad o publicidad. Queda estrictamente prohibido compartir fotos que puedan considerarse difamatorias, obscenas, pornográficas o excesivamente violentas o que fomenten actividades ilegales."
      }
    }
  },
  "review": {
    "selection": {
      "header": "Revisar",
      "options": {
        "all": "Todas las contribuciones",
        "new": "Nuevas contribuciones",
        "approved": "Contribuciones aprobadas",
        "rejected": "Contribuciones rechazadas"
      }
    },
    "selectedShare": {
      "header": "Revisar"
    }
  },
  "fromScratchMessage": {
    "saving": "Iniciando Builder de Crowdsource",
    "layerNameInWebmap": "Capa de Crowdsource (NO ELIMINAR)"
  },
  "help": {
    "title": "Ayuda",
    "sections": {
      "s1": {
        "title": "Introducción",
        "paragraphs": {
          "p1": "Story Map Crowdsource (beta) es una aplicación web de ArcGIS diseñada para capturar fotos y pies de fotos de cualquier usuario y mostrarlos en un mapa. La aplicación es fácil de usar y de configurar y se puede utilizar en un navegador web en equipos portátiles y de sobremesa, en teléfonos móviles y en tablets. Los colaboradores pueden iniciar sesión con su cuenta de Facebook, Google o ArcGIS o participar como invitados anónimos.",
          "p2": "Para ver ejemplos de historias de Crowdsource que están creando otros autores, visite la <% galleryLink %>. También puede seguirnos en Twitter en <% twitterFollowLink %>.",
          "p3": "Estamos deseando conocer su opinión. Tanto si tiene una pregunta como si desea solicitar una nueva función o cree que ha encontrado un error, visite el <% geonet %>."
        },
        "links": {
          "galleryLink": "galería en el sitio web de Story Maps",
          "twitterFollowLink": "@EsriStoryMaps",
          "geonet": "espacio de Story Maps en GeoNet"
        }
      },
      "s2": {
        "title": "Configuración",
        "paragraphs": {
          "p1": "Para crear su propia historia única de Crowdsource, use las opciones de configuración del Builder. Haga clic en <% settings %> en la barra de herramientas del Builder para cambiar la imagen de la portada, el título, el logotipo, las opciones de uso compartido y mucho más.",
          "p2": "Para especificar el área geográfica que los participantes verán cuando carguen su historia, aplique el desplazamiento panorámico y el zoom a la ubicación deseada en el mapa y haga clic en el botón <% saveHomeLocation %> azul situado junto a los controles de navegación del mapa.",
          "p3": "Los cambios realizados en la configuración se <% autosaved %> a medida que se realizan. Las modificaciones efectuadas en los campos de texto se pueden deshacer usando el comando Deshacer del navegador.",
          "p4": "En esta versión beta, los autores solo pueden usar el formulario sencillo proporcionado. En una versión futura, incluiremos un Builder de formularios que permitirá editar las preguntas realizadas a los participantes. Hasta entonces, puede modificar las etiquetas del formulario siguiendo esta <% formEditBlog %>.",
          "p5": "Consejo: para volver a la <% coverPage %> desde el mapa, haga clic en la barra de título."
        },
        "links": {
          "formEditBlog": "publicación del blog"
        },
        "bold": {
          "settings": "Configuración",
          "saveHomeLocation": "Guardar ubicación de inicio",
          "autosaved": "guardan automáticamente",
          "coverPage": "portada"
        }
      },
      "s3": {
        "title": "Revisión de contribuciones",
        "paragraphs": {
          "p1": "Mostrar las contribuciones en el mapa en cuanto se envían es la mejor manera de animar y recompensar a sus colaboradores. Sin embargo, si le preocupa el contenido inapropiado o desea cribar las contribuciones y seleccionar las que se van a mostrar, puede optar por revisar y aprobar primero los envíos.",
          "p2": "Para impedir que el contenido aparezca en el mapa antes de revisarlo, vaya a <% settings %> > <% contributions %> y elija <% afterReview %>. Cuando use esta opción, las nuevas fotos solo estarán visibles para usted hasta que las apruebe para que se muestren en el mapa.",
          "p3": "Para revisar las nuevas contribuciones, vaya al mapa en el Builder de Crowdsource y seleccione <% newContributions %> en la barra de herramientas del Builder. A continuación, haga clic en el mapa para ver una contribución y elija <% approve %> o <% reject %>.",
          "p4": "Puede cambiar las contribuciones que se muestran en el mapa eligiendo Todas, Nuevas, Aprobadas o Rechazadas en el filtro <% review %> de la barra de herramientas del Builder. Puede cambiar la decisión sobre cualquier contribución haciendo clic en el mapa y actualizando su estado de aprobación."
        },
        "bold": {
          "settings": "Configuración",
          "contributions": "Contribuciones",
          "afterReview": "Mostrar contribuciones: tras la revisión",
          "newContributions": "Revisar: nuevas contribuciones",
          "approve": "Aprobar",
          "reject": "Rechazar",
          "review": "Revisar"
        }
      },
      "s4": {
        "title": "Seguimiento de los colaboradores",
        "paragraphs": {
          "p1": "Puede hacer que los usuarios que contribuyen a su historia de Crowdsource se identifiquen iniciando sesión con su cuenta de <% facebook %>, <% twitter %> o <% arcgis %>.",
          "p2": "Las opciones Facebook y Twitter usan una tecnología llamada OAuth para crear una cuenta pública de ArcGIS que está conectada con la cuenta del colaborador en las redes sociales. Esto facilita el proceso para los colaboradores, ya que así no tienen que registrar una nueva cuenta para contribuir a la historia. Por supuesto, si los colaboradores ya tienen una cuenta pública o una suscripción de ArcGIS, pueden usarla para iniciar sesión.",
          "p3": "También puede permitir las <% guestContributions %> de modo que cualquier persona pueda colaborar sin iniciar sesión, lo que podría animar a más gente a contribuir a su historia. Sin embargo, los invitados no podrán editar ni eliminar sus propias contribuciones (no disponible en la versión beta) y no se guardará un nombre de usuario para las contribuciones como invitado, lo que hará imposible asociarlas a un usuario. Si estas funciones son importantes para usted, no debería permitir las contribuciones como invitado.",
          "p4": "Todas las opciones de inicio de sesión mencionadas están disponibles para los colaboradores a menos que las deshabilite. El inicio de sesión con Facebook y Twitter no está disponible en Portal."
        },
        "bold": {
          "facebook": "Facebook",
          "twitter": "Twitter",
          "arcgis": "ArcGIS",
          "guestContributions": "contribuciones como invitado"
        }
      },
      "s5": {
        "title": "Preguntas frecuentes",
        "questions": {
          "q1": {
            "question": "¿Cómo puedo enviar comentarios sobre esta aplicación beta?",
            "response": "Para proporcionar comentarios o sugerencias, o para informarnos de algún problema, comparta sus ideas en el <% geonet %>."
          },
          "q2": {
            "question": "¿Seguirá funcionando una historia de Crowdsource creada con la versión beta de la aplicación en las versiones futuras del software?",
            "response": "Sí, funcionará, pero hay dos posibles excepciones: 1) Si agrega capas al mapa web de su historia de Crowdsource (algo que solo se puede hacer fuera del Builder), esas capas pueden dejar de funcionar o sus símbolos pueden cambiar en la versión final. Para evitarlo, puede convertir las capas complementarias en capas de entidades antes de agregarlas al mapa y usar símbolos sencillos. 2) También hay una posibilidad de que el modelo de datos de la capa de Crowdsource cambie. En ese caso, tenemos previsto proporcionar un flujo de trabajo o una herramienta para actualizar la capa al nuevo modelo de datos."
          },
          "q3": {
            "question": "¿Puedo agregar otras capas al mapa de mi historia de Crowdsource?",
            "response": "Sí, puede agregar otras capas al mapa para dar contexto, pero lea primero la pregunta anterior para conocer información importante sobre los problemas de hacerlo con la versión beta de Story Map Crowdsource. Abra el <% map %> de su historia, agregue las capas o cambie el mapa base (o ambas cosas) y guarde los cambios. La próxima vez que cargue la historia verá las nuevas capas. Tenga cuidado para no eliminar ni modificar la capa de contribuciones en el mapa o la historia de Crowdsource podría dejar de funcionar correctamente."
          },
          "q4": {
            "question": "¿Dónde se almacenan las fotos?",
            "response": "Las fotos enviadas se remuestrean a un tamaño adecuado y se almacenan en su cuenta de ArcGIS (como adjuntos de servicios de entidades). Las imágenes cargadas por usted en el Builder para la imagen de la portada y el logotipo se almacenan como recursos de elementos con el elemento de aplicación de su story map."
          },
          "q5": {
            "question": "¿Necesitan los usuarios una cuenta de ArcGIS para contribuir a mi historia de Crowdsource?",
            "response": "No, los colaboradores pueden iniciar sesión usando su cuenta de <% facebook %> o <% google %>. Esto creará una cuenta pública de ArcGIS vinculada con la cuenta del colaborador en las redes sociales, pero el colaborador no recibirá correos electrónicos de Esri cuando inicie sesión de este modo. Los usuarios también pueden contribuir como invitados anónimos sin iniciar sesión en ninguna cuenta. Puede controlar los métodos de inicio de sesión que están disponibles para su historia en <% settingsContributions %>."
          },
          "q6": {
            "question": "¿Puedo crear una historia de Crowdsource usando mi cuenta pública de ArcGIS Online?",
            "response": "No, como Story Map Crowdsource usa adjuntos de servicios de entidades para almacenar las imágenes aportadas, actualmente solo se admiten las cuentas de organización."
          },
          "q7": {
            "question": "¿De qué otra forma puedo personalizar una historia de Crowdsource?",
            "response": "Si las opciones de configuración disponibles no responden a sus necesidades o si desea alojar la aplicación en su propio servidor web, el código fuente de la aplicación está disponible. Para descargar la versión más reciente, visite la <% github %>."
          },
          "q8": {
            "question": "¿Consumirá créditos mi historia de Crowdsource?",
            "response": "Una historia de Crowdsource alojada en ArcGIS Online consumirá un número pequeño de créditos cada mes debido al almacenamiento de fotos y datos en un servicio de entidades. Una historia típica con varios cientos de fotos costará mucho menos de un dólar al mes. Obtenga más información sobre los <% agoCredits %>."
          }
        },
        "bold": {
          "facebook": "Facebook",
          "google": "Google",
          "settingsContributions": "Configuración > Contribuciones"
        },
        "links": {
          "geonet": "Foro de Story Maps en GeoNet",
          "map": "mapa",
          "agoCredits": "créditos de servicio de ArcGIS Online",
          "github": "página de proyecto de GitHub"
        }
      }
    }
  },
  "settings": {
    "title": "Configuración",
    "buttons": {
      "backTo": "Volver a"
    },
    "messages": {
      "uploading": "Cargando"
    },
    "panes": {
      "header": {
        "title": "Encabezado",
        "fields": {
          "logoType": {
            "label": "Logotipo",
            "optionLabels": {
              "esri": "Logotipo de Esri",
              "upload": "Carga de logotipo personalizado",
              "url": "Logotipo personalizado de dirección URL",
              "none": "Sin logotipo"
            }
          },
          "logoUrl": {
            "label": "Dirección URL de imagen de logotipo",
            "placeholder": "https://www.ejemplo.org/su_logo.png",
            "attribute": "logotipo"
          },
          "logoUpload": {
            "label": "Cargar un logotipo",
            "placeholder": "Arrastrar y soltar",
            "attribute": "logotipo"
          },
          "logoLink": {
            "label": "Vínculo del logotipo",
            "placeholder": "https://www.ejemplo.com"
          },
          "bannerTitle": {
            "label": "Título del encabezado",
            "placeholder": "Introducir título"
          }
        }
      },
      "socialSharing": {
        "title": "Redes sociales",
        "extra": {
          "tweetLength": "Longitud estimada",
          "tweetLengthWarning": "Es posible que su tuit sea demasiado largo. Recuerde probarlo usando el botón de Twitter del encabezado."
        },
        "fields": {
          "includeSharing": {
            "label": "Botones de redes sociales",
            "optionLabels": {
              "include": "Mostrar botones de redes sociales"
            }
          },
          "twitterText": {
            "label": "Tuit",
            "tooltip": "Este mensaje aparecerá como sugerencia para los lectores cuando compartan su historia en Twitter, pero pueden modificarlo. Se agregará un vínculo corto a su historia al final del tuit.",
            "placeholder": "Introducir texto del tuit",
            "attribute": "campo de texto del tuit"
          },
          "twitterRelated": {
            "label": "Sugerencias sobre \"A quién seguir\"",
            "tooltip": "Twitter puede sugerir estas cuentas a las personas que tuiteen su historia",
            "placeholder": "Introducir cuentas de Twitter",
            "attribute": "campo de cuentas recomendadas"
          }
        }
      },
      "introSplash": {
        "title": "Portada",
        "fields": {
          "backgroundImage": {
            "label": "Cargar una foto de fondo",
            "placeholder": "Arrastrar y soltar",
            "attribute": "foto de fondo"
          }
        }
      },
      "contribute": {
        "title": "Contribuciones",
        "fields": {
          "allowParticipation": {
            "label": "Contribuciones",
            "optionLabels": {
              "accept": "Aceptar nuevas contribuciones"
            }
          },
          "showNewFeatures": {
            "label": "Mostrar contribuciones",
            "tooltip": "Esta opción controla cuándo aparecen las nuevas contribuciones en el mapa. \"Inmediatamente\" muestra las contribuciones al instante. \"Tras la revisión\" requiere que apruebe las nuevas contribuciones antes de que estén visibles para otros usuarios. Consulte la Ayuda para obtener más información sobre la revisión de las contribuciones.",
            "optionLabels": {
              "new": "Inmediatamente",
              "approved": "Tras la revisión"
            }
          },
          "loginOptions": {
            "label": "Los colaboradores pueden iniciar sesión con",
            "attribute": "opción de inicio de sesión",
            "tooltip": "Elija qué opciones de inicio de sesión pueden usar los colaboradores para identificarse. Cualquiera puede contribuir de forma anónima a la historia (sin iniciar sesión) si se ha activado la opción Invitado. Consulte la Ayuda para obtener más información sobre el seguimiento de los colaboradores.",
            "optionLabels": {
              "arcgis": "ArcGIS",
              "facebook": "Facebook",
              "google": "Google",
              "guest": "Invitado"
            }
          },
          "participateButton": {
            "label": "Etiqueta del botón Participar",
            "placeholder": "Introducir etiqueta"
          }
        }
      }
    }
  },
  "shareApp": {
    "title": "Comparta su historia",
    "sharePermissions": {
      "private": "Privada",
      "organization": "Organización",
      "public": "Pública"
    },
    "socialize": {
      "header": "Socializar"
    }
  },
  "settingsModals": {
    "common": {
      "advancedOptions": "Opciones avanzadas",
      "welcome": "Bienvenido a"
    },
    "itemName": {
      "header": "¿Qué nombre desea darle a su historia de Crowdsource?",
      "advancedDescription": "Se crearán varios elementos para complementar esta historia. Si desea cambiar el nombre de esos elementos o guardarlos en una carpeta concreta, puede hacerlo a continuación.",
      "form": {
        "appName": {
          "label": "Título",
          "placeholder": "Introducir título"
        },
        "mapName": {
          "label": "Nombre de mapa",
          "placeholder": "Introducir nombre de mapa"
        },
        "folderSelection": {
          "label": "Carpeta",
          "rootFolder": "Inicio"
        },
        "featureServiceName": {
          "label": "Nombre de capa",
          "placeholder": "Introducir nombre de capa"
        }
      }
    },
    "layout": {
      "header": "¿Qué diseño desea usar?",
      "headerHint": "Puede cambiar el diseño en cualquier momento desde el cuadro de diálogo de configuración.",
      "preview": "Ver un ejemplo en directo",
      "commonAltText": "vista previa del diseño.",
      "selection": {
        "stacked": {
          "name": "Apilado",
          "description": "Alterne entre las vistas solo de mapa y solo de fotos de su historia de Crowdsource."
        },
        "sidePanel": {
          "name": "Panel lateral",
          "description": "Explore el mapa y vea vistas en miniatura de las fotos al mismo tiempo. El panel se actualiza cuando el mapa se mueve para mostrar únicamente las fotos en la vista de mapa actual."
        }
      }
    }
  },
  "appDataPlaceholderText": {
    "globals": {
      "participateShort": "Participar",
      "participateLong": "Comparta su experiencia",
      "exploreText": "Explorar el mapa"
    }
  },
  "itempageDefaults": {
    "webmap": {
      "titleAppend": "mapa web"
    },
    "featureService": {
      "titleAppend": "servicio de entidades"
    }
  },
  "messages": {
    "arcgisItems": {
      "webmapNotOwned": {
        "title": "Mensaje del Builder de Crowdsource",
        "body": "Ha intentado crear una historia de Crowdsource usando un mapa web de otro usuario. Se ha creado una copia del mapa web en su cuenta y su historia usa esa copia.",
        "confirmBtn": "Aceptar"
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "redirectToSecureConnection": "Volver a cargar con una conexión segura"
    },
    "inlineEditing": {
      "heading": "Atención:"
    },
    "loading": {
      "notAuthorizedCreateNew": "Para crear una historia de Crowdsource, debe usar una cuenta de suscripción de ArcGIS con privilegios de publicación. Si usa una cuenta de suscripción, contacte con su administrador de ArcGIS para solicitar privilegios adicionales. Si usa una cuenta pública de ArcGIS, <a href=\"http://www.arcgis.com/features/plans/pricing.html\" target=\"-blank\">actualice</a> a una suscripción o inicie una <a href=\"http://www.arcgis.com/features/free-trial.html\" target=\"-blank\">suscripción de prueba gratuita</a>.",
      "notAuthorizedEdit": "No tiene autorización para editar esta historia. Si no es el propietario, asegúrese de que el propietario le ha <a href=\"http://blogs.esri.com/esri/arcgis/2015/07/14/enable-colleagues-to-update-your-maps-and-apps/\" target=\"-blank\">otorgado permisos de edición</a>. También debe tener acceso para editar elementos y publicar nuevos servicios de entidades alojados en su organización. Póngase en contacto con el administrador de su organización de ArcGIS Online para solicitar estos privilegios.",
      "crowdsourceLayerNotFound": "No se puede encontrar o cargar correctamente la capa de mapa de Crowdsource. Asegúrese de que tiene permiso para ver el servicio de entidades.",
      "builderNotSSL": "Esta historia de Crowdsource requiere el uso de una conexión segura (https) para garantizar que su público puede iniciar sesión y enviar fotos de forma segura. Asegúrese de que su servidor admite una conexión https en esa misma dirección URL. Cuando otros usuarios intenten acceder a su historia a través de http se les redirigirá a una conexión segura siempre que sea posible."
    },
    "shareItems": {
      "notShared": {
        "title": "Atención",
        "body": "Algunos elementos de su historia no se pueden compartir. Es posible que esos elementos pertenezcan a otro usuario o requieran una suscripción. Los siguientes elementos no se pueden compartir",
        "confirmBtn": "Aceptar"
      }
    },
    "saving": {
      "checkInternet": "La historia no se puede guardar. Compruebe su conexión a Internet y vuelva a cargar la página para intentarlo de nuevo.",
      "unknown": "La historia no se puede guardar. Vuelva a cargar la página para intentarlo de nuevo."
    },
    "scratchCreation": {
      "unknown": "No se pueden crear los elementos requeridos para la historia. Actualice la página para intentarlo de nuevo."
    }
  },
  "validations": {
    "waitMessage": "Comprobando...",
    "arcgis": {
      "naming": {
        "arcgisItemName": "El <% attribute %> no debe contener < o >.",
        "arcgisServiceNameFormat": "El <% attribute %> solo debe contener letras, números y guiones bajos y no puede comenzar con un número."
      },
      "portal": {
        "unableToCheckName": "No se puede comprobar si el nombre está disponible. Inténtelo de nuevo.",
        "nameNotString": "El nombre debe ser texto normal",
        "nameNotAvailableFS": "El nombre que ha elegido para la capa no está disponible. Elija otro nombre."
      }
    }
  }
});