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

    var linkElement = speech.find('a[onclick]');
    var link = linkElement.attr('onclick').split('\'')[1];
    linkElement.attr('href', link);

    speech.children().last().remove();
    speech.children().last().remove();
    speech.children().last().remove();

    callback(null, {
      source: url,
      video: link,
      date: meta.attr('content'),
      html: speech.html(),
      markdown: md(speech.html(), {inline: true}).replace(/\\/gi, '')
    })
  });
};
