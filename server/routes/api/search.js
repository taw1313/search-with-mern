const router = require("express").Router();
const searchController = require("../../controllers/searchController");

router.route("/")
  .put( (req, res) => {
    console.log ( `DEBUG - routes - api - search.js - get() ` );
    console.log(req.body);
    searchController.search(req, res);
  });

module.exports = router;