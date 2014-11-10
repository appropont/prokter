Meteor.publish('passwords', function () {
    if(this.userId) {
        return Passwords.find({userId: this.userId});
    }
});
