Router.map(function () {
    this.route('sessionLoggedOut', {
      path: '/timed-out',
      onBeforeAction: function() {
          Session.set('loginError', '');
          Meteor.logout();
          this.next();
      }
    });
});

Router.map(function () {
    this.route('userLoggedOut', {
      path: '/logged-out',
      onBeforeAction: function() {
          Session.set('loginError', '');
          Meteor.logout();
          this.next();
      }
    });
});

Router.map(function () {
    this.route('settingsLoggedOut', {
      path: '/settings-saved',
      onBeforeAction: function() {
          Session.set('loginError', '');
          Meteor.logout();
          this.next();
      }
    });
});
