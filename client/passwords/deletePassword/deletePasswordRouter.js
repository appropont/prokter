Router.map(function () {
    this.route('deletePassword', {
        path: '/password/:_id/delete',
        subscriptions: function() {
            this.subscribe('password', this.params._id).wait();
        },
        data : function(){

            var password = Passwords.findOne(this.params._id);

            if(!password) return null;

            return {
                password : password
            }
        }
    });
});
