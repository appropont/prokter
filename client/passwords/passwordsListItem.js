Template.passwordsListItem.rendered = function() {
    wrapInputWithMaterial('.password-display');
    this.autorun(clearProgressBars);
};

var obscuredPassword = function(length){
    var obscuredPass = '';
    for(var i = 0; i < length; i++) {
        obscuredPass += '*';
    }
    return obscuredPass;
};

var progressBars = [];
var progressBarTimeouts = [];
var showPasswordFlags = [];

var clearProgressBars = function() {
    if(Session.get('clearAllProgressBars') === true) {
        _.each(showPasswordFlags, function(element, index, list) {
            Session.set(element, false);
        });
        _.each(progressBarTimeouts, function(element, index, list) {
            clearTimeout(element);
        });
        _.each(progressBars, function(element, index, list) {
            console.log('element', element);
            element.kill();
        });
    }
};

Template.passwordsListItem.helpers({

    passwordDisplay : function(password) {
        if(!password){
            return '';
        }

        if(Session.get('show' + password._id) === true) {
            var userHash = Router.current().data().userMeta.hash;
            var passSalt = this.salt;
            var passHash = makeHash(userHash, passSalt);
            return passHash.substr(0, password.length);
        } else {
            return obscuredPassword(password.length);
        }

    }
    
});

Template.passwordsListItem.events({
    'click .viewPassword' : function(e) {
        e.preventDefault();
        console.log(e.target);

        var realTarget = e.target;
        if(!$(e.target).hasClass('viewPassword')) {
            realTarget = e.target.parentNode;
        }

        //console.log(this);
        var password = this;
        Session.set('show' + password._id, true);
        showPasswordFlags.push('show' + password._id);

        var showPassDuration = Router.current().data().userMeta.showPassTimeout;

        var hertz = 10;

        var increaseRate = parseFloat(100 / (showPassDuration*hertz));
        var intervalLength = 1000 / hertz;

        console.log(increaseRate);

        var increaseRateRemainder = increaseRate - Math.floor(increaseRate);
        var multiplier = 1;

        if(increaseRateRemainder != 0) {
            multiplier = 1 / increaseRateRemainder;
            increaseRate = increaseRate * multiplier;
            intervalLength = intervalLength * multiplier;
        }

        console.log(
            'multipler: ', multiplier,
            ' increaseRate: ', increaseRate,
            ' intervalLength: ', intervalLength
        );

        var progressObject = progressJs(realTarget).start().autoIncrease(increaseRate, intervalLength);

        progressBars.push(progressObject);

        var timeout = Meteor.setTimeout(function() {
            Session.set('show' + password._id, false);
            progressObject.end();
        }, showPassDuration * 1000);

        progressBarTimeouts.push(timeout);
    }
});

