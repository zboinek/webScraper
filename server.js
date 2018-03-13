var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

for (let i=0; i<5 ; i++){

   let url = 'http://www.imdb.com/title/tt122934'+i+'/';

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var title, release, rating;
            var json = { title : "", release : "", rating : "", link: url};
console.log(url);
            $('.title_wrapper').filter(function(){
                var data = $(this);
                title = data.children().first().text();

                release = data.children().children().first().text();

                json.title = title;
                json.release = release;
            })

            // Since the rating is in a different section of the DOM, we'll have to write a new jQuery filter to extract this information.

            $('.star-box-giga-star').filter(function(){
                var data = $(this);

                // The .star-box-giga-star class was exactly where we wanted it to be.
                // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

                rating = data.text();

                json.rating = rating;
            })
        }
        fs.writeFile('output'+i+'.json', JSON.stringify(json, null, 4), function(err){

            console.log('File successfully written! - Check your project directory for the output'+i+'.json file');
        
        })
        
        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        
    })
}})


app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;



