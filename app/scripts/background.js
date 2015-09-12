// Helper functions
// -----------------------------------------------------------------------------

function objectIsEmpty(object) {
    return Object.keys(object).length === 0;
};



// Prep data for CodePen form.submit

function stringReplace(obj) {
    var string = JSON.stringify(obj);
    string = string.replace(/"/g, "&quot;");
    string = string.replace(/'/g, "&apos;");
    return string;
};



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





// Data management
// -----------------------------------------------------------------------------

var defaultData = {
    config: {
        html_pre_processors: ['slim', 'haml', 'markdown'],
        css_pre_processors: ['less', 'scss', 'sass', 'stylus'],
        css_starters: ['normalize', 'reset'],
        css_prefixes: ['autoprefixer', 'prefixfree'],
        js_pre_processors: ['coffeescript', 'babel', 'livescript', 'typescript']
    },
    presets: [{
        id: 1,
        name: 'Default',
        title: '',
        description: '',
        tags: null,
        editors_html: true,
        editors_css: true,
        editors_js: true,
        html: '',
        html_pre_processor: '',
        css: '',
        css_pre_processor: '',
        css_starter: '',
        css_prefix: '',
        js: '',
        js_pre_processor: '',
        html_classes: '',
        head: '<meta name="viewport" content="width=device-width, initial-scale=1">',
        css_external: '',
        js_external: ''
    }]
};

// Runs on install and reload
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.get(null, function(data) {
        if (objectIsEmpty(data)) {
            saveData(defaultData);
        }
    });
});





// Browser action
// -----------------------------------------------------------------------------





// Background Page
// -----------------------------------------------------------------------------

function background() {
    var codepenForm = document.querySelector('.js-codepen-form');
    var codepenFormData = ko.observable('');


    function transformEditors(data) {
        var array = [];

        array.push(data.editors_html | 0);
        array.push(data.editors_css | 0);
        array.push(data.editors_js | 0);

        var string = array.join('');

        return string;
    };

    function createNewPen() {
        chrome.storage.sync.get(null, function(data) {
            var codepen_submit = {
                title: data.presets[0].title,
                description: data.presets[0].description,
                tags: data.presets[0].tags,
                editors: transformEditors(data.presets[0]),
                html: data.presets[0].html,
                html_pre_processor: data.presets[0].html_pre_processor,
                css: data.presets[0].css,
                css_pre_processor: data.presets[0].css_pre_processor,
                css_starter: data.presets[0].css_starter,
                css_prefix: data.presets[0].css_prefix,
                js: data.presets[0].js,
                js_pre_processor: data.presets[0].js_pre_processor,
                html_classes: data.presets[0].html_classes,
                head: data.presets[0].head,
                css_external: data.presets[0].css_external,
                js_external: data.presets[0].js_external
            };

            codepenFormData(stringReplace(codepen_submit));
            codepenForm.submit();
        });
    };



    chrome.browserAction.onClicked.addListener(createNewPen);

    var vm = {
        codepenForm: codepenForm,
        codepenFormData: codepenFormData
    };

    return vm;
};

ko.applyBindings(background);
