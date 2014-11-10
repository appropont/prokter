Router.map(function () {
    this.route('login', {
      path: '/login',
      onBeforeAction: function() {
          Session.set('loginError', '');
          this.next();
      }
    });
});
