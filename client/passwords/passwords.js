Template.passwords.helpers({

    passwordCount : function(count) {
        if(count === 1) {
            return '1 Password';
        } else {
            return count + ' Passwords';
        }
    }

});

