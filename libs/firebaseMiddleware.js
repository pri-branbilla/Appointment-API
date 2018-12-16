const admin = require('firebase-admin')
const util = require('./util')
const logger = require('./logger')

function getUserData(uid){
  admin.auth().getUser(uid)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully fetched user data:", userRecord.toJSON());
  })
  .catch(function(error) {
    console.log("Error fetching user data:", error);
  });
}

/**
 * Client Authentication.
 * Function called when the endpoint requires authentication to be used.
 * Verifies if User-Id-Token header is present and valid.
 * If the token is valid stores the user ID in res.locals.
 * @param {Object}   req      Express request.
 * @param {Object}   res      Express response.
 * @param {Function} next     Calls the next middleware / endpoint function.
 */
function verifyAuth(req, res, callback) {
  let userIdToken = req.headers.user_id_token;
  if (userIdToken) {
      verifyIdToken(req, res, userIdToken, callback)
  } else {
      util.errorResponse(req, res, 40100, new Error('Authentication headers are missing.'));
  }
}

function verifyIdToken(req, res, idToken, callback) {
  admin.auth().verifyIdToken(idToken)
  .then(function(decodedToken) {
    console.log(decodedToken)
    res.locals.uid = decodedToken.uid;
    callback(decodedToken)
  }).catch(function(error) {
    const logMessage = util.mergeResponse(req, error);
    logger.error(logMessage);
    util.errorResponse(req, res, 40300, new Error('Header user_id_token is invalid.'));
  });
}

module.exports = {
  getUserData,
  verifyAuth,
}
