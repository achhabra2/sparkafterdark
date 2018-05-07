# sparkafterdark

Unsupported library for Cisco Spark. Useful NodeJS utilities to work with unofficial APIs. Everything in this package is likely to break at some point, and there is no warranty of any kind. Use at your own risk.

## Usage:

### Initialization

```javascript
const SparkAfterDark = require("../sparkafterdark");
const dark = new SparkAfterDark(process.env.access_token); // Or specify access token string
```

### Websocket to Botkit Proxy

Add this to your botkit code. Remove all webserver and webhook related code.
Check the examples folder for a full sample.

```javascript
dark.proxy.on("event", event => {
  controller.ingest(bot, event, {});
});
dark.init().then(() => dark.proxy.start());

process.on("SIGINT", async function() {
  console.log("Got SIGINT.  Press Control-D to exit.");
  try {
    await dark.proxy.stop();
    await dark.close();
    console.log("Proxy stopped successfully.");
  } catch (error) {
    console.error("Could not stop dark proxy. ");
  }
});
```

### Get Room Meeting Info

```javascript
dark.meeting
  .getRoomMeetingInfo("YOUR ROOM ID")
  .then(meetingDetails => console.log(meetingDetails));
```
