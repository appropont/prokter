Router.map(function () {
    this.route('editPassword', {
        path: '/password/:_id/edit',
        subscriptions: function() {
            this.subscribe('password', this.params._id).wait();
        },
        data : function(){

            var password = Passwords.findOne(this.params._id);

            if(!password) return null;

            Session.set('editPasswordIcon', password.icon);
            Session.set('editPasswordIconColor', password.iconColor);

            return {
                password : password
            }
        }
    });
});
