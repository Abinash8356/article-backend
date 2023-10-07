const AppError = require("../../utills/appError");
const catchAsync = require("../../utills/catchAsync");

const articleDetails = require("../db-setup/db.config");

// Creating an article
exports.createArticle = catchAsync(async (req, res, next) => {
  const articleData = await articleDetails.articlesDetailsModel.create({
    title: req.body.title,
    content: req.body.content,
    authorName: req.body.authorName,
  });
  if (articleDetails) {
    return res.send({
      object: "article",
      data: articleData,
      message: "Article published successfully!",
    });
  } else {
    return next(
      new AppError(
        "sorry, article not published please check the requirements."
      )
    );
  }
});

// Get all Articles
exports.getAllArticles = catchAsync(async (req, res, next) => {
  const allArticles = await articleDetails.articlesDetailsModel.find();
  if (articleDetails) {
    return res.send({
      object: "articles",
      data: allArticles,
      message: "Get all articles successfully!",
    });
  } else {
    return next(new AppError("sorry, there are no articles."));
  }
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
  const articleId = req.params.id;
  console.log(articleId,"articleId");
  const existingArticle = await articleDetails.articlesDetailsModel.findOne({
    _id: articleId,
  });

  if (!existingArticle) {
    return next(new AppError("Article not found.", 404));
  }
  await articleDetails.articlesDetailsModel.deleteOne({ _id: articleId })

  return res.send({
    object: "article",
    data: null,
    message: "Article deleted successfully!",
  });
});
