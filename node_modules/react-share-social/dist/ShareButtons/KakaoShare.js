"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const KakaoShare = (_ref) => {
  let {
    onSocialButtonClicked,
    url,
    title,
    kakaoAPIKey,
    socialType,
    thumbnail = ''
  } = _ref;
  (0, _react.useEffect)(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const sendKakaoMessage = () => {
    onSocialButtonClicked("".concat(socialType || 'button', " clicked."));
  };

  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) kakao.init(kakaoAPIKey);
    kakao.Link.sendDefault({
      // container: '#kakao-link-btn',
      objectType: 'feed',
      content: {
        title: title,
        description: "",
        imageUrl: thumbnail,
        link: {
          mobileWebUrl: "",
          webUrl: url
        }
      }
    });
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "kakao-share-button"
  }, /*#__PURE__*/_react.default.createElement("button", {
    id: "kakao-link-btn",
    style: {
      width: '40px',
      height: '40px',
      borderRadius: '32px',
      backgroundImage: "url('/images/icon/kakaoIcon.png')",
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    },
    onClick: () => sendKakaoMessage()
  }));
};

var _default = KakaoShare;
exports.default = _default;