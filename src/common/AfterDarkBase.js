const EventEmitter = require("events");

/**
 * Base AfterDark Class to initialize Internal Spark SDK
 *
 * @class AfterDarkBase
 * @extends {EventEmitter}
 */
class AfterDarkBase extends EventEmitter {
  constructor(spark) {
    super();
    this.spark = spark;
  }
}

module.exports = AfterDarkBase;
