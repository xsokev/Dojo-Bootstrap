/* ==========================================================
 * PopOver.js v2.0.0
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

//TODO:  - When PopOver inside Modal and the Modal is open, closed then opened again, the PopOver no longer triggers
define([
    "./Popup",
    "./Calendar",
    "dojo/_base/declare",
    "dojo/query",
    "dojo/on",
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/NodeList-manipulate"
], function (PopupWidget, CalendarWidget, declare, query, on, lang, domClass) {

    // module:
    //      Datepicker

    var _updateDom = function (e) {
        if (this._inputNode) {
            this._inputNode.value = e.formattedDate;
        }
        if (this.trigger === "focus") {
            this.domNode.blur();
        } else {
            this.hide();
        }
        this.emit('changeDate', e); //[Deprecated soon]
        this.emit('change', e);
    };

    return declare("Datepicker", [PopupWidget], {
        // summary:
        //      Bootstrap widget for displaying a popup calendar

        // trigger: String
        //          what event causes the tooltip to be displayed
        trigger: "focus",

        // type: String
        //          what type of tooltip style widget to display
        type: "datepicker",

        // viewMode: Number|String
        //          the start view mode for the calendar
        viewMode: 0,
        _setViewModeAttr: function(val){
            this._set("viewMode", val);
            if(this._calendar){ this._calendar.set("viewMode", val); }
        },

        // minViewMode: Number|String
        //          the start view mode for the calendar
        minViewMode: 0,
        _setMinViewModeAttr: function(val){
            this._set("minViewMode", val);
            if(this._calendar){ this._calendar.set("minViewMode", val); }
        },

        // value: String|Date
        //          the start date for the calendar
        value: (new Date()),
        _setValueAttr: function(val){
            this._set("value", val);
            if(this._calendar){ this._calendar.set("date", val); }
        },

        // weekStart: Number
        //          the numeric day that the week starts on. Usually 0-Sunday or 1-Monday
        weekStart: 0,
        _setWeekStartAttr: function(val){
            this._set("weekStart", val);
            if(this._calendar){ this._calendar.set("weekStart", val); }
        },

        // format: String
        //          format the date should use to parse on input and format on output
        format: "M/d/yyyy",
        _setFormatAttr: function(val){
            this._set("format", val);
            if(this._calendar){ this._calendar.set("format", val); }
        },

        // placement: String|Function
        //          where the popup should be displayed. Values are top, bottom, left, right
        placement: ["below", "above"],

        updateCalendar: function (val) {
            if (this._inputNode) {
                val = val || this._inputNode.value;
            } else {
                val = val || new Date();
            }
            this.set("value", val);
        },

        _resetContent: function(){
            // summary:
            //
            // tags:
            //      protected extension

            var popup = this._popup.call(this);
            this._calendar = new CalendarWidget({
                viewMode: this.viewMode,
                minViewMode: this.minViewMode,
                weekStart: this.weekStart,
                format: this.format,
                date: this.value
            });
            this._calendar.startup();

            query(popup).html(this._calendar.domNode);
            domClass.remove(popup, 'fade in top bottom left right');
            var _calendarChangeEvent = on.once(this._calendar, 'changeDate', lang.hitch(this, _updateDom));
            on.once(this, 'hide', function(){
                console.log("hide date called");
                _calendarChangeEvent.remove();
                _calendarChangeEvent = null;
            });
            this.startupViewMode = this.viewMode;
            this.updateCalendar();
        },
         _initEvents: function(){
             this.inherited(arguments);
             this._isInput = this.domNode.tagName === 'INPUT' || this.domNode.tagName === 'TEXTAREA';
             if (this._isInput) {
                 this._inputNode = this.domNode;
                 this.own(on(this.domNode, 'keyup', lang.hitch(this, 'updateCalendar')));
             } else {
                 this._inputNode = query('input', this.domNode)[0] || false;
                 if(this.selector){
                     this._componentNode = query(this.selector, this.domNode)[0] || false;
                 }
             }
         }
    });
});