Router.map(function () {
    this.route('register', {
      path: '/register',
      onBeforeAction: function() {
          Session.set('registerError', '');
          this.next();
      }
    });
});
