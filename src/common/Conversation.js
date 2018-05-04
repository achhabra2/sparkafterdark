const { pick } = require("lodash");
const utils = require("./utils");
const AfterDarkBase = require("./AfterDarkBase");

class Conversation extends AfterDarkBase {
  constructor(spark) {
    super(spark);
  }
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
