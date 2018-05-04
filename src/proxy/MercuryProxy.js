const fs = require("fs");
const { AfterDarkBase } = require("../common");
const { handleIncomingEvent } = require("./eventHandlers");

class MercuryProxy extends AfterDarkBase {
  constructor(spark) {
    super(spark);
    this.spark.internal.mercury.on(
      "event:conversation.activity",
      async event => {
        const { activity } = event.data;
        // const outputFileName = `mercury-event-${Date.now()}.json`;
        // fs.writeFileSync(outputFileName, JSON.stringify(event));
        // console.log("Received Mercury Activity:", JSON.stringify(activity));

        const webhookEvent = await handleIncomingEvent(activity, this.spark);
        console.log(JSON.stringify(webhookEvent));
        this.emit("event", webhookEvent);
      }
    );
  }

  async start() {
    try {
      await this.spark.internal.mercury.connect();
    } catch (error) {
      console.error(error);
    }
  }

  async stop() {
    try {
      await this.spark.internal.mercury.disconnect();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = MercuryProxy;
