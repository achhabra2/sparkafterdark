const EventEmitter = require("events");

/**
 * Base AfterDark Class to initialize Internal Spark SDK
 *
 * @class AfterDarkBase
 * @extends {EventEmitter}
 */
class AfterDarkBase extends EventEmitter {
  /**
   * Creates an instance of AfterDarkBase.
   * @param {any} spark Initialized Spark Instance
   * @memberof AfterDarkBase
   */
  constructor(spark) {
    super();
    this.spark = spark;
  }
}

module.exports = AfterDarkBase;
