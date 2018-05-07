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
 * Main class that wraps all utilities
 *
 * @class SparkAfterDark
 */
class SparkAfterDark {
  /**
   * Creates an instance of SparkAfterDark.
   * @param {string} accessToken Access Token string
   * @memberof SparkAfterDark
   */
  constructor(accessToken) {
    this.token = accessToken || process.env.ACCESS_TOKEN;
    this.spark = new CiscoSpark({
      credentials: {
        authorization: {
          access_token: this.token
        }
      }
    });
    this.proxy = new Proxy(this.spark);
    this.conversation = new common.Conversation(this.spark);
    this.board = new Whiteboard(this.spark);
    this.utils = common.utils;
    this.meeting = new common.MeetingInfo(this.token);
  }

  /**
   * Call to register device to cloud
   *
   * @memberof SparkAfterDark
   */
  async init() {
    try {
      await this.spark.internal.device.register();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Call to unregister device to cloud
   *
   * @memberof SparkAfterDark
   */
  async close() {
    try {
      await this.spark.internal.device.unregister();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = SparkAfterDark;
