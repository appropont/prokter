Passwords = new Meteor.Collection('passwords');


PasswordSchema = new SimpleSchema({

    name : {
        type : String,
        label : 'Name',
        max : 40
    },

    //lower-case name for search and alphabetical sorting
    sName : {
        type : String,
        label : 'Search Name',
        autoValue : function() {
            return this.field('name').value.toLowerCase();
        }
    },

    userId : {
        type : String,
        label : 'Author ID',
        autoValue: function() {
            if(this.isInsert) {
                return this.userId;
            }
        }
    },

    salt : {
        type : String,
        label : 'Salt'
    },

    length : {
        type : Number,
        label : 'Length'
    },

    created : {
        type : Date,
        label : 'Creation Timestamp',
        autoValue : function() {
            if(this.isInsert)
                return new Date();
        }
    },

    icon : {
        type : String,
        label : 'Icon'
    },

    iconColor : {
        type : String,
        label : 'Icon Color'
    }

});

Passwords.attachSchema(PasswordSchema);

if(Meteor.isServer) {
    Passwords.allow({
        update: function (userId, password) {
            if(userId === password.userId) {
                return true;
            } else {
                return false;
            }
        },
        insert: function(userId, password) {
            if(userId && userId === password.userId) {
                return true;
            } else {
                return false;
            }
        },
        remove: function(userId, password) {
            if(userId && userId === password.userId) {
                return true;
            } else {
                return false;
            }
        }
    });
}
