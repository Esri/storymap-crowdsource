define({
  "loading": {
    "general": "Carregando",
    "initializing": "Carregando história",
    "map": "Carregando mapa"
  },
  "common": {
    "or": "ou",
    "appNamePrepend": "Mapa Histórico",
    "appName": "Colaboração Coletiva",
    "buttons": {
      "save": "Salvar",
      "saving": "Salvando",
      "close": "Fechar"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Editar História",
      "hide": "Ocultar"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Compartilhar no Facebook",
      "twitter": "Compartilhar no Twitter",
      "link": "Obter código embutido ou copiar um link curto"
    },
    "link": {
      "title": "Compartilhar",
      "copied": "Copiado",
      "linkHeader": "Link para história",
      "linkHelper": "Compartilhe esta história por e-mail ou mídia social com o link abaixo.",
      "copyShortLink": "Copiar link curto",
      "showShortLink": "Mostrar link curto",
      "copyFullLink": "Copiar URL inteira",
      "showFullLink": "Mostrar link inteiro",
      "embedSizeHelper": "Tamanho (largura/altura)",
      "embedCodeHeader": "Anexar no site da web",
      "embedCodeHelper": "Utilize o código de HTML seguinte para embutir a história em uma página da web.",
      "copyEmbedCode": "Copiar código embutido"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Visualizar Mapa",
        "galleryView": "Visualizar Galeria"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Página Inicial",
      "map": "Mapa",
      "gallery": "Galeria",
      "participate": "Participar"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Escolha uma opção..."
    },
    "photo": {
      "loading": "Carregando Fotografia",
      "resizing": "Redimensionando Fotografia"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Ir para local da página inicial"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Visualizar Maior",
    "review": {
      "title": "Revisar Item",
      "options": {
        "approve": "Aprovar",
        "reject": "Rejeitar"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Entrar",
      "services": {
        "arcgis": "Entrar com ArcGIS",
        "facebook": "Entrar com Facebook",
        "google": "Entrar com Google",
        "guest": "Continuar como Convidado"
      },
      "loginDescription": "Para participar, utilize uma das opções acima.",
      "loginDescriptionSingle": "Para participar, utilize a opção acima."
    },
    "form": {
      "photo": {
        "pickFile": "Clique para selecionar um arquivo",
        "choosePhoto": "Carregar uma Fotografia",
        "selectNew": "Utilize uma fotografia diferente",
        "photoTooSmall": "Sua fotografia é muito pequena. O lado menor deve ser pelo menos"
      },
      "location": {
        "gettingLocation": "Localizando",
        "locate": "Localize-Me",
        "findOnMap": "Localizar no Mapa",
        "findOnMapTooltip": "Clique no mapa ou arraste este ponto para refinar sua localização.",
        "saveLocation": "Salvar Localização",
        "search": "Pesquisar",
        "longitude": "Longitude",
        "latitude": "Latitude",
        "nullIsland": "Ilha Nula",
        "photoLocation": "Você deseja utilizar o local onde a foto foi tirada?"
      },
      "termsAndConditions": {
        "buttonShow": "Mostrar termos e condições",
        "buttonHide": "Ocultar termos e condições"
      },
      "save": "Aceitar Termos e Enviar",
      "saving": "Enviando",
      "requiredWarning": "Campos Exigidos",
      "changedCloseWarning": "Tem certeza que deseja cancelar? Suas alterações serão perdidas."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Obrigado por participar.",
        "body": "Sua contribuição foi enviada e aparecerá no mapa após de ter sido revisada e aprovada. Volte mais tarde.",
        "confirmBtn": "OK"
      },
      "contributionError": {
        "title": "Atenção",
        "body": "Ocorreu um erro desconhecido e não foi possível salvar a sua contribuição. Atualize seu navegador e tente novamente.",
        "confirmBtn": "OK"
      }
    }
  },
  "validations": {
    "fix": "Corrija!",
    "basic": {
      "noValue": "Nenhum valor foi fornecido",
      "required": "Um <% atributo %> é exigido.",
      "regex": "O <% atributo %> não corresponde ao padrão exigido.",
      "max": {
        "string": "O <% atributo %> não pode conter mais que <% máx %> caracteres.",
        "number": "O <% atributo %> deve ser menor ou igual ao <% máx %>."
      },
      "acceptedTerms": "Você deve aceitar os termos e condições antes de compartilhar.",
      "https": "O <% atributo %> deve ser carregado em uma conexão segura. A URL deve começar com \"https://\" ou \"//\" para carregar corretamente.",
      "imageUrl": "O <% atributo %> deve ser uma URL de imagem válida. Na maioria dos casos, a URL terminará com a extensão \".jpg\", \".gif\". ou \".png\"."
    },
    "pattern": {
      "commaSeparated": "O <% atributo %> não pode conter nenhum espaço.",
      "noNewLine": "O <% atributo %> não pode conter quebras de linha."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "O <% atributo %> contém HTML sem suporte."
      },
      "location": {
        "notValid": "O local que você inseriu não é válido. Tente novamente.",
        "noResults": "O local que você pesquisou não pode ser encontrado. Tente novamente e seja o mais específico possível."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Iniciar construindo uma nova História de Informações Coletivas"
    },
    "loading": {
      "heading": "Atenção",
      "invalidConfig": "Configuração inválida",
      "inaccessibleApp": "O Aplicativo de Mapeamento da Web não existe ou está inacessível.",
      "invalidConfigNoApp": "Um ID do aplicativo de mapeamento da web válido não está especificado no arquivo index.html ou URL do aplicativo. Corrija o appid e tente novamente.",
      "unspecifiedConfigOwner": "O proprietário autorizado não foi configurado.",
      "invalidConfigOwner": "O proprietário da história não está autorizado.",
      "createMap": "Não foi possível criar o mapa",
      "notAuthorizedApp": "Você não tem autorização para acessar esta história",
      "notAuthorizedMap": "Você não está autorizado a acessar o mapa da web nesta história",
      "notAuthorizedLayers": "Você não está autorizado a visualizar uma ou mais camadas no mapa da web",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Atualize seu navegador</a>.",
      "mapLoadingFail": "Algo deu errado, o mapa não carregou corretamente.",
      "appLoadingFail": "Algo deu errado, o aplicativo não carregou corretamente.",
      "crowdsourceLayerNotFound": "Algo deu errado, não foi possível a história localizar ou carregar a camada do mapa de informações coletivas corretamente."
    },
    "sharing": {
      "localhost": "URLs com \"localhost\" não podem ser compartilhadas."
    },
    "selectedDisplay": {
      "noPhoto": "Erro: A fotografia não existe ou está inacessível."
    }
  }
});