const Dev = require("../models/Dev");

const parseStringAsArray = require("../utils/parseStringAsArray");

class SearchController {
  async getAll(req, res) {
    /**
     * Find devs in a 10 km radius
     * Filter by Technologies
     */
    try {
      const { latitude, longitude, techs } = req.query;

      const techsArray = parseStringAsArray(techs);

      const devs = await Dev.find({
        techs: {
          $in: techsArray
        },
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
            },
            // provide distance in meters = 10km
            $maxDistance: 10000
          }
        }
      });
      return res.json(devs);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new SearchController();
