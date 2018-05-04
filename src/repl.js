require("dotenv/config");
const SparkAfterDark = require("./class");
const dark = new SparkAfterDark();

const repl = require("repl");
const replServer = repl.start();
replServer.context.dark = dark;

dark.spark.memberships
  .list({
    roomId: "cdd89a90-4aff-11e7-af0f-bf62e4939ba3",
    personEmail: "aman.chhabra1+colonel@gmail.com"
  })
  .then(rooms => console.log(JSON.stringify(rooms.items)));
