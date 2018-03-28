# sparkafterdark
Unsupported library for Cisco Spark.  Useful NodeJS utilities to work with unofficial APIs.  Everything in this package is likely to break at some point, and there is no warranty of any kind.  Use at your own risk.

## Usage: 

### Get Room Meeting Info
``` javascript
const SparkAfterDark = require('sparkafterdark');

const S4D = new SparkAfterDark({accessToken: 'YOUR BEARER TOKEN'});

S4D.getRoomMeetingInfo('YOUR ROOM ID').then(meetingDetails => console.log(meetingDetails));
```