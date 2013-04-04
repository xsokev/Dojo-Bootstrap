/* ==========================================================
 * Datepicker.js v1.1.0
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
    "./Calendar",
    "./_BootstrapWidget",
    "dojo/_base/declare",
    "dijit/place",
    "dojo/query",
    "dojo/_base/lang",
    "dojo/_base/window",
    "dojo/on",
    "dojo/dom-class",
    "dojo/dom-construct"
], function (support, CalendarWidget, _BootstrapWidget, declare, place, query, lang, win, on, domClass, domConstruct) {
    "use strict";

    var _updateDom = function (e) {
        if (this.isInput) {
            this.domNode.value = e.formattedDate;
        } else {
            if (this.component) {
                this.componentInput.value = e.formattedDate;
            }
        }
        this.emit('changeDate', e);
        this.hide();
    };

    var _keydown = function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 9) { this.hide(); } // when hitting TAB, for accessibility
    };

    var _blur = function () {
        this.hide();
    };




    // summary:
    //      Dropdown widget for displaying the calendar widget
    return declare("DatePicker", [_BootstrapWidget], {
        baseClass: "datepicker",

        // showOnFocus: Boolean
        //          the start view mode for the calendar
        showOnFocus: true,

        // viewMode: Number|String
        //          the start view mode for the calendar
        viewMode: 0,
        _setViewModeAttr: function(val){
            this._set("viewMode", val);
            if(this.calendar){ this.calendar.set("viewMode", val); }
        },

        // minViewMode: Number|String
        //          the start view mode for the calendar
        minViewMode: 0,
        _setMinViewModeAttr: function(val){
            this._set("minViewMode", val);
            if(this.calendar){ this.calendar.set("minViewMode", val); }
        },

        // value: String|Date
        //          the start date for the calendar
        value: (new Date()),
        _setValueAttr: function(val){
            this._set("value", val);
            if(this.calendar){ this.calendar.set("date", val); }
        },

        // weekStart: Number
        //          the numeric day that the week starts on. Usually 0-Sunday or 1-Monday
        weekStart: 0,
        _setWeekStartAttr: function(val){
            this._set("weekStart", val);
            if(this.calendar){ this.calendar.set("weekStart", val); }
        },

        // format: String
        //          format the date should use to parse on input and format on output
        format: "M/d/yyyy",
        _setFormatAttr: function(val){
            this._set("format", val);
            if(this.calendar){ this.calendar.set("format", val); }
        },

        postCreate:function () {
            this.calendar = new CalendarWidget({
                viewMode: this.viewMode,
                minViewMode: this.minViewMode,
                weekStart: this.weekStart,
                format: this.format,
                date: this.value
            }, domConstruct.create("div", null, this.domNode));
            this.picker = this.calendar.domNode;
            domClass.add(this.picker, this.baseClass+" dropdown-menu");
            if(this.calendar.startup && !this.calendar.started){
                query(this.picker).hide();
                this.calendar.startup();
            }
            this.isInput = this.domNode.tagName === 'INPUT' || this.domNode.tagName === 'TEXTAREA';
            this.component = query('.add-on', this.domNode)[0] || false;
            this.componentInput = query('input', this.domNode)[0] || false;
            if (this.isInput) {
                if(this.showOnFocus){
                    this.own(on(this.domNode, 'focus', lang.hitch(this, 'show')));
                }
                this.own(on(this.domNode, "click", lang.hitch(this, "show")));
                this.own(on(this.domNode, 'blur', lang.hitch(this, _blur)));
                this.own(on(this.domNode, 'keyup', lang.hitch(this, 'updateCalendar')));
                this.own(on(this.domNode, 'keydown', lang.hitch(this, _keydown)));
            } else {
                this._docMouseDownEvent = on(document, 'mousedown', lang.hitch(this, 'hide'));
                if (this.component){
                    this.own(on(this.component, "click", lang.hitch(this, "show")));
                } else {
                    this.own(on(this.domNode, "click", lang.hitch(this, "show")));
                }
            }
            this._resizeEvent = on(win.global, 'resize', lang.hitch(this, function(){
                place.around(this.picker, this.domNode, ["below", "above"], true);
            }));
            this._bodyClickEvent = on(win.body(), 'click', lang.hitch(this, 'hide'));

            this.own(on(this.calendar, 'changeDate', lang.hitch(this, _updateDom)));
            this.startupViewMode = this.viewMode;
            this.updateCalendar();
            this._shown = false;
        },

        show: function (e) {
            if(e){
                e.stopPropagation();
                e.preventDefault();
            }
            query('div.'+this.baseClass+'.dropdown-menu').hide(); //make sure to hide all other calendars
            this.updateCalendar();
            query(this.picker).show();

            place.around(this.picker, this.domNode, ["below", "above"], true);
            if(!this._shown){
                this.emit('show', {});
                this._shown = true;
            }
        },

        hide: function () {
            query(this.picker).hide();
            this.calendar.set("viewMode", this.startupViewMode);
            if(this._shown){
                this.emit('hide', {});
                this._shown = false;
            }
        },

        updateCalendar: function () {
            var date = "";
            if (this.isInput) {
                date = this.domNode.value;
            } else {
                if (this.component) {
                    date = this.componentInput.value;
                }
            }
            this.set("value", date);
        },

        destroy: function(){
            if(!this.isInput && this._docMouseDownEvent){
                this._docMouseDownEvent.remove();
                this._docMouseDownEvent = null;
            }
            if(this._bodyClickEvent){
                this._bodyClickEvent.remove();
                this._bodyClickEvent = null;
            }
            if(this._resizeEvent){
                this._resizeEvent.remove();
                this._resizeEvent = null;
            }
        }
    });
});