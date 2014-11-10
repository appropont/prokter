Router.map(function () {
    this.route('settings', {
        path: '/settings',
        subscriptions: function() {
            this.subscribe('userMeta').wait();
        },
        data : function(){

            var userMeta = UserMeta.findOne({userId: Meteor.userId()});

            return {
                userMeta : userMeta
            };
        }
    });
});
