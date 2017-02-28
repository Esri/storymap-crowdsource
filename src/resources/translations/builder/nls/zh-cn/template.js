define({
  "betaMessage": {
    "title": "此版本为 Story Map Crowdsource 的 beta 版本",
    "messageParagraphs": {
      "p1": "此版本 Story Map Crowdsource 的核心功能已完成并处于稳定状态。之所以作为 beta 版本是因为 Story Maps 团队希望在初始版本之前收集和集成来自您和 Esri 社区的反馈。",
      "p2": "使用此 beta 版本创建的故事可在后续版本中继续使用，在构建器外部修改故事或其组件的情况例外。",
      "p3": "请阅读帮助以了解有关如何使用此应用程序以及在何处提交反馈的详细信息。"
    }
  },
  "common": {
    "appNameAppend": "构建器",
    "buttons": {
      "next": "下一个"
    }
  },
  "banner": {
    "buttons": {
      "feedback": "反馈",
      "help": "帮助",
      "preview": "实时查看",
      "share": "共享",
      "settings": "设置",
      "save": "保存",
      "toggleNav": "切换导航"
    },
    "hintText": {
      "saved": "故事已保存",
      "saving": "正在保存",
      "leavingBeforeSave": "您的故事中有未保存的更改。如果现在离开，更改将丢失。"
    }
  },
  "header": {
    "participateBtnDisabledTooltip": "关闭“设置”面板以启用"
  },
  "introSplash": {
    "form": {
      "title": {
        "label": "标题",
        "placeholder": "输入标题"
      },
      "subtitle": {
        "label": "封面消息",
        "placeholder": "添加封面消息..."
      },
      "exploreButton": {
        "label": "地图按钮标注",
        "placeholder": "输入标注"
      }
    }
  },
  "map": {
    "editControls": {
      "homeLocation": {
        "tooltip": "保存主页位置"
      }
    }
  },
  "contribute": {
    "defaultTitle": "添加您的贡献",
    "defaultForm": {
      "name": {
        "label": "标题",
        "attribute": "标题",
        "placeholder": "输入标题"
      },
      "description": {
        "label": "说明",
        "attribute": "说明",
        "placeholder": "输入说明(200 字以内)"
      },
      "location": {
        "label": "位置",
        "attribute": "位置",
        "placeholder": "输入位置"
      },
      "photo": {
        "label": "照片",
        "placeholder": "拖放",
        "attribute": "照片"
      },
      "termsAndConditions": {
        "legal": "您保证并表示 (1) 向此站点分享的照片的所有权力、标题和所有权均归您所有，并且您授予 Esri 及其承包商在服务的过程中以免收版税的非独占性方式使用、复制、存储、缓存、托管、准备其衍生品、复制、向公众显示和执行、重新分发、转播和重传共享照片的权力，并且 (2) 您对照片和所有相关地理位置信息的共享不会侵犯或侵占任意第三方的所有权或隐私权或宣传权。严禁共享可被视为诽谤、淫秽、色情、过度暴力或鼓励非法活动的照片。"
      }
    }
  },
  "review": {
    "selection": {
      "header": "审批",
      "options": {
        "all": "所有贡献",
        "new": "新贡献",
        "approved": "已批准贡献",
        "rejected": "已拒绝贡献"
      }
    },
    "selectedShare": {
      "header": "审批"
    }
  },
  "fromScratchMessage": {
    "saving": "正在启动 Crowdsource 构建器",
    "layerNameInWebmap": "Crowdsource 图层(请勿移除)"
  },
  "help": {
    "title": "帮助",
    "sections": {
      "s1": {
        "title": "简介",
        "paragraphs": {
          "p1": "Story Map Crowdsource (beta) 这一 ArcGIS Web 应用程序可向所有人收集照片和说明，并将这些内容显示在地图上。这款应用程序具有易于使用和配置的优点，无论是笔记本电脑、台式机，还是移动手机和平台设备，都可以借助 Web 浏览器使用该应用程序。贡献者可使用 Facebook、Google 或 ArcGIS 帐户进行登录，也可使用匿名访客的身份参与其中。",
          "p2": "要查看其他作者创建的 Crowdsource 示例，请访问 <% galleryLink %>。您也可以在 Twitter 上关注我们：<% twitterFollowLink %>。",
          "p3": "我们非常期待您的参与! 如果您有任何疑问、想要请求新功能或者发现漏洞，请访问 <% geonet %>。"
        },
        "links": {
          "galleryLink": "Story Maps 网站上的库",
          "twitterFollowLink": "@EsriStoryMaps",
          "geonet": "GeoNet 上的 Story Maps 空间"
        }
      },
      "s2": {
        "title": "配置",
        "paragraphs": {
          "p1": "要创建您自己独特的 Crowdsource 故事，请使用构建器的配置选项。单击构建器工具栏中的 <% settings %> 可更改封面图像、标题、徽标、共享选项和更多内容。",
          "p2": "要指定参与者加载故事时将看到的地理区域，请将地图平移和缩放到所需位置，然后单击地图导航控件旁的蓝色 <% saveHomeLocation %> 按钮。",
          "p3": "更改配置时，这些内容会 <% autosaved %>。可使用浏览器的撤消命令撤消对文本字段所做的修改。",
          "p4": "在本 beta 版本中，用户仅限于使用提供的简单表单。在后续版本中，我们将提供表单构建器，用于编辑向参与者提出的问题。届时，可通过该 <% formEditBlog %> 修改表单标注。",
          "p5": "提示：要从地图返回到 <% coverPage %>，可单击标题栏。"
        },
        "links": {
          "formEditBlog": "博客帖子"
        },
        "bold": {
          "settings": "设置",
          "saveHomeLocation": "保存主页位置",
          "autosaved": "自动保存",
          "coverPage": "封面"
        }
      },
      "s3": {
        "title": "正在审批贡献",
        "paragraphs": {
          "p1": "贡献提交后立即在地图上显示它们是鼓励和酬谢贡献者的最佳方式。但是，如果您担心某些内容不被允许，或希望精选内容，并选择显示的内容，则可以先审批提交内容。",
          "p2": "要阻止内容在审批前显示在地图上，请转至 <% settings %> > <% contributions %> 并选择 <% afterReview %>。使用此选项时，仅在审批新照片以允许其在地图内显示后，这些照片才可见。",
          "p3": "要审批新贡献，请在 Crowdsource 构建器中转至地图，在构建器工具栏中选择 <% newContributions %>。单击地图以查看贡献，然后选择 <% approve %> 或 <% reject %>。",
          "p4": "您可以更改显示在地图上的贡献，方法是在构建器工具栏的 <% review %> 过滤器中选择“所有”、“新建”、“已批准”或“已拒绝”。可在地图上单击贡献并更新其审批状态，以此更改对该贡献的审批决策。"
        },
        "bold": {
          "settings": "设置",
          "contributions": "贡献",
          "afterReview": "显示贡献：审批后",
          "newContributions": "审批：新贡献",
          "approve": "批准",
          "reject": "拒绝",
          "review": "审批"
        }
      },
      "s4": {
        "title": "追踪贡献者",
        "paragraphs": {
          "p1": "您可以识别向 Crowdsource 故事做出贡献的人员的身份，方法是使用其 <% facebook %>、<% twitter %> 或 <% arcgis %> 帐户登录。",
          "p2": "Facebook 和 Twitter 选项使用一种名为 OAuth 的技术来创建与贡献者社交媒体帐户连接的 ArcGIS 公共账户。该技术可为贡献者提供便利，贡献者无需注册新帐户即可对您的故事做出贡献。当然，如果贡献者已拥有 ArcGIS 订阅或公共帐户，则可使用该帐户登录。",
          "p3": "您还可以允许 <% guestContributions %>，以便所有人均可在不登录的情况下做出贡献，这种方法可鼓励更多的人向您的地图出谋划策。但是，访客无法编辑或移除他们自己的贡献(beta 版本中不提供此功能)，由于不会记录做出贡献访客的用户名，因此无法追踪到个人。如果这些功能对您来说十分重要，应禁用访客贡献。",
          "p4": "除非禁用，否则以下列出的所有登录选项均可供贡献者使用。Portal 不支持 Facebook 和 Twitter 登录。"
        },
        "bold": {
          "facebook": "Facebook",
          "twitter": "Twitter",
          "arcgis": "ArcGIS",
          "guestContributions": "访客贡献"
        }
      },
      "s5": {
        "title": "常见问题解答",
        "questions": {
          "q1": {
            "question": "如何提供关于此测试版应用程序的反馈？",
            "response": "如想提供反馈或建议，或者告知我们某些问题，请通过 <% geonet %> 分享您的想法。"
          },
          "q2": {
            "question": "使用 beta 版本应用程序创建的 Crowdsource 故事可以在后续软件版本中继续使用吗?",
            "response": "可以继续使用，但以下两种情况除外：1) 如果您向 beta 版 Crowdsource 故事的 Web 地图中添加图层(只能在构建器外部实现此操作)，那么在最终版本后，这些图层可能会停止运行，或者其符号可能会发生改变。要避免此类情况，您可以先将任意支持的图层转换为要素图层，然后再将其添加到地图中并使用简单符号。2) Crowdsource 图层的数据也可能会发生更改。如果发生这种情况，我们将会提供一个工作流或工具来将图层更新为新数据模型。"
          },
          "q3": {
            "question": "我能向 Crowdsource 故事地图中添加其他图层吗?",
            "response": "可以，您可以向地图添加其他图层以提供上下文，但是请先阅读上一问题，以了解有关使用 beta 版本 Story Map Crowdsource 执行此操作的重要信息。打开故事的 <% map %>，添加图层和/或更改底图，并保存更改。下次加载故事时即会看到新图层。请注意，切勿删除或修改地图中的贡献图层，否则您的 Crowdsource 故事可能无法正常运行。"
          },
          "q4": {
            "question": "照片存储在何处?",
            "response": "会对提交的照片进行重采样以调整为适当的大小，并存储在您的 ArcGIS 帐户中(作为要素服务附件)。您在构建器中为封面图像和徽标上传的图像会作为项目资源与您的 Story Map 应用程序项目一同存储。"
          },
          "q5": {
            "question": "用户是否需要 ArcGIS 帐户才能向我的 Crowdsource 故事做出贡献?",
            "response": "不需要，贡献者可使用其 <% facebook %> 或 <% google %> 帐户进行登录。这将创建链接至贡献者社交媒体帐户的 ArcGIS 公共帐户，但是如果贡献者通过这种方法登录，他们不会收到 Esri 发送的电子邮件。用户还可以无需登录任何帐户，以匿名访客的身份做出贡献。可在 <% settingsContributions %> 中控制可在故事中使用的登录方法。"
          },
          "q6": {
            "question": "我能否使用 ArcGIS Online 公共帐户创建 Crowdsource 故事?",
            "response": "不能，因为 Story Map Crowdsource 使用要素服务附件存储贡献的图像，因此目前仅支持组织帐户。"
          },
          "q7": {
            "question": "我如何使用其他内容对 Crowdsource 故事进行自定义?",
            "response": "如果可用的配置选项不能满足您的需求，或者您希望在自己的 Web 服务器上托管应用程序，则可以使用应用程序源代码。要下载最新的版本，请访问 <% github %>。"
          },
          "q8": {
            "question": "Crowdsource 故事是否消耗配额?",
            "response": "如果 Crowdsource 故事托管于 ArcGIS Online，则每月会消耗少量配额，因为需要在要素服务中存储照片和数据。含数百张照片的典型故事每月消耗的配额不多于 US$1。请参阅关于 <% agoCredits %> 的详细信息。"
          }
        },
        "bold": {
          "facebook": "Facebook",
          "google": "Google",
          "settingsContributions": "设置 > 贡献"
        },
        "links": {
          "geonet": "GeoNet 上的 Story Maps 论坛",
          "map": "地图",
          "agoCredits": "ArcGIS Online 服务配额",
          "github": "GitHub 项目页面"
        }
      }
    }
  },
  "settings": {
    "title": "设置",
    "buttons": {
      "backTo": "返回至"
    },
    "messages": {
      "uploading": "正在上传"
    },
    "panes": {
      "header": {
        "title": "页眉",
        "fields": {
          "logoType": {
            "label": "徽标",
            "optionLabels": {
              "esri": "Esri 徽标",
              "upload": "上传的自定义徽标",
              "url": "来自 URL 的自定义徽标",
              "none": "无徽标"
            }
          },
          "logoUrl": {
            "label": "徽标图像 URL",
            "placeholder": "https://www.example.org/your_logo.png",
            "attribute": "徽标"
          },
          "logoUpload": {
            "label": "上传徽标",
            "placeholder": "拖放",
            "attribute": "徽标"
          },
          "logoLink": {
            "label": "徽标点击浏览链接",
            "placeholder": "https://www.example.com"
          },
          "bannerTitle": {
            "label": "页眉标题",
            "placeholder": "输入标题"
          }
        }
      },
      "socialSharing": {
        "title": "社交",
        "extra": {
          "tweetLength": "预计长度",
          "tweetLengthWarning": "您您的推文可能过长。请确保使用页眉中的 Twitter 按钮对其进行测试。"
        },
        "fields": {
          "includeSharing": {
            "label": "社交按钮",
            "optionLabels": {
              "include": "显示社交按钮"
            }
          },
          "twitterText": {
            "label": "推文",
            "tooltip": "读者在 Twitter 上共享故事时将向其建议此消息，但是读者可对该消息进行更改。将在推文末尾处添加指向故事的短链接。",
            "placeholder": "输入推文文本",
            "attribute": "推文文本字段"
          },
          "twitterRelated": {
            "label": "“推荐关注”建议",
            "tooltip": "Twitter 可能会向在推文中提及您的故事的用户建议这些帐户",
            "placeholder": "输入 Twitter 帐号",
            "attribute": "建议帐号字段"
          }
        }
      },
      "introSplash": {
        "title": "封面",
        "fields": {
          "backgroundImage": {
            "label": "上传背景照片",
            "placeholder": "拖放",
            "attribute": "背景照片"
          }
        }
      },
      "contribute": {
        "title": "贡献",
        "fields": {
          "allowParticipation": {
            "label": "贡献",
            "optionLabels": {
              "accept": "接受新贡献"
            }
          },
          "showNewFeatures": {
            "label": "显示贡献",
            "tooltip": "控制何时在地图上显示新贡献。“立即”将马上显示贡献。“审批后”需要您批准新贡献后，这些贡献才会向其他人显示。请参阅帮助以获取有关审批贡献的详细信息。",
            "optionLabels": {
              "new": "立即",
              "approved": "审批后"
            }
          },
          "loginOptions": {
            "label": "贡献者可选择的登录方式",
            "attribute": "登录选项",
            "tooltip": "选择贡献者可用于确定其身份的登录选项。如果选中“访客”选项，所有人均可匿名向您的故事提供贡献(无需登录)。请参阅帮助以获取有关追踪贡献者的详细信息。",
            "optionLabels": {
              "arcgis": "ArcGIS",
              "facebook": "Facebook",
              "google": "Google",
              "guest": "访客"
            }
          },
          "participateButton": {
            "label": "参与按钮标注",
            "placeholder": "输入标注"
          }
        }
      }
    }
  },
  "shareApp": {
    "title": "共享您的故事",
    "sharePermissions": {
      "private": "私有",
      "organization": "组织",
      "public": "公共"
    },
    "socialize": {
      "header": "社交"
    }
  },
  "settingsModals": {
    "common": {
      "advancedOptions": "高级选项",
      "welcome": "欢迎"
    },
    "itemName": {
      "header": "为何要调用 Crowdsource 故事?",
      "advancedDescription": "将创建一些项目用以支持此故事。如果希望重命名这些项目或将这些项目保存在特定文件夹中，可执行以下操作。",
      "form": {
        "appName": {
          "label": "标题",
          "placeholder": "输入标题"
        },
        "mapName": {
          "label": "地图名称",
          "placeholder": "输入地图名称"
        },
        "folderSelection": {
          "label": "文件夹",
          "rootFolder": "主页"
        },
        "featureServiceName": {
          "label": "图层名称",
          "placeholder": "输入图层名称"
        }
      }
    },
    "layout": {
      "header": "想要使用哪种布局？",
      "headerHint": "可随时在设置对话框中更改布局。",
      "preview": "查看实时示例",
      "commonAltText": "布局预览。",
      "selection": {
        "stacked": {
          "name": "堆叠图",
          "description": "在 Crowdsource 故事的仅地图和仅照片视图间切换。"
        },
        "sidePanel": {
          "name": "侧面板",
          "description": "在浏览地图的同时查看照片缩略图。移动地图时面板会更新，以便仅显示当前地图视图内的照片。"
        }
      }
    }
  },
  "appDataPlaceholderText": {
    "globals": {
      "participateShort": "参与",
      "participateLong": "共享您的经验",
      "exploreText": "浏览地图"
    }
  },
  "itempageDefaults": {
    "webmap": {
      "titleAppend": "Web 地图"
    },
    "featureService": {
      "titleAppend": "要素服务"
    }
  },
  "messages": {
    "arcgisItems": {
      "webmapNotOwned": {
        "title": "Crowdsource 构建器消息",
        "body": "您曾尝试使用他人的 Web 地图构建 Crowdsource 故事。已在您的帐号内创建这些地图的副本，您的地图使用该副本。",
        "confirmBtn": "确定"
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "redirectToSecureConnection": "使用安全连接重新加载"
    },
    "inlineEditing": {
      "heading": "注意："
    },
    "loading": {
      "notAuthorizedCreateNew": "要创建 Crowdsource 故事，您必须使用拥有发布权限的 ArcGIS 订阅帐户。如果您正在使用订阅帐户，请联系您的 ArcGIS 管理员以请求其他权限。如果您正在使用 ArcGIS 公共帐户，请<a href=\"http://www.arcgis.com/features/plans/pricing.html\" target=\"-blank\">升级</a>到订阅帐户或开始<a href=\"http://www.arcgis.com/features/free-trial.html\" target=\"-blank\">免费试用订阅</a>。",
      "notAuthorizedEdit": "您没有编辑此故事的权限。如果您不是所有者，请确保拥有者已向您授予<a href=\"http://blogs.esri.com/esri/arcgis/2015/07/14/enable-colleagues-to-update-your-maps-and-apps/\" target=\"-blank\">编辑权限</a>。此外，您还必须拥有组织内编辑项目和发布新托管要素服务的权限。请联系您的 ArcGIS Online 组织管理员请求这些权限。",
      "crowdsourceLayerNotFound": "找不到或无法正确加载 crowdsource 地图图层。请确保您拥有查看要素服务的权限。",
      "builderNotSSL": "此 Crowdsource 故事需要使用安全 (https) 连接，以确保您的受众可以安全登录和贡献照片。请确保您的服务器支持同一 URL 的 https 连接。如有他人尝试使用 http 访问您的故事，则将被重新定向到安全连接。"
    },
    "shareItems": {
      "notShared": {
        "title": "注意",
        "body": "无法共享故事中的某些项目。这些项目可能由其他人所有或需要订阅。以下项目无法共享",
        "confirmBtn": "确定"
      }
    },
    "saving": {
      "checkInternet": "无法保存您的故事。请检查您的 Internet 连接并重新加载页面以重试。",
      "unknown": "无法保存您的故事。请重新加载页面以重试。"
    },
    "scratchCreation": {
      "unknown": "无法创建故事所需项目。请刷新页面以重试。"
    }
  },
  "validations": {
    "waitMessage": "正在检查...",
    "arcgis": {
      "naming": {
        "arcgisItemName": "<% attribute %> 不得包含 < 或 >。",
        "arcgisServiceNameFormat": "<% attribute %> 只能包含字母、数字和下划线，并且不得以数字开头。"
      },
      "portal": {
        "unableToCheckName": "无法检查名称是否可用。请重试。",
        "nameNotString": "名称必须为常规文本",
        "nameNotAvailableFS": "为图层选择的名称不可用。请选择其他名称。"
      }
    }
  }
});