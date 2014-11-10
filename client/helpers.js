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


/*
 *
 * Salt generation.
 *
 */
generateSalt = function(length) {
    if(!length) length = 12;
    return forge.util.bytesToHex(forge.random.getBytesSync(length));
};

/*
 *
 * Hashing Algorithm Abstraction
 *  SHA 512/256 chosen for now
 *
 */

makeHash = function(input, salt) {
    var md = forge.md.sha512.sha256.create();
    md.update(input+salt);
    return md.digest().toHex();
};
