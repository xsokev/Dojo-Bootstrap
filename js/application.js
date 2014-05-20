/**
 * Created with JetBrains IntelliJ.
 * User: kev
 * Date: 8/13/12
 * Time: 12:24 PM
 * To change this template use File | Settings | File Templates.
 */

require([
    'dojo/query',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/dom-style',
    'bootstrap/Scrollspy',
    'bootstrap/Affix',
    'dojo/NodeList-html',
    'dojo/NodeList-manipulate',
    'dojo/domReady!'
], function(q, attr, constr, domStyle){
    "use strict";

    window.prettyPrint && window.prettyPrint();
    q(".container-body [href=#], .navbar [href=#]").on("click", function(e){ e.preventDefault(); return false; });

    q('[data-spy="scroll"]').forEach(function(elm){
        q(elm).scrollspy('refresh');
    });
});
