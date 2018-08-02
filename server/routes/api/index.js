const router = require("express").Router();
const articleRoutes = require("./articles");
const searchRoutes = require("./search");

//console.log(articleRoutes)
router.use("/articles", articleRoutes);
router.use("/search", searchRoutes);

module.exports = router;