listenToNewActivity(conversationId, sparkInstance) {
  sparkInstance.internal.mercury.on('event:conversation.activity', (event) => {
    const {activity} = event.data;
    // Ignore activity from other conversations
    if (activity.target && activity.target.id === conversationId) {
      if (activity.object.objectType === 'activity') {
        this.props.receiveMercuryActivity(activity);
      }
      else if (activity.object.objectType === 'person') {
        if (activity.verb === 'add') {
          this.props.addParticipant(activity.object);
        }
        else if (activity.verb === 'leave') {
          this.props.removeParticipant(activity.object);
        }
        this.props.receiveMercuryComment(activity);
      }
      else {
        this.props.receiveMercuryComment(activity);
      }
    }
  });
}

mockSpark.internal.mercury.connected = true;

if (canAuthorize && device.registered
  && !mercury.connected && !mercury.connecting) {
  dispatch(updateStatusConnecting(true));
  return mercury.connect().then(() =>
    sparkInstance.listenToAndRun(mercury, 'change:connected', () =>
      dispatch(updateStatusConnected(mercury.connected))));
}
