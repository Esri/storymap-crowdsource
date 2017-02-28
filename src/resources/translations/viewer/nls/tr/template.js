define({
  "loading": {
    "general": "Yükleniyor",
    "initializing": "Hikaye yükleniyor",
    "map": "Harita yükleniyor"
  },
  "common": {
    "or": "veya",
    "appNamePrepend": "Story Map",
    "appName": "Crowdsource",
    "buttons": {
      "save": "Kaydet",
      "saving": "Kaydetme",
      "close": "Kapat"
    }
  },
  "banner": {
    "buttons": {
      "edit": "Hikayeyi Düzenle",
      "hide": "Gizle"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Facebook'ta Paylaş",
      "twitter": "Twitter'da Paylaş",
      "link": "Yerleşik kod edinin veya kısa bağlantı kopyalayın"
    },
    "link": {
      "title": "Paylaş",
      "copied": "Kopyalandı",
      "linkHeader": "Hikaye bağlantısı",
      "linkHelper": "Bu hikayeyi aşağıdaki bağlantıyı kullanarak e-posta veya sosyal medya üzerinden paylaşın.",
      "copyShortLink": "Kısa bağlantı yapıştır",
      "showShortLink": "Kısa bağlantıyı göster",
      "copyFullLink": "Tam URL'yi kopyala",
      "showFullLink": "Tam bağlantıyı göster",
      "embedSizeHelper": "Boyut (genişlik/yükseklik)",
      "embedCodeHeader": "Web sitesinin içine yerleştir",
      "embedCodeHelper": "Hikayeyi bir web sayfasının içine yerleştirmek için aşağıdaki HTML kodunu kullanın.",
      "copyEmbedCode": "Yerleştirme kodunu kopyala"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "Haritayı Görüntüle",
        "galleryView": "Galeriyi Görüntüle"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "Giriş Sayfası",
      "map": "Harita",
      "gallery": "Galeri",
      "participate": "Katılın"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "Bir seçenek belirleyin..."
    },
    "photo": {
      "loading": "Fotoğraf Yükleniyor",
      "resizing": "Fotoğraf Yeniden Boyutlandırılıyor"
    }
  },
  "map": {
    "controls": {
      "homeButton": "Başlangıç konumuna git"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "Daha Büyük Görüntüle",
    "review": {
      "title": "Öğeyi İncele",
      "options": {
        "approve": "Onayla",
        "reject": "Reddet"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "Oturum Aç",
      "services": {
        "arcgis": "ArcGIS ile oturum aç",
        "facebook": "Facebook ile oturum aç",
        "google": "Google ile oturum aç",
        "guest": "Konuk olarak devam et"
      },
      "loginDescription": "Katılmak için yukarıdaki seçeneklerden bir tanesini kullanın.",
      "loginDescriptionSingle": "Katılmak için yukarıdaki seçeneği kullanın."
    },
    "form": {
      "photo": {
        "pickFile": "Bir dosya seçmek için tıklayın",
        "choosePhoto": "Fotoğraf Yükle",
        "selectNew": "Farklı bir fotoğraf kullan",
        "photoTooSmall": "Fotoğrafınız çok küçük. En küçük kenar boyutu en az şu olmalıdır:"
      },
      "location": {
        "gettingLocation": "Yer Bulunuyor",
        "locate": "Beni Bul",
        "findOnMap": "Haritada Bul",
        "findOnMapTooltip": "Konumunuzu düzeltmek için haritaya tıklayın veya bu noktayı sürükleyin.",
        "saveLocation": "Konumu Kaydet",
        "search": "Arama",
        "longitude": "Boylam",
        "latitude": "Enlem",
        "nullIsland": "Boşluk Adası",
        "photoLocation": "Fotoğrafınızın çekildiği yeri kullanmak istiyor musunuz?"
      },
      "termsAndConditions": {
        "buttonShow": "Hüküm ve koşulları göster",
        "buttonHide": "Hüküm ve koşulları gizle"
      },
      "save": "Koşulları Onayla ve Gönder",
      "saving": "Gönderiliyor",
      "requiredWarning": "Gerekli Alanlar",
      "changedCloseWarning": "Kapatmak istediğinizden emin misiniz? Yaptığınız değişiklikler silinecek."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "Katıldığınız için teşekkür ederiz.",
        "body": "Katkınız gönderildi ve incelendikten ve onaylandıktan sonra haritada görüntülenecek. Daha sonra yeniden kontrol edin.",
        "confirmBtn": "Tamam"
      },
      "contributionError": {
        "title": "Dikkat",
        "body": "Bilinmeyen bir hata oluştu ve katkınız kaydedilemedi. Tarayıcınızı yenileyin ve yeniden deneyin.",
        "confirmBtn": "Tamam"
      }
    }
  },
  "validations": {
    "fix": "Düzelt!",
    "basic": {
      "noValue": "Sağlanan değer yok",
      "required": "Bir <% attribute %> gerekir.",
      "regex": "<% attribute %> gereken yapıyla eşleşmiyor.",
      "max": {
        "string": "<% attribute %> içinde en çok <% max %> karakter olabilir.",
        "number": "<% attribute %> <% max %> değerine eşit veya ondan küçük olmalıdır."
      },
      "acceptedTerms": "Paylaşabilmek için hüküm ve koşulları onaylamanız gerekir.",
      "https": "<% attribute %> öğesinin güvenli bir bağlantı üzerinden yüklenmesi gerekir. Düzgün yüklenme için URL \"https://\" veya \"//\" ile başlamalıdır.",
      "imageUrl": "<% attribute %> geçerli bir görüntü URL’si olmalıdır. Pek çok durumda URL \".jpg\", \".gif\" veya \".png\" uzantısıyla biter."
    },
    "pattern": {
      "commaSeparated": "<% attribute %> içinde boşluk bulunamaz.",
      "noNewLine": "<% attribute %> içinde satır kesmesi bulunamaz."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "<% attribute %> içinde desteklenmeyen HTML var."
      },
      "location": {
        "notValid": "Girdiğiniz konum geçerli değil, yeniden deneyin.",
        "noResults": "Aradığınız konum bulunamıyor. Yeniden deneyin ve olabildiğince ayrıntılı tanım yapın."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "Yeni bir Crowdsource Story oluşturmaya başlayın"
    },
    "loading": {
      "heading": "Dikkat",
      "invalidConfig": "Geçersiz yapılandırma",
      "inaccessibleApp": "Web Mapping Uygulaması yok veya erişilemiyor.",
      "invalidConfigNoApp": "Uygulamanın index.html dosyasında veya URL’sinde geçerli bir web haritalama uygulaması kimliği belirtilmemiş. Uygulama kimliğini düzeltin ve yeniden deneyin.",
      "unspecifiedConfigOwner": "Yetkili sahip yapılandırılmamış.",
      "invalidConfigOwner": "Hikaye sahibi yetkilendirilmemiş.",
      "createMap": "Harita oluşturulamıyor",
      "notAuthorizedApp": "Bu hikayeye erişme yetkiniz yok",
      "notAuthorizedMap": "Bu hikayedeki web haritasına erişme yetkiniz yok",
      "notAuthorizedLayers": "Web haritasındaki bir veya birkaç katmanı görüntüleme yetkiniz yok",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">Tarayıcınızı güncelleyin</a>.",
      "mapLoadingFail": "Hata oluştu, harita düzgün şekilde yüklenmedi.",
      "appLoadingFail": "Hata oluştu, uygulama düzgün yüklenmedi.",
      "crowdsourceLayerNotFound": "Hata oluştu, hikaye bulunamadı veya Crowdsource harita katmanı düzgün yüklenemedi."
    },
    "sharing": {
      "localhost": "\"localhost\" içeren URL’ler paylaşılamaz."
    },
    "selectedDisplay": {
      "noPhoto": "Hata: Fotoğraf mevcut değil veya erişilemez durumda."
    }
  }
});