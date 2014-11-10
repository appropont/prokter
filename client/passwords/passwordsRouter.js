Router.map(function () {
    this.route('passwords', {
        path: '/passwords',
        onBeforeAction: function() {
            Session.set('clearAllProgressBars', false);
            this.next();
        },
        subscriptions: function() {
            this.subscribe('passwords').wait();
            this.subscribe('userMeta').wait();
        },
        data: function() {

            var userId = Meteor.userId();

            return {
                userMeta : UserMeta.findOne({userId: userId}),
                passwords : Passwords.find({userId: userId})
            };
        },
        unload: function() {
            console.log('unload', this);
            Session.set('clearAllProgressBars', true);
        }
    });
});
