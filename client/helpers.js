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
 * helpers for makeHash
 *
 */

var hexSymbols = {
    '21' : '!',
    '22' : '"',
    '23' : '#',
    '24' : '$',
    '25' : '%',
    '26' : '&',
    '27' : '\'',
    '28' : '(',
    '29' : ')',
    '2a' : '*',
    '2b' : '+',
    '2c' : ',',
    '2d' : '-',
    '2e' : '.',
    '2f' : '/',
    '3a' : ':',
    '3b' : ';',
    '3c' : '<',
    '3d' : '=',
    '3e' : '>',
    '3f' : '?',
    '40' : '@',
    '5b' : '[',
    '5c' : '\\',
    '5d' : ']',
    '5e' : '^',
    '5f' : '_',
    '60' : '`',
    '7b' : '{',
    '7c' : '|',
    '7d' : '}',
    '7e' : '~'    
};

var replaceHexWithSymbols = function(str) {
    
    for(var prop in hexSymbols) {
        str = str.replace(prop, hexSymbols[prop], 'i');
    }
    
    return str;
    
};

var uIntArrayToString = function(uIntArray) {
    
    var str = '';
    for(var i = 0; i < uIntArray.length; i++) {
        str += uIntArray[i];
    }
    return str;
};

/*
 *
 * Hashing Algorithm Abstraction
 *  SHA 512/256 chosen for now
 *  
 *  outputType one of : ['hex', 'base64', 'utf8', 'utf16']
 */


makeHash = function(input, salt, outputType) {
    var md = forge.md.sha512.sha256.create();
    md.update(input+salt);
    if(!outputType) outputType = 'hex';
    switch(outputType) {

        case 'hex':
            return md.digest().toHex();
            
        case 'binary':
            return uIntArrayToString(forge.util.binary.hex.decode(md.digest().toHex()));
            
        case 'base64': 
            return forge.util.encode64(md.digest().data);

        case 'utf8':
            return forge.util.encodeUtf8(md.digest().data);
            
        case 'custom':
            return replaceHexWithSymbols(ms.digest().toHex());

        default:
            throw new Error('Invalid outputType');
            
    }
};
