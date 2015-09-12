////////////////////////////////////////////////////////////////////////////////
// TODO:
// - Allow for multiple values for appropriate fields (external assets, tags)
// - Tags doesn't work
// - Trim values if/when necessary
// - Add friendly display names for <select> options
// - Add ability to have multiple presets
////////////////////////////////////////////////////////////////////////////////

// Helper functions
// -----------------------------------------------------------------------------

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

function options() {
    //var presets = ko.observableArray();
    //var preset = ko.observable();
    var title = ko.observable();
    var description = ko.observable();
    var tags = ko.observableArray();
    var editors_html = ko.observable();
    var editors_css = ko.observable();
    var editors_js = ko.observable();
    var editors = ko.observable(); // Computed
    var html = ko.observable();
    var html_pre_processors = ko.observableArray();
    var html_pre_processor = ko.observable();
    var css = ko.observable();
    var css_pre_processors = ko.observableArray();
    var css_pre_processor = ko.observable();
    var css_starters = ko.observableArray();
    var css_starter = ko.observable();
    var css_prefixes = ko.observableArray();
    var css_prefix = ko.observable();
    var js = ko.observable();
    var js_pre_processors = ko.observableArray();
    var js_pre_processor = ko.observable();
    var html_classes = ko.observable();
    var head = ko.observable();
    var css_external = ko.observable(); // Will be an array
    var js_external = ko.observable(); // Will be an array



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



    // If you change the preset dropdown, load a new preset
    //preset.subscribe(loadPreset, this);

    function loadPreset() {
        chrome.storage.sync.get(null, function(data) {
            //data.presets.forEach(function(obj) {
                //if (obj.id === preset) {
                    title(data.presets[0].title);
                    description(data.presets[0].description);
                    tags(data.presets[0].tags);
                    editors_html(data.presets[0].editors_html);
                    editors_css(data.presets[0].editors_css);
                    editors_js(data.presets[0].editors_js);
                    html(data.presets[0].html);
                    html_pre_processor(data.presets[0].html_pre_processor);
                    css(data.presets[0].css);
                    css_pre_processor(data.presets[0].css_pre_processor);
                    css_starter(data.presets[0].css_starter);
                    css_prefix(data.presets[0].css_prefix);
                    js(data.presets[0].js);
                    js_pre_processor(data.presets[0].js_pre_processor);
                    html_classes(data.presets[0].html_classes);
                    head(data.presets[0].head);
                    css_external(data.presets[0].css_external);
                    js_external(data.presets[0].js_external);
                //}
            //});
        });
    };

    var savePreset = function() {
        var preset = {
            presets: [{
                title: title(),
                description: description(),
                tags: tags(),
                editors_html: editors_html(),
                editors_css: editors_css(),
                editors_js: editors_js(),
                html: html(),
                html_pre_processor: html_pre_processor(),
                css: css(),
                css_pre_processor: css_pre_processor(),
                css_starter: css_starter(),
                css_prefix: css_prefix(),
                js: js(),
                js_pre_processor: js_pre_processor(),
                html_classes: html_classes(),
                head: head(),
                css_external: css_external(),
                js_external: js_external()
            }]
        };

        chrome.storage.sync.set(preset, logSavedData);
    };



    function initializeFormOptions() {
        chrome.storage.sync.get(null, function(data) {
            // Basic options
            html_pre_processors(data.config.html_pre_processors);
            css_pre_processors(data.config.css_pre_processors);
            js_pre_processors(data.config.js_pre_processors);
            css_starters(data.config.css_starters);
            css_prefixes(data.config.css_prefixes);

            // Load presets
            //data.presets.forEach(function(preset) {
            //    presets.push(preset.id);
            //});

            // Load selected preset form data
            loadPreset();
        });
    };

    initializeFormOptions();



    var vm = {
        //presets: presets,
        //preset: preset,
        title: title,
        description: description,
        tags: tags,
        editors_html: editors_html,
        editors_css: editors_css,
        editors_js: editors_js,
        editors: editors,
        html: html,
        html_pre_processors: html_pre_processors,
        html_pre_processor: html_pre_processor,
        css: css,
        css_pre_processors: css_pre_processors,
        css_pre_processor: css_pre_processor,
        css_starters: css_starters,
        css_starter: css_starter,
        css_prefixes: css_prefixes,
        css_prefix: css_prefix,
        js: js,
        js_pre_processors: js_pre_processors,
        js_pre_processor: js_pre_processor,
        html_classes: html_classes,
        head: head,
        css_external: css_external,
        js_external: js_external,

        logSavedData: logSavedData,
        clearSavedData: clearSavedData,
        savePreset: savePreset
    };

    return vm;
};

ko.applyBindings(options);
