Router.map(function () {
    this.route('notAuthorized', {
      path: '/not-authorized'
    });
});


//global before action
Router.onBeforeAction(function() {
    if(!Meteor.userId()) {
        var current = Router.current();
        if(current.route.name !== 'main' && current.name !== 'login')
            Session.set('previousRoutePath', Router.current().path);
        Router.go('notAuthorized');
    }

    this.next();
}, {
    except: [
        'main',
        'register',
        'login',
        'notAuthorized',
        'terms',
        'help',
        'sessionLoggedOut',
        'userLoggedOut',
        'settingsLoggedOut'
    ]
});
