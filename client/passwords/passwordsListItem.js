Template.passwordsListItem.rendered = function() {
    wrapInputWithMaterial('.password-display');
};

Template.passwordsListItem.created = function() {
    this.timer = new ReactiveVar(false);
    this.showingPassword = new ReactiveVar(false);
    this.progressBar = new ReactiveVar(false);
};

Template.passwordsListItem.destroyed = function() {
    
    var timer = this.timer.get();
    if(timer !== false) {
        Meteor.clearTimeout(timer);
        this.timer.set(false);
    }
    
    var progressBar = this.progressBar.get();
    if(progressBar !== false) {
        progressBar.kill();
        this.progressBar.set(false);
    }
    
};

var obscuredPassword = function(length){
    var obscuredPass = '';
    for(var i = 0; i < length; i++) {
        obscuredPass += '*';
    }
    return obscuredPass;
};

Template.passwordsListItem.helpers({

    passwordDisplay : function(password) {
        if(!password){
            return '';
        }
        
        var showingPassword = Template.instance().showingPassword.get();
        
        if(showingPassword === true) {
            var userHash = Router.current().data().userMeta.hash;
            var passSalt = this.salt;
            var passHash = Security.makeHash(userHash, passSalt);
            return passHash.substr(0, password.length);
        } else {
            return obscuredPassword(password.length);
        }

    }
    
});

Template.passwordsListItem.events({
    'click .viewPassword' : function(e, template) {
        e.preventDefault();

        var realTarget = e.target;
        
        //check if browser is sending event from child of .viewPassword
        if(!$(e.target).hasClass('viewPassword')) {
            realTarget = e.target.parentNode;
        }

        var password = this;
        template.showingPassword.set(true);

        var showPassDuration = Router.current().data().userMeta.showPassTimeout;

        var hertz = 10;

        var increaseRate = parseFloat(100 / (showPassDuration*hertz));
        var intervalLength = 1000 / hertz;

        var increaseRateRemainder = increaseRate - Math.floor(increaseRate);
        var multiplier = 1;

        if(increaseRateRemainder !== 0) {
            multiplier = 1 / increaseRateRemainder;
            increaseRate = increaseRate * multiplier;
            intervalLength = intervalLength * multiplier;
        }

        var progressObject = progressJs(realTarget).start().autoIncrease(increaseRate, intervalLength);

        template.progressBar.set(progressObject);

        var timeout = Meteor.setTimeout(function() {
            template.showingPassword.set(false);
            template.timer.set(false);
            progressObject.end();
            template.progressBar.set(false);
        }, showPassDuration * 1000);

        template.timer.set(timeout);
    }
});

