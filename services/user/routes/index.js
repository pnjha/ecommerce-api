const express = require("express");
const {
  addDatabaseContext,
  validator: { valiadteNewUser, validateFetchUser, validateRoleUpdate }
} = require("../api");
const { addUser, getUser, updateUserRole } = require("../endpointHandler");

const router = express.Router({ mergeParams: true });

router.post("/user/role/:role", addDatabaseContext, valiadteNewUser, addUser);
router.get("/user/:user_name", addDatabaseContext, validateFetchUser, getUser);
router.patch("/user/:user_name/role", addDatabaseContext, validateRoleUpdate, updateUserRole);

module.exports = router;
