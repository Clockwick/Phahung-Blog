"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactShare = require("react-share");

var _react = _interopRequireDefault(require("react"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MailruShare = (_ref) => {
  let {
    url,
    title,
    onSocialButtonClicked = () => {},
    socialType
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    title: "Mailru",
    placement: "top"
  }, /*#__PURE__*/_react.default.createElement(_reactShare.MailruShareButton, {
    url: url,
    quote: title,
    onClick: () => onSocialButtonClicked("".concat(socialType || 'button', " clicked."))
  }, /*#__PURE__*/_react.default.createElement(_reactShare.MailruIcon, {
    size: 40,
    round: true
  })));
};

var _default = MailruShare;
exports.default = _default;