var bodyParser = require("body-parser");
var request = require('request');
var Promise = require('bluebird');
var reqpromise = require('request-promise');


var URI_CONVERSATIONS = "https://conv-a.wbx2.com/conversation/api/v1/conversations/";
var URI_LOCUS = "https://locus-a.wbx2.com/locus/api/v1/loci/";
var URI_LOCUS_MEETINGINFO = "/meetingInfo";


module.exports = {
  getConversationsDetail : getConversationsDetail,
  getLocusMeetingInfo : getLocusMeetingInfo,
  getSparkURI : getSparkURI,
  roomToConversationID : roomToConversationID,
  getRoomMeetingInfo : getRoomMeetingInfo,
  locusUrlToId : locusUrlToId
}


/*
 * roomID - Spark RoomID
 * authToken - bearer token for Spark Authorization
 * returns - Promise which resolves to JSON response data or rejects on error
 */

function getConversationsDetail  (roomID, authToken) {
  return getSparkURI(URI_CONVERSATIONS + roomToConversationID(roomID), authToken);
}

/*
 * locusID - Spark LocusID
 * authToken - bearer token for Spark Authorization
 * returns - Promise which resolves to JSON response data or rejects on error
 */

function getLocusMeetingInfo (locusID, authToken) {
  return getSparkURI(URI_LOCUS + locusID + URI_LOCUS_MEETINGINFO, authToken);
}

/*
 * roomID - Spark RoomID
 * authToken - bearer token for Spark Authorization
 * returns - Promise which resolves to JSON response data or rejects on error
 */

function getRoomMeetingInfo(roomID, authToken) {
  return new Promise(
    function(resolve, reject) {
      getConversationsDetail(roomID, authToken)
      .then(json => {
        resolve(getLocusMeetingInfo(locusUrlToId(json.locusUrl), authToken));
      })
      .catch(err => console.log(err))
    }
  )
}



/*
 *
 */
function getSparkURI(uriString, authToken) {
  return new Promise(
    function(resolve, reject) {
      reqpromise({
        uri: uriString,
        headers: { 'Authorization' : `Bearer ${authToken}` },
        json: true
      })
      .then(function (json) {
        resolve(json);
      })
      .catch(function (err) {
        reject(err);
      });
    }
  );
}


function locusUrlToId(locusUrl) {
  idIndex = locusUrl.lastIndexOf('/') + 1;
  return locusUrl.slice(idIndex, locusUrl.length);
}

/*
 * roomID - Spark Room/Space ID
 * returns - Spark Conversation ID (UUID)
 */
function roomToConversationID (roomID) {
  decoded = decodeBase64(roomID);
  idIndex = decoded.lastIndexOf('/') + 1;
  return decoded.slice(idIndex,decoded.length);
}

/*
 * b64 - base64 encoded string
 * returns - base64 decode of b64
 */
function decodeBase64 (b64) {
  return new Buffer(b64, 'base64').toString();
}
