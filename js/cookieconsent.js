/*
 * coded by Dávid Kovács
 * http://kovacs.tech
 */

// append cookie consent after body tag
var init = function(){
  $('<div id="cookieconsent"></div>').prependTo(document.body);
  $("#cookieconsent").html(createCookieConsentHtml());
};

//create the inside of the #cookieconsent
var createCookieConsentHtml = function(){
  var cookieConsentHtml = '<div id="text"></div>';
  cookieConsentHtml += '<div id="moreinfo"></div>';
  cookieConsentHtml += '<div id="button"></div>';
  return cookieConsentHtml;
};

/*set the main text of the cookie consent
|
| @param text - string - this would be the description text
| @return void
*/
var setText = function(text){
  $("#text").html(text);
};

//set the text and read more link
var setLink = function(moreInfoText, moreInfoLink){
  $("#moreinfo").html('<a href="' + moreInfoLink + '">' + moreInfoText + '</a>');
};

/*set the approve button
|
| @param buttonText - string - this would be the text on the button
| @return void
*/
var setButton = function(buttonText){
  $("#button").html('<button>' + buttonText + '</button>');
};

/* Delete a cookie. In addition the selected one
|
| @param cname - string - the name of the cookie you wanna delete
| @return void
*/
var deleteCookie = function(cname) {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

/* set a cookie
|
| @param cname - string - the name of the cookie
| @param cvalue - string - the value of the string
| @param exday - integer - number of days to expire
| @param path - string - the path of the cookie
| @return void
*/

var setCookie = function(cname, cvalue, exdays, path) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; path=" + path;
}

/* get a cookie
| @param cname - string - the name of the cookie
| @return string
*/

var getCookie = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//ignite in 3, 2, 1...
$(document).ready(function(){
  if(getCookie("cookieconsent") != "yes"){
    init();
    setText(cookieConsentOptions['text']);
    setLink(cookieConsentOptions['moreInfoText'], cookieConsentOptions['moreInfoLink']);
    setButton(cookieConsentOptions['buttonText']);
  }

  $('#cookieconsent > #button > button').click(function(){
    setCookie("cookieconsent", "yes", 60, "/");
    $('#cookieconsent').animate({
      height: 0
    }, "slow");
  });
});
