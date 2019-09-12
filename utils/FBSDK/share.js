const sharePost = (href, extraParams) => {
  shareOnMobile(href, extraParams);
};

const shareOnDesktop = (href, callback, extraParams) => {
  if (typeof FB === 'undefined' || typeof FB.ui === 'undefined') throw 'FB.ui is not defined';

  const options = {
    method: 'share',
    href,
    hashtag: '#AskMeAnything',
    quote:
      'Having used Vue at work, I had a fairly solid understanding of it. I was, however, curious to know what the grass was like on the other side'
  };

  FB.ui(options, response => {
    if (typeof callback === 'function') {
      callback();
    }
  });
};

const shareOnMobile = (href, extraParams) => {
  const { redirectUrl, appId, message } = extraParams;
  const quote = message || 'Ask me';
  window.location.href = `https://www.facebook.com/v4.0/dialog/share?channel=https://staticxx.facebook.com/connect/xd_arbiter.php&href=${href}&quote=${quote}&client_id=${appId}&redirect_uri=${redirectUrl}`;
};

const FBSDK = {
  sharePost
};

export default FBSDK;
