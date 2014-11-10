UserMeta = new Meteor.Collection('userMeta');


UserMetaSchema = new SimpleSchema({

    userId : {
        type : String,
        label : 'Author ID',
        autoValue: function() {
            if(this.isInsert) {
                return this.userId;
            }
        }
    },

    hash : {
        type : String,
        label : 'Hash'
    },

    salt : {
        type: String,
        label : 'Salt'
    },

    loginTimeout : {
        type: Number,
        label: 'Inactivity Timeout Length (s)',
        defaultValue: 60
    },

    showPassTimeout : {
        type: Number,
        label: 'Timeout Length of Shown Passwords (s)',
        defaultValue: 10
    }

});

UserMeta.attachSchema(UserMetaSchema);

if(Meteor.isServer) {
    UserMeta.allow({
        update: function (userId, userMeta) {
            if(userId === userMeta.userId) {
                return true;
            } else {
                return false;
            }
        },
        insert: function(userId, userMeta) {
            if(
                userId &&
                userId === userMeta.userId &&
                !UserMeta.findOne({userId: userId})
            ) {
                return true;
            } else {
                return false;
            }
        }
    });
}
