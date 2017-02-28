define({
  "loading": {
    "general": "加载",
    "initializing": "正在加载故事",
    "map": "正在加载地图"
  },
  "common": {
    "or": "或",
    "appNamePrepend": "故事地图",
    "appName": "Crowdsource",
    "buttons": {
      "save": "保存",
      "saving": "正在保存",
      "close": "关闭"
    }
  },
  "banner": {
    "buttons": {
      "edit": "编辑故事",
      "hide": "隐藏"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "共享至 Facebook",
      "twitter": "共享至 Twitter",
      "link": "获取嵌入代码或复制短链接"
    },
    "link": {
      "title": "共享",
      "copied": "已复制",
      "linkHeader": "链接至故事",
      "linkHelper": "使用以下链接通过电子邮件或社交媒体共享此故事",
      "copyShortLink": "复制短链接",
      "showShortLink": "显示短链接",
      "copyFullLink": "复制完整 URL",
      "showFullLink": "显示完整链接",
      "embedSizeHelper": "大小(宽度/高度)",
      "embedCodeHeader": "在网站中嵌入",
      "embedCodeHelper": "使用以下 HTML 代码将故事嵌入到 Web 页面中。",
      "copyEmbedCode": "复制嵌入代码"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "查看地图",
        "galleryView": "查看库"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "主页",
      "map": "地图",
      "gallery": "图库",
      "participate": "参与"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "请选择一个选项..."
    },
    "photo": {
      "loading": "正在加载照片",
      "resizing": "正在调整照片的大小"
    }
  },
  "map": {
    "controls": {
      "homeButton": "转到主页位置"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "查看更大",
    "review": {
      "title": "审批项目",
      "options": {
        "approve": "批准",
        "reject": "拒绝"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "登录",
      "services": {
        "arcgis": "使用 ArcGIS 帐户登录",
        "facebook": "使用 Facebook 帐户登录",
        "google": "使用 Google 帐户登录",
        "guest": "作为访客继续"
      },
      "loginDescription": "要参与，请使用以上选项之一。",
      "loginDescriptionSingle": "要参与，请使用以上选项。"
    },
    "form": {
      "photo": {
        "pickFile": "单击以选取文件",
        "choosePhoto": "上传照片",
        "selectNew": "使用其他照片",
        "photoTooSmall": "您的照片过小。最小不得小于最短边"
      },
      "location": {
        "gettingLocation": "正在定位",
        "locate": "定位我的位置",
        "findOnMap": "在地图上查找",
        "findOnMapTooltip": "在地图上单击或拖动此点以优化您的位置。",
        "saveLocation": "保存位置",
        "search": "搜索",
        "longitude": "经度",
        "latitude": "纬度",
        "nullIsland": "零岛",
        "photoLocation": "是否希望使用拍摄照片的位置?"
      },
      "termsAndConditions": {
        "buttonShow": "显示条款和条件",
        "buttonHide": "隐藏条款和条件"
      },
      "save": "接受条款并提交",
      "saving": "正在提交",
      "requiredWarning": "必填字段",
      "changedCloseWarning": "是否确定关闭? 您的更改将丢失。"
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "感谢您的参与。",
        "body": "您的贡献已提交，审批后，该贡献将显示在地图上。请稍候再查看。",
        "confirmBtn": "确定"
      },
      "contributionError": {
        "title": "注意",
        "body": "出现未知错误，无法保存您的贡献。请刷新浏览器并重试。",
        "confirmBtn": "确定"
      }
    }
  },
  "validations": {
    "fix": "修复!",
    "basic": {
      "noValue": "未提供值",
      "required": "需要 <% attribute %>。",
      "regex": "<% attribute %> 与所需模式不匹配。",
      "max": {
        "string": "<% attribute %> 无法包含多于 <% max %> 个的字符。",
        "number": "<% attribute %> 必须小于或等于 <% max %>。"
      },
      "acceptedTerms": "必须接受条款和条件才能共享。",
      "https": "必须通过安全连接加载 <% attribute %>。URL 必须以 \"https://\" 或 \"//\" 开头才能正确加载。",
      "imageUrl": "<% attribute %> 必须为有效的图像 URL。在大多数情况下，URL 以 \".jpg\"、\".gif\". 或 \".png\" 扩展名结尾。"
    },
    "pattern": {
      "commaSeparated": "<% attribute %> 不得包含任何空格。",
      "noNewLine": "<% attribute %> 不得包含换行符。"
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "<% attribute %> 包含不受支持的 HTML。"
      },
      "location": {
        "notValid": "您输入的位置无效，请重试。",
        "noResults": "找不到您搜索的位置。请重试并且尽量具体。"
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "开始构建全新的 Crowdsource 故事"
    },
    "loading": {
      "heading": "注意",
      "invalidConfig": "配置无效",
      "inaccessibleApp": "Web 制图应用程序不存在或无法访问。",
      "invalidConfigNoApp": "index.html 文件或 URL 中未指定有效的 Web 制图应用程序 ID。请修正 appid 并重试。",
      "unspecifiedConfigOwner": "尚未配置授权的所有者。",
      "invalidConfigOwner": "未授权故事所有者。",
      "createMap": "无法创建地图",
      "notAuthorizedApp": "您无权访问此故事",
      "notAuthorizedMap": "您无权访问此故事中的 Web 地图",
      "notAuthorizedLayers": "您无权查看 Web 地图中的一个或多个图层",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">请更新您的浏览器</a>。",
      "mapLoadingFail": "发生了一些错误，地图未正确加载。",
      "appLoadingFail": "发生错误，未正确加载应用程序。",
      "crowdsourceLayerNotFound": "发生错误，找不到故事，或未正确加载 crowdsource。"
    },
    "sharing": {
      "localhost": "无法共享含 \"localhost\" 的 URL。"
    },
    "selectedDisplay": {
      "noPhoto": "错误：照片不存在或无法访问。"
    }
  }
});