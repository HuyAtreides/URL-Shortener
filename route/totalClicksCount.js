const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("./pages/shortener", {});
});

router.post("/", (req, res) => {
  const url = req.body.shortenedURL.split("/");
  const id = url[url.length - 1];
  res.redirect(`/total-clicks/${id}`);
});

module.exports = router;
