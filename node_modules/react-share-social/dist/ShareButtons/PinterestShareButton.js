"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactShare = require("react-share");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PinterestShare = (_ref) => {
  let {
    url,
    title,
    onSocialButtonClicked,
    socialType
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_reactShare.PinterestShareButton, {
    url: url,
    quote: title,
    onClick: () => onSocialButtonClicked("".concat(socialType || 'button', " clicked."))
  }, /*#__PURE__*/_react.default.createElement(_reactShare.PinterestIcon, {
    size: 40,
    round: true
  }));
};

var _default = PinterestShare;
exports.default = _default;