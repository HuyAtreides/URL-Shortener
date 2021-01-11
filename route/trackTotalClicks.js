const express = require("express");
const router = express.Router();
const urlDAO = require("../DAO/urlDAO");

router.get("/:code", async (req, res) => {
  const id = req.params.code;
  const clicksCount = await urlDAO.find({
    shortURL: `${process.env.BASE}/${id}`,
  });
  res.render("./pages/shortener", {
    clicks: clicksCount !== null ? clicksCount.clicks : "Can't Found Your URL",
    totalClicks: true,
  });
});

module.exports = router;
