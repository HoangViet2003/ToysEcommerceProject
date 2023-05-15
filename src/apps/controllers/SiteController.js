

class SiteController {
  async index(req, res) {
    try {
      res.send("homepage");
    } catch (err) {
      res.status(400).json({ error: "ERROR!!!" });
    }
  }
}

module.exports = new SiteController();
