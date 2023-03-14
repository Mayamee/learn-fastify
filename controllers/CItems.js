const { items } = require("../items");
const { v4: uuidv4 } = require("uuid");

class CItemController {
  getItems(_, reply) {
    return reply.send(items);
  }
  getItem(req, reply) {
    const { id } = req.params;
    return reply.send(items.find((e) => e.id === id));
  }
  addItem(req, reply) {
    const { name } = req.body;
    const newItem = {
      id: uuidv4(),
      name,
    };
    items.push(newItem);
    return reply.code(201).send(newItem);
  }
  removeItem(req, reply) {
    const { id } = req.params;
    const extract = (index, arr) => arr.splice(index, 1)[0];
    let counter = 0;
    for (let i = 0; i < items.length; ) {
      if (items[i].id === id) {
        extract(i, items);
        counter += 1;
        break;
      }
      i += 1;
    }
    return reply.code(200).send({
      deletedCount: counter,
    });
  }
  updateOrCreateItem(req, reply) {
    const { id } = req.params;
    const { name } = req.body;
    const newItem = {
      id,
      name,
    };
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].id === id) {
        items[i] = newItem;
        return reply.code(200).send(newItem);
      }
    }
    items.push(newItem);
    return reply.code(201).send(newItem);
  }
}
module.exports = { CItemController: new CItemController() };
