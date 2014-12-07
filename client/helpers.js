/*
 *
 * For wrapping inputs with Material effects.
 *  To be used in Template.[name].rendered()
 *
 */
var _wrapInput = function(element) {

    element = $(element);

    var parent = element.parent();

    if(!parent.hasClass('form-control-wrapper')) {
        element.wrap('<div class="form-control-wrapper"></div>');
    }
    if(!element.siblings('span').length) {
        //gets parent() again because it could have changed
        element.parent().append('<span class="material-input"></span>');
    }
};

wrapInputWithMaterial = function(selector) {

    var queryResult = $(selector);

    for(var i = 0; i < queryResult.length; i++) {
        _wrapInput(queryResult[i]);
    }


};

/*
 *
 * Echo "active" css class in templates for navbar elements.
 *
 */

var activeClass = function(path) {
    if(Router.current().route.name === path) {
        return 'active';
    } else {
        return '';
    }
};

Template.registerHelper('activeClass', activeClass);
