/*
 * coded by Dávid Kovács
 * http://kovacs.tech
 */

var CookieConsent = function(){};

// append cookie consent after body tag
CookieConsent.prototype.init = function(options){
  $('<div id="cookieconsent"></div>').prependTo(document.body);
  $("#cookieconsent").html(this.createCookieConsentHtml());
  this.setText(options['text']);
  this.setLink(options['moreInfoText'], options['moreInfoLink']);
  this.setButton(options['buttonText']);
};

//create the inside of the #cookieconsent
CookieConsent.prototype.createCookieConsentHtml = function(){
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
CookieConsent.prototype.setText = function(text){
  $("#text").html(text);
};

//set the text and read more link
CookieConsent.prototype.setLink = function(moreInfoText, moreInfoLink){
  $("#moreinfo").html('<a href="' + moreInfoLink + '">' + moreInfoText + '</a>');
};

/*set the approve button
|
| @param buttonText - string - this would be the text on the button
| @return void
*/
CookieConsent.prototype.setButton = function(buttonText){
  $("#button").html('<button>' + buttonText + '</button>');
};

/* set a cookie
|
| @param cname - string - the name of the cookie
| @param cvalue - string - the value of the string
| @param exday - integer - number of days to expire
| @param path - string - the path of the cookie
| @return void
*/

CookieConsent.prototype.setCookie = function(cname, cvalue, exdays, path) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires + "; path=" + path;
}

/* get a cookie
| @param cname - string - the name of the cookie
| @return string
*/

CookieConsent.prototype.getCookie = function(cname) {
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

/* check if the cookie consent was aproved before
 | @return boolean
*/

CookieConsent.prototype.isNotApproved = function(){
  return this.getCookie("cookieconsent") != "yes";
};

/* this would happen when somebody click on the approve button
|
| @return void
*/

CookieConsent.prototype.approve = function(){
  this.setCookie("cookieconsent", "yes", 60, "/");
  $('#cookieconsent').animate({
    height: 0
  }, "slow");
};

var KDCC = new CookieConsent();

//ignite in 3, 2, 1...
$(document).ready(function(){
  if(KDCC.isNotApproved()){
    KDCC.init(cookieConsentOptions);
  }

  $('#cookieconsent > #button > button').click(function(){
    KDCC.approve();
  });
});
