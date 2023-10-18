const express = require("express");
const {
  addDatabaseContext,
  validateSession,
  parameterValidator: { validateNewOrder, validateFetchOrder, validateFetchAllOrder }
} = require("../api");
const { addOrder, getOrder, getAllOrder } = require("../endpointHandler");

const router = express.Router({ mergeParams: true });

router.post("/order", validateSession, addDatabaseContext, validateNewOrder, addOrder);
router.get("/order/", validateSession, addDatabaseContext, validateFetchAllOrder, getAllOrder);
router.get("/order/:order_id", validateSession, addDatabaseContext, validateFetchOrder, getOrder);

module.exports = router;
