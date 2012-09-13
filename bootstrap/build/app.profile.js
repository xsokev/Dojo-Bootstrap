var profile = (function () {
    "use strict";
    var testResourceRe = /^bootstrap\/tests\//;
    function copyOnly(filename, mid) {
        var list = {
            "bootstrap/app.profile":1,
            "bootstrap/package.json":1
            //"bootstrap/run":1, "bootstrap/main":1
        };
        return (mid in list) ||
            (/^bootstrap\/assets\//.test(mid) && !/\.css$/.test(filename)) ||
            /(png|jpg|jpeg|gif|tiff|ico)$/.test(filename) ||
            /built\-i18n\-test\/152\-build/.test(mid);
    }
    return {
        copyright: '/* Copyright xsokev. 2012 */',
        // basePath is relative to the directory containing this profile file; in this case, it is being set to the
        // src/ directory, which is the same place as the baseUrl directory in the loader configuration. (If you change
        // this, you will also need to update app.js).
        basePath:'../',

        // Builds a new release.
        action:'release',

        // Strips all comments from CSS files.
        cssOptimize:'comments',

        // Excludes tests, demos, and original template files from being included in the built version.
        mini:true,

        // Uses Closure Compiler (closure) as the JavaScript minifier. This can also be set to "shrinksafe" to use ShrinkSafe.
        // Note that you will probably get some “errors” with CC; these are generally safe to ignore, and will be
        // fixed in a later version of Dojo. This defaults to "" (no compression) if not provided.
        optimize:'closure',

        // We’re building layers, so we need to set the minifier to use for those, too. This defaults to "shrinksafe" if
        // it is not provided.
        layerOptimize:'closure',

        // Strips all calls to console functions within the code. You can also set this to "warn" to strip everything
        // but console.error, and any other truthy value to strip everything but console.warn and console.error.
        stripConsole:'all',

        // The default selector engine is not included by default in a dojo.js build in order to make mobile builds
        // smaller. We add it back here to avoid that extra HTTP request. There is also a "lite" selector available; if
        // you use that, you’ll need to set selectorEngine in app/app.js too. (The "lite" engine is only suitable if you
        // are not supporting IE7 and earlier.)
        selectorEngine:'acme',

        insertAbsMids:0,
        // Builds can be split into multiple different JavaScript files called “layers”. This allows applications to
        // defer loading large sections of code until they are actually required while still allowing multiple modules to
        // be compiled into a single file.
        layers:{
            // This is the main loader module. It is a little special because it is treated like an AMD module even though
            // it is actually just plain JavaScript. There is some extra magic in the build system specifically for this
            // module ID.
            'dojo/dojo':{
                // Including the loader (dojo/dojo) and dojo/domReady modules because we don’t want to have to make
                // extra HTTP requests for such tiny files.
                include:[
                    "dojo/_base/declare",
                    "dojo/_base/lang",
                    'dojo/_base/window',
                    "dojo/_base/sniff",
                    "dojo/_base/array",
                    "dojo/_base/json",
                    "dojo/query",
                    'dojo/on',
                    'dojo/mouse',
                    'dojo/html',
                    'dojo/dom-class',
                    'dojo/dom-construct',
                    "dojo/dom-attr",
                    "dojo/dom-geometry",
                    "dojo/dom-style",
                    "dojo/NodeList-dom",
                    'dojo/NodeList-traverse',
                    "dojo/NodeList-data"
                ],
                // By default, the build system will try to include dojo/main in the built dojo/dojo layer, which adds a
                // bunch of stuff we don’t want or need. We want the initial script load to be as small and quick as
                // possible, so we configure it as a custom, bootable base.
                boot:true,
                customBase:true
            },
            'bootstrap/bootstrap':{
                include:[
                    'bootstrap/Alert',
                    'bootstrap/Button',
                    'bootstrap/Collapse',
                    'bootstrap/Dropdown',
                    'bootstrap/Modal',
                    'bootstrap/Popover',
                    'bootstrap/Scrollspy',
                    'bootstrap/Tab',
                    'bootstrap/Tooltip',
                    'bootstrap/Typeahead'
                ]
            }
        },

        // Providing hints to the build system allows code to be conditionally removed on a more granular level than
        // simple module dependencies can allow. This is especially useful for creating tiny mobile builds.
        // Keep in mind that dead code removal only happens in minifiers that support it! Currently, ShrinkSafe does not
        // support dead code removal; Closure Compiler and UglifyJS do.
        staticHasFeatures:{
            'config-dojo-loader-catches': 0,
            'config-tlmSiblingOfDojo': 0,
            'dojo-amd-factory-scan':0,
            'dojo-trace-api':0,
            'dojo-log-api':0,
            'dojo-firebug':0,
            'dojo-publish-privates':0,
            'dojo-sync-loader':0,
            'dojo-xhr-factory':0,
            'dojo-test-sniff':0
        },

        // Resource tags are functions that provide hints to the compiler about a given file. The first argument is the
        // filename of the file, and the second argument is the module ID for the file.
        resourceTags:{
            // Files that contain test code.
            test:function (filename, mid) {
                return testResourceRe.test(mid);
            },

            // Files that should be copied as-is without being modified by the build system.
            copyOnly:function (filename, mid) {
                return copyOnly(filename, mid);
            },

            // Files that are AMD modules.
            amd:function (filename, mid) {
                return (/\.js$/).test(filename);
            }
        }
    };
})();