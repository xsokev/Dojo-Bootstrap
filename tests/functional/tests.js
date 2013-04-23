require(
    [
        "dojo/query",
        "dojo/_base/array",
        "dojo/NodeList-manipulate",
        "bootstrap/Affix",
        "dojo/domReady!"
    ], function (query, array) {
        "use strict";

        var main = query("#main"),
            sidebar = query(".sidebar"),
            menuHtml = "",
            tests = {
                header: "Visual Tests",
                icon: "eye-open",
                modules: [ "Affix", "Alert", "Button", "Calendar", "Carousel", "Collapse", "Datepicker", "Dropdown", "List", "Modal", "Popover", "PopupBase", "Scrollspy", "Tab", "Tooltip", "Typeahead" ]
            },
            module_name = (function(){
                var loc = String(window.location),
                    file_parts = loc.split("/"),
                    file = file_parts[file_parts.length - 1],
                    period_pos = file.indexOf(".");
                return file.substring(5, period_pos);
            })();
        sidebar.html('<ul class="nav nav-list affix"/>');
        menuHtml += '<li class="nav-header"><i class="icon-'+tests.icon+' icon-white"></i>'+tests.header+'</li>';
        array.forEach(tests.modules, function(module){
            menuHtml += '<li '+(module === module_name ? 'class="active"' : '')+'><a href="test_'+module+'.html">'+module+'</a></li>';
        });
        query("ul", sidebar[0]).html(menuHtml);

    }
);
