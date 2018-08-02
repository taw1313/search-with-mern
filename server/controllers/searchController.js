const axios = require('axios');
const db = require('../models');

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
const dbCreateArticle = ( headline, link, summary, createdDate ) => {
    let result = { headline, link, summary, createdDate };
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
};

const removeNoneSaved = (res) => {
    db.Article
      .find({saveArticle: false})
      .then(dbArticles => dbArticles.map( a => a.remove() ))
      .catch(err => console.log(err));
};

module.exports = {
    search: (req, res) => {
        console.log( 'DEBUG - controllers - searchController - search()');
        removeNoneSaved();

        let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
        let queryParams = `api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=Clinton&begin_date=19700101&end_date=20100101`;

        axios.get(queryURL + queryParams).then( (response) => {
            let articleResults = response.data.response.docs;
            console.log(`Found: ${articleResults.length}`);
            articleResults.map( (article) => {
              let link = article.web_url;
              let headline = article.headline.main.trim();
              let summary = article.snippet.trim();
              let createdDate = article.pub_date;
              dbCreateArticle( headline, link, summary, createdDate );
            })
            res.send('Search Complete');
        });
    }
};