Template.editPassword.rendered = function() {
    wrapInputWithMaterial('#edit-password-name');
    wrapInputWithMaterial('#edit-password-salt');
    wrapInputWithMaterial('#edit-password-length');
};

Template.editPassword.helpers({
    isSelectedIcon : function() {
        var selectedIcon = Session.get('editPasswordIcon');
        if(this == selectedIcon) {
            return true;
        } else {
            return false;
        }
    },
    isSelectedIconColor : function() {
        var selectedIconColor = Session.get('editPasswordIconColor');
        if(this.value === selectedIconColor) {
            return true;
        } else {
            return false;
        }
    },
    selectedIcon : function() {
        return Session.get('editPasswordIcon');
    },
    selectedIconColor : function() {
        return Session.get('editPasswordIconColor');
    }


});

Template.editPassword.events({
    'click #generate-salt' : function(e) {
        e.preventDefault();
        var newSalt = Security.generateSalt();
        $('#edit-password-salt').val(newSalt);
    },
    'click .icon-option' : function(e) {
        Session.set('editPasswordIcon', this.toString());
    },
    'click .icon-color-option' : function(e) {
        Session.set('editPasswordIconColor', this.value);
    }
});

AutoForm.hooks({
    editPasswordForm : {
        onSuccess: function(operation, result, template) {
            console.log('editPassword Success');
            Router.go('passwords');
            Session.set('editPasswordIcon', false);
            Session.set('editPasswordIconColor', false);
        },
        onError: function(operation, error, template) {
            console.log('Error occurred: operation = ', operation);
            console.log('Error occurred: error = ', error);
            console.log('Error occurred: template = ', template);
        }
    }
});
