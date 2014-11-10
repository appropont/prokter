Meteor.publish('password', function (passwordId) {
    if(this.userId) {
        return Passwords.find({userId: this.userId, _id: passwordId});
    }
});
