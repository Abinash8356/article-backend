const express = require("express");
const articleController = require("../controllers/article.controller");
const verifyToken = require("../services/jwtToken");
const router = express.Router();

router.use(verifyToken.verifyToken);

router.post("/create", articleController.createArticle);
router.get("/getAll", articleController.getAllArticles);
router.delete("/deleteById/:id", articleController.deleteArticle);

module.exports = router;