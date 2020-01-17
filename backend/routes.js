const { Router } = require("express");

const routes = Router();

const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

// Devs
routes.post("/devs", DevController.create);
routes.get("/devs", DevController.getAll);
routes.get("/devs/:id", DevController.get);
routes.put("/devs/:id", DevController.update);
routes.delete("/devs/:id", DevController.delete);

// Search
routes.get("/search", SearchController.getAll);

module.exports = routes;
