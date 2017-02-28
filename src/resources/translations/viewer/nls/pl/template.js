define({
  "loading": {
    "general": "Wczytywanie",
    "initializing": "Trwa wczytywanie narracji",
    "map": "Wczytywanie mapy"
  },
  "common": {
    "or": "or",
    "appNamePrepend": "Mapa narracyjna",
    "appName": "Zgłoszenia użytkowników",
    "buttons": {
      "save": "Zapisz",
      "saving": "Zapisywanie",
      "close": "Zamknij"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Edytuj narrację",
      "hide": "Ukryj"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Udostępnij na Facebooku",
      "twitter": "Udostępnij na Twitterze",
      "link": "Uzyskaj kod do osadzenia lub skopiuj skrócone łącze"
    },
    "link": {
      "title": "Udostępnianie",
      "copied": "Skopiowane",
      "linkHeader": "Łącze do narracji",
      "linkHelper": "Udostępnij tę narrację za pomocą wiadomości e-mail lub mediów społecznościowych, korzystając z poniższego łącza.",
      "copyShortLink": "Kopiuj skrócone łącze",
      "showShortLink": "Pokaż skrócone łącze",
      "copyFullLink": "Kopiuj pełny adres URL",
      "showFullLink": "Pokaż pełne łącze",
      "embedSizeHelper": "Rozmiar (szerokość/wysokość)",
      "embedCodeHeader": "Osadzanie w witrynie internetowej",
      "embedCodeHelper": "Aby umieścić narrację w witrynie internetowej, skorzystaj z poniższego kodu HTML.",
      "copyEmbedCode": "Kopiuj kod osadzony"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Wyświetl mapę",
        "galleryView": "Wyświetl galerię"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Strona główna",
      "map": "Mapa",
      "gallery": "Galeria",
      "participate": "Weź udział"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Wybierz opcję..."
    },
    "photo": {
      "loading": "Wczytywanie zdjęcia",
      "resizing": "Zmienianie rozmiaru zdjęcia"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Przejdź do lokalizacji początkowej"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Wyświetl większe",
    "review": {
      "title": "Przejrzyj element",
      "options": {
        "approve": "Zatwierdź",
        "reject": "Odrzuć"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Zarejestruj się",
      "services": {
        "arcgis": "Zaloguj się, używając danych dostępowych z oprogramowania ArcGIS",
        "facebook": "Zaloguj się, używając danych dostępowych z serwisu Facebook",
        "google": "Zaloguj się, używając konta Google",
        "guest": "Kontynuuj jako gość"
      },
      "loginDescription": "Aby wziąć udział, użyj jednej z powyższych opcji.",
      "loginDescriptionSingle": "Aby wziąć udział, użyj powyższej opcji."
    },
    "form": {
      "photo": {
        "pickFile": "Kliknij, aby wybrać plik",
        "choosePhoto": "Prześlij zdjęcie",
        "selectNew": "Użyj innego zdjęcia",
        "photoTooSmall": "Twoje zdjęcie jest zbyt małe. Najmniejszy rozmiar wynosi"
      },
      "location": {
        "gettingLocation": "Lokalizowanie",
        "locate": "Zlokalizuj mnie",
        "findOnMap": "Znajdź na mapie",
        "findOnMapTooltip": "Kliknij na mapie lub przesuń ten punkt, aby precyzyjniej określić lokalizację.",
        "saveLocation": "Zapisz lokalizację",
        "search": "Wyszukaj",
        "longitude": "Długość geograficzna",
        "latitude": "Szerokość geograficzna",
        "nullIsland": "Null Island",
        "photoLocation": "Czy chcesz użyć lokalizacji, w której zostało wykonane zdjęcie?"
      },
      "termsAndConditions": {
        "buttonShow": "Pokaż definicje i warunki",
        "buttonHide": "Ukryj definicje i warunki"
      },
      "save": "Zaakceptuj warunki i prześlij",
      "saving": "Przesyłanie",
      "requiredWarning": "Wymagane pola",
      "changedCloseWarning": "Czy na pewno chcesz zamknąć? Zmiany zostaną utracone."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Dziękujemy za wzięcie udziału.",
        "body": "Twoje udostępnione zasoby zostały przesłane i będą wyświetlane na mapie po przejrzeniu i zaakceptowaniu. Sprawdź później.",
        "confirmBtn": "OK"
      },
      "contributionError": {
        "title": "Uwaga",
        "body": "Wystąpił nieznany błąd. Nie udało się zapisać Twoich udostępnionych zasobów. Odśwież przeglądarkę i spróbuj ponownie.",
        "confirmBtn": "OK"
      }
    }
  },
  "validations": {
    "fix": "Napraw to!",
    "basic": {
      "noValue": "Nie podano wartości",
      "required": "Atrybut <% attribute %> jest wymagany.",
      "regex": "Atrybut <% attribute %> nie jest zgodny z wymaganym wzorcem.",
      "max": {
        "string": "Liczba znaków w atrybucie <% attribute %> nie może być większa niż <% max %>.",
        "number": "Wartość atrybutu <% attribute %> nie może być większa niż <% max %>."
      },
      "acceptedTerms": "Przed udostępnieniem zasobów należy zaakceptować definicje i warunki.",
      "https": "Atrybut <% attribute %> musi zostać wczytany, korzystając z bezpiecznego połączenia. Adres URL musi rozpoczynać się od znaków \"https://\" lub \"//\", aby wczytywanie przebiegało prawidłowo.",
      "imageUrl": "Atrybut <% attribute %> musi być poprawnym adresem URL obrazu. W większości przypadków taki adres URL kończy się rozszerzeniem \".jpg\", \".gif\". lub \".png\"."
    },
    "pattern": {
      "commaSeparated": "Atrybut <% attribute %> nie może zawierać żadnych spacji.",
      "noNewLine": "Atrybut <% attribute %> nie może zawierać podziałów wierszy."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "Atrybut <% attribute %> zawiera nieobsługiwany kod HTML."
      },
      "location": {
        "notValid": "Wprowadzona lokalizacja jest nieprawidłowa. Spróbuj ponownie.",
        "noResults": "Nie można znaleźć wyszukiwanej lokalizacji. Spróbuj ponownie wprowadzić jak najdokładniejszą lokalizację."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Rozpocznij budowanie nowej narracji ze zgłoszeń użytkowników"
    },
    "loading": {
      "heading": "Uwaga",
      "invalidConfig": "Nieprawidłowa konfiguracja",
      "inaccessibleApp": "Aplikacja map internetowych nie istnieje lub jest niedostępna.",
      "invalidConfigNoApp": "Ani w pliku index.html aplikacji, ani w jej adresie URL nie podano prawidłowego identyfikatora aplikacji map internetowych. Popraw identyfikator aplikacji i spróbuj ponownie.",
      "unspecifiedConfigOwner": "Nie skonfigurowano autoryzowanego właściciela.",
      "invalidConfigOwner": "Właściciel narracji nie jest autoryzowany.",
      "createMap": "Nie można utworzyć mapy",
      "notAuthorizedApp": "Nie masz uprawnień dostępu do tej narracji",
      "notAuthorizedMap": "Nie masz uprawnień dostępu do mapy internetowej w tej narracji",
      "notAuthorizedLayers": "Nie masz uprawnień do wyświetlania co najmniej jednej warstwy na mapie internetowej",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Prosimy o zaktualizowanie przeglądarki</a>.",
      "mapLoadingFail": "Wystąpił pewien problem, nie wczytano mapy prawidłowo.",
      "appLoadingFail": "Wystąpił pewien problem. Aplikacja nie została prawidłowo wczytana.",
      "crowdsourceLayerNotFound": "Wystąpił pewien problem. Narracja nie może prawidłowo znaleźć lub wczytać warstwy mapy ze zgłoszeń użytkowników."
    },
    "sharing": {
      "localhost": "Nie można udostępniać adresów URL zawierających frazę \"localhost\"."
    },
    "selectedDisplay": {
      "noPhoto": "Błąd: Zdjęcie nie istnieje lub jest niedostępne."
    }
  }
});