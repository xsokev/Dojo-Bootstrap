/* ==========================================================
 * List.js v2.0.0
 * ==========================================================
 * Copyright 2012 xsokev
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

define([
    "./_ListBase",
    "./_BootstrapWidget",
    "dojo/_base/declare"
], function (_ListBase, _BootstrapWidget, declare) {
    "use strict";

    // module:
    //      List

    return declare("List", [_BootstrapWidget, _ListBase], {
        // summary:
        //      Bootstrap widget for handling lists.
        // description:
        //      Provides basic functionality for vertical lists. This List widget is
        //      used in the Dropdown and Typeahead widgets.
        // example:
        // |	<ul class="nav nav-list" role="menu"
        // |            data-dojo-type="List" data-dojo-props="preventDefault: true">
        // |        <li role="presentation"><a href="#">Action</a></li>
        // |        <li role="presentation"><a href="#">Another action</a></li>
        // |        <li role="presentation" class="divider"></li>
        // |        <li role="presentation"><a href="#">Separated link</a></li>
        // |	</ul>


    postCreate: function(){
            // summary:
            //      calls this._initListEvents to initialize list events.
            // tags:
            //		private extension
            this._initListEvents();
        },

        select: function (/*HTMLElement*/ li) {
            // summary:
            //      Selects the list item passed in. Provides public access to the protected this._select method.
            this._select(li);
        }
    });
});