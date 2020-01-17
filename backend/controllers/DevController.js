const axios = require("axios");
const Dev = require("../models/Dev");

const parseStringAsArray = require("../utils/parseStringAsArray");

class DevController {
  async create(req, res) {
    try {
      const { github_username, techs, latitude, longitude } = req.body;

      let dev = await Dev.findOne({ github_username });

      if (!dev) {
        const apiResponse = await axios.get(
          `https://api.github.com/users/${github_username}`
        );
        const { name = login, avatar_url, bio } = apiResponse.data;

        const techsArray = parseStringAsArray(techs);

        const location = {
          type: "Point",
          coordinates: [longitude, latitude]
        };

        dev = await Dev.create({
          github_username,
          name,
          avatar_url,
          bio,
          techs: techsArray,
          location
        });
      }
      return res.json(dev);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const devs = await Dev.find();

      return res.json(devs);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async get(req, res) {
    try {
      const dev = await Dev.findById(req.params.id);

      if (!dev) {
        return res.status(404).json({ error: "Developer not found." });
      }

      return res.json(dev);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { name, avatar_url, bio, techs, latitude, longitude } = req.body;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      const dev = await Dev.findByIdAndUpdate(
        req.params.id,
        {
          name,
          avatar_url,
          bio,
          techs: techsArray,
          location
        },
        { new: true }
      );

      return res.json(dev);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const dev = await Dev.findByIdAndRemove(req.params.id);

      if (!dev) {
        return res.status(404).json({ error: "Developer not found." });
      }

      return res.json({});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DevController();
