define({
  "loading": {
    "general": "読み込んでいます",
    "initializing": "ストーリーの読み込み",
    "map": "マップを読み込んでいます"
  },
  "common": {
    "or": "または",
    "appNamePrepend": "ストーリー マップ",
    "appName": "クラウドソース",
    "buttons": {
      "save": "保存",
      "saving": "保存しています",
      "close": "閉じる"
    }
  },
  "banner": {
    "buttons": {
      "edit": "ストーリーの編集",
      "hide": "非表示"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Facebook で共有",
      "twitter": "Twitter で共有",
      "link": "埋め込みコードの取得またはショート リンクのコピー"
    },
    "link": {
      "title": "共有",
      "copied": "コピーしました",
      "linkHeader": "ストーリーへのリンク",
      "linkHelper": "以下のリンクを使用して、電子メールまたはソーシャル メディアを通じてこのストーリーを共有します。",
      "copyShortLink": "ショート リンクのコピー",
      "showShortLink": "ショート リンクの表示",
      "copyFullLink": "完全 URL のコピー",
      "showFullLink": "完全なリンクの表示",
      "embedSizeHelper": "サイズ (幅/高さ)",
      "embedCodeHeader": "Web サイトへの埋め込み",
      "embedCodeHelper": "ストーリーを Web ページに埋め込むには、次の HTML コードを使用します。",
      "copyEmbedCode": "埋め込みコードをコピー"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "マップの表示",
        "galleryView": "ギャラリーの表示"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "ホーム",
      "map": "マップ",
      "gallery": "ギャラリー",
      "participate": "参加"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "オプションを選択してください..."
    },
    "photo": {
      "loading": "写真を読み込んでいます",
      "resizing": "写真のサイズを変更しています"
    }
  },
  "map": {
    "controls": {
      "homeButton": "ホーム位置へ移動"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "拡大表示",
    "review": {
      "title": "アイテムの確認",
      "options": {
        "approve": "承認",
        "reject": "拒否"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "サイン イン",
      "services": {
        "arcgis": "ArcGIS を使用してサイン イン",
        "facebook": "Facebook を使用してサイン イン",
        "google": "Google を使用してサイン イン",
        "guest": "ゲストとして続行する"
      },
      "loginDescription": "参加するには、上記のいずれかのオプションを使用してください。",
      "loginDescriptionSingle": "参加するには、上記のオプションを使用してください。"
    },
    "form": {
      "photo": {
        "pickFile": "クリックしてファイルを選択",
        "choosePhoto": "写真のアップロード",
        "selectNew": "異なる写真を使用",
        "photoTooSmall": "写真が小さすぎます。短辺は、少なくとも次の値である必要があります。"
      },
      "location": {
        "gettingLocation": "位置を検索しています",
        "locate": "現在の場所を検索",
        "findOnMap": "マップの検索",
        "findOnMapTooltip": "マップ上をクリックするか、このポイントをドラッグして位置を調整します。",
        "saveLocation": "位置の保存",
        "search": "検索",
        "longitude": "経度",
        "latitude": "緯度",
        "nullIsland": "存在しない島",
        "photoLocation": "写真が撮影された場所を使用しますか？"
      },
      "termsAndConditions": {
        "buttonShow": "利用条件の表示",
        "buttonHide": "利用条件の非表示"
      },
      "save": "利用条件に同意して送信",
      "saving": "送信しています",
      "requiredWarning": "必須フィールド",
      "changedCloseWarning": "閉じますか？変更内容は失われます。"
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "参加していただき、ありがとうございました。",
        "body": "提供データは送信され、確認および承認後にマップ上に表示されます。後でもう一度ご確認ください。",
        "confirmBtn": "OK"
      },
      "contributionError": {
        "title": "注意",
        "body": "原因不明のエラーが発生し、提供データを保存できませんでした。ブラウザーを更新して、もう一度やり直してください。",
        "confirmBtn": "OK"
      }
    }
  },
  "validations": {
    "fix": "解決する",
    "basic": {
      "noValue": "値が指定されませんでした",
      "required": "<% attribute %> が必要です。",
      "regex": "<% attribute %> が必要なパターンと一致しません。",
      "max": {
        "string": "<% attribute %> には、<% max %> を超える文字を含めることができません。",
        "number": "<% attribute %> は <% max %> 以下である必要があります。"
      },
      "acceptedTerms": "共有する前に利用条件に同意する必要があります。",
      "https": "セキュリティで保護された接続を使用して <% attribute %> を読み込む必要があります。正しく読み込むには、URL が \"https://\" または \"//\" から始まる必要があります。",
      "imageUrl": "<% attribute %> は有効な画像 URL である必要があります。ほとんどの場合、URL の末尾の拡張子は \".jpg\"、\".gif\"、または \".png\" になります。"
    },
    "pattern": {
      "commaSeparated": "<% attribute %> には、スペースを含めることができません。",
      "noNewLine": "<% attribute %> には、改行を含めることができません。"
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "<% attribute %> にサポートされていない HTML が含まれています。"
      },
      "location": {
        "notValid": "入力した場所が有効ではありません。もう一度やり直してください。",
        "noResults": "検索した場所が見つかりません。もう一度やり直して、できる限り明確に指定してください。"
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "新しいクラウドソース ストーリーの構築を開始"
    },
    "loading": {
      "heading": "注意",
      "invalidConfig": "無効な構成",
      "inaccessibleApp": "Web マッピング アプリケーションが存在しないか、アクセスできません。",
      "invalidConfigNoApp": "アプリケーションの index.html ファイルまたは URL に有効な Web マッピング アプリケーション ID が指定されていません。アプリケーション ID を修正して、もう一度やり直してください。",
      "unspecifiedConfigOwner": "権限のある所有者が構成されていません。",
      "invalidConfigOwner": "ストーリーの所有者に権限がありません。",
      "createMap": "マップを作成できません",
      "notAuthorizedApp": "このストーリーにアクセスする権限が与えられていません。",
      "notAuthorizedMap": "このストーリーの Web マップにアクセスする権限が与えられていません。",
      "notAuthorizedLayers": "Web マップ内の 1 つまたは複数のレイヤーを表示する権限が与えられていません。",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">ブラウザーを更新してください</a>。",
      "mapLoadingFail": "問題が発生しました。マップを正しく読み込みませんでした。",
      "appLoadingFail": "問題が発生しました。アプリを正しく読み込みませんでした。",
      "crowdsourceLayerNotFound": "問題が発生しました。ストーリーが見つからないか、クラウドソース マップ レイヤーを正しく読み込めませんでした。"
    },
    "sharing": {
      "localhost": "\"localhost\" の付いた URL は共有できません。"
    },
    "selectedDisplay": {
      "noPhoto": "エラー: 写真が存在しないか、アクセスできません。"
    }
  }
});