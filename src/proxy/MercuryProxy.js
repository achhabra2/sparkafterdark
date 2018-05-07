const fs = require("fs");
const { AfterDarkBase } = require("../common");
const { formatEvent } = require("./eventHandlers");

/**
 * Class for websocket to chat bot proxy
 *
 * @class MercuryProxy
 * @extends {AfterDarkBase}
 */
class MercuryProxy extends AfterDarkBase {
  /**
   * Creates an instance of MercuryProxy.
   * Initialize with spark SDK instance from super class
   * @param {object} spark Spark SDK Instance
   * @memberof MercuryProxy
   */
  constructor(spark) {
    super(spark);
    this.spark.internal.mercury.on(
      "event:conversation.activity",
      async event => {
        const { activity } = event.data;

        // Uncomment if you want to save mercury response to JSON for debugging
        // const outputFileName = `mercury-event-${Date.now()}.json`;
        // fs.writeFileSync(outputFileName, JSON.stringify(event));
        // console.log("Received Mercury Activity:", activity);

        const webhookEvent = await this.handleIncomingEvent(activity);
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

  /**
   *
   *
   * @param {any} event
   * @param {any} activity
   * @returns {object} Webhook Formatted Event Object
   * @memberof MercuryProxy
   */
  async addEventData(event, activity) {
    if (event.resource === "memberships" && event.event !== "deleted") {
      const response = await this.spark.memberships.list({
        roomId: activity.target.id,
        personEmail: activity.object.emailAddress
      });
      event.data = response.items[0];
    }
    if (event.resource === "rooms") {
      const response = await this.spark.rooms.get(activity.target.id);
      event.data = response.items[0];
    }
    return event;
  }

  /**
   *
   *
   * @param {any} activity
   * @returns {object} Webhook Formatted Event Object
   * @memberof MercuryProxy
   */
  async handleIncomingEvent(activity) {
    const event = formatEvent(activity);
    const finalEvent = await this.addEventData(event, activity);
    return finalEvent;
  }
}

module.exports = MercuryProxy;
