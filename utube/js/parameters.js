function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

var id = getParameterByName('id') || 'HJ5MpzrFEdA'; //'KUOhpQDDME4';//'HeaugHGd1Kw';// 'KUOhpQDDME4';
