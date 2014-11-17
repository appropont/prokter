Template.header.events({

    //This hides the mobile menu on click
    'click #navbar-collapse li a' : function(e) {
        if($('#navbar-collapse').hasClass('in'))
            $('#navbar-toggle').click();
    }

})
