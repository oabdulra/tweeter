/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

    // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = (tweets) => {
    // loops through tweets
    $('.tweet-display').empty();
    for (let tweet of tweets) {
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('.tweet-display').prepend(createTweetElement(tweet));
    }
  }

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweet) => {
    let $newTweet= `
    <article class="tweet">
    <header>
      <div class="user-info">
        <div class="user-name-pic">
          <img src="${escape(tweet.user.avatars)}">
          <p>${escape(tweet.user.name)}</p> 
        </div>
        <p class="user-handle">${escape(tweet.user.handle)}</p>
      </div>
    </header>
    <p class="tweet-message">${escape(tweet.content.text)}</p>
    <footer class="time-like">
      <p class="time-posted">${escape(timeago.format(tweet.created_at))}</p> 
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
    </article>
    `;

    return $newTweet;

  }

  const loadTweet = () => {
    $.get('/tweets', (tweets) => renderTweets(tweets));
  }

  
  

  //submit tweets to page to be posted
  $("form").on( 'submit',function(event) {

    event.preventDefault();
    console.log($(this).serialize());
    console.log(this);
    $.post('/tweets',$(this).serialize())
    .then(() => loadTweet());

  });

  loadTweet();

});