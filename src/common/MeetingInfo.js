const request = require("superagent");

const URI_CONVERSATIONS =
  "https://conv-a.wbx2.com/conversation/api/v1/conversations/";
const URI_LOCUS = "https://locus-a.wbx2.com/locus/api/v1/loci/";
const URI_LOCUS_MEETINGINFO = "/meetingInfo";

class MeetingInfo {
  constructor(options) {
    if (options && options.accessToken) this.accessToken = options.accessToken;
    else throw new Error("Please provide an access token");
  }

  /*
  * roomID - Spark RoomID
  * returns - Promise which resolves to JSON response data or rejects on error
  */
  getConversationsDetail(roomID) {
    return this.getSparkURI(URI_CONVERSATIONS + roomToConversationId(roomID));
  }

  /* 
   * locusID - Spark LocusID
   * returns - Promise which resolves to JSON response data or rejects on error
   */

  getLocusMeetingInfo(locusID) {
    return this.getSparkURI(URI_LOCUS + locusID + URI_LOCUS_MEETINGINFO);
  }

  /**
   * Pass Room ID & Bearer Token
   *
   * @param {any} roomID Spark RoomID
   * @returns {Promise} Promise which resolves to JSON response data or rejects on error
   */
  async getRoomMeetingInfo(roomID) {
    let json = await this.getConversationsDetail(roomID);
    return this.getLocusMeetingInfo(locusUrlToId(json.locusUrl));
  }

  /**
   * Main helepr function to construct HTTP request
   *
   * @param {string} uriString URI to request
   * @returns {object} Request Response Body
   */
  async getSparkURI(uriString) {
    try {
      let response = await request
        .get(uriString)
        .set("Authorization", `Bearer ${this.accessToken}`)
        .set("Accept", "application/json");
      return response.body;
    } catch (error) {
      console.error(error);
    }
  }
}

/**
 *
 *
 * @param {string} b64
 * @returns {string} Decoded base64
 */
function decodeBase64(b64) {
  return new Buffer(b64, "base64").toString();
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

module.exports = MeetingInfo;
