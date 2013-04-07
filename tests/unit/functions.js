require({},[
    "doh",
    "dojo/lang"
], function (lang) {
    "use strict";

    var functions = {};
    functions.alwaysTrue = function () {
        return true;
    };
    functions.alwaysFalse = function () {
        return false;
    };
    functions.isTrue = function (thing) {
        var type = typeof thing;
        if (type === "undefined" || thing === null || thing === 0 || thing === false) {
            return false;
        }
        return true;
    };
    functions.asyncEcho = function (callback, message) {
        if (lang.isFunction(callback)) {
            var handle;
            var caller = function () {
                callback(message);
                clearTimeout(handle);
                handle = null;
            };
            handle = setTimeout(caller, 2000);
        }
    };
    functions.contains = function (container, item) {
        return lang.exists(container[item]);
    }

    return functions;
});