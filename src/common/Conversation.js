const { pick } = require("lodash");
const utils = require("./utils");
const AfterDarkBase = require("./AfterDarkBase");

/**
 * Conversation utilities class
 *
 * @class Conversation
 * @extends {AfterDarkBase}
 */
class Conversation extends AfterDarkBase {
  constructor(spark) {
    super(spark);
  }

  /**
   * Wrapper method for listing available conversations.
   * This is basically equivalent to a rooms list
   *
   * @returns {Array} conversation list
   * @memberof Conversation
   */
  async list() {
    try {
      let conversations = await this.spark.internal.conversation.list({
        activitiesLimit: 0,
        participantsLimit: 2,
        conversationsLimit: 50
      });
      conversations = conversations.map(convo =>
        pick(convo, ["id", "displayName", "url", "aclUrl"])
      );
      return conversations;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  /**
   * Get conversation by roomId
   *
   * @param {string} roomId Spark roomId
   * @returns {object} conversation object
   * @memberof Conversation
   */
  async get(roomId) {
    const conversation = {};
    conversation.id = utils.roomToConversationId(roomId);
    let conversationDetail;
    try {
      conversationDetail = await this.spark.internal.conversation.get(
        conversation
      );
    } catch (error) {
      console.error(error);
    }
    return conversationDetail;
  }
}

module.exports = Conversation;
