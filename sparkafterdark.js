const request = require('superagent');


const URI_CONVERSATIONS = "https://conv-a.wbx2.com/conversation/api/v1/conversations/";
const URI_LOCUS = "https://locus-a.wbx2.com/locus/api/v1/loci/";
const URI_LOCUS_MEETINGINFO = "/meetingInfo";


module.exports = {
  getConversationsDetail,
  getLocusMeetingInfo,
  getSparkURI,
  roomToConversationID,
  getRoomMeetingInfo,
  locusUrlToId
}


/*
 * roomID - Spark RoomID
 * authToken - bearer token for Spark Authorization
 * returns - Promise which resolves to JSON response data or rejects on error
 */

function getConversationsDetail(roomID, authToken) {
  return getSparkURI(URI_CONVERSATIONS + roomToConversationID(roomID), authToken);
}

/* 
 * locusID - Spark LocusID
 * authToken - bearer token for Spark Authorization
 * returns - Promise which resolves to JSON response data or rejects on error
 */

function getLocusMeetingInfo(locusID, authToken) {
  return getSparkURI(URI_LOCUS + locusID + URI_LOCUS_MEETINGINFO, authToken);
}


/**
 * Pass Room ID & Bearer Token
 * 
 * @param {any} roomID Spark RoomID
 * @param {any} authToken bearer token for Spark Authorization
 * @returns {Promise} Promise which resolves to JSON response data or rejects on error
 */
async function getRoomMeetingInfo(roomID, authToken) {
  let json = await getConversationsDetail(roomID, authToken)
  return getLocusMeetingInfo(locusUrlToId(json.locusUrl), authToken);
}


/**
 * Main helepr function to construct HTTP request
 * 
 * @param {string} uriString URI to request
 * @param {string} authToken CiscoSpark Access Token
 * @returns {object} Request Response Body
 */
async function getSparkURI(uriString, authToken) {
  try {
    let response = await request
      .get(uriString)
      .set('Authorization', `Bearer ${authToken}`)
      .set('Accept', 'application/json')
    return response.body
  }
  catch (error) {
    console.error(error)
  }
}


function locusUrlToId(locusUrl) {
  idIndex = locusUrl.lastIndexOf('/') + 1;
  return locusUrl.slice(idIndex, locusUrl.length);
}

/*
 * roomID - Spark Room/Space ID
 * returns - Spark Conversation ID (UUID)
 */
function roomToConversationID(roomID) {
  decoded = decodeBase64(roomID);
  idIndex = decoded.lastIndexOf('/') + 1;
  return decoded.slice(idIndex, decoded.length);
}

/**
 * 
 * 
 * @param {string} b64 
 * @returns {string} Decoded base64
 */
function decodeBase64(b64) {
  return new Buffer(b64, 'base64').toString();
}
