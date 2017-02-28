define({
  "betaMessage": {
    "title": "這是 beta 版本的故事地圖群眾外包",
    "messageParagraphs": {
      "p1": "此故事地圖群眾外包版本具有完整和穩定的核心功能。它是作為 beta 版本釋出，因此 Story Maps 團隊可先收集和納入您和 Esri 社群的回饋意見，再推出初始版本。",
      "p2": "除非您在建立器外部修改使用此 beta 版本所建立的故事或其某個元件，否則可使用後續的版本來持續使用該故事。",
      "p3": "有關如何使用此應用程式及提交回饋意見的位置等詳細資訊，請閱讀說明。"
    }
  },
  "common": {
    "appNameAppend": "建立器",
    "buttons": {
      "next": "下一頁"
    }
  },
  "banner": {
    "buttons": {
      "feedback": "意見",
      "help": "幫助",
      "preview": "即時檢視",
      "share": "分享",
      "settings": "設定",
      "save": "儲存",
      "toggleNav": "切換導航"
    },
    "hintText": {
      "saved": "已儲存故事",
      "saving": "儲存",
      "leavingBeforeSave": "您的故事有未儲存的變更。如果現在離開，會失去您所進行的一切變更。"
    }
  },
  "header": {
    "participateBtnDisabledTooltip": "關閉設定面板以啟用"
  },
  "introSplash": {
    "form": {
      "title": {
        "label": "標題",
        "placeholder": "輸入標題"
      },
      "subtitle": {
        "label": "封面訊息",
        "placeholder": "新增封面訊息..."
      },
      "exploreButton": {
        "label": "地圖按鈕標籤",
        "placeholder": "輸入標籤"
      }
    }
  },
  "map": {
    "editControls": {
      "homeLocation": {
        "tooltip": "儲存住家位置"
      }
    }
  },
  "contribute": {
    "defaultTitle": "新增您的貢獻",
    "defaultForm": {
      "name": {
        "label": "標題",
        "attribute": "標題",
        "placeholder": "輸入標題"
      },
      "description": {
        "label": "說明",
        "attribute": "描述",
        "placeholder": "請輸入描述 (200 字或更少)"
      },
      "location": {
        "label": "位置",
        "attribute": "位置",
        "placeholder": "輸入位置"
      },
      "photo": {
        "label": "照片",
        "placeholder": "拖放",
        "attribute": "相片"
      },
      "termsAndConditions": {
        "legal": "您保證並表示 (1) 您擁有此網站所分享之相片的所有權利、標題及所有權，並將非排他性、免版稅權利授與 Esri 及其承包商，以在此服務中使用、複製、儲存、快取、託管、準備衍生作品、重製、公開展示與執行、轉發、轉播，及轉發分享的相片，以及 (2) 您分享的相片和任何相關的地理位置資訊，皆不會侵犯或盜用任何第三方的所有權或隱私權和公開權。嚴格禁止分享可能被視為誹謗、淫穢、色情、過度暴力或鼓勵非法活動的相片。"
      }
    }
  },
  "review": {
    "selection": {
      "header": "檢查",
      "options": {
        "all": "全部貢獻",
        "new": "新增貢獻",
        "approved": "核淮的貢獻",
        "rejected": "拒絕的貢獻"
      }
    },
    "selectedShare": {
      "header": "檢查"
    }
  },
  "fromScratchMessage": {
    "saving": "啟動群眾外包建立器",
    "layerNameInWebmap": "群眾外包圖層 (不移除)"
  },
  "help": {
    "title": "幫助",
    "sections": {
      "s1": {
        "title": "簡介",
        "paragraphs": {
          "p1": "故事地圖群眾外包 (beta) 是一個 ArcGIS Web 應用程式，目的是收集任何人的相片和標號，並將其顯示於地圖上。此應用程式很容易使用與配置，並可在筆記型和桌上型電腦、行動電話和平板電腦的 Web 瀏覽器中使用。貢獻者可使用其 Facebook、Google 或 ArcGIS 帳號登入，或以匿名訪客身份參與。",
          "p2": "若要查看其他創作者正在建立的群眾外包故事的範例，請造訪 <% galleryLink %>。您也可以在 Twitter (<% twitterFollowLink %>) 上追蹤我們的動態。",
          "p3": "我們非常期待您的參與! 如果您有任何疑問、想要請求新的圖徵或者發現漏洞，請造訪 <% geonet %>。"
        },
        "links": {
          "galleryLink": "Story Maps 網站上的圖庫",
          "twitterFollowLink": "@EsriStoryMaps",
          "geonet": "GeoNet 上的 Story Maps 空間"
        }
      },
      "s2": {
        "title": "配置",
        "paragraphs": {
          "p1": "若要建立您自己的獨特群眾外包故事，請使用建立器的配置選項。按一下「建立器」工具列的 <% settings %> 來變更封面圖片、標題、標誌和分享選項，及更多內容。",
          "p2": "若要指定您的參與者在載入故事時會看到的地理區域，請將地圖平移並縮放到所要的位置，然後按一下地圖瀏覽控制項旁的藍色 <% saveHomeLocation %> 按鈕。",
          "p3": "會 <% autosaved %> 進行中的配置變更。可使用瀏覽器的復原命令來復原文字欄位的修改。",
          "p4": "在此 beta 版本中，只會向創作者提供簡單的表單。我們將在後續版本中加入表單建立器，可讓您編輯要詢問參與者的問題。您屆時可依循此 <% formEditBlog %> 來修改表單標籤。",
          "p5": "提示: 若要從地圖返回 <% coverPage %>，請按一下標題列。"
        },
        "links": {
          "formEditBlog": "部落格文章"
        },
        "bold": {
          "settings": "設定",
          "saveHomeLocation": "儲存住家位置",
          "autosaved": "已自動儲存",
          "coverPage": "封面頁面"
        }
      },
      "s3": {
        "title": "正在檢閱貢獻",
        "paragraphs": {
          "p1": "若要鼓勵和獎勵貢獻者，在貢獻者提交後立即在地圖上顯示貢獻是最好的方法。然而，如果您擔心出現令人反感的內容，或想要展現貢獻並選擇要顯示的貢獻，可選擇先檢閱和核淮提交。",
          "p2": "若要防止地圖出現尚未檢閱的內容，請移至 <% settings %> > <% contributions %> 並選擇 <% afterReview %>。使用此選項時，除非您核淮在地圖上顯示新相片，否則只有您能看到這些相片。",
          "p3": "若要檢閱新貢獻，請在「群眾外包建立器」中移至地圖，並選擇「建立器」工具列的 <% newContributions %>。接著按一下地圖來檢視貢獻，並選擇 <% approve %> 或 <% reject %>。",
          "p4": "您可以在「建立器」工具列的 <% review %> 篩選器中選擇「全部」、「新增」、「核淮的」或「拒絕的」，以變更地圖上顯示的貢獻。您也可以變更在任何貢獻上所做的決策，方法是在地圖上按一下它，並更新其核淮狀態。"
        },
        "bold": {
          "settings": "設定",
          "contributions": "貢獻",
          "afterReview": "顯示貢獻: 檢閱之後",
          "newContributions": "檢閱: 新增貢獻",
          "approve": "同意",
          "reject": "拒絕",
          "review": "檢查"
        }
      },
      "s4": {
        "title": "追蹤貢獻者",
        "paragraphs": {
          "p1": "您可以讓您的群眾外包故事的貢獻者自我識別身份，方法是要求其使用 <% facebook %>、<% twitter %> 或 <% arcgis %> 帳號登入。",
          "p2": "Facebook 和 Twitter 選項使用稱為 OAuth 的技術，建立連線至貢獻者的社交媒體帳號的 ArcGIS 公開帳號。此方法對貢獻者很有用，因為他們不必註冊新帳號即可貢獻您的故事。當然，如果貢獻者已有 ArcGIS 訂閱或公開帳號，他們可使用該帳號登入。",
          "p3": "您也可以允許 <% guestContributions %>，讓任何人都可以貢獻而不需登入，如此可鼓勵更多人貢獻您的故事。然而，訪客無法編輯或移除其本身的貢獻 (不適用於 beta)，且不會針對訪客貢獻記錄使用者名稱，因此當其以個人身份再次造訪時即無法追蹤他們。如果這些功能對您很重要，則您不應允許訪客貢獻。",
          "p4": "除非您停用，否則貢獻者可使用上述所有登入選項。Facebook 和 Twitter 登入不適用於 Portal。"
        },
        "bold": {
          "facebook": "Facebook",
          "twitter": "Twitter",
          "arcgis": "ArcGIS",
          "guestContributions": "訪客貢獻"
        }
      },
      "s5": {
        "title": "常見問題集",
        "questions": {
          "q1": {
            "question": "我如何提供此 beta 應用程式的回饋意見?",
            "response": "若要提供回饋意見或建議，或要告知我們問題所在，請在 <% geonet %> 上分享您的想法。"
          },
          "q2": {
            "question": "後續版本的軟體是否能繼續使用 beta 版應用程式所建立的群眾外包故事?",
            "response": "可以，但可能存在兩種例外狀況: 1) 如果將圖層新增到 beta 群眾外包故事的 Web 地圖 (只能在建立器外部完成)，那些圖層可能會停止運作，或其符號可能在最終版本後變更。為避免此情況，可以先將任何支援的圖層轉換成圖徵圖層，再將它們新增到您的地圖並使用簡單符號。2) 群眾外包圖層的資料模型也可能變更。若發生此情況，我們會提供工作流程或工具，將您的圖層更新為新資料模型。"
          },
          "q3": {
            "question": "我是否能將其他圖層新增至我的群眾外包故事的地圖?",
            "response": "可以，您可以將其他圖層新增至內容的地圖，但請先閱讀前一個問題，取得使用 beta 版「故事地圖群眾外包」來執行此工作的重要資訊。開啟故事的 <% map %>，新增圖層和/或變更底圖，再儲存您的變更。下次載入故事時，您會看到新圖層。請小心不要刪除或修改地圖中的貢獻圖層，否則群眾外包故事可能無法正常工作。"
          },
          "q4": {
            "question": "相片儲存在哪裡?",
            "response": "會將提交的相片重新取樣為適合的大小並存放在您的 ArcGIS 帳號 (作為圖徵服務附件)。您在建立器中針對封面圖片和標誌所上傳的圖片，會儲存為包含您的故事地圖應用程式項目的項目資源。"
          },
          "q5": {
            "question": "貢獻者是否需要 ArcGIS 帳號才能貢獻到我的群眾外包故事?",
            "response": "否，貢獻者可使用其 <% facebook %> 或 <% google %> 帳號登入。這將建立連結至貢獻者的社交媒體帳號的 ArcGIS 公開帳號，但當貢獻者以此方式登入時，並不會收到來自 Esri 的電子郵件。貢獻者也可以作為匿名訪客貢獻，而不必登入到任何帳號。您可以在 <% settingsContributions %> 中，控制您的故事可使用其中哪些登入方法。"
          },
          "q6": {
            "question": "我是否能使用我的 ArcGIS Online 公開帳號來建立群眾外包故事?",
            "response": "否，由於故事地圖群眾外包使用圖徵服務附件來儲存貢獻的圖片，所以目前只支援組織帳號。"
          },
          "q7": {
            "question": "我如何自訂群眾外包故事?",
            "response": "如果可用的配置選項不符合您的需求，或如果您希望在自己的 Web 伺服器上託管應用程式，可使用應用程式原始程式碼。若要下載最近的版本，請造訪 <% github %>。"
          },
          "q8": {
            "question": "我的群眾外包故事是否會使用點數?",
            "response": "由於在圖徵服務中儲存相片和資料，因此 ArcGIS Online 上託管的群眾外包故事每個月會使用少量點數。一個包含數百張相片的一般故事每個月須花費少於 1 美元。請參閱 <% agoCredits %> 的詳細資訊。"
          }
        },
        "bold": {
          "facebook": "Facebook",
          "google": "Google",
          "settingsContributions": "設定 > 貢獻"
        },
        "links": {
          "geonet": "GeoNet 上的 Story Maps 論壇",
          "map": "地圖",
          "agoCredits": "ArcGIS Online 服務點數",
          "github": "GitHub 專案頁面"
        }
      }
    }
  },
  "settings": {
    "title": "設定",
    "buttons": {
      "backTo": "返回到"
    },
    "messages": {
      "uploading": "上傳"
    },
    "panes": {
      "header": {
        "title": "頁眉",
        "fields": {
          "logoType": {
            "label": "標誌",
            "optionLabels": {
              "esri": "Esri 標誌",
              "upload": "自訂標誌上傳",
              "url": "來自 URL 的自訂標誌",
              "none": "無標誌"
            }
          },
          "logoUrl": {
            "label": "標誌圖片 URL",
            "placeholder": "https://www.example.org/your_logo.png",
            "attribute": "標誌"
          },
          "logoUpload": {
            "label": "上傳標誌",
            "placeholder": "拖放",
            "attribute": "標誌"
          },
          "logoLink": {
            "label": "標誌點按連結",
            "placeholder": "https://www.example.com"
          },
          "bannerTitle": {
            "label": "頁眉標題",
            "placeholder": "輸入標題"
          }
        }
      },
      "socialSharing": {
        "title": "社交",
        "extra": {
          "tweetLength": "估計長度",
          "tweetLengthWarning": "您的推文可能過長。請確定使用標頭的 Twitter 按鈕測試它。"
        },
        "fields": {
          "includeSharing": {
            "label": "社交按鈕",
            "optionLabels": {
              "include": "顯示社交按鈕"
            }
          },
          "twitterText": {
            "label": "推文",
            "tooltip": "當讀者在 Twitter 上分享您的故事時，建議向讀者顯示此訊息，但讀者可變更它。會將您故事的短連結新增至推文結尾。",
            "placeholder": "輸入推文文字",
            "attribute": "推文文字欄位"
          },
          "twitterRelated": {
            "label": "「追蹤何人」建議",
            "tooltip": "Twitter 可向推文您故事的人員建議這些帳號",
            "placeholder": "輸入 Twitter 帳號",
            "attribute": "建議的帳號欄位"
          }
        }
      },
      "introSplash": {
        "title": "封面頁",
        "fields": {
          "backgroundImage": {
            "label": "上傳背景相片",
            "placeholder": "拖放",
            "attribute": "背景相片"
          }
        }
      },
      "contribute": {
        "title": "貢獻",
        "fields": {
          "allowParticipation": {
            "label": "貢獻",
            "optionLabels": {
              "accept": "接受新貢獻"
            }
          },
          "showNewFeatures": {
            "label": "顯示貢獻",
            "tooltip": "這可控制當地圖出現新貢獻時「立即」顯示貢獻。「檢閱之後」會要求您先核淮新貢獻，再讓任何人看到這些貢獻。如需檢閱貢獻的詳細資訊，請參閱「說明」。",
            "optionLabels": {
              "new": "立即",
              "approved": "檢閱之後"
            }
          },
          "loginOptions": {
            "label": "貢獻者可使用",
            "attribute": "登入選項進行登入",
            "tooltip": "選擇貢獻者可用來自我識別的登入選項。如果勾選「訪客」選項，任何人都可以匿名方式貢獻您的故事 (不必登入)。如需追蹤貢獻者的詳細資訊，請參閱「說明」。",
            "optionLabels": {
              "arcgis": "ArcGIS",
              "facebook": "Facebook",
              "google": "Google",
              "guest": "訪客"
            }
          },
          "participateButton": {
            "label": "參與按鈕標籤",
            "placeholder": "輸入標籤"
          }
        }
      }
    }
  },
  "shareApp": {
    "title": "分享您的故事",
    "sharePermissions": {
      "private": "私有",
      "organization": "組織",
      "public": "公共"
    },
    "socialize": {
      "header": "社會化"
    }
  },
  "settingsModals": {
    "common": {
      "advancedOptions": "進階選項",
      "welcome": "歡迎使用"
    },
    "itemName": {
      "header": "您的群眾外包故事要取什麼名稱?",
      "advancedDescription": "將建立一些項目以支援此故事。若要重新命名這些項目，或將其儲存於特定資料夾中，您可以執行下列步驟。",
      "form": {
        "appName": {
          "label": "標題",
          "placeholder": "輸入標題"
        },
        "mapName": {
          "label": "地圖名稱",
          "placeholder": "輸入地圖名稱"
        },
        "folderSelection": {
          "label": "文件夾",
          "rootFolder": "首頁"
        },
        "featureServiceName": {
          "label": "圖層名稱",
          "placeholder": "輸入圖層名稱"
        }
      }
    },
    "layout": {
      "header": "想要使用哪種版面設定？",
      "headerHint": "可隨時在設定對話方塊中變更版面設定。",
      "preview": "查看即時範例",
      "commonAltText": "版面配置預覽",
      "selection": {
        "stacked": {
          "name": "已堆疊",
          "description": "在群眾外包故事的純地圖與純相片視圖之間切換。"
        },
        "sidePanel": {
          "name": "側面板",
          "description": "探索地圖並同時查看相片縮圖。移動地圖，僅顯示目前的地圖視圖中相片時，會更新面板。"
        }
      }
    }
  },
  "appDataPlaceholderText": {
    "globals": {
      "participateShort": "參與",
      "participateLong": "分享您的體驗",
      "exploreText": "瀏覽地圖"
    }
  },
  "itempageDefaults": {
    "webmap": {
      "titleAppend": "Web 地圖"
    },
    "featureService": {
      "titleAppend": "圖徵服務"
    }
  },
  "messages": {
    "arcgisItems": {
      "webmapNotOwned": {
        "title": "來自群眾外包建立器的訊息",
        "body": "您嘗試使用某人的 Web 地圖來建立群眾外包故事。會在您的帳號中建立其地圖的副本，且您的故事會使用該副本。",
        "confirmBtn": "確定"
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "redirectToSecureConnection": "使用安全連線重新載入"
    },
    "inlineEditing": {
      "heading": "注意:"
    },
    "loading": {
      "notAuthorizedCreateNew": "若要建立群眾外包故事，您必須使用具有發佈權限的 ArcGIS 訂閱帳號。若是使用訂閱帳號，請聯絡您的 ArcGIS 管理員來請求其他權限。若是使用 ArcGIS 公開帳號，請<a href=\"http://www.arcgis.com/features/plans/pricing.html\" target=\"-blank\">升級</a>到訂閱或啟動<a href=\"http://www.arcgis.com/features/free-trial.html\" target=\"-blank\">免費試用訂閱</a>。",
      "notAuthorizedEdit": "您沒有編輯此故事的授權。如果您不是擁有者，請確定擁有者已<a href=\"http://blogs.esri.com/esri/arcgis/2015/07/14/enable-colleagues-to-update-your-maps-and-apps/\" target=\"-blank\">授與您編輯權限</a>。您也必須擁有在組織中編輯項目和發佈新的託管圖徵服務的存取權。請聯絡您的 ArcGIS Online 組織管理員來請求這些權限。",
      "crowdsourceLayerNotFound": "找不到或無法正確載入群眾外包地圖圖層。請確定您擁有檢視圖徵服務的權限。",
      "builderNotSSL": "此群眾外包故事需要使用安全 (https) 連線，以確保您的對象可安全地登入和貢獻其相片。請確定您的伺服器在此相同的 URL 上支援 https 連線。如果可行，會將嘗試透過 http 存取您故事的其他人重新導向到安全連線。"
    },
    "shareItems": {
      "notShared": {
        "title": "注意",
        "body": "您故事中的部分項目無法分享。這些項目可能由其他使用者所擁有，或者需要訂閱。無法分享下列項目",
        "confirmBtn": "確定"
      }
    },
    "saving": {
      "checkInternet": "您的故事無法儲存。請檢查網際網路連線並重新載入頁面以重試。",
      "unknown": "您的故事無法儲存。請重新載入頁面以重試。"
    },
    "scratchCreation": {
      "unknown": "無法建立您的故事所需要的項目。請重新整理頁面以重試。"
    }
  },
  "validations": {
    "waitMessage": "正在檢查...",
    "arcgis": {
      "naming": {
        "arcgisItemName": "<% attribute %> 不可包含 < 或 >。",
        "arcgisServiceNameFormat": "<% attribute %> 只能包含字母、數字和底線，且開頭不可是數字。"
      },
      "portal": {
        "unableToCheckName": "無法檢查名稱是否可用。請再試一次。",
        "nameNotString": "名稱必須是一般文字",
        "nameNotAvailableFS": "您為圖層選擇的名稱無法使用。請選擇不同的名稱。"
      }
    }
  }
});