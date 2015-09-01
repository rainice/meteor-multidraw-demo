points = new Mongo.Collection('pointsCollection');

Meteor.publish('pointsSubscription', function () {
  return points.find();
});

Meteor.methods({
  'clear': function () {
    points.remove({});
  },
  'insert': function(pt) {
    points.insert(pt);
  }
});
