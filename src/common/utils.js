/**
 *
 *
 * @param {string} base64
 * @returns {string} Decoded base64
 */
function decodeBase64(base64) {
  // Add removed at end '='
  base64 += Array(5 - base64.length % 4).join("=");
  base64 = base64
    .replace(/\-/g, "+") // Convert '-' to '+'
    .replace(/\_/g, "/"); // Convert '_' to '/'
  let buff = Buffer.from(base64, "base64").toString("utf-8");
  return buff;
}

/**
 *
 *
 * @param {string} message string to be encoded
 * @returns {string} Encoded base64
 */
function encodeBase64(message) {
  // Add removed at end '='
  let buff = Buffer.from(message);
  var b64str = buff.toString("base64");
  b64str = b64str
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/\=/g, "");

  return b64str;
}

function locusUrlToId(locusUrl) {
  idIndex = locusUrl.lastIndexOf("/") + 1;
  return locusUrl.slice(idIndex, locusUrl.length);
}

/*
 * roomID - Spark Room/Space ID
 * returns - Spark Conversation ID (UUID)
 */
function roomToConversationId(roomID) {
  decoded = decodeBase64(roomID);
  idIndex = decoded.lastIndexOf("/") + 1;
  return decoded.slice(idIndex, decoded.length);
}

module.exports = {
  roomToConversationId,
  locusUrlToId,
  decodeBase64,
  encodeBase64
};
