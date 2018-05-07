/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Cisco Spark bot built with Botkit.

# RUN THE BOT:
  Follow the instructions here to set up your Cisco Spark bot:
    -> https://developer.ciscospark.com/bots.html
  Run your bot from the command line:
    access_token=<MY BOT ACCESS TOKEN> public_address=<MY PUBLIC HTTPS URL> node bot.js



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var env = require("node-env-file");
env(__dirname + "/.env");

if (!process.env.access_token) {
  console.log("Error: Specify a Cisco Spark access_token in environment.");
  usage_tip();
  process.exit(1);
}

if (!process.env.public_address) {
  console.log(
    "Error: Specify an SSL-enabled URL as this bot's public_address in environment."
  );
  usage_tip();
  process.exit(1);
}

var Botkit = require("botkit");
var debug = require("debug")("botkit:main");

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.sparkbot({
  // debug: true,
  // limit_to_domain: ['mycompany.com'],
  // limit_to_org: 'my_cisco_org_id',
  public_address: process.env.public_address,
  ciscospark_access_token: process.env.access_token,
  webhook_name:
    "Cisco Spark bot created with Botkit, override me before going to production",
  studio_command_uri: process.env.studio_command_uri
});

var bot = controller.spawn({});

var normalizedPath = require("path").join(__dirname, "skills");
require("fs")
  .readdirSync(normalizedPath)
  .forEach(function(file) {
    require("./skills/" + file)(controller);
  });

const SparkAfterDark = require("../sparkafterdark");
const dark = new SparkAfterDark(process.env.access_token);
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
