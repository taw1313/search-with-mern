const router = require("express").Router();
const searchController = require("../../controllers/searchController");

router.route("/")
  .get( (req, res) => {
    console.log ( `DEBUG - routes - api - search.js - get() ` );
    searchController.search(req, res);
  });

module.exports = router;