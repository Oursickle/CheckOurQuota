console.log("Launched");

const Browser = require("zombie");
require("node-webshot");
const notifier = require("node-notifier");
const schedule = require("node-schedule");

Browser.localhost("www.google.co.uk", 3000);

const browser = new Browser();

browser.visit("http://duckduckgo.com/", function() {
  browser
    .fill('input[name=q]', 'meme');
  browser.document.forms[0].submit();
  browser.wait().then(function() {
    let meme = browser.html(".result__body:first-of-type .result__title .result__a");
    console.log(meme);
  });
});
browser.on("error", err => function(){
  console.log(err);
});

notifier.notify('Message');
