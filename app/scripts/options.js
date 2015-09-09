// TODO:
// - Initialize saved data and populate fields
// - Add full list of presets
// - Allow for multiple values for appropriate fields (external assets)
// - Trim values


'use strict';

var dataObj = {};

var saveDataButton = document.querySelector('.js-save-data');
var showStoredDataButton = document.querySelector('.js-show-stored-data');
var clearStoredDataButton = document.querySelector('.js-clear-stored-data');

saveDataButton.addEventListener('click', function() {
    getFormData();
    saveData(dataObj);
});
showStoredDataButton.addEventListener('click', showStoredData);
clearStoredDataButton.addEventListener('click', clearData);



function saveData(data) {
    chrome.storage.sync.set(data, function() {
        console.log('Data saved.');
        getData(function(data){
            console.log(data);
        });
    });
};

// Could add an optional "key" parameter that allows you to specify an array of keys to grab
function getData(callback) {
    chrome.storage.sync.get(null, callback);
};

function showStoredData() {
    getData(function(data) {
        console.log(data);
    });
};

function clearData() {
    chrome.storage.sync.clear(function() {
        console.log('Data cleared.');
        getData(function(data){
            console.log(data);
        });
    });
};



function loopInputsCreateProperty(elements) {
    for (var i = 0; i < elements.length; i++) {
        var property_name = elements[i].getAttribute('data-type');
        var property_value = elements[i].value;

        dataObj[property_name] = property_value;
    }
};

function loopSelectsCreateProperty(selects) {
    for (var i = 0; i < selects.length; i++) {
        var property_name = selects[i].getAttribute('data-type');

        // Returns null if an option is not selected
        var property_value = selects[i].options[selects[i].selectedIndex].getAttribute("data-value");

        dataObj[property_name] = property_value;
    }
};

function getEditorValues(fieldset) {
    var property_name = fieldset.getAttribute('data-type');
    var property_value;
    var property_value_array = [];

    for (var i = 0; i < fieldset.getElementsByTagName('input').length; i++) {
        // bitwise OR ZERO (| 0) will convert true/false to 1/0
        var checkedValue = fieldset.getElementsByTagName('input')[i].checked | 0;

        property_value_array.push(checkedValue);
    }

    property_value = property_value_array.join('');

    dataObj[property_name] = property_value;
};

function getFormData() {
    var form = document.querySelector('.js-pen-presets-form');
    var inputs = form.getElementsByTagName('input');
    var textareas = form.getElementsByTagName('textarea');
    var selects = form.getElementsByTagName('select');
    var fieldset = document.querySelector('#editors');

    loopInputsCreateProperty(inputs);
    loopInputsCreateProperty(textareas);

    loopSelectsCreateProperty(selects);

    getEditorValues(fieldset);
};