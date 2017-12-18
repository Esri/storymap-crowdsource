define({
  "betaMessage": {
    "title": "これはストーリー マップ クラウドソースのベータ版です",
    "messageParagraphs": {
      "p1": "このバージョンのストーリー マップ クラウドソースは、主な機能が完成し、安定してご利用いただけます。これは、ストーリー マップ チームが初期リリースの前にお客様や Esri コミュニティからのフィードバックを収集して組み込むことができるように、ベータ版として提供されています。",
      "p2": "このベータ版を使用して作成されたストーリーは、ストーリーまたはいずれかのコンポーネントをビルダーの外部で変更しない限り、以降のリリースでも引き続き動作します。",
      "p3": "このアプリの使用方法とフィードバックの送信先については、ヘルプをご参照ください。"
    }
  },
  "common": {
    "appNameAppend": "ビルダー",
    "buttons": {
      "next": "次へ"
    }
  },
  "banner": {
    "buttons": {
      "feedback": "フィードバック",
      "help": "ヘルプ",
      "preview": "最新表示",
      "share": "共有",
      "settings": "設定",
      "save": "保存",
      "toggleNav": "ナビゲーションの切り替え"
    },
    "hintText": {
      "saved": "ストーリーが保存されました",
      "saving": "保存しています",
      "leavingBeforeSave": "ストーリーに保存されていない変更箇所があります。このまま移動すると、変更内容は失われます。"
    }
  },
  "header": {
    "participateBtnDisabledTooltip": "[設定] パネルを閉じて有効化"
  },
  "introSplash": {
    "form": {
      "title": {
        "label": "タイトル",
        "placeholder": "タイトルの入力"
      },
      "subtitle": {
        "label": "カバー メッセージ",
        "placeholder": "カバー メッセージの追加..."
      },
      "exploreButton": {
        "label": "マップ ボタンのラベル",
        "placeholder": "ラベルの入力"
      }
    }
  },
  "map": {
    "editControls": {
      "homeLocation": {
        "tooltip": "ホーム位置の保存"
      }
    }
  },
  "contribute": {
    "defaultTitle": "提供データの追加",
    "defaultForm": {
      "name": {
        "label": "タイトル",
        "attribute": "タイトル",
        "placeholder": "タイトルを入力"
      },
      "description": {
        "label": "説明",
        "attribute": "説明",
        "placeholder": "説明を入力 (200 単語以内)"
      },
      "location": {
        "label": "位置",
        "attribute": "位置",
        "placeholder": "場所を入力"
      },
      "photo": {
        "label": "写真",
        "placeholder": "ドラッグ アンド ドロップ",
        "attribute": "写真"
      },
      "termsAndConditions": {
        "legal": "利用者は以下を保証し表明します。(1) 利用者は、このサイトで共有する写真のすべての権利、タイトル、所有権を所有し、Esri とその契約者に対して、このサービスの一部として共有された写真を使用、コピー、保存、キャッシュ、ホスト、派生物の作成、再現、パブリックな表示と実行、再配布、再ブロードキャスト、再送信する非排他的で利用料無料の権利を付与します。(2) 利用者による写真と関連の地理的位置情報の共有は、サードパーティの所有権やプライバシー権またはパブリシティ権を侵害または悪用しません。中傷、わいせつ、ポルノ、過度に暴力的と思われたり、非合法な活動を奨励する写真の共有は固く禁止します。"
      }
    }
  },
  "review": {
    "selection": {
      "header": "確認",
      "options": {
        "all": "すべての提供データ",
        "new": "新しい提供データ",
        "approved": "承認された提供データ",
        "rejected": "拒否された提供データ"
      }
    },
    "selectedShare": {
      "header": "確認"
    }
  },
  "fromScratchMessage": {
    "saving": "クラウドソース ビルダーの起動",
    "layerNameInWebmap": "クラウドソース レイヤー (削除しないでください)"
  },
  "help": {
    "title": "ヘルプ",
    "sections": {
      "s1": {
        "title": "はじめに",
        "paragraphs": {
          "p1": "ストーリー マップ クラウドソース (ベータ版) は、ユーザーから写真やキャプションを収集してマップに表示するように設計された ArcGIS Web アプリケーションです。このアプリは簡単に使用および構成でき、ラップトップおよびデスクトップ コンピューター、携帯電話、タブレットの Web ブラウザーで使用できます。提供者は、Facebook、Google、または ArcGIS アカウントでサイン インしたり、匿名ユーザーとして参加することができます。",
          "p2": "他の作成者が作成しているクラウドソース ストーリーを例を参照するには、<% galleryLink %> をご覧ください。Twitter で <% twitterFollowLink %> をフォローすることもできます。",
          "p3": "みなさまのご参加をお待ちしています。質問がある場合、新しい機能を依頼する場合、あるいはバグを見つけた場合は、<% geonet %> をご覧ください。"
        },
        "links": {
          "galleryLink": "ストーリー マップ Web サイトのギャラリー",
          "twitterFollowLink": "@EsriStoryMaps",
          "geonet": "GeoNet のストーリー マップ スペース"
        }
      },
      "s2": {
        "title": "構成",
        "paragraphs": {
          "p1": "独自のクラウドソース ストーリーを作成するには、ビルダーの構成オプションを使用します。ビルダー ツールバーの [<% settings %>] をクリックして、カバー画像、タイトル、ロゴ、共有オプションなどを変更します。",
          "p2": "ストーリーを読み込んだときに表示される地理エリアを指定するには、マップを目的の位置に移動およびズームしてから、マップ ナビゲーション コントロールの横にある青の [<% saveHomeLocation %>] ボタンをクリックします。",
          "p3": "構成を変更すると、<% autosaved %> されます。テキスト フィールドでの変更は、ブラウザーの元に戻すコマンドを使用して元に戻すことができます。",
          "p4": "このベータ版では、作成者は提供される単純なフォームに制限されます。今後のリリースでは、参加者への質問を編集できるフォーム ビルダーが付属する予定です。それまでは、この <% formEditBlog %> に従うことでフォーム ラベルを変更できます。",
          "p5": "ヒント: マップから <% coverPage %> に戻るには、タイトル バーをクリックします。"
        },
        "links": {
          "formEditBlog": "ブログ記事"
        },
        "bold": {
          "settings": "設定",
          "saveHomeLocation": "ホーム位置の保存",
          "autosaved": "自動保存",
          "coverPage": "カバー ページ"
        }
      },
      "s3": {
        "title": "提供データの確認",
        "paragraphs": {
          "p1": "提供データが送信されたら即座にマップ上に表示することは、提供者を奨励する最善の方法です。ただし、好ましくないコンテンツについて考慮する場合や、提供データを管理して表示するデータを選択したい場合は、まず送信内容を確認して、承認することができます。",
          "p2": "コンテンツを確認するまでマップ上に表示しないようにするには、 <[% settings %]> → > <[% contributions %]> に移動し、<[% afterReview %]> を選択します。このオプションを使用すると、新しい写真はマップでの表示を承認するまで、ユーザーだけに表示されます。",
          "p3": "新しい提供データを確認するには、クラウドソース ビルダーでマップに移動し、ビルダー ツールバーで [<% newContributions %>] を選択します。次に、マップをクリックして提供データを表示し、[<% approve %>] または [<% reject %>] を選択します。",
          "p4": "マップ上に表示される提供データを変更するには、ビルダー ツールバーの [<% review %>] フィルターで、[すべて]、[新規]、[承認済み]、または [拒否済み] を選択します。提供データに対して選択した内容を変更するには、マップ上でその提供データをクリックして、承認ステータスを更新します。"
        },
        "bold": {
          "settings": "設定",
          "contributions": "提供者",
          "afterReview": "提供データの表示: 確認後",
          "newContributions": "確認: 新しい提供データ",
          "approve": "承認",
          "reject": "拒否",
          "review": "確認"
        }
      },
      "s4": {
        "title": "提供データの追跡",
        "paragraphs": {
          "p1": "クラウドソース ストーリーに提供するユーザーが、自分の <% facebook %>、<% twitter %>、または <% arcgis %> アカウントでサイン インして認証するようにできます。",
          "p2": "Facebook と Twitter のオプションは、OAuth と呼ばれるテクノロジを使用して、提供者のソーシャル メディア アカウントに接続された ArcGIS 個人向けプランのアカウントを作成します。これにより、提供者はストーリーを提供するために新しいアカウントでサイン アップする必要がなくなり、簡単に提供できるようになります。もちろん、提供者がすでに ArcGIS サブスクリプションまたは個人向けプランのアカウントを持っている場合は、それを使用してサイン インできます。",
          "p3": "また、すべての人がサイン インしなくても提供できるように、<% guestContributions %> を許可して、より多くの人にストーリーの提供を促すこともできます。ただし、ゲストは、自分が提供したデータを編集または削除することはできず (ベータ版ではできません)、ゲストの提供データにはユーザー名が記録されないため、提供データから個人を追跡することはできません。これらの機能が重要である場合は、ゲストによる提供を許可しないでください。",
          "p4": "上記のすべてのサイン イン オプションは、無効にしない限り、提供者が利用できます。Facebook と Twitter のサイン インは、ポータルでは利用できません。"
        },
        "bold": {
          "facebook": "Facebook",
          "twitter": "Twitter",
          "arcgis": "ArcGIS",
          "guestContributions": "ゲストによる提供"
        }
      },
      "s5": {
        "title": "FAQ",
        "questions": {
          "q1": {
            "question": "このベータ版のアプリについてフィードバックを送るには、どうすればよいですか？",
            "response": "フィードバックまたは意見を提供したり、問題を報告するには、<% geonet %> にご意見をお寄せください。"
          },
          "q2": {
            "question": "ベータ版のアプリを使用して作成されたクラウドソース ストーリーは、今後のソフトウェア リリース後も引き続き動作しますか？",
            "response": "はい。動作します。ただし、2 つの例外があります。1) ベータ版のクラウドソース ストリーの Web マップにレイヤーを追加した場合 (この操作はビルダーの外部でのみ実行できます)、最終版以降は、それらのレイヤーが動作しなくなるか、シンボルが変化する可能性があります。これを回避するには、サポートしているレイヤーをマップに追加する前にフィーチャ レイヤーに変換するとともに、単純なシンボルを使用します。2) クラウドソース レイヤーのデータ モデルが変化する可能性もあります。この場合は、レイヤーを新しいデータ モデルに更新するためのワークフローまたはツールを提供する予定です。"
          },
          "q3": {
            "question": "自分のクラウドソース ストーリーのマップに他のレイヤーを追加することはできますか？",
            "response": "はい。マップの背景用に他のレイヤーを追加することはできますが、ベータ版のストーリー マップ クラウドソースでこの操作を実行する際の重要情報について、まず過去の質問を確認してください。ストーリーの <% map %> を開き、レイヤーの追加やベースマップの変更を行い、変更内容を保存します。ストーリーを次に読み込むと、新しいレイヤーが表示されます。マップ内の提供データのレイヤーを削除または変更しないように気をつけてください。削除または変更すると、クラウドソース ストーリーが正しく動作しなくなる可能性があります。"
          },
          "q4": {
            "question": "写真はどこに保存されていますか？",
            "response": "送信された写真は適切なサイズにリサンプリングされ、(フィーチャ サービスの添付ファイルとして) ArcGIS アカウントに保存されます。ビルダーでカバー画像やロゴ用にアップロードした画像は、ストーリー マップのアプリケーション アイテムとともにアイテム リソースとして保存されます。"
          },
          "q5": {
            "question": "クラウドソース ストーリーを提供するのに ArcGIS アカウントは必要ですか？",
            "response": "いいえ。提供者は <% facebook %> または <% google %> アカウントを使用してサイン インできます。サイン インすると、提供者のソーシャル メディア アカウントとリンクされた ArcGIS 個人向けプランのアカウントが作成されます。ただし、このようにサイン インしても、Esri から提供者へ電子メールは送信されません。また、アカウントを使用してサイン インしなくても、匿名ゲストとして提供することもできます。ストーリーで利用できるサイン イン方法は、<% settingsContributions %> で制御します。"
          },
          "q6": {
            "question": "ArcGIS 個人向けプランのアカウントを使用してクラウドソース ストーリーを作成できますか？",
            "response": "いいえ。ストーリー マップ クラウドソースは、提供された画像を保存するのにフィーチャ サービスの添付ファイルを使用するため、現時点では組織アカウントのみがサポートされています。"
          },
          "q7": {
            "question": "クラウドソース ストーリーをカスタマイズする方法は他にありますか？",
            "response": "利用できる構成オプションがニーズに合わない場合や、独自の Web サーバーでアプリケーションをホストしたい場合は、アプリケーションのソース コードを入手できます。最新バージョンをダウンロードするには、<% github %> をご覧ください。"
          },
          "q8": {
            "question": "自分のクラウドソース ストーリーはクレジットを消費しますか？",
            "response": "ArcGIS Online でホストされるクラウドソース ストーリーは、フィーチャ サービス内に写真とデータを保存するために、毎月わずかなクレジットを消費します。数百もの写真を含む一般的なストーリーにかかるコストは、1 か月あたり 1 米ドルをはるかに下回ります。<% agoCredits %> の詳細をご参照ください。"
          }
        },
        "bold": {
          "facebook": "Facebook",
          "google": "Google",
          "settingsContributions": "[設定] → [提供データ]"
        },
        "links": {
          "geonet": "GeoNet のストーリー マップ フォーラム",
          "map": "マップ",
          "agoCredits": "ArcGIS Online サービス クレジット",
          "github": "GitHub プロジェクト ページ"
        }
      }
    }
  },
  "settings": {
    "title": "設定",
    "buttons": {
      "backTo": "戻る:"
    },
    "messages": {
      "uploading": "アップロードしています"
    },
    "panes": {
      "header": {
        "title": "ヘッダー",
        "fields": {
          "logoType": {
            "label": "ロゴ",
            "optionLabels": {
              "esri": "Esri ロゴ",
              "upload": "カスタム ロゴのアップロード",
              "url": "URL からのカスタム ロゴ",
              "none": "ロゴなし"
            }
          },
          "logoUrl": {
            "label": "ロゴの画像の URL",
            "placeholder": "https://www.example.org/your_logo.png",
            "attribute": "ロゴ"
          },
          "logoUpload": {
            "label": "ロゴのアップロード",
            "placeholder": "ドラッグ アンド ドロップ",
            "attribute": "ロゴ"
          },
          "logoLink": {
            "label": "ロゴのクリックスルー リンク",
            "placeholder": "https://www.example.com"
          },
          "bannerTitle": {
            "label": "ヘッダーのタイトル",
            "placeholder": "タイトルの入力"
          }
        }
      },
      "socialSharing": {
        "title": "ソーシャル",
        "extra": {
          "tweetLength": "推定長",
          "tweetLengthWarning": "ツイートが長すぎる可能性があります。必ずヘッダーの [Twitter] ボタンを使用してテストしてください。"
        },
        "fields": {
          "includeSharing": {
            "label": "ソーシャル ボタン",
            "optionLabels": {
              "include": "ソーシャル ボタンの表示"
            }
          },
          "twitterText": {
            "label": "ツイート",
            "tooltip": "このメッセージは、ユーザーが Twitter でストーリーを共有するときに表示されますが、変更できます。ツイートの末尾にストーリーのショート リンクが追加されます。",
            "placeholder": "ツイートのテキストを入力",
            "attribute": "ツイートのテキスト フィールド"
          },
          "twitterRelated": {
            "label": "「おすすめユーザー」の候補",
            "tooltip": "Twitter はこれらのアカウントをストーリーをツイートしたユーザーに推奨します",
            "placeholder": "Twitter アカウントの入力",
            "attribute": "推奨アカウント フィールド"
          }
        }
      },
      "introSplash": {
        "title": "カバー ページ",
        "fields": {
          "backgroundImage": {
            "label": "背景写真のアップロード",
            "placeholder": "ドラッグ アンド ドロップ",
            "attribute": "背景写真"
          }
        }
      },
      "contribute": {
        "title": "提供者",
        "fields": {
          "allowParticipation": {
            "label": "提供者",
            "optionLabels": {
              "accept": "新しい提供データの承認"
            }
          },
          "showNewFeatures": {
            "label": "提供データの表示",
            "tooltip": "これは、新しい提供データをマップ上に表示する時期を制御します。[即時] は提供データをただちに表示します。[確認後] の場合は、新しい提供データを他のユーザーに表示する前に承認する必要があります。提供データの確認の詳細については、ヘルプをご参照ください。",
            "optionLabels": {
              "new": "即時",
              "approved": "確認後"
            }
          },
          "loginOptions": {
            "label": "提供者がサイン インできるアカウント",
            "attribute": "サイン イン オプション",
            "tooltip": "提供者が認証に使用できるサイン イン オプションを選択します。[ゲスト] オプションがオンの場合、すべての人が (サイン インしないで) 匿名でストーリーを提供できます。提供データの追跡の詳細については、ヘルプをご参照ください。",
            "optionLabels": {
              "arcgis": "ArcGIS",
              "facebook": "Facebook",
              "google": "Google",
              "guest": "ゲスト"
            }
          },
          "participateButton": {
            "label": "[参加] ボタンのラベル",
            "placeholder": "ラベルの入力"
          }
        }
      }
    }
  },
  "shareApp": {
    "title": "ストーリーの共有",
    "sharePermissions": {
      "private": "プライベート",
      "organization": "組織",
      "public": "パブリック"
    },
    "socialize": {
      "header": "ソーシャライズ"
    }
  },
  "settingsModals": {
    "common": {
      "advancedOptions": "高度な設定",
      "welcome": "ようこそ"
    },
    "itemName": {
      "header": "クラウドソース ストーリーの名前",
      "advancedDescription": "このストーリーをサポートするために、いくつかのアイテムが作成されます。これらのアイテムの名前を変更したり、特定のフォルダーに保存する場合は、以下で実行できます。",
      "form": {
        "appName": {
          "label": "タイトル",
          "placeholder": "タイトルの入力"
        },
        "mapName": {
          "label": "マップ名",
          "placeholder": "マップ名の入力"
        },
        "folderSelection": {
          "label": "フォルダー",
          "rootFolder": "ホーム"
        },
        "featureServiceName": {
          "label": "レイヤー名",
          "placeholder": "レイヤー名の入力"
        }
      }
    },
    "layout": {
      "header": "使用するレイアウト",
      "headerHint": "レイアウトは、設定ダイアログからいつでも変更できます。",
      "preview": "最新例を表示",
      "commonAltText": "レイアウトのプレビュー。",
      "selection": {
        "stacked": {
          "name": "改行",
          "description": "クラウドソース ストーリーのマップのみのビューと写真のみのビューを切り替えます。"
        },
        "sidePanel": {
          "name": "サイド パネル",
          "description": "マップを操作するときに写真のサムネイルを表示します。マップ ビュー内にある写真のみが表示されるように、パネルはマップの移動に合わせて更新されます。"
        }
      }
    }
  },
  "appDataPlaceholderText": {
    "globals": {
      "participateShort": "参加",
      "participateLong": "経験の共有",
      "exploreText": "マップの操作"
    }
  },
  "itempageDefaults": {
    "webmap": {
      "titleAppend": "Web マップ"
    },
    "featureService": {
      "titleAppend": "フィーチャ サービス"
    }
  },
  "messages": {
    "arcgisItems": {
      "webmapNotOwned": {
        "title": "クラウドソース ビルダーからのメッセージ",
        "body": "他のユーザーの Web マップを使用してクラウドソース ストーリーを作成しようとしました。自分のアカウントにそのマップのコピーが作成され、ストーリーにはコピーが使用されます。",
        "confirmBtn": "OK"
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "redirectToSecureConnection": "セキュリティで保護された接続を使用して再読み込み"
    },
    "inlineEditing": {
      "heading": "注意:"
    },
    "loading": {
      "notAuthorizedCreateNew": "クラウドソース ストーリーを作成するには、公開権限を持つ ArcGIS サブスクリプション アカウントを使用する必要があります。サブスクリプション アカウントを使用している場合、ArcGIS 管理者に連絡して追加の権限をリクエストしてください。ArcGIS 個人向けプランのアカウントを使用している場合は、サブスクリプションに<a href=\"http://www.arcgis.com/features/plans/pricing.html\" target=\"-blank\">アップグレード</a>するか、<a href=\"http://www.arcgis.com/features/free-trial.html\" target=\"-blank\">無料のトライアル サブスクリプション</a>を開始してください。",
      "notAuthorizedEdit": "このストーリーを編集する権限がありません。所有者でない場合、所有者から<a href=\"http://blogs.esri.com/esri/arcgis/2015/07/14/enable-colleagues-to-update-your-maps-and-apps/\" target=\"-blank\">編集権限を付与</a>されていることを確認してください。また、アイテムを編集したり組織内に新しいホスト フィーチャ サービスを公開するためにアクセスできる必要もあります。ArcGIS Online 組織サイトの管理者に連絡して、これらの権限をリクエストしてください。",
      "crowdsourceLayerNotFound": "クラウドソース マップ レイヤーが見つからないか、正しく読み込めません。フィーチャ サービスを表示する権限を持っていることを確認してください。",
      "builderNotSSL": "一般ユーザーが安全にサイン インして写真を提供できるように、このクラウドソース ストーリーではセキュリティで保護された接続 (https) を使用する必要があります。サーバーがこの同じ URL で https 接続をサポートしていることを確認してください。http でストーリーにアクセスしようとしている他のユーザーは、可能であればセキュリティで保護された接続にリダイレクトされます。"
    },
    "shareItems": {
      "notShared": {
        "title": "注意",
        "body": "ストーリー内の一部のアイテムを共有できませんでした。これらのアイテムは他のユーザーが使用していたり、サブスクリプションが必要である可能性があります。次のアイテムを共有できませんでした。",
        "confirmBtn": "OK"
      }
    },
    "saving": {
      "checkInternet": "ストーリーを保存できませんでした。インターネット接続を確認して、ページを再読み込みし、もう一度やり直してください。",
      "unknown": "ストーリーを保存できませんでした。ページを再読み込みして、もう一度やり直してください。"
    },
    "scratchCreation": {
      "unknown": "ストーリーに必要なアイテムを作成できませんでした。ページを更新して、もう一度やり直してください。"
    }
  },
  "validations": {
    "waitMessage": "チェック中...",
    "arcgis": {
      "naming": {
        "arcgisItemName": "<% attribute %> に < または > を含めることはできません。",
        "arcgisServiceNameFormat": "<% attribute %> には、基本的なラテン アルファベット文字、数字、またはアンダースコアのみを含めることができ、数字で開始することはできません。"
      },
      "portal": {
        "unableToCheckName": "この名前が使用できるかどうかを確認できません。もう一度やり直してください。",
        "nameNotString": "名前は通常のテキストである必要があります。",
        "nameNotAvailableFS": "レイヤーに選択した名前は使用できません。別の名前を選択してください。"
      }
    }
  }
});