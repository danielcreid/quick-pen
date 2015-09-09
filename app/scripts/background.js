'use strict';

var codepenForm = document.querySelector('.js-codepen-form');
var codepenFormInput = codepenForm.firstElementChild;



function getData(callback) {
    chrome.storage.sync.get(null, callback);
};

function stringReplace(obj){
    var string = JSON.stringify(obj);
    string = string.replace(/"/g, "&quot;");
    string = string.replace(/'/g, "&apos;");
    return string;
};

function createNewPen() {
    getData(function(data){
        codepenFormInput.value = stringReplace(data);
        codepenForm.submit();
    });
};



chrome.browserAction.onClicked.addListener(createNewPen);