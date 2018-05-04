const fs = require("fs");
const { pick, each } = require("lodash");
const uuid = require("uuid");

const { AfterDarkBase } = require("../common");

class BoardUtils extends AfterDarkBase {
  constructor(spark) {
    super(spark);
  }

  // List Available Boards by Conversation
  async list(conversation) {
    const boards = await this.spark.internal.board.getChannels(conversation);
    each(boards.items, board => {
      console.log(board.channelId);
      console.log("\tCREATED:", new Date(board.createdTime));
      console.log("\tUPDATED:", new Date(board.contentLastUpdatedTime));
      console.log(`\tCHANNEL_URL=${board.channelUrl}`);
    });
  }

  // Save Board by Board Channel
  async save(channel) {
    const outputFileName = `${Date.now()}.json`;
    const contents = await this.spark.internal.board.getContents(channel);
    each(contents.items, content => {
      fs.appendFileSync(outputFileName, JSON.stringify(content) + "\r\n");
    });
    console.log(">>>>>>> saved to", outputFileName);
    return contents;
  }
}

module.exports = BoardUtils;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const curveFormat = {
  // action: "contentCommit",
  color: { alpha: 1, blue: 61, green: 81, red: 255 },
  curveId: uuid.v4(),
  curvePoints: [
    randomIntFromInterval(400, 800),
    randomIntFromInterval(200, 450),
    1.5,
    randomIntFromInterval(800, 1200),
    randomIntFromInterval(200, 450),
    3.5,
    randomIntFromInterval(400, 800),
    randomIntFromInterval(450, 700),
    1.5,
    randomIntFromInterval(800, 1200),
    randomIntFromInterval(450, 700),
    3.5,
    randomIntFromInterval(400, 800),
    randomIntFromInterval(200, 450),
    1.5,
    randomIntFromInterval(800, 1200),
    randomIntFromInterval(200, 450),
    3.5,
    randomIntFromInterval(400, 800),
    randomIntFromInterval(450, 700),
    1.5,
    randomIntFromInterval(800, 1200),
    randomIntFromInterval(450, 700),
    3.5,
    randomIntFromInterval(400, 800),
    randomIntFromInterval(200, 450),
    0.5,
    randomIntFromInterval(800, 1200),
    randomIntFromInterval(200, 450),
    1.5,
    randomIntFromInterval(400, 800),
    randomIntFromInterval(450, 700),
    0.5,
    randomIntFromInterval(800, 1200),
    randomIntFromInterval(450, 700),
    1.5
  ],
  drawMode: "NORMAL",
  id: uuid.v4(),
  // name: "contentCommit",
  stride: 3,
  type: "curve"
};
