require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const app = require("./app");
const urlDAO = require("./DAO/urlDAO");
const port = process.env.PORT || 8000;

MongoClient.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  poolSize: 50,
  wtimeout: 2500,
  useUnifiedTopology: true,
})
  .then(async (client) => {
    await urlDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening at port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err.toString());
    process.exit(1);
  });
