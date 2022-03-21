$(document).ready(function () {
  $("#tweet-text").keyup(function () {
    let tweetCount = this.value.length;
    let maxChar = 140;

    $("#counter").text(maxChar - tweetCount);
    if (tweetCount > maxChar) {
      $("#counter").addClass("red-count");
    } else {
      $("#counter").removeClass("red-count");
    }
  });
});
