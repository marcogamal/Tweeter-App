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

$(document).ready(function () {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (const key in tweets) {
      let $tweet = createTweetElement(tweets[key]);
      $("#tweets-cointainer").prepend($tweet);
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
      ${escape(tweet.content.text)}
    </p>
    <div class="tweet-line"></div>
    <footer>
    <p class="footer-days-counter">${timeago.format(tweet.created_at)}</p>
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

  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      type: "GET",
      success: function (data) {
        renderTweets(data);
      },
      error: function (err) {
        return err;
      },
    });
  };
  loadTweets();

  $("#submit-tweet").submit(function (event) {
    event.preventDefault();

    const serializedData = $(this).serialize();
    const tweetLength = $("#tweet-text").val().length;
    const exceedCharacter = `<p> <i class="fa-solid fa-exclamation"></i> Your tweet can not exceed the 140 characters limit </p>`;
    const emptyCharacter = `<p> <i class="fa-solid fa-exclamation"></i> Your tweet can not be empty </p>`;

    const warning = function (addClass) {
      $("#warning").slideUp(600, function () {
        $("#warning").empty();
        $("#warning").append(addClass);
      });
      $("#warning").slideDown(1000);
    };
    if (tweetLength > 140) {
      warning(exceedCharacter);
    } else if ($("#tweet-text").val() === "") {
      warning(emptyCharacter);
    } else {
      $.post("/tweets", serializedData, function (data) {
        $("#tweet-text").val("").empty();
        $("#tweet-count").val(140);
        $("#warning").slideUp();
        loadTweets();
      });
    }
  });
});
