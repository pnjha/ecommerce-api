const express = require("express");
const {
  addDatabaseContext,
  validator: { validateUserLoginInput, validateSessionInput, validateUserLogoutInput }
} = require("../api");
const { createSession, validateSession, destroySession, destroyAllSession } = require("../endpointHandler");

const router = express.Router({ mergeParams: true });

router.post("/session/", addDatabaseContext, validateUserLoginInput, createSession);
router.get(
  "/session/user/:user_name/session_id/:session_id",
  addDatabaseContext,
  validateSessionInput,
  validateSession
);
router.delete(
  "/session/user/:user_name/session_id/:session_id",
  addDatabaseContext,
  validateUserLogoutInput,
  destroySession
);
router.delete("/session/user/:user_name", addDatabaseContext, validateUserLogoutInput, destroyAllSession);

module.exports = router;
