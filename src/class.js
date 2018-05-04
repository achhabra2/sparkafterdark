// require("@ciscospark/plugin-authorization");
// require("@ciscospark/internal-plugin-wdm");
require("@ciscospark/plugin-logger");
require("@ciscospark/internal-plugin-mercury");
require("@ciscospark/internal-plugin-board");
require("@ciscospark/internal-plugin-conversation");
require("@ciscospark/plugin-messages");
require("@ciscospark/plugin-memberships");
require("@ciscospark/plugin-people");
require("@ciscospark/plugin-rooms");
require("@ciscospark/plugin-teams");
require("@ciscospark/plugin-team-memberships");
require("@ciscospark/plugin-webhooks");
const CiscoSpark = require("@ciscospark/spark-core").default;

const common = require("./common");
const Proxy = require("./proxy");
const Whiteboard = require("./whiteboard");

/**
 * Main Class
 *
 * @class SparkAfterDark
 */
class SparkAfterDark {
  constructor(accessToken) {
    this.spark = new CiscoSpark({
      credentials: {
        authorization: {
          access_token: accessToken || process.env.ACCESS_TOKEN
        }
      }
    });
    this.proxy = new Proxy(this.spark);
    this.conversation = new common.Conversation(this.spark);
    this.board = new Whiteboard(this.spark);
    this.utils = common.utils;
  }
  async init() {
    try {
      await this.spark.internal.device.register();
    } catch (error) {
      console.error(error);
    }
  }
  async close() {
    try {
      await this.spark.internal.device.unregister();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = SparkAfterDark;
