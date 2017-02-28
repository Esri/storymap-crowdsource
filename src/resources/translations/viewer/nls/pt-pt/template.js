define({
  "loading": {
    "general": "A carregar",
    "initializing": "A carregar a história",
    "map": "A carregar mapa"
  },
  "common": {
    "or": "ou",
    "appNamePrepend": "Story Map",
    "appName": "Crowdsource",
    "buttons": {
      "save": "Guardar",
      "saving": "A Guardar",
      "close": "Fechar"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Editar História",
      "hide": "Esconder"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Partilhar no Facebook",
      "twitter": "Partilhar no Twitter",
      "link": "Obtenha o código de incorporação ou uma ligação curta"
    },
    "link": {
      "title": "Partilhar",
      "copied": "Copiado",
      "linkHeader": "Ligação para história",
      "linkHelper": "Partilhe esta história através de correio eletrónico ou das redes sociais com a ligação apresentada abaixo.",
      "copyShortLink": "Copiar ligação curta",
      "showShortLink": "Exibir ligação curta",
      "copyFullLink": "Copiar o URL completo",
      "showFullLink": "Exibir ligação completa",
      "embedSizeHelper": "Tamanho (largura/altura)",
      "embedCodeHeader": "Incorporar em site web",
      "embedCodeHelper": "Utilize o seguinte código HTML para incorporar a história numa página web.",
      "copyEmbedCode": "Copiar código de incorporação"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Ver Mapa",
        "galleryView": "Visualizar Galeria"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Início",
      "map": "Mapa",
      "gallery": "Galeria",
      "participate": "Participar"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Por favor, selecione uma opção..."
    },
    "photo": {
      "loading": "A Carregar Foto",
      "resizing": "A Redimensionar Foto"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Ir para a localização inicial"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Visualizar Maior",
    "review": {
      "title": "Rever Item",
      "options": {
        "approve": "Aprovar",
        "reject": "Rejeitar"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Início de Sessão",
      "services": {
        "arcgis": "Iniciar sessão com ArcGIS",
        "facebook": "Iniciar sessão com Facebook",
        "google": "Iniciar sessão com Google",
        "guest": "Continuar como Convidado"
      },
      "loginDescription": "Para participar, por favor utilize uma das opções apresentadas acima.",
      "loginDescriptionSingle": "Para participar, por favor utilize a opção apresentada acima."
    },
    "form": {
      "photo": {
        "pickFile": "Clique para escolher um ficheiro",
        "choosePhoto": "Carregar uma Foto",
        "selectNew": "Utilizar uma foto diferente",
        "photoTooSmall": "A sua foto é demasiado pequena O tamanho mais reduzido tem de ser pelo menos"
      },
      "location": {
        "gettingLocation": "A Localizar",
        "locate": "Localizar-me",
        "findOnMap": "Encontrar no Mapa",
        "findOnMapTooltip": "Clique no mapa ou arraste e solte este ponto para refinar a sua localização.",
        "saveLocation": "Guardar Localização",
        "search": "Pesquisar",
        "longitude": "Longitude",
        "latitude": "Latitude",
        "nullIsland": "Ilha Nula",
        "photoLocation": "Pretende utilizar a localização em que a sua fotografia foi tirada?"
      },
      "termsAndConditions": {
        "buttonShow": "Exibir termos e condições",
        "buttonHide": "Ocultar termos e condições"
      },
      "save": "Aceitar Termos e Submeter",
      "saving": "A Submeter",
      "requiredWarning": "Campos obrigatórios",
      "changedCloseWarning": "Tem certeza de que pretende encerrar? As suas alterações perder-se-ão."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Obrigado por participar.",
        "body": "A sua contribuição foi submetida e irá aparecer no mapa após o mesmo ter sido revisto e aprovado. Por favor, verifique novamente mais tarde.",
        "confirmBtn": "Ok"
      },
      "contributionError": {
        "title": "Atenção",
        "body": "Ocorreu um erro desconhecido e não foi possível guardar a sua contribuição. Atualize o seu navegadort e tente novamente.",
        "confirmBtn": "Ok"
      }
    }
  },
  "validations": {
    "fix": "Corrigir!",
    "basic": {
      "noValue": "Não foi fornecido qualquer valor",
      "required": "Um <% attribute %> é necessário.",
      "regex": "O <% attribute %> não corresponde ao padrão necessário.",
      "max": {
        "string": "O <% attribute %> não pode conter mais do que <% max %> caracteres.",
        "number": "O <% attribute %> tem de ser menor ou igual a <% max %>."
      },
      "acceptedTerms": "Tem de aceitar os termos e condições antes de partilhar.",
      "https": "O <% attribute %> tem de ser carregado através de uma ligação segura. O URL tem de começar com \"https://\" or \"//\" para ser carregado corretamente.",
      "imageUrl": "O <% attribute %> tem de ser um URL de imagem válido. Na maioria dos casos, o URL terá a termina com a estensão \".jpg\", \".gif” ou \".png\"."
    },
    "pattern": {
      "commaSeparated": "O <% attribute %> não pode conter espaços.",
      "noNewLine": "O <% attribute %> não pode conter quebras de linhas."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "O <% attribute %> contém HTML não suportado."
      },
      "location": {
        "notValid": "A localização que introduziu não é válida; por favor, tente novamente.",
        "noResults": "Não é possível encontrar a localização que pesquisou. Por favor, tente novamente e seja o mais específico possível."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Começar a Construir uma Crowdsource Story"
    },
    "loading": {
      "heading": "Atenção",
      "invalidConfig": "Configuração inválida",
      "inaccessibleApp": "A Aplicação de Cartografia Web não existe ou não se encontra acessível.",
      "invalidConfigNoApp": "Não se encontra especificada uma ID de aplicação de cartografia válida no ficheiro index.html file ou no URL da aplicação. Corrija a appid e tente novamente.",
      "unspecifiedConfigOwner": "O proprietário autorizado não foi configurado.",
      "invalidConfigOwner": "O proprietário da história não está autorizado.",
      "createMap": "Não foi possível criar mapa",
      "notAuthorizedApp": "Não tem autorização para aceder a esta história",
      "notAuthorizedMap": "Não tem autorização para aceder ao mapa web nesta história",
      "notAuthorizedLayers": "Não tem autorização para visualizar uma ou mais camadas neste mapa web",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Por favor, atualize o seu navegador</a>.",
      "mapLoadingFail": "Algo correu mal, o mapa não foi carregado correctamente.",
      "appLoadingFail": "Algo correu mal, a aplicação não foi carregada correctamente.",
      "crowdsourceLayerNotFound": "Algo correu mal, não foi possível que história localizasse ou carregasse a camada de mapa de crowdsource corretamente."
    },
    "sharing": {
      "localhost": "URLs com \"localhost\" não podem ser partilhados."
    },
    "selectedDisplay": {
      "noPhoto": "Erro: A fotografia não existe ou encontra-se inacessível."
    }
  }
});