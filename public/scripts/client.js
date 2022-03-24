/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json

const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1647720077484,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1647806477484,
  },
];

const renderTweets = function (tweets) {
  for (const key in tweets) {
    let $tweet = createTweetElement(tweets[key]);
    $("#tweets-cointainer").append($tweet);
  }
};

const createTweetElement = (tweet) => {
  let $tweet = `
  <article>
  <div class="container-for-tweets">
    <header>
      <div class="user-profile">
        <img class="avatar" src="${tweet.user.avatars}"/>
        <p class="name">${tweet.user.name}</p>
      </div>
      <p class="username">${tweet.user.handle}</p>
    </header>
    <p class="tweet-content">
      ${tweet.content.text}
    </p>
    <div class="tweet-line"></div>
    <footer>
    <p class="footer-days-counter">10 days ago</p>
    <ul class="icons">
      <li><i class="fa-solid fa-flag"></i></li>
      <li><i class="fa-solid fa-retweet"></i></li>
      <li><i class="fa-solid fa-heart"></i></li>
    </ul>
  </footer>
  </div> 
</article>
 `;
  return $tweet;
};

renderTweets(data);