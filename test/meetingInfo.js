const helpers = require('../sparkafterdark')
const ROOM_ID = process.env.ROOM_ID
const ACCESS_TOKEN = process.env.ACCESS_TOKEN

helpers.getRoomMeetingInfo(ROOM_ID, ACCESS_TOKEN)
  .then(result => console.log(result))