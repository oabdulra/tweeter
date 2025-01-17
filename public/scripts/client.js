$(document).ready(function() {

  //loops through tweets, takes return values and posts them based on oldest-newest tweets to the tweet container
  const renderTweets = (tweets) => {
    $('.tweet-display').empty();
    for (let tweet of tweets) {
      $('.tweet-display').prepend(createTweetElement(tweet));
    }
  };

  //taken from compass, used to prevent code injection
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //creates the tweet element with the appropriate tags and returns it
  //to be used in the render function
  const createTweetElement = (tweet) => {
    let newTweet = `
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

    return newTweet;

  };

  //error message return for when there's too many chars
  const tooManyChars = () => {
    let errMsg = `
    ⚠️ Too many characters! Must be 140 characters or less ⚠️`;
    $('.error-message').text(errMsg);
    
  };

  //error message return for when there's no text in the box
  const emptyTextBox = () => {
    let errMsg = ` 
    ⚠️ Your tweet is empty! Write out a tweet and try again :)`;
    $('.error-message').text(errMsg);
  };

  //uses ajax get to call the rendertweets function
  const loadTweet = () => {
    $.get('/tweets', (tweets) => renderTweets(tweets));
  };

  //submit tweets to page to be posted
  $("form").on('submit',function(event) {

    event.preventDefault();

    $('.error-message').slideUp();

    let charCount = $('#tweet-text').val().length;

    if (!charCount) {
      $('.error-message').slideDown('slow', emptyTextBox());
    } else if (charCount > 140) {
      $('.error-message').slideDown('slow', tooManyChars());
      
    } else {
      $.post('/tweets',$(this).serialize())
        .then(() => $('form').trigger('reset'))
        .then(() => loadTweet());
    }
  });

  loadTweet();

});