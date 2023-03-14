const { CItemController } = require("../controllers/CItems");
const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};

// Opts for get all items
const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  handler: CItemController.getItems,
};
const getItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
};

const postItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    response: {
      201: Item,
    },
  },
  handler: CItemController.addItem,
};
const deleteItemOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          deletedCount: { type: "integer" },
        },
      },
    },
  },
  handler: CItemController.removeItem,
};

const putItemsOpts = {
	schema: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    response: {
      201: Item,
    },
  },
  handler: CItemController.updateOrCreateItem,
}

function itemRoutes(fastify, options, done) {
  // Get all items
  fastify.get("/items", getItemsOpts);
  // Get single item
  fastify.get("/items/:id", getItemOpts, CItemController.getItem);
  // Add item
  fastify.post("/items", postItemOpts);
  // Delete item
  fastify.delete("/items/:id", deleteItemOpts);
	// PUT item
	fastify.put("/items/:id", putItemsOpts)
  done();
}
module.exports = itemRoutes;
