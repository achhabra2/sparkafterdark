function formatEvent(activity) {
  const event = { data: {} };
  // Message Created
  if (activity.verb === "post" || activity.verb === "share") {
    event.event = "created";
    event.resource = "messages";
    event.data.id = activity.id;
    event.data.personEmail = activity.actor.emailAddress;
  } else if (activity.object.objectType === "person") {
    // Person added to Space
    if (activity.verb === "add") {
      event.event = "created";
      event.resource = "memberships";
      // Person removed from Space
    } else if (activity.verb === "leave") {
      event.event = "deleted";
      event.resource = "memberships";
    } else if (
      activity.verb === "unassignModerator" ||
      activity.verb === "assignModerator"
    ) {
      // Person added / removed as Moderator
      event.event = "updated";
      event.resource = "memberships";
    }
  } else if (
    activity.verb === "lock" ||
    activity.verb === "unlock" ||
    activity.verb === "update"
  ) {
    // Room locked or unlocked
    event.event = "updated";
    event.resource = "rooms";
  }

  return event;
}

async function addEventData(event, activity, spark) {
  if (event.resource === "memberships") {
    const response = await spark.memberships.list({
      roomId: activity.target.id,
      personEmail: activity.object.emailAddress
    });
    event.data = response.items[0];
  }
  if (event.resource === "rooms") {
    const response = await spark.rooms.get(activity.target.id);
    event.data = response.items[0];
  }
  return event;
}

async function handleIncomingEvent(activity, spark) {
  const event = formatEvent(activity);
  const finalEvent = await addEventData(event, activity, spark);
  return finalEvent;
}
// // Space created
// event.event = "created";
// event.resource = "rooms";

// // Message Deleted
// event.event = "deleted";
// event.resource = "messages";

module.exports = {
  handleIncomingEvent,
  addEventData,
  formatEvent
};
