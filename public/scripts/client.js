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

  const renderTweets = function(tweets) {
    // loops through tweets
    for (let tweet of tweets) {
    // calls createTweetElement for each tweet
    let newTweet = createTweetElement(tweet)
   // takes return value and appends it to the tweets container
    $('.tweet-display').prepend(newTweet);
  }
  }

  const createTweetElement = function(tweet) {
    let $tweet = `
    <article class="tweet">
    <header>
      <div class="user-info">
        <div class="user-name-pic">
          <img src="${tweet.user.avatars}">
          <p>${tweet.user.name}</p> 
        </div>
        <p class="user-handle">${tweet.user.handle}</p>
      </div>
    </header>
    <p class="tweet-message">${tweet.content.text}</p>
    <footer class="time-like">
      <p class="time-posted">${tweet.created_at}</p> 
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
    </article>
    `;
    return $tweet;
  }

  renderTweets(data);

  //posts tweets to page
  $("form").submit( () => {

    event.preventDefault();
     
    $.post('/tweets',$(this).serialize());

  });

});