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

    var pagelist = q("ul.nav.nav-pills.nav-stacked.bs-page-sidenav");
    var menuLinkTop = q('.menu-link-top');
    q(".container-body .marker").forEach(function(div, i){
        var id = attr.get(div, "id"),
            title = q(div).query('> h3').text();
        if(title && id){
            if(i === 0){
                constr.place('<li class="active"><a href="#'+id+'">'+title+'</a></li>', menuLinkTop[0], "before");
            } else {
                constr.place('<li><a href="#'+id+'">'+title+'</a></li>', menuLinkTop[0], "before");
            }
        }
    });
    q('[data-spy="scroll"]').forEach(function(elm){
        q(elm).scrollspy('refresh');
    });
    q(window).on('scroll', function(e){
        if(e.target.body.scrollTop >= 540){
            //menuLinkTop.addClass('affix').addClass('affix-bottom');
            //menuLinkTop.affix();
            domStyle.set(menuLinkTop[0], "display", "block");
        } else {
            //menuLinkTop.removeClass('affix').removeClass('affix-bottom');
            domStyle.set(menuLinkTop[0], "display", "none");
        }
    });

});
