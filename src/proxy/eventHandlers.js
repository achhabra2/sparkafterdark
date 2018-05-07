const { encodeBase64 } = require("../common").utils;

function formatEvent(activity) {
  const event = { data: {} };
  // Message Created
  if (activity.verb === "post" || activity.verb === "share") {
    event.event = "created";
    event.resource = "messages";
    event.data.id = activity.id;
    event.data.personEmail = activity.actor.emailAddress;
    event.data.personDisplayName = activity.actor.displayName;
    if (activity.target.tags.indexOf("ONE_ON_ONE") !== -1) {
      event.data.roomType = "direct";
    } else {
      event.data.roomType = "group";
    }
  } else if (activity.object.objectType === "person") {
    // Person added to Space
    if (activity.verb === "add") {
      event.event = "created";
      event.resource = "memberships";
      event.data.actorId = activity.actor.id;
      // Person removed from Space
    } else if (activity.verb === "leave") {
      event.event = "deleted";
      event.resource = "memberships";
      event.data.actorId = activity.actor.id;
      event.data.id = encodeBase64(
        `ciscospark://us/MEMBERSHIP/${activity.object.id}:${activity.target.id}`
      ); // Membership ID
      event.data.personId = encodeBase64(
        `ciscospark://us/PEOPLE/${activity.object.id}`
      );
      event.data.personEmail = activity.object.emailAddress;
      event.data.personOrgId = encodeBase64(
        `ciscospark://us/ORGANIZATION/${activity.object.orgId}`
      );
      event.data.personDisplayName = activity.object.displayName;
    } else if (
      activity.verb === "unassignModerator" ||
      activity.verb === "assignModerator"
    ) {
      // Person added / removed as Moderator
      event.data.actorId = activity.actor.id;
      event.event = "updated";
      event.resource = "memberships";
    }
  } else if (
    activity.verb === "lock" ||
    activity.verb === "unlock" ||
    activity.verb === "update"
  ) {
    // Room locked or unlocked
    event.data.actorId = activity.actor.id;
    event.event = "updated";
    event.resource = "rooms";
  }

  return event;
}

// // Space created
// event.event = "created";
// event.resource = "rooms";

// // Message Deleted
// event.event = "deleted";
// event.resource = "messages";

module.exports = {
  formatEvent
};

// ciscospark://us/MEMBERSHIP/8f01d745-81f4-465b-afe6-905b61065c75:cdd89a90-4aff-11e7-af0f-bf62e4939ba3
// ciscospark://us/PEOPLE/b2f48473-943f-47b9-9dbd-fec703c007fc
// ciscospark://us/ROOM/cdd89a90-4aff-11e7-af0f-bf62e4939ba3
