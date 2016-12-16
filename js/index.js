$.ajaxSetup({cache: false})

function randomColor() {
//sometimes color was too bright and text wasn't visible, so value is decreased by 40
  return Math.floor(Math.random() * 216);
}

function changeColor() {
  var theRGB = "rgb(" + randomColor() + "," + randomColor() + "," + randomColor() + ")";
  $(".random-background").css("background-color", theRGB);  
  $(".random-color").css("color", theRGB);   
  $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
    quote = jQuery(a[0].content).text();
  //quote = a[0].content.slice(3, a[0].content.length - 5)
    authorName = "— " + a[0].title;
    $("#quote, #author, #quote-mark").fadeOut(function() {
      $("#quote").html(quote).fadeIn();
      $("#author").html(authorName).fadeIn();
      $("#quote-mark").fadeIn();
    });
  });
}

function popupWindow(url) {
  var left = (screen.width/2)-300;
  var top = (screen.height/2)-200;  
  window.open(url, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+600+', height='+400+', top='+top+', left='+left);
}

$(document).ready(function() { 
  changeColor();
});

$("#new-quote").on("click", function() { 
  changeColor();
});

$('#twitter').on("click", function() {
  var url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + $( "#quote" ).text() + '" ' + $( "#author" ).text());
  popupWindow(url);
}); 

$("#facebook").on("click", function() {
  var left = (screen.width/2)-300;
  var top = (screen.height/2)-200;
  popupWindow("https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fcodepen.io%2FMcBiggos%2Fpen%2FEyRRXo");
});