const express = require("express");
const router = express.Router();
const urlDAO = require("../DAO/urlDAO");
const baseURL = process.env.BASE;
const shortid = require("shortid");
const dns = require("dns");

const checkURL = (url) => {
  try {
    const validURL = new URL(url).href;
    return validURL;
  } catch (e) {
    return false;
  }
};

const checkDomain = (url) => {
  return new Promise((resolve) => {
    dns.lookup(url, (err) => {
      if (err) resolve(false);
      resolve("http://" + url);
    });
  });
};

router.post("/", async (req, res) => {
  try {
    const url = req.body.url;
    const validDomain = await checkDomain(url);
    if (checkURL(url) || validDomain) {
      const id = shortid.generate();
      const shortURL = `${baseURL}/${id}`;
      await urlDAO.insert({
        longURL: validDomain ? validDomain : url,
        shortURL: shortURL,
        clicks: 0,
        date: new Date(),
      });
      res.render("./pages/shortener", {
        shortURL: shortURL,
        valid: true,
        longURL: validDomain ? validDomain : url,
        id: id,
      });
    } else
      res.render("./pages/shortener", {
        invalid: true,
      });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
