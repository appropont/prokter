Security = {};

/*
 *
 * Salt generation.
 *
 */
Security.generateSalt = function(length) {
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


Security.makeHash = function(input, salt, outputType) {
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
            return replaceHexWithSymbols(md.digest().toHex());

        default:
            throw new Error('Invalid outputType');

    }
};

var keyFromHash = function(hash) {
    var key = forge.pkcs5.pbkdf2('password', '', 1000, 16);
    return key;
};

Security.encrypt = function(data, hash) {
    var key = keyFromHash(hash);
    var cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(someBytes));
    cipher.finish();
    var encrypted = cipher.output;
};