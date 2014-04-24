require(
    [ "dojo/query", "dojo/_base/array", "dojo/NodeList-html", "bootstrap/Affix", "dojo/domReady!" ],
    function (query, array) {
        "use strict";

        var main = query("#main"),
            sidebar = query(".sidebar"),
            menuHtml = "",
            unit_tests = {
                header: "Unit Tests",
                icon: "tasks",
                links: [
                    { url: "runTests.html", label: "Complete" }
                ]
            },
            other_tests = {
                header: "Visual Tests",
                icon: "eye-open",
                modules: [ "Affix", "Alert", "Button", "Carousel", "Collapse", "Datepicker", "Dropdown", "Marquee", "Modal", "Popover", "Scrollspy", "Tab", "Tooltip", "Typeahead" ]
            },
            module_name = (function(){
                var loc = String(window.location),
                    file_parts = loc.split("/"),
                    file = file_parts[file_parts.length - 1],
                    period_pos = file.indexOf(".");
                return file.substring(5, period_pos);
            })();

        sidebar.html('<ul class="nav nav-list affix"/>');
        menuHtml += '<li class="nav-header"><i class="glyphicon glyphicon-'+unit_tests.icon+' glyphicon-white"></i>'+unit_tests.header+'</li>';
        array.forEach(unit_tests.links, function(link){
            menuHtml += '<li><a href="'+link.url+'">'+link.label+'</a></li>';
        });

        menuHtml += '<li class="nav-header"><i class="glyphicon glyphicon-'+other_tests.icon+' glyphicon-white"></i>'+other_tests.header+'</li>';
        array.forEach(other_tests.modules, function(module){
            menuHtml += '<li '+(module === module_name ? 'class="active"' : '')+'><a href="test_'+module+'.html">'+module+'</a></li>';
        });
        sidebar.query("ul").html(menuHtml);
    }
);
