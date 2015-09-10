// TODO:
// - Initialize saved data and populate fields
// - Allow for multiple values for appropriate fields (external assets, tags)
// - Trim values if/when necessary
// - Add friendly display names for <select> options
// - Figure out what to do with the "private" option

function options() {
    var title = ko.observable('');
    var description = ko.observable('');
    var tags = ko.observableArray([]);
    //var private = ko.observable(false);

    var editorsHTML = ko.observable(true);
    var editorsCSS = ko.observable(true);
    var editorsJS = ko.observable(true);

    var html = ko.observable('');

    var HTMLPreprocessors = ko.observableArray(['slim', 'haml', 'markdown']);
    var selectedHTMLPreprocessor = ko.observable();

    var css = ko.observable(''); // "html { color: red; }",

    var CSSPreprocessors = ko.observableArray(['less', 'scss', 'sass', 'stylus']);
    var selectedCSSPreprocessor = ko.observable();

    var CSSBases = ko.observableArray(['normalize', 'reset']);
    var selectedCSSBase = ko.observable();

    var vendorPrefixes = ko.observableArray(['autoprefixer', 'prefixfree']);
    var selectedVendorPrefix = ko.observable();

    var js = ko.observable('');

    var JSPreprocessors = ko.observableArray(['coffeescript', 'babel', 'livescript', 'typescript']);
    var selectedJSPreprocessor = ko.observable();

    var HTMLClasses = ko.observable('');
    var head = ko.observable('<meta name="viewport" content="width=device-width, initial-scale=1">');
    var externalCSS = ko.observable('');
    var externalJS = ko.observable('')



    var selectedEditors = ko.computed(function() {
        var array = [];
        var string;

        array.push(editorsHTML() | 0);
        array.push(editorsCSS() | 0);
        array.push(editorsJS() | 0);

        string = array.join('');

        return string;
    });



    // Chrome extension helpers

    function saveData(data, callback) {
        chrome.storage.sync.set(data, callback);
    };

    function getData(callback) {
        chrome.storage.sync.get(null, callback);
    };

    function clearData(callback) {
        chrome.storage.sync.clear(callback);
    };



    var logSavedData = function() {
        getData(function(data) {
            console.log(data);
        });
    };

    var clearSavedData = function() {
        clearData();

        // Log the data to make sure it's gone
        getData(function(data) {
            console.log(data);
        });
    };



    var saveForm = function() {
        // Data gets formatted according to CodePen's JSON data format
        var data = {
            title : title(),
            description : description(),
            //private : private(),
            tags : tags(),
            editors : selectedEditors(),
            html : html(),
            html_pre_processor : selectedHTMLPreprocessor(),
            css : css(),
            css_pre_processor : selectedCSSPreprocessor(),
            css_starter : selectedCSSBase(),
            css_prefix : selectedVendorPrefix(),
            js : js(),
            js_pre_processor : selectedJSPreprocessor(),
            html_classes : HTMLClasses(),
            head : head(),
            css_external : externalCSS(),
            js_external : externalJS()
        };

        saveData(data, logSavedData);
    };



    var vm = {
        title : title,
        description : description,
        tags : tags,
        //private : private,

        editorsHTML : editorsHTML,
        editorsCSS : editorsCSS,
        editorsJS : editorsJS,

        html : html,

        HTMLPreprocessors : HTMLPreprocessors,
        selectedHTMLPreprocessor : selectedHTMLPreprocessor,

        css : css,

        CSSPreprocessors : CSSPreprocessors,
        selectedCSSPreprocessor : selectedCSSPreprocessor,

        CSSBases : CSSBases,
        selectedCSSBase : selectedCSSBase,

        vendorPrefixes : vendorPrefixes,
        selectedVendorPrefix : selectedVendorPrefix,

        js : js,

        JSPreprocessors : JSPreprocessors,
        selectedJSPreprocessor : selectedJSPreprocessor,

        HTMLClasses : HTMLClasses,
        head : head,
        externalCSS : externalCSS,
        externalJS : externalJS,

        selectedEditors : selectedEditors,

        logSavedData : logSavedData,
        clearSavedData : clearSavedData,
        saveForm : saveForm
    };

    return vm;
};

ko.applyBindings(options);
