console.log("Launched");

const Browser = require("zombie");
const webshot = require("node-webshot");
const notifier = require("node-notifier");
const schedule = require("node-schedule");
const $ = require("jquery");
const fs = require("fs");
const EventEmitter = require('events');

class donningdonedone extends EventEmitter {}

const CheckOurRota = new donningdonedone();



Browser.localhost("www.google.co.uk", 3000);

const browser = new Browser();

var url = "https://duckduckgo.com";

browser.visit(url, function() {
  browser
    .fill('input[name=q]', 'communism');
  browser.document.forms[0].submit();
  browser.wait().then(function() {
    let browser_query = $(browser.window);
    let notification_text = browser_query(".result__body:first-of-type .result__title .result__a").first().html();
    let browser_styles = function(callback) {
      let sBrowser = new Browser();
      let sBrowser_query;
      sBrowser.visit(url + browser_query("head").find("link[type='text/css']").attr("href"), function() {
        sBrowser.wait().then(function() {
          sBrowser_query = $(sBrowser.window);
          callback(sBrowser_query("body").text());
        });
      });
    };
    browser_styles(function(css) {
      webshot(browser_query("*").html(), "img.png", {
        siteType: 'html',
        customCSS: css,
        screenSize: {
          width: 1080,
          height: 1920
        },
        shotSize: {
          width: 1080,
          height: 'all'
        },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
      }, function(err) {
        console.log("img");
        console.log(err);
        CheckOurRota.emit("finished", notification_text);
      });
    });

    fs.writeFile("a.txt", browser_query("*").html(), function(err) {
      console.log("txt");
      console.log(err);
    });
    console.log("NOTIFICATION_TEXT " + notification_text);
    browser_styles(function(c) {
      console.log("style");
      console.log(c.substring(0, 20));
    });
  });
});

browser.on("error", err => function() {
  console.log(err);
});

CheckOurRota.on("finished", function(a) {
  notifier.notify({
    title: "CheckOurRota",
    message: a,
    icon: "./img.png"
  });
});
