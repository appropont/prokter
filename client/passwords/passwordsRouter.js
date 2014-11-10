Router.map(function () {
    this.route('passwords', {
        path: '/passwords',
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
        }
    });
});
