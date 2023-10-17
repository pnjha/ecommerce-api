const jwt = require("jsonwebtoken");

const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET || "049617b00062ab001a95790ada6aecc28189f4b88669168cc858c795c144473d";

async function createToken(options, sessionId) {
  const payload = {
    user_name: options.user_name,
    role: options.role,
    session_id: sessionId
  };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, accessTokenSecret, { algorithm: "HS256", expiresIn: "10m" }, (err, token) => {
      if (err) {
        reject(`failed to create session token with error ${err}`);
      }
      resolve(token);
    });
  });
}
async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, accessTokenSecret, (err, userInfo) => {
      if (err) {
        reject("token is invalid");
      }
      resolve(userInfo);
    });
  });
}

module.exports = { createToken, verifyToken };
