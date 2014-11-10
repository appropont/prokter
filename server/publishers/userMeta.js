Meteor.publish('userMeta', function () {
    if(this.userId) {
        return UserMeta.find({userId: this.userId}); 
    }
});
