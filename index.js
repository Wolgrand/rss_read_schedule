const cron = require("node-cron");
const express = require("express");
const fetch = require("node-fetch");
const axios = require("axios");

app = express();

function spider(url, source, thumbnail) {
  const data = fetch(url)
    .then(res => res.json())
    .then(json =>
      json.items.map(feed =>
        axios
          .post("http://167.99.170.194:3333/feed", {
            source: source,
            title: feed.title,
            link: feed.link,
            thumbnail: thumbnail,
            pubDate: feed.pubDate
          })
          .then(res => {
            console.log(`statusCode: ${res.statusCode}`);
            console.log(res);
          })
          .catch(error => {
            console.error(error);
          })
      )
    );
  console.log("Foi");
}

cron.schedule(
  "* * * * *",
  () =>
    spider(
      "https://api.rss2json.com/v1/api.json?rss_url=https://pt.aleteia.org/feed/",
      "Aleteia",
      "https://secure.gravatar.com/blavatar/3d32b741af79fa4cf43d6c2fd3dc7ab3?s=96&amp;d=https%3A%2F%2Fs0.wp.com%2Fi%2Fbuttonw-com.png"
    ),
  spider(
    "https://api.rss2json.com/v1/api.json?rss_url=https://www.vaticannews.va/pt.rss.xml",
    "Vatican News",
    "https://www.vaticannews.va/etc/designs/vatican-news/release/library/main/images/favicons/apple-icon-180x180.png"
  ),
  spider(
    "https://api.rss2json.com/v1/api.json?rss_url=https://www.acidigital.com/rss/rss.php",
    "Aci Digital",
    "https://www.acidigital.com/images/acilogo.png"
  ),
  spider(
    "https://api.rss2json.com/v1/api.json?rss_url=http://feeds.feedburner.com/churchpopportugues?format=xml",
    "Church Pop PT",
    "https://pt.churchpop.com/wp-content/uploads/2014/07/cropped-social-media-icon-2-32x32.png"
  )
);

app.listen(1313);
