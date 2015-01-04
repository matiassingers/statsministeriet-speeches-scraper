'use strict';

var got = require('got');
var cheerio = require('cheerio');
var md = require('html-md');

module.exports = function(id, callback) {
  var url = 'http://www.stm.dk/_p_' + id + '.html';

  got(url, function(err, data){
    var $ = cheerio.load(data);

    var meta = $('meta[name="created"]');
    var speech = $('.maininner.maininner-page');

    speech.find('h1').remove();
    speech.find('.nedtonet').remove();
    speech.find('p i').parent().remove();
    speech.find('i').remove();

    var image = speech.find('.a110051').find('img').attr('src');
    if(image){
      speech.find('.a110051').remove();
      image = 'http://www.stm.dk/' + image;
    }

    var linkElement = speech.find('a[onclick]');
    if(linkElement.length){
      var link = linkElement.attr('onclick').split('\'')[1];
      linkElement.attr('href', link);

      speech.children().last().remove();
      speech.children().last().remove();
      speech.children().last().remove();
    }

    var data = {
      source: url,
      date: meta.attr('content'),
      rawHtml: speech.html(),
      markdown: md(speech.html(), {inline: true}).replace(/\\/gi, ''),
      image: image,
      video: link
    };

    callback(null, data)
  });
};
