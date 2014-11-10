Meteor.subscribe('userMeta');

Template.login.rendered = function() {
    wrapInputWithMaterial('#login-page-email');
    wrapInputWithMaterial('#login-page-password');
};

var loginFormSchema = new SimpleSchema({
    email: {
        type: String,
        label: 'Email'
    },
    password: {
        type: String,
        label: 'Password'
    }
});

Template.login.helpers({

    //Set value on load to prevent old values being left over
    loginEmail : '',
    loginPassword : '',

    validationError : function() {
        var error = Session.get('loginError');

        if(error && error != '') {
            return error;
        }

        return false;
    },

    loginFormSchema : function() {
        return loginFormSchema;
    }

});

AutoForm.hooks({
    loginForm : {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {

            var self = this;

            Meteor.loginWithPassword(insertDoc.email, insertDoc.password, function(error) {
                if(error) {
                    Session.set('loginError', error.reason);
                    self.done();
                } else {

                    var userMeta = UserMeta.findOne({userId: Meteor.userId()});

                    //attach session listener
                    var sessionDuration = userMeta.loginTimeout;
                    attachActivityListener(sessionDuration);

                    //refresh hash in case of salt change
                    var newHash = makeHash(insertDoc.password, userMeta.salt);
                    UserMeta.update({_id: userMeta._id},
                        {
                            $set: {
                                hash: newHash
                            }
                        }
                    );

                    var previousPath = Session.get('previousPath');
                    if(previousPath) {
                        Session.set('previousPath', false);
                        Router.go(previousPath);
                    } else {
                        Router.go('passwords');
                    }

                    self.done();
                }
            });


            return false;
        }
    }
});
