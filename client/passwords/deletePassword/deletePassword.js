Template.deletePassword.events({
    'click #delete-delete' : function(e){
        Passwords.remove(this.password._id);
        Router.go('passwords');
    },
    'click #delete-cancel' : function(e) {
        Router.go('passwords');
    }
})
