const express = require("express");
const {
  addDatabaseContext,
  validator: {
    validateUserLoginInput,
    validateSessionInput,
    validateUserLogoutInput,
    validateUserLogoutAllSessionInput
  }
} = require("../api");
const { createSession, validateSession, destroySession, destroyAllSession } = require("../endpointHandler");

const router = express.Router({ mergeParams: true });

router.post("/session/role/:role", addDatabaseContext, validateUserLoginInput, createSession);
router.get(
  "/session/user/:user_name/session_id/:session_id/role/:role",
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
router.delete("/session/user/:user_name", addDatabaseContext, validateUserLogoutAllSessionInput, destroyAllSession);

module.exports = router;
