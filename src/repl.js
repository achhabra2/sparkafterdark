require("dotenv/config");
const SparkAfterDark = require("./class");
const dark = new SparkAfterDark();

const repl = require("repl");
const replServer = repl.start();
replServer.context.dark = dark;
