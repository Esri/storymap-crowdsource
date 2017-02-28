define({
  "loading": {
    "general": "불러오는 중",
    "initializing": "스토리 불러오는 중",
    "map": "맵 불러오는 중"
  },
  "common": {
    "or": "또는",
    "appNamePrepend": "스토리 맵",
    "appName": "크라우드소스",
    "buttons": {
      "save": "저장",
      "saving": "저장 중",
      "close": "닫기"
    }
  },
  "banner": {
    "buttons": {
      "edit": "스토리 편집",
      "hide": "숨기기"
    }
  },
  "sharing": {
    "buttonTitleAttr": {
      "facebook": "Facebook에 공유",
      "twitter": "Twitter에 공유",
      "link": "임베드 코드 가져오기 또는 간단한 링크 복사"
    },
    "link": {
      "title": "공유",
      "copied": "복사됨",
      "linkHeader": "스토리 링크",
      "linkHelper": "아래의 링크가 포함된 소셜 미디어나 이메일을 통해 이 스토리를 공유합니다.",
      "copyShortLink": "간단한 링크 복사",
      "showShortLink": "간단한 링크 표시",
      "copyFullLink": "전체 URL 복사",
      "showFullLink": "전체 링크 표시",
      "embedSizeHelper": "크기(너비/높이)",
      "embedCodeHeader": "웹 사이트에 임베드",
      "embedCodeHelper": "스토리를 웹 페이지에 임베드하려면 다음의 HTML 코드를 사용합니다.",
      "copyEmbedCode": "임베드 코드 복사"
    }
  },
  "layouts": {
    "stacked": {
      "changeView": {
        "mapView": "맵 보기",
        "galleryView": "갤러리 보기"
      }
    }
  },
  "mobile": {
    "bottomNav": {
      "home": "홈",
      "map": "맵",
      "gallery": "갤러리",
      "participate": "참여"
    }
  },
  "forms": {
    "select": {
      "noDefaultSelection": "옵션을 선택하세요..."
    },
    "photo": {
      "loading": "사진을 불러오는 중",
      "resizing": "사진의 크기를 조정하는 중"
    }
  },
  "map": {
    "controls": {
      "homeButton": "홈 위치로 이동"
    }
  },
  "selectedShares": {
    "enlargePhotoButton": "더 크게 보기",
    "review": {
      "title": "항목 검토",
      "options": {
        "approve": "승인",
        "reject": "거부"
      }
    }
  },
  "contribute": {
    "login": {
      "title": "로그인",
      "services": {
        "arcgis": "ArcGIS로 로그인",
        "facebook": "Facebook으로 로그인",
        "google": "Google로 로그인",
        "guest": "게스트로 계속"
      },
      "loginDescription": "참여하려면 위의 옵션 중 하나를 사용하세요.",
      "loginDescriptionSingle": "참여하려면 위의 옵션을 사용하세요."
    },
    "form": {
      "photo": {
        "pickFile": "파일을 선택하려면 클릭",
        "choosePhoto": "사진 업로드",
        "selectNew": "다른 사진 사용",
        "photoTooSmall": "사진이 너무 작습니다. 가장 작은 변의 크기가 다음보다 커야 합니다."
      },
      "location": {
        "gettingLocation": "위치 찾기",
        "locate": "내 위치 찾기",
        "findOnMap": "맵에서 찾기",
        "findOnMapTooltip": "위치의 범위를 좁히려면 맵에서 클릭하거나 이 포인트를 드래그합니다.",
        "saveLocation": "위치 저장",
        "search": "검색",
        "longitude": "경도",
        "latitude": "위도",
        "nullIsland": "미지의 지역",
        "photoLocation": "사진이 촬영된 위치를 사용하시겠습니까?"
      },
      "termsAndConditions": {
        "buttonShow": "사용 조건 표시",
        "buttonHide": "사용 조건 숨기기"
      },
      "save": "약관 동의 및 제출",
      "saving": "제출 중",
      "requiredWarning": "필수 필드",
      "changedCloseWarning": "닫으시겠습니까? 변경 내용이 손실됩니다."
    },
    "messages": {
      "contributionShownAfterReview": {
        "title": "참여해 주셔서 감사합니다.",
        "body": "참여 콘텐츠가 제출되었으며 검토와 승인을 거친 후 맵에 나타납니다. 나중에 다시 확인하세요.",
        "confirmBtn": "확인"
      },
      "contributionError": {
        "title": "주의",
        "body": "알 수 없는 오류가 발생하여 참여 콘텐츠를 저장할 수 없습니다. 브라우저를 새로 고침한 후 다시 시도하세요.",
        "confirmBtn": "확인"
      }
    }
  },
  "validations": {
    "fix": "오류를 수정하세요!",
    "basic": {
      "noValue": "제공된 값이 없음",
      "required": "<% attribute %>이 필요합니다.",
      "regex": "<% attribute %>이 필수 패턴과 일치하지 않습니다.",
      "max": {
        "string": "<% attribute %>은 <% max %>자를 넘을 수 없습니다.",
        "number": "<% attribute %>은 <% max %>자 이하여야 합니다."
      },
      "acceptedTerms": "공유하려면 먼저 사용 조건에 동의해야 합니다.",
      "https": "<% attribute %>은 보안 연결을 통해 불러와야 합니다. 올바르게 불러오려면 URL의 맨 앞에 \"https://\" 또는 \"//\"가 있어야 합니다.",
      "imageUrl": "<% attribute %>은 올바른 이미지 URL이어야 합니다. 대부분의 경우 URL의 맨 끝에는 \".jpg\", \".gif\". 또는 \".png\" 확장자가 있습니다."
    },
    "pattern": {
      "commaSeparated": "<% attribute %>에는 공백을 포함할 수 없습니다.",
      "noNewLine": "<% attribute %>에는 줄바꿈을 포함할 수 없습니다."
    },
    "arcgis": {
      "basic": {
        "arcgisSupportedHtml": "<% attribute %>에 지원되지 않는 HTML이 포함되어 있습니다."
      },
      "location": {
        "notValid": "입력한 위치가 올바르지 않습니다. 다시 입력하세요.",
        "noResults": "검색하려는 위치를 찾을 수 없습니다. 위치를 최대한 구체적으로 지정하여 다시 시도하세요."
      }
    }
  },
  "errors": {
    "actionsBtns": {
      "startFromScratch": "새로운 크라우드소스 스토리 생성 시작"
    },
    "loading": {
      "heading": "주의",
      "invalidConfig": "잘못된 구성",
      "inaccessibleApp": "웹 매핑 응용프로그램이 없거나 접근할 수 없습니다.",
      "invalidConfigNoApp": "응용프로그램의 index.html 파일이나 URL에 올바른 웹 매핑 응용프로그램 ID가 지정되지 않았습니다. appid를 수정한 다음 다시 시도하세요.",
      "unspecifiedConfigOwner": "권한이 있는 소유자가 구성되지 않았습니다.",
      "invalidConfigOwner": "스토리 소유자가 인증되지 않았습니다.",
      "createMap": "맵을 생성할 수 없음",
      "notAuthorizedApp": "이 스토리에 접근할 권한이 없음",
      "notAuthorizedMap": "이 스토리의 웹 맵에 접근할 권한이 없음",
      "notAuthorizedLayers": "웹 맵에서 하나 이상의 레이어를 볼 수 있는 권한이 없음",
      "upgradeBrowser": "<a href=\"http://browsehappy.com/\" target=\"_blank\">브라우저를 업데이트하세요</a>.",
      "mapLoadingFail": "오류가 발생했습니다. 맵을 올바르게 불러오지 않았습니다.",
      "appLoadingFail": "오류가 발생했습니다. 앱을 올바르게 불러오지 않았습니다.",
      "crowdsourceLayerNotFound": "오류가 발생했습니다. 스토리가 크라우드소스 맵 레이어를 찾을 수 없거나 올바르게 불러올 수 없습니다."
    },
    "sharing": {
      "localhost": "\"localhost\"가 포함된 URL은 공유할 수 없습니다."
    },
    "selectedDisplay": {
      "noPhoto": "오류: 사진이 없거나 접근할 수 없습니다."
    }
  }
});