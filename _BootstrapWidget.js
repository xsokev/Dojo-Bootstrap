/* ==========================================================
 * BootstrapWidget.js v2.0.0
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
    "./Support",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/Evented",
    "dijit/_WidgetBase"
], function (support, declare, lang, Evented, _WidgetBase) {
    "use strict";

    // module:
    //      BootstrapWidget

    // summary:
    //      Bootstrap template for creating a widget that uses a template
    return declare("_BootstrapWidget", [_WidgetBase, Evented], {
        postMixInProperties: function () {
            var props = support.getData(this.srcNodeRef);
            for(var prop in props){
                if(prop.indexOf("dojo-") >= 0){
                    delete props[prop];
                }
            }
            lang.mixin(this, props);
        }
    });
});