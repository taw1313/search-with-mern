const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
const dbCreateArticle = ( headline, link, element ) => {
    if ( headline && link ) {
        let result = {};
        result.headline = headline;
        result.link = link;
        let summaryElement = element.find('.blurb');
        if ( summaryElement ) {
            let summary = summaryElement.text().trim();
            if ( summary ) result.summary = summary;
        }
        db.Article
            .create( result )
            .then( (dbArticle) => {
                // console.log(dbArticle);
            })
            .catch( (err) => {
                //
                // ignore duplicate errors
                //
                if ( err.code != 11000 ) res.send(err.message);
            });
    }
};

const removeNoneSaved = (res) => {
    db.Article
      .find({saveArticle: false})
      .then(dbArticles => dbArticles.map( a => a.remove() ))
      .catch(err => console.log(err));
};

module.exports = {
    scrape: (req, res) => {
        console.log( 'DEBUG - controllers - scrapeController - scrape()');
        removeNoneSaved();
        axios.get('https://www.washingtonpost.com').then( (response) => {
            let $ = cheerio.load(response.data);
            //
            // Find headlines that are part of main section
            //
            $('.no-skin').each( (i, element) => {
                let headlineElement = $(element).find('.headline').find('a');
                if ( headlineElement ) {
                    let headline = headlineElement.text().trim();
                    let link = headlineElement.attr('href');
                    dbCreateArticle( headline, link, $(element) );
                }
            });

            //
            // Find headlines from the bottom section that are not part of main section above
            //
            $('.story-list').each( (i, element) => {
                let li = $(element).find('li');
                li.each( (j, e) => {
                    let aTag = $(e).find('a');
                    let headline = aTag.text().trim();
                    let link = aTag.attr('href').trim();
                    dbCreateArticle( headline, link, $(e) );
                });
            });

            //
            // TODO: db writes could still be occuring...
            //       need to add logic to either wait or update the web page when 
            //       each write has completed
            //
            res.send('Scrape Complete');    
        });
    }
};