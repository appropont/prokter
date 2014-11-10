Template.settings.rendered = function() {
    wrapInputWithMaterial('.form-control');
};

Template.settings.events({
    'click #generate-user-salt' : function(e) {
        e.preventDefault();

        var newSalt = generateSalt();
        $('#edit-settings-salt').val(newSalt);
    }
});

AutoForm.hooks({
    editSettingsForm : {
        onSuccess: function(operation, result, template) {
            removeActivityListener();
            Router.go('settingsLoggedOut');
        },
        onError: function(operation, error, template) {
            console.log('Error occurred: operation = ', operation);
            console.log('Error occurred: error = ', error);
            console.log('Error occurred: template = ', template);
        }
    }
});
