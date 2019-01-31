const {
  getArticleCount,
  getArticlesWithCommentCount,
  fetchArticleById
} = require("../models/articles");

const fetchArticles = (req, res, next) => {
  console.log(
    "REQ.BODY: --->",
    req.body,
    "REQ.PARAMS: --->",
    req.params,
    "REQ.QUERY: --->",
    req.query
  );
  Promise.all([
    getArticleCount(req.query),
    getArticlesWithCommentCount(req.query)
  ])
    .then(([total_count, articles]) => {
      console.log({ total_count, articles });
      res.send({ total_count, articles });
    })
    .catch(err => console.log(err) || next(err));
};

const getArticleByArticleId = (req, res, next) => {
  console.log(req.params, "<--- REQ.PARAMS");
  fetchArticleById(req.params)
    .then(([article]) => {
      if (!article) {
        return Promise.reject({ status: 404, message: "element not found" });
      }
      console.log({ article });
      res.status(200).send({ article });
    })
    .catch(err => console.log(err) || next(err));
};

module.exports = { fetchArticles, getArticleByArticleId };
