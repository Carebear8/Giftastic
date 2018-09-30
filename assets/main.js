
// topic button - work (main.js)

// results (main.js - add to index )

// main buttons - size 


$(function () {

  // ---------------- DOM ELEMENTS -----------------------------------

  var $buttonsContainer = $("#buttons-container");
  var $wrapper = $("#wrapper");
  var $topicInput = $("#topic-input");

  $("#add-topic").click(function (e){
    e.preventDefault();
    console.log(e);
    var text = $topicInput.val();
    console.log(text);
    state.addTopic(text);
    state.renderButton();

  })



  // ---------------- STATIC VARIABLES -------------------------

  var key = "x7MQAVopNvRwVJQO63FuUUOWN068j6t0";
  var searchPath = "/v1/gifs/search?q=";
  var proxy = "https://cors-anywhere.herokuapp.com/";

  // ----------------- APP STATE  -------------------------------

  var state = {
    topics: null,

    // ------------------- METHODS --------------------------------

    init: function () {
      this.topics = ["movies", "music", "tv"];
      this.renderButtons();
    },

    renderButtons: function () {
      this.topics.forEach(topic => {
        var $button = $(`<button>${topic}</button>`)
        this.addClickHandler($button, topic)
        $buttonsContainer.append($button);
      })
    },

    renderButton: function () {
      var $button = $(`<button>${this.topics[this.topics.length -1]}</button>`)
      $buttonsContainer.append($button);
    },

    addTopic: function(topic){
      this.topics.push(topic);

    },



    addClickHandler: function (button, topic) {
      console.log(button, topic);
      button.click(() => {

        var url = `https://api.giphy.com${searchPath}${topic}&api_key=${key}&limit=10`;
        $.ajax({
          url,
          method: `GET`
        }).then(function (response) {

          response.data.forEach(function (gif) {
            console.log(gif);
            var still = true;
            console.log(gif);
            var $gifImage = $('<img>');
            $gifImage.attr("src", gif.images.downsized_still.url).attr("height", "300px").attr("width", "300px");
            $gifImage.click(function () {
              still = !still;
              if (still) {
                console.log(still)
                $gifImage.attr("src", gif.images.downsized_still.url).attr("height", "300px").attr("width", "300px");
              } else {
                console.log(still)
                $gifImage.attr("src", gif.images.downsized.url).attr("height", "300px").attr("width", "300px");
              }

            })
           

            var $gifWrapper = $("<div>").attr("class", "gif-wrapper");

            $gifWrapper.append($gifImage);

            var rating = gif.rating;
            var $p = $("<p>").text("Rating: " + rating).attr("class", "rating").css("color", "white").css("display", "inline-block");

            $gifWrapper.append($p);

            $wrapper.append($gifWrapper);


          })

        })
      })


    }

  }


  state.init();

  console.log(state)


})




