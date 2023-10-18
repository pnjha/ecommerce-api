const express = require("express");
const {
  addDatabaseContext,
  validateSession,
  parameterValidator: { validateNewProduct, validateFetchProduct, validateUpdateProduct, validateDeleteProduct }
} = require("../api");
const { addProduct, getProduct, updateProduct, deleteProduct } = require("../endpointHandler");

const router = express.Router({ mergeParams: true });

router.post("/product", validateSession, addDatabaseContext, validateNewProduct, addProduct);
router.get("/product/:product_id", validateSession, addDatabaseContext, validateFetchProduct, getProduct);
router.patch("/product/:product_id", validateSession, addDatabaseContext, validateUpdateProduct, updateProduct);
router.delete("/product/:product_id", validateSession, addDatabaseContext, validateDeleteProduct, deleteProduct);

module.exports = router;
