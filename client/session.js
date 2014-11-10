// requires jQuery to attach event to body (there might be a better way)

var sessionTimeout;

var detectingActivity = false;

var sessionDuration = 60;//seconds

sessionAlive = function() {

    if(sessionTimeout) {
        Meteor.clearTimeout(sessionTimeout);
    }

    sessionTimeout = Meteor.setTimeout(function() {
        if (Meteor.userId()) {
            removeActivityListener();
            Router.go('sessionLoggedOut');
        }
    }, sessionDuration * 1000);


};

attachActivityListener = function(seconds) {
    sessionDuration = seconds;
    if(!detectingActivity) {
        if($ && $('body')) {
            detectingActivity = true;
            $('body').on('mousemove click keydown', sessionAlive);
        } else {
            console.log('jquery or body not accessible');
        }
    } else {
        console.log('activity listener already attached');
    }
};

removeActivityListener = function() {
    if(detectingActivity) {
        if($ && $('body')) {
            detectingActivity = false;
            $('body').off('mousemove click keydown', sessionAlive);
        } else {
            console.log('jquery or body not accessible');
        }
    } else {
        console.log('activity listener not attached');
    }
};
