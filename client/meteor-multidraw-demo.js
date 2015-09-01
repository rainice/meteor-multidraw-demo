points = new Mongo.Collection('pointsCollection');
var canvas
  , $canvas;

//Tracker.autorun( function () {
  Meteor.subscribe('pointsSubscription');
//});

Meteor.startup( function() {
  canvas = new Canvas();
  $canvas = $('#canvas'); //cache canvas.

  Tracker.autorun( function() {
    var data = points.find({}).fetch();
    $('h2').hide();
    if (canvas) {
      canvas.draw(data);
    }
  });
});

Template.drawingSurface.helpers({
  'title': function () {
    return 'Draw with Me! (A Collaborative, Real-Time Drawing Environment) Works best in Chrome.';
  }
});

Template.drawingSurface.events({
  'click input': function (event) {
    Meteor.call('clear', function() {
      canvas.clear();
    });
  }
})

var markPoint = function() {
  var offset = $canvas.offset(); //$('#canvas').offset();

  // Works only with insecure
  //points.insert({
  //x: (event.pageX - offset.left),
  //y: (event.pageY - offset.top)});

  Meteor.call('insert', {
    x: (event.pageX - offset.left),
    y: (event.pageY - offset.top)}
  );
}

Template.canvas.events({
  'click': function (event) {
    markPoint();
  },
  'mousedown': function (event) {
    Session.set('draw', true);
  },
  'mouseup': function (event) {
    Session.set('draw', false);
  },
  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint();
    }
  }
});
