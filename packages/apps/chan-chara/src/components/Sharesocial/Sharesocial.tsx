import React from 'react';
import {
  FacebookShareButton,
  LineShareButton,
  TwitterShareButton,
  FacebookIcon,
  LineIcon,
  TwitterIcon,
} from 'react-share';

const ShareSocial: React.FC = () => {
  const URL = window.location.href;
  return (
    <div className="space-x-2">
      <FacebookShareButton url={URL}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LineShareButton url={URL}>
        <LineIcon size={32} round />
      </LineShareButton>
      <TwitterShareButton url={URL}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  );
};

export default ShareSocial;
