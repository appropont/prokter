Template.register.rendered = function() {
    wrapInputWithMaterial('.form-control');
    Session.set('agreeTerms', false);
};


var registerFormSchema = new SimpleSchema({
    email: {
        type: String,
        label: 'Email'
    },
    password: {
        type: String,
        label: 'Password'
    }
});

Template.register.helpers({
    validationError : function() {
        var error = Session.get('registerError');

        if(error && error != '') {
            return error;
        }

        return false;
    },
    agreedToTerms : function() {
        var agreeTerms = Session.get('agreeTerms');
        if(agreeTerms !== true) {
            return false;
        } else {
            return true;
        }
    },
    registerFormSchema : function() {
        return registerFormSchema;
    }

});


Template.register.events({

    'click #agree-to-terms .check' : function(e) {

        var agreeTerms = Session.get('agreeTerms');

        if(!agreeTerms || agreeTerms == false) {
            Session.set('agreeTerms', true);
        } else {
            Session.set('agreeTerms', false);
        }

    }

})

AutoForm.hooks({
    registerForm : {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {

            var self = this;

            var options = {};

            options.email = insertDoc.email;
            options.password = insertDoc.password;

            var agreeTerms = Session.get('agreeTerms');

            if(!agreeTerms) {
                Session.set('registerError', 'You must agree to the Terms and Conditions.')
                self.done();
                return false;
            }

            Accounts.createUser(options, function(error) {
                if(error) {
                    //console.log('createUser error: ', error);
                    //todo: better error notice (based on error object)
                    Session.set('registerError', 'Create User Error');
                    self.done();
                } else {

                    var newSalt = generateSalt();

                    var newHash = makeHash(options.password, newSalt);

                    UserMeta.insert({
                        userId: Meteor.userId(),
                        hash: newHash,
                        salt: newSalt
                    });

                    Session.set('registerError', false);
                    Router.go('passwords');
                    self.done();
                }
            });

            return false;
        }
    }
});
