$(document).ready(() => {

  $("#tweet-text").on('input', function() {
    
    const maxTweet = 140;

    let currentTweetLength = $(this).val().length;

    let counter = $(this).parent().find("#counter")[0];

    let remainingChars = maxTweet - currentTweetLength;

    if (remainingChars < 0) {
      $(counter).css('color', 'red');
    } else {
      $(counter).css('color', 'black');
    }

    $(counter).text(remainingChars);

  });

});
