const User = require("../model/User");

module.exports = {
  async addUser(req, res) {
    const user = new User({
      username: req.body.username,
      images: [],
    });
    try {
      const savedUser = await user.save();
      res.status(200).send(savedUser);
    } catch (err) {
      res.status(404).send(err);
    }
  },
  async getUser(req, res) {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      res.send(user);
    } else {
      res.send(null);
    }
  },

  async addImage(req, res) {
    try {
      let savedImage = await User.findOneAndUpdate(
        { username: req.body.username },
        {
          $push: {
            images: {
              label: req.body.label,
              url: req.body.url,
            },
          },
        }
      );
      res.status(200).send(savedImage);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  deleteImage(req, res) {
    User.updateMany(
      {},
      { $pull: { images: { _id: req.body.id } } },
      (err, doc) => {
        if (!err) {
          res.send(doc);
        } else {
          res.send(err);
        }
      }
    );
  },
  findByLabel(req, res) {
    User.find(
      { images: { $elemMatch: { label: req.body.label } } },
      (err, doc) => {
        if (!err) {
          res.send(doc);
        } else {
          res.send(err);
        }
      }
    );
  },
};
