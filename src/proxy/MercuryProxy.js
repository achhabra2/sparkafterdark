const fs = require("fs");
const { AfterDarkBase } = require("../common");
const { handleIncomingEvent } = require("./eventHandlers");

/**
 * Class for websocket to chat bot proxy
 *
 * @class MercuryProxy
 * @extends {AfterDarkBase}
 */
class MercuryProxy extends AfterDarkBase {
  constructor(spark) {
    super(spark);
    this.spark.internal.mercury.on(
      "event:conversation.activity",
      async event => {
        const { activity } = event.data;

        // Uncomment if you want to save mercury response to JSON for debugging
        // const outputFileName = `mercury-event-${Date.now()}.json`;
        // fs.writeFileSync(outputFileName, JSON.stringify(event));
        console.log("Received Mercury Activity:", JSON.stringify(activity));

        const webhookEvent = await handleIncomingEvent(activity, this.spark);
        console.log(JSON.stringify(webhookEvent));
        this.emit("event", webhookEvent);
      }
    );
  }

  /**
   * Call to start the websocket proxy and disconnect from the cloud
   *
   * @memberof MercuryProxy
   */
  async start() {
    try {
      await this.spark.internal.mercury.connect();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Call to stop the websocket proxy and disconnect from the cloud
   *
   * @memberof MercuryProxy
   */
  async stop() {
    try {
      await this.spark.internal.mercury.disconnect();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = MercuryProxy;
