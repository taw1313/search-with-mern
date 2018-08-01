const router = require("express").Router();
const scrapeController = require("../../controllers/scrapeController");

//router.route("/")
//  .get(scrapeController.scrape);
router.route("/")
  .get( (req, res) => {
    console.log ( `DEBUG - routes - api - article.js - get() ` );
    scrapeController.scrape(req, res);
  });

module.exports = router;