define({
  "betaMessage": {
    "title": "Dette er en betaversion af Story Map Crowdsource",
    "messageParagraphs": {
      "p1": "Denne version af Story Map Crowdsource er forsynet med sine grundlæggende funktioner, og programmet er stabilt. Det stilles til rådighed som betaversion, så Story Maps-teamet kan indsamle og inkorporere feedback fra dig og Esri-fællesskabet før programmets første frigivelse.",
      "p2": "De historier, der skabes ved hjælp af denne betaversion, vil også fungere sammen med senere versioner, medmindre du redigerer den eller en af dens komponenter uden for builder-programmet.",
      "p3": "Læs Hjælp for at få yderligere oplysninger om, hvordan du skal bruge denne app, og hvortil du skal sende feedback."
    }
  },
  "common": {
    "appNameAppend": "Builder",
    "buttons": {
      "next": "Næste"
    }
  },
  "banner": {
    "buttons": {
      "feedback": "Feedback",
      "help": "Hjælp",
      "preview": "Vis Live",
      "share": "Opdatér",
      "settings": "Indstillinger",
      "save": "Gem",
      "toggleNav": "Skift navigation"
    },
    "hintText": {
      "saved": "Historien gemt",
      "saving": "Gemmer",
      "leavingBeforeSave": "Du har ikke-gemte ændringer i din historie. Hvis du afslutter nu, går dine ændringer tabt."
    }
  },
  "header": {
    "participateBtnDisabledTooltip": "Luk indstillingspanelet for at aktivere"
  },
  "introSplash": {
    "form": {
      "title": {
        "label": "Titel",
        "placeholder": "Indtast titel"
      },
      "subtitle": {
        "label": "forsidemeddelelse",
        "placeholder": "Tilføj en forsidemeddelelse..."
      },
      "exploreButton": {
        "label": "kortknap-etiket",
        "placeholder": "Indtast etiket"
      }
    }
  },
  "map": {
    "editControls": {
      "homeLocation": {
        "tooltip": "Gem hjem-position"
      }
    }
  },
  "contribute": {
    "defaultTitle": "Tilføj dit bidrag",
    "defaultForm": {
      "name": {
        "label": "Titel",
        "attribute": "titel",
        "placeholder": "Indtast en titel"
      },
      "description": {
        "label": "Beskrivelse",
        "attribute": "beskrivelse",
        "placeholder": "Indtast en beskrivelse (200 ord eller færre)"
      },
      "location": {
        "label": "Position",
        "attribute": "position",
        "placeholder": "Angiv en position"
      },
      "photo": {
        "label": "Foto",
        "placeholder": "Træk og slip",
        "attribute": "foto"
      },
      "termsAndConditions": {
        "legal": "Du indestår for og erklærer, at (1) du besidder alle rettigheder, ejendomsret samt ejerskab til de fotos, der deles med dette websted, og at du giver Esri og Esris kontrahenter den ikke-eksklusive, licensfrie ret til at bruge, kopiere, lagre, foretage caching af, \"hoste\", oprette afledte arbejder af, reproducere, offentligt fremvise og udstille, omfordele, genudsende og genoverføre de delte fotos som en del af denne tjeneste, og (2) at din deling af fotos og eventuelle tilknyttede geoplacerede oplysninger ikke krænker eller misbruger eventuelle tredjeparters ejendomsrettigheder eller deres beskyttelse af privatlivets fred eller rettigheder til offentliggørelse. Deling af fotos, der kan opfattes som værende ærekrænkende, obskøne, pornografiske, overdrevent voldelige, eller som tilskynder til ulovlige aktiviteter, er strengt forbudt."
      }
    }
  },
  "review": {
    "selection": {
      "header": "Gennemse",
      "options": {
        "all": "Alle bidrag",
        "new": "Nye bidrag",
        "approved": "Godkendte bidrag",
        "rejected": "Afviste bidrag"
      }
    },
    "selectedShare": {
      "header": "Gennemse"
    }
  },
  "fromScratchMessage": {
    "saving": "Starter Crowdsource Builder",
    "layerNameInWebmap": "Crowdsource Layer (FJERN IKKE)"
  },
  "help": {
    "title": "Hjælp",
    "sections": {
      "s1": {
        "title": "Introduktion",
        "paragraphs": {
          "p1": "Story Map Crowdsource (beta) er en ArcGIS-webapplikation, der er udviklet til at indsamle fotos og billedtekster fra enhver anden bruger med henblik på visning på et kort. App'en er nem at anvende og konfigurere, og den kan bruges i en webbrowser på bærebare og stationære computere, mobiltelefoner og tablets. Bidragydere kan logge ind med deres Facebook-, Google- eller ArcGIS-konto eller deltage som anonyme gæster.",
          "p2": "For at se eksempler på Crowdsource-historier, som andre forfattere er i gang med at skabe, kan du besøge <% galleryLink %>. Du kan også følge os på Twitter på <% twitterFollowLink %>.",
          "p3": "Vi vil meget gerne høre fra dig! Hvad enten du har spørgsmål, ønsker at anmode en ny funktion eller mener, at du har fundet en fejl, vil vi bede dig om at besøge  <% geonet %>."
        },
        "links": {
          "galleryLink": "galleriet på Story Maps-webstedet",
          "twitterFollowLink": "@EsriStoryMaps",
          "geonet": "Story Maps-stedet på GeoNet"
        }
      },
      "s2": {
        "title": "Konfiguration",
        "paragraphs": {
          "p1": "Hvis du vil oprette din egen unikke Crowdsource-historie, skal du bruge builder-programmets konfigurérbare funktioner. Klik på <% indstillinger %> på builder-programmets værktøjslinje for at redigere forsidebillede, titel, logo og delingsindstillinger m.m.",
          "p2": "Hvis du vil angive et geografisk område, som dine deltagere skal kunne se, når de indlæser din historie, skal du panorere og zoome kortet til den ønskede position og klikke på den blå <% saveHomeLocation %>-knap ved siden af kontrolelementerne for kortnavigation.",
          "p3": "Konfigurationsændringer gemmes <% automatisk %>, mens du foretager dem. Ændringer i tekstfelter kan fortrydes ved hjælp af browserens Fortryd-kommando.",
          "p4": "I denne betaversion er forfatternes muligheder begrænset til den enkle formular, der er inkluderet. I en fremtidig version vil vi inkludere et formular-builder-program, som du kan bruge til at redigere de spørgsmål, som du stiller til dine deltagere. Indtil da kan du redigere formularetiketter ved at følge anvisningerne i denne <% formEditBlog %>.",
          "p5": "Tip: Hvis du ønsker at vende tilbage til <% coverPage %> fra kortet, skal du klikke på titellinjen."
        },
        "links": {
          "formEditBlog": "blogpost"
        },
        "bold": {
          "settings": "Indstillinger",
          "saveHomeLocation": "Gem hjem-position",
          "autosaved": "automatisk gemt",
          "coverPage": "forside"
        }
      },
      "s3": {
        "title": "Gennemsyn af bidrag",
        "paragraphs": {
          "p1": "At fremvise bidrag på kortet umiddelbart efter at de er blevet afsendt, er den bedste måde at  opmuntre og anerkende dine bidragydere på. Men hvis du er bekymret for, at der kan være stødende indhold, eller hvis du ønsker at kunne redigere og udvælge bidrag, før de bliver vist, kan du vælge at gennemse og godkende bidragene først.",
          "p2": "Hvis du ønsker at forhindre, at indhold bliver vist på kortet, før du har gennemset det, skal du gå til <% indstillinger %> > <% bidrag %> og vælge <% afterReview %>. Når du bruger denne indstilling, vil nye fotos kun kunne ses af dig, indtil du har godkendt dem med henblik på fremvisning på kortet.",
          "p3": "Hvis du vil gennemse nye bidrag, skal du gå til kortet i Crowdsource-builder-programmet og vælge <% newContributions %> på builder-programmets værktøjslinje. Klik derefter på kortet for at vise et bidrag, og vælg <% godkend %> eller <% afvis %>.",
          "p4": "Du kan ændre, hvilke bidrag der bliver vist på kortet ved at vælge Alle, Nye, Godkendte eller Afviste i filteret <% gennemse %> på builder-programmets værktøjslinje. Du kan altid ændre din beslutning vedrørende ethvert bidrag ved at klikke på kortet og opdatere bidragets godkendelsesstatus."
        },
        "bold": {
          "settings": "Indstillinger",
          "contributions": "Bidrag",
          "afterReview": "Vis bidrag: Efter gennemsyn",
          "newContributions": "Gennemsyn: Nye bidrag",
          "approve": "Godkend",
          "reject": "Afvis",
          "review": "Gennemse"
        }
      },
      "s4": {
        "title": "Sporing af bidragydere",
        "paragraphs": {
          "p1": "Du kan få personer, der bidrager til din Crowdsource-historie, til at identificere sig ved at logge ind med deres <% facebook- %>, <% twitter- %> eller <% arcgis %>-konto.",
          "p2": "Facebook- og Twitter-mulighederne benytter en teknologi, der kaldes OAuth, til at oprette en offentlig ArcGIS-konto, der er knyttet til bidragyderens sociale mediekonto. Dette gør det nemt for bidragyderne, fordi de så ikke behøver at oprette en ny konto for at kunne bidrage til din historie. Hvis bidagyderne allerede har et ArcGIS-abonnement eller en offentlig ArcGIS-konto, kan de naturligvis benytte denne til at logge ind.",
          "p3": "Du kan også tillade <% guestContributions %>, så alle kan bidrage uden at skulle logge ind, hvilket kan opmuntre flere mennesker til at bidrage til din historie. Dog vil gæster ikke kunne redigere eller fjerne deres egne bidrag (denne funktion er ikke tilgængelig i betaversionen), og der registreres ikke noget brugernavn for gæstebidrag, hvilket gør det umuligt at spore bidragene tilbage til en enkeltperson. Hvis disse funktioner er vigtige for dig, bør du ikke tillade gæstebidrag.",
          "p4": "Alle de login-muligheder, der er angivet ovenfor, er tilgængelige for bidragydere, medmindre du deaktiverer dem. Login med Facebook og Twitter er ikke tilgængelig via Portal."
        },
        "bold": {
          "facebook": "Facebook",
          "twitter": "Twitter",
          "arcgis": "ArcGIS",
          "guestContributions": "gæstebidrag"
        }
      },
      "s5": {
        "title": "FAQ",
        "questions": {
          "q1": {
            "question": "Hvordan giver jeg feedback om denne beta-app?",
            "response": "Hvis du ønsker at give feedback, komme med forslag eller informere om problemer, bedes du dele dine tanker på <% geonet %>."
          },
          "q2": {
            "question": "Vil en Crowdsource-historie, der er oprettet ved hjælp af betaversionen af app'en, fortsat fungere i fremtidige versioner af programmet?",
            "response": "Ja, den vil fortsat fungere, men der er nogle mulige undtagelser: 1) Hvis du føjer lag til din beta-Crowdsource-histories webkort (hvilket kun kan gøres uden for builder-programmet), vil disse lag måske ophøre med at fungere, eller deres symboler vil måske forandre sig efter den endelige frigivelse af programmet. For at undgå denne situation kan du konvertere eventuelle understøttende lag til vektorlag, før du føjer dem til dit kort, og du kan vælge at bruge enkle symboler. 2) Det er også muligt, at datamodellen for crowdsource-lagene vil blive ændret. Hvis dette sker, har vi til hensigt at levere en arbejdsgang eller et værktøj, der opdaterer dine lag til den nye datamodel."
          },
          "q3": {
            "question": "Kan jeg føje andre lag til min Crowdsource-histories kort?",
            "response": "Ja, du kan føje andre lag til kortet med henblik på at give kontekst, men det anbefales, at du først læser svaret på det forrige spørgsmål, hvor du finder vigtige oplysninger om, hvordan du gør dette i betaversionen af Story Map Crowdsource. Åbn din histories <% kort %>, tilføj lagene, og/eller skift baggrundskortet, og gem dine ændringer. Næste gang du indlæser din historie, vil du se de nye lag. Vær omhyggelig med ikke at slette eller redigere bidragslaget i dit kort. Hvis du gør det, vil din Crowdsource-historie måske ikke længere fungere korrekt."
          },
          "q4": {
            "question": "Hvor lagres der fotos?",
            "response": "Afsendte fotos \"re-samples\" til en passende størrelse og lagres i din ArcGIS-konto (som vedhæftninger til en featuretjeneste). De billeder, der overføres af dig via builder-programmet med henblik på at oprette forsidebillede og logo, lagres som elementressourcer sammen med applikationselementet til dit historiekort."
          },
          "q5": {
            "question": "Skal folk have en ArcGIS-konto for at kunne bidrage til min Crowdsource-historie?",
            "response": "Nej, bidragydere kan logge ind med deres <% facebook %> eller <% google %> konto. Dette vil oprette en offentlig ArcGIS-konto, der er knyttet til bidragyderens sociale mediekonto, men bidragyderne vil ikke modtage e-mails fra Esri, når du logger ind på denne måde. Folk kan også bidage som anonyme gæster uden at logge ind på en konto. Du styrer selv, hvilke af disse login-metoder der kan bruges i forbindelse med din historie i <% settingsContributions %>."
          },
          "q6": {
            "question": "Kan jeg oprette en Crowdsource-historie ved hjælp af min offentlige ArcGIS Online-konto?",
            "response": "Nej. Da Story Map Crowdsource benytter vedhæftninger til featuretjenester til at lagre billeder fra bidragydere, er det kun organisationskonti, der understøttes på nuværende tidspunkt."
          },
          "q7": {
            "question": "Hvordan kan jeg ellers tilpasse en Crowdsource-historie?",
            "response": "Hvis de tilgængelige konfigurationsindstillinger ikke lever op til dine krav, eller hvis du ønsker at \"hoste\" applikationen på din egen webserver, er applikationens kildekode tilgængelig. For at downloade den nyeste version skal du besøge <% github %>."
          },
          "q8": {
            "question": "Vil min Crowdsource-historie forbruge credits?",
            "response": "En Crowdsource-historie, der \"hostes\" på ArcGIS Online, vil forbruge et lille beløb i credits hver måned på grund af lagringen af fotos og data i en featuretjeneste. En typisk historie med flere hundrede fotos vil koste meget mindre end US$1 pr. måned. Se yderligere oplysninger om <% agoCredits %>."
          }
        },
        "bold": {
          "facebook": "Facebook",
          "google": "Google",
          "settingsContributions": "Indstillinger > Bidrag"
        },
        "links": {
          "geonet": "Story Maps-forum på GeoNet",
          "map": "kort",
          "agoCredits": "ArcGIS Online-tjeneste-credits",
          "github": "GitHub-projektside"
        }
      }
    }
  },
  "settings": {
    "title": "Indstillinger",
    "buttons": {
      "backTo": "Tilbage til"
    },
    "messages": {
      "uploading": "Overfører"
    },
    "panes": {
      "header": {
        "title": "Logo",
        "fields": {
          "logoType": {
            "label": "Logo",
            "optionLabels": {
              "esri": "Esri-logo",
              "upload": "Overførsel af brugerdefineret logo",
              "url": "Brugerdefineret logo fra URL",
              "none": "Intet logo"
            }
          },
          "logoUrl": {
            "label": "Logobillede-URL",
            "placeholder": "https://www.example.org/your_logo.png",
            "attribute": "logo"
          },
          "logoUpload": {
            "label": "Overfør et logo",
            "placeholder": "Træk og slip",
            "attribute": "logo"
          },
          "logoLink": {
            "label": "Logo click-through-link",
            "placeholder": "https://www.example.com"
          },
          "bannerTitle": {
            "label": "Header-titel",
            "placeholder": "Indtast titel"
          }
        }
      },
      "socialSharing": {
        "title": "Social",
        "extra": {
          "tweetLength": "Beregnet længde",
          "tweetLengthWarning": "Dit tweet kan være for langt. Sørg for at teste det ved hjælp af Twitter-knappen i headeren."
        },
        "fields": {
          "includeSharing": {
            "label": "Sociale knapper",
            "optionLabels": {
              "include": "Vis sociale knapper"
            }
          },
          "twitterText": {
            "label": "Tweet",
            "tooltip": "Denne meddelelse vil blive foreslået til læsere, når de deler din historie på Twitter, men de kan ikke redigere den. Der tilføjes et kort link til din historie i slutningen af tweetet.",
            "placeholder": "Indtast tweet-tekst",
            "attribute": "tweet-tekstfelt"
          },
          "twitterRelated": {
            "label": "\"Hvem skal jeg følge\"-forslag",
            "tooltip": "Twitter kan foreslå disse konti til personer, som tweeter din historie",
            "placeholder": "Angiv Twitter-konti",
            "attribute": "anbefalede konti-felt"
          }
        }
      },
      "introSplash": {
        "title": "Forside",
        "fields": {
          "backgroundImage": {
            "label": "Overfør et baggrundsfoto",
            "placeholder": "Træk og slip",
            "attribute": "baggrundsfoto"
          }
        }
      },
      "contribute": {
        "title": "Bidrag",
        "fields": {
          "allowParticipation": {
            "label": "Bidrag",
            "optionLabels": {
              "accept": "Acceptér nye bidrag"
            }
          },
          "showNewFeatures": {
            "label": "Vis bidrag",
            "tooltip": "Dette styrer, hvornår nye bidrag bliver vist på kortet. \"Øjeblikkeligt\" viser bidrag med det samme. \"Efter gennemsyn\" kræver, at du godkender nye bidrag, før de bliver vist til andre. Se Hjælp for at få yderligere oplysninger om gennemsyn af bidrag.",
            "optionLabels": {
              "new": "Øjeblikkeligt",
              "approved": "Efter gennemsyn"
            }
          },
          "loginOptions": {
            "label": "Bidragydere kan logge ind med",
            "attribute": "login-indstilling",
            "tooltip": "Vælg, hvilke login-indstillinger din bidragydere kan bruge til at identificere sig selv. Alle kan bidrage til din historie anonymt (uden at logge ind), hvis Gæst-indstillingen er markeret. Se Hjælp for at få yderligere oplysninger om sporing af bidragydere.",
            "optionLabels": {
              "arcgis": "ArcGIS",
              "facebook": "Facebook",
              "google": "Google",
              "guest": "Gæst"
            }
          },
          "participateButton": {
            "label": "Deltag knap-etiket",
            "placeholder": "Indtast etiket"
          }
        }
      }
    }
  },
  "shareApp": {
    "title": "Del din historie",
    "sharePermissions": {
      "private": "Privat",
      "organization": "Organisation",
      "public": "Offentlig"
    },
    "socialize": {
      "header": "Vær social"
    }
  },
  "settingsModals": {
    "common": {
      "advancedOptions": "Avancerede indstillinger",
      "welcome": "Velkommen til"
    },
    "itemName": {
      "header": "Hvad vil du kalde din Crowdsource-historie?",
      "advancedDescription": "Der oprettes nogle få elementer til understøttelse af denne historie. Hvis du ønsker at omdøbe disse elementer eller at gemme dem i en specifik mappe, kan du gøre dette nedenfor.",
      "form": {
        "appName": {
          "label": "Titel",
          "placeholder": "Indtast titel"
        },
        "mapName": {
          "label": "Kortnavn",
          "placeholder": "Angiv kortnavn:"
        },
        "folderSelection": {
          "label": "Mappe",
          "rootFolder": "Hjem"
        },
        "featureServiceName": {
          "label": "Navn på lag",
          "placeholder": "Indtast navn på laget"
        }
      }
    },
    "layout": {
      "header": "Hvilket layout ønsker du at bruge?",
      "headerHint": "Du kan altid ændre layoutet fra indstillingsdialogboksen.",
      "preview": "Vis et live-eksempel",
      "commonAltText": "layout-forhåndsvisning.",
      "selection": {
        "stacked": {
          "name": "Stakket",
          "description": "Skift mellem kun-kort- og kun-foto-visninger for din Crowdsource-historie."
        },
        "sidePanel": {
          "name": "Sidepanel",
          "description": "Udforsk kortet, og få vist fotominiaturer på samme tid. Panelet opdateres, samtidig med at kortet bevæges, så der kun vises fotos i den aktuelle kortvisning."
        }
      }
    }
  },
  "appDataPlaceholderText": {
    "globals": {
      "participateShort": "Deltag",
      "participateLong": "Del din oplevelse",
      "exploreText": "Udforsk kort"
    }
  },
  "itempageDefaults": {
    "webmap": {
      "titleAppend": "webkort"
    },
    "featureService": {
      "titleAppend": "featuretjeneste"
    }
  },
  "messages": {
    "arcgisItems": {
      "webmapNotOwned": {
        "title": "Meddelelse fra Crowdsource-builder-programmet",
        "body": "Du har forsøgt at oprette en Crowdsource-historie ved hjælp af en anden brugers webkort. Der blev oprettet en kopi af den anden bruges kort på din konto, og din historie benytter denne kop.",
        "confirmBtn": "OK"
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "redirectToSecureConnection": "Genindlæs med en sikker forbindelse"
    },
    "inlineEditing": {
      "heading": "Bemærk:"
    },
    "loading": {
      "notAuthorizedCreateNew": "Hvis du vil oprette en Crowdsource-historie, skal du have abonnement på en ArcGIS-konto med publiceringsrettigheder. Hvis du bruger en abonnementskonto, skal du kontakte din ArcGIS-administrator for at anmode om flere rettigheder. Hvis du bruger en offentlig ArcGIS-konto, skal du <a href=\"http://www.arcgis.com/features/plans/pricing.html\" target=\"-blank\">opgradere</a> til en abonnementskonto eller oprette et <a href=\"http://www.arcgis.com/features/free-trial.html\" target=\"-blank\">gratis prøveabonnement</a>.",
      "notAuthorizedEdit": "Du har ikke autorisation til at redigere denne historie. Hvis du ikke er ejer af historien, skal du sikre dig, at du har <a href=\"http://blogs.esri.com/esri/arcgis/2015/07/14/enable-colleagues-to-update-your-maps-and-apps/\" target=\"-blank\">fået redigeringsrettigheder</a> af ejeren. Du skal også have adgang til at redigere elementer og til at publicere nye \"hostede\" featuretjenester i din organisation. Kontakt din ArcGIS Online-organisationsadministrator for at anmode om disse rettigheder.",
      "crowdsourceLayerNotFound": "Kunne ikke finde eller indlæse crowdsource-kortlaget korrekt. Kontrollér, at du har tilladelse til at få vist featuretjenesten.",
      "builderNotSSL": "Denne Crowdsource-historie kræver anvendelse af en sikker (https) forbindelse, så dit publikum sikkert kan logge ind og bidrage med deres fotos. Kontrollér, at din server understøtter en https-forbindelse via denne URL. Andre, der forsøger at få adgang til din historie via http, vil blive omdirigeret til en sikker forbindelse, hvis det er muligt."
    },
    "shareItems": {
      "notShared": {
        "title": "Bemærk",
        "body": "Et eller flere elementer i din historie kunne ikke deles. Disse elementer kan være ejet af en anden bruger, eller de kræver et abonnement. Følgende element(er) kunne ikke deles",
        "confirmBtn": "OK"
      }
    },
    "saving": {
      "checkInternet": "Din historie kunne ikke gemmes. Kontrollér din internetforbindelse, og genindlæs siden for at prøve igen.",
      "unknown": "Din historie kunne ikke gemmes. Genindlæs siden for at prøve igen."
    },
    "scratchCreation": {
      "unknown": "Kunne ikke oprette de elementer, der kræves til din historie. Opdatér siden for at prøve igen."
    }
  },
  "validations": {
    "waitMessage": "Kontrollerer...",
    "arcgis": {
      "naming": {
        "arcgisItemName": "<% Attributten %> må ikke indeholde < eller >.",
        "arcgisServiceNameFormat": "<% Attributten %> må kun indeholde bogstaver, tal og understregningstegn, og den kan ikke begynde med et tal."
      },
      "portal": {
        "unableToCheckName": "Kunne ikke kontrollere, om navnet er ledigt. Prøv igen.",
        "nameNotString": "Navnet skal være i normal tekst",
        "nameNotAvailableFS": "Det navn, du har valgt til dit lag, er ikke ledigt. Vælg et andet navn."
      }
    }
  }
});