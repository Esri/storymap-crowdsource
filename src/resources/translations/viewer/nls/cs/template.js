define({
  "loading": {
    "general": "Načítání",
    "initializing": "Načítání příběhu",
    "map": "Načítám mapu"
  },
  "common": {
    "or": "ani",
    "appNamePrepend": "Mapa s příběhem",
    "appName": "s informacemi z externích zdrojů",
    "buttons": {
      "save": "Uložit",
      "saving": "Ukládání",
      "close": "Zavřít"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Upravit příběh",
      "hide": "Skrýt"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Sdílet na Facebooku",
      "twitter": "Sdílet na Twitteru",
      "link": "Získejte kód pro vložení nebo zkopírujte krátký odkaz"
    },
    "link": {
      "title": "Sdílet",
      "copied": "Zkopírováno",
      "linkHeader": "Odkaz na příběh",
      "linkHelper": "Sdílejte tento příběh přes e-mail nebo sociální sítě pomocí níže uvedeného odkazu.",
      "copyShortLink": "Zkopírovat krátký odkaz",
      "showShortLink": "Zobrazit krátký odkaz",
      "copyFullLink": "Zkopírovat celou URL",
      "showFullLink": "Zobrazit celý odkaz",
      "embedSizeHelper": "Velikost (šířka/výška)",
      "embedCodeHeader": "Vložit do webové stránky",
      "embedCodeHelper": "Chcete-li příběh vložit do webové stránky, použijte následující kód HTML.",
      "copyEmbedCode": "Zkopírovat kód pro vložení"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Prohlížet mapu",
        "galleryView": "Zobrazit galerii"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Domov",
      "map": "Mapa",
      "gallery": "Galerie",
      "participate": "Zapojit se"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Zvolte možnost…"
    },
    "photo": {
      "loading": "Načítání fotografie",
      "resizing": "Změna velikosti fotografie"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Přejít do domácího umístění"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Zobrazit větší",
    "review": {
      "title": "Zkontrolovat položku",
      "options": {
        "approve": "Schválit",
        "reject": "Odmítnuté"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Přihlásit",
      "services": {
        "arcgis": "Přihlásit se pomocí systému ArcGIS",
        "facebook": "Přihlásit se pomocí Facebooku",
        "google": "Přihlásit se pomocí Googlu",
        "guest": "Pokračovat jako host"
      },
      "loginDescription": "Pokud se chcete podílet, použijte jednu z výše uvedených možností.",
      "loginDescriptionSingle": "Pokud se chcete zapojit, použijte možnost uvedenou výše."
    },
    "form": {
      "photo": {
        "pickFile": "Kliknutím vyberte soubor.",
        "choosePhoto": "Nahrát fotografii",
        "selectNew": "Použít jinou fotografii",
        "photoTooSmall": "Vaše fotografie je příliš malá. Nejmenší strana musí mít nejméně"
      },
      "location": {
        "gettingLocation": "Vyhledávání polohy",
        "locate": "Najít mou polohu",
        "findOnMap": "Najít na mapě",
        "findOnMapTooltip": "Upřesněte svou polohu kliknutím na mapu nebo přetažením tohoto bodu.",
        "saveLocation": "Uložit polohu",
        "search": "Hledat",
        "longitude": "Zeměpisná délka",
        "latitude": "Zeměpisná šířka",
        "nullIsland": "Nulový ostrov",
        "photoLocation": "Chcete použít polohu, ve které byla fotografie pořízena?"
      },
      "termsAndConditions": {
        "buttonShow": "Zobrazit smluvní podmínky",
        "buttonHide": "Skrýt smluvní podmínky"
      },
      "save": "Přijmout podmínky a odeslat",
      "saving": "Odesílání",
      "requiredWarning": "Požadovaná pole",
      "changedCloseWarning": "Určitě chcete skončit? Vaše změny nebudou uloženy."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Děkujeme za účast.",
        "body": "Váš příspěvek byl odeslán a zobrazí se na mapě po provedení kontroly a schválení. Vraťte se později.",
        "confirmBtn": "OK"
      },
      "contributionError": {
        "title": "Upozornění",
        "body": "Došlo k neznámé chybě a váš příspěvek se nepodařilo uložit. Obnovte svůj prohlížeč a zkuste to znovu.",
        "confirmBtn": "OK"
      }
    }
  },
  "validations": {
    "fix": "Opravit!",
    "basic": {
      "noValue": "Nebyla zadána žádná hodnota.",
      "required": "Je vyžadován atribut <% attribute %>.",
      "regex": "Atribut <% attribute %> neodpovídá požadovanému vzorci.",
      "max": {
        "string": "Atribut <% attribute %> nesmí obsahovat více než <% max %> znaků.",
        "number": "Atribut <% attribute %> musí být menší nebo roven <% max %>."
      },
      "acceptedTerms": "Před sdílením musíte nejprve přijmout podmínky používání.",
      "https": "Atribut <% attribute %> je nutné načíst přes zabezpečené připojení. Pro správné načtení musí URL začínat „https://“ nebo „//“.",
      "imageUrl": "Atribut <% attribute %> musí být platná URL obrázku. Ve většině případů bude URL končit příponou „.jpg“, „.gif“ nebo „.png“."
    },
    "pattern": {
      "commaSeparated": "Atribut <% attribute %> nesmí obsahovat mezery.",
      "noNewLine": "Atribut <% attribute %> nesmí obsahovat konce řádků."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "Atribut <% attribute %> obsahuje nepodporovaný kód HTML."
      },
      "location": {
        "notValid": "Poloha, kterou jste zadali, není platná, zkuste to znovu.",
        "noResults": "Místo, které jste vyhledávali, nelze najít. Zkuste to znovu a buďte co nejkonkrétnější."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Začít vytvářet nový příběh s informacemi z externích zdrojů"
    },
    "loading": {
      "heading": "Upozornění",
      "invalidConfig": "Neplatná konfigurace",
      "inaccessibleApp": "Aplikace webového mapování neexistuje nebo není přístupná.",
      "invalidConfigNoApp": "V souboru index.html nebo URL aplikace není zadán platný identifikátor aplikace webového mapování. Opravte appid a zkuste to znovu.",
      "unspecifiedConfigOwner": "Nebyl nakonfigurován autorizovaný vlastník.",
      "invalidConfigOwner": "Vlastník příběhu není autorizován.",
      "createMap": "Nelze vytvořit mapu",
      "notAuthorizedApp": "Nejste oprávněni přistupovat k tomuto příběhu",
      "notAuthorizedMap": "V tomto příběhu nejste oprávněni přistupovat k webové mapě.",
      "notAuthorizedLayers": "Nejste oprávněni zobrazit jednu nebo více vrstev ve webové mapě.",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Aktualizujte svůj prohlížeč</a>.",
      "mapLoadingFail": "Něco se pokazilo, mapa se nenahrála správně.",
      "appLoadingFail": "Něco se pokazilo, aplikace se nenahrála správně.",
      "crowdsourceLayerNotFound": "Něco se pokazilo, příběhu se nepodařilo najít nebo správně načíst vrstvu mapy s informacemi z externích zdrojů."
    },
    "sharing": {
      "localhost": "URL s „localhost“ nelze sdílet."
    },
    "selectedDisplay": {
      "noPhoto": "Chyba: Fotografie neexistuje nebo není přístupná."
    }
  }
});