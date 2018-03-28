require('dotenv/config');
const chai = require('chai');
chai.should();

const SparkAfterDark = require('../src/sparkafterdark');

const ROOM_ID = 'Y2lzY29zcGFyazovL3VzL1JPT00vZDNmMmVjOTAtMjY0Mi0xMWU4LWJkZmItYzk4MDUzNGQxZmQw'
const ACCESS_TOKEN = 'ZDc3MWZmMWMtNjA2ZC00ODc1LTljNDQtNzQxOGQwYzdjYWQyN2M0ZjdiN2EtY2U0'


describe('Spark After Dark Class', () => {
  it('Should throw an error with no token', () => {
    SparkAfterDark.should.throw(Error)
  })

  it('Should initialize the class with token', () => {
    (function () {
      new SparkAfterDark({ accessToken: ACCESS_TOKEN })
    }).should.not.throw(Error)
  })

  it('Access token should be valid', () => {

  })

  it('Should Get Room Meeting Info From Locus', async () => {
    const Dark = new SparkAfterDark({ accessToken: ACCESS_TOKEN })
    return Dark.getRoomMeetingInfo(ROOM_ID)
  })

})