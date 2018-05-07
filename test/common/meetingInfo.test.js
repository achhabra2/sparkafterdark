require("dotenv/config");
const chai = require("chai");
chai.should();

const SparkAfterDark = require("../src/");
const request = require("superagent");

const ROOM_ID = process.env.ROOM_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

describe("Spark After Dark Class", () => {
  it("Should throw an error with no token", () => {
    SparkAfterDark.should.throw(Error);
  });

  it("Should initialize the class with token", () => {
    (function() {
      new SparkAfterDark({ accessToken: ACCESS_TOKEN });
    }.should.not.throw(Error));
  });

  it("Access token should be valid", () => {
    return request
      .get("https://api.ciscospark.com/v1/people/me")
      .set("Authorization", `Bearer ${ACCESS_TOKEN}`);
  });

  it("Should Get Room Meeting Info From Locus", async () => {
    const Dark = new SparkAfterDark({ accessToken: ACCESS_TOKEN });
    return Dark.getRoomMeetingInfo(ROOM_ID);
  });
});
