define({
  "loading": {
    "general": "正在載入",
    "initializing": "正在載入故事",
    "map": "正在載入地圖"
  },
  "common": {
    "or": "或者",
    "appNamePrepend": "故事地圖",
    "appName": "群眾外包",
    "buttons": {
      "save": "儲存",
      "saving": "儲存",
      "close": "關閉"
    }
  },
  "banner": {
    "buttons": {
      "edit": "編輯故事",
      "hide": "隱藏"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "在 Facebook 上分享",
      "twitter": "在 Twitter 上分享",
      "link": "取得內嵌代碼或複製短連結"
    },
    "link": {
      "title": "分享",
      "copied": "已複製",
      "linkHeader": "連結至故事",
      "linkHelper": "使用下列連結，透過電子郵件或社交媒體來分享此故事。",
      "copyShortLink": "複製短連結",
      "showShortLink": "顯示短連結",
      "copyFullLink": "複製完整 URL",
      "showFullLink": "顯示完整連結",
      "embedSizeHelper": "大小 (寬度/高度)",
      "embedCodeHeader": "在網站中嵌入",
      "embedCodeHelper": "使用以下 HTML 代碼將故事嵌入到網頁。",
      "copyEmbedCode": "複製嵌入代碼"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "檢視地圖",
        "galleryView": "檢視圖庫"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "首頁",
      "map": "繪圖",
      "gallery": "圖庫",
      "participate": "參與"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "請選擇選項..."
    },
    "photo": {
      "loading": "正在載入相片",
      "resizing": "正在調整相片大小"
    }
  },
  "map": {
    "controls": {
      "homeButton": "移至住家位置"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "放大檢視",
    "review": {
      "title": "檢閱項目",
      "options": {
        "approve": "同意",
        "reject": "拒絕"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "登入",
      "services": {
        "arcgis": "使用 ArcGIS 登入",
        "facebook": "使用 Facebook 登入",
        "google": "使用 Google 登入",
        "guest": "持續作為訪客"
      },
      "loginDescription": "若要參與，請使用上述一個選項。",
      "loginDescriptionSingle": "若要參與，請使用上述選項。"
    },
    "form": {
      "photo": {
        "pickFile": "按一下以選擇檔案",
        "choosePhoto": "上傳相片",
        "selectNew": "使用不同的相片",
        "photoTooSmall": "您的相片太小。最小邊至少必須為"
      },
      "location": {
        "gettingLocation": "正在定位",
        "locate": "我的位置",
        "findOnMap": "在地圖上尋找",
        "findOnMapTooltip": "按一下地圖或拖曳此點以精細化您的位置。",
        "saveLocation": "儲存位置",
        "search": "搜尋",
        "longitude": "經度",
        "latitude": "緯度",
        "nullIsland": "諾爾島",
        "photoLocation": "是否要使用拍照的位置?"
      },
      "termsAndConditions": {
        "buttonShow": "顯示條款和條件",
        "buttonHide": "隱藏條款和條件"
      },
      "save": "接受條款並提交",
      "saving": "正在提交",
      "requiredWarning": "必要欄位",
      "changedCloseWarning": "是否確定要關閉? 您的變更將遺失。"
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "謝謝參與。",
        "body": "已提交您的貢獻，並會在檢閱和核淮後將其顯示於地圖中。請稍後再檢查。",
        "confirmBtn": "確定"
      },
      "contributionError": {
        "title": "注意",
        "body": "已發生未知錯誤，無法儲存您的貢獻。請重新整理瀏覽器並再試一次。",
        "confirmBtn": "確定"
      }
    }
  },
  "validations": {
    "fix": "修復它!",
    "basic": {
      "noValue": "未提供值",
      "required": "<% attribute %> 為必填項。",
      "regex": "<% attribute %> 與需要的模式不符。",
      "max": {
        "string": "<% attribute %> 不可包含超過 <% max %> 個字元。",
        "number": "<% attribute %> 必須小於或等於 <% max %>。"
      },
      "acceptedTerms": "必須先接受條款和條件才能分享。",
      "https": "必須透過安全連線載入 <% attribute %>。URL 開頭必須為 \"https://” 或 \"//” 才能正確載入。",
      "imageUrl": "<% attribute %> 必須是有效的圖片 URL。在大部分情況下，URL 將以副檔名 \".jpg”、\".gif” 或 \".png” 結尾。"
    },
    "pattern": {
      "commaSeparated": "<% attribute %> 不可包含任何空格。",
      "noNewLine": "<% attribute %> 不可包含任何分行符號。"
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "<% attribute %> 包含不受支援的 HTML。"
      },
      "location": {
        "notValid": "輸入的位置無效，請再試一次。",
        "noResults": "找不到搜尋的位置。請再試一次並越具體越好。"
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "正在開始建立新的群眾外包故事"
    },
    "loading": {
      "heading": "注意",
      "invalidConfig": "設定無效",
      "inaccessibleApp": "Web 製圖應用程式不存在或無法存取。",
      "invalidConfigNoApp": "未在應用程式的 index.html 檔案或 URL 中指定有效的 Web 製圖應用程式 ID。請修正 appid 並再試一次。",
      "unspecifiedConfigOwner": "尚未設定授權的擁有者。",
      "invalidConfigOwner": "未授權故事擁有者。",
      "createMap": "無法建立地圖",
      "notAuthorizedApp": "您未取得存取該故事的授權",
      "notAuthorizedMap": "您未取得存取此故事中 Web 地圖的授權",
      "notAuthorizedLayers": "您未取得檢視 Web 地圖中一或多個圖層的授權",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">請更新您的瀏覽器</a>。",
      "mapLoadingFail": "發生了一些錯誤，地圖未正確載入。",
      "appLoadingFail": "發生了一些錯誤，應用程式未正確載入。",
      "crowdsourceLayerNotFound": "發生了一些錯誤，故事找不到或無法正確載入群眾外包地圖圖層。"
    },
    "sharing": {
      "localhost": "無法分享包含 \"localhost” 的 URL。"
    },
    "selectedDisplay": {
      "noPhoto": "錯誤: 相片不存在或無法存取。"
    }
  }
});