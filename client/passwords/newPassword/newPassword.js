Template.newPassword.rendered = function() {
    wrapInputWithMaterial('#new-password-name');
    wrapInputWithMaterial('#new-password-salt');
    wrapInputWithMaterial('#new-password-length');

    //Give salt a default but unique value
    var newSalt = generateSalt();
    $('#new-password-salt').val(newSalt);

    //Default pass length
    $('#new-password-length').val(8);

    Session.set('newPasswordIcon', 'mdi-action-account-balance');
    Session.set('newPasswordIconColor', 'icon-material-red');
};

Template.newPassword.helpers({
    isSelectedIcon : function() {
        var selectedIcon = Session.get('newPasswordIcon');
        if(this == selectedIcon) {
            return true;
        } else {
            return false;
        }
    },
    isSelectedIconColor : function() {
        var selectedIconColor = Session.get('newPasswordIconColor');
        if(this.value === selectedIconColor) {
            return true;
        } else {
            return false;
        }
    },
    selectedIcon : function() {
        return Session.get('newPasswordIcon');
    },
    selectedIconColor : function() {
        return Session.get('newPasswordIconColor');
    }


});

Template.newPassword.events({
    'click #generate-salt' : function(e) {
        e.preventDefault();

        var newSalt = generateSalt();
        $('#new-password-salt').val(newSalt);
    },
    'click .icon-option' : function(e) {
        Session.set('newPasswordIcon', this.toString());
    },
    'click .icon-color-option' : function(e) {
        Session.set('newPasswordIconColor', this.value);
    }
});

AutoForm.hooks({
    newPasswordForm : {
        onSuccess: function(operation, result, template) {
            Router.go('passwords');
            Session.set('newPasswordIcon', false);
            Session.set('newPasswordIconColor', false);
        },
        onError: function(operation, error, template) {
            console.log('Error occurred: operation = ', operation);
            console.log('Error occurred: error = ', error);
            console.log('Error occurred: template = ', template);
        }
    }
})
