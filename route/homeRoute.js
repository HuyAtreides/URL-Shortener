const express = require("express");
const urlDAO = require("../DAO/urlDAO");
const router = express.Router();
const baseURL = process.env.BASE;

router.get("/", (req, res) => {
  res.render("./pages/main");
});

router.get("/:code", async (req, res) => {
  const id = req.params.code;
  try {
    const urlInfo = await urlDAO.find({ shortURL: `${baseURL}/${id}` });
    if (urlInfo) {
      await urlDAO.update({ shortURL: `${baseURL}/${id}` });
      res.redirect(urlInfo.longURL);
    } else res.redirect("/");
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
});
module.exports = router;
