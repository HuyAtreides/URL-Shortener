let urlInfo;

class urlDAO {
  static async injectDB(conection) {
    try {
      urlInfo = await conection.db("url").collection("urlInfo");
    } catch (e) {
      console.error(e.toString());
    }
  }

  static async find(url) {
    try {
      const result = await urlInfo.findOne(url);
      if (result) return result;
      return null;
    } catch (e) {
      console.error(e.message);
    }
  }

  static async insert(url) {
    try {
      await urlInfo.insertOne(url);
    } catch (e) {
      console.error(e.message);
    }
  }

  static async update(query) {
    try {
      await urlInfo.updateOne(query, { $inc: { clicks: 1 } });
    } catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = urlDAO;
