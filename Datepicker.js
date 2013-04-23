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

define([
    "./PopupBase",
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
        this.emit('changeDate', e); //[May be deprecated soon]
        this.emit('change', e);
    };

    return declare("Datepicker", [PopupWidget], {
        // summary:
        //      Bootstrap widget for displaying a popup calendar
        // description:
        //      Provides a popup for displaying a Calendar widget. This widget can be used with input
        //      and non-input controls. It also plays well with Twitter Bootstrap add-on.
        //
        //      ## Events ##
        //		Call `widget.on("changeDate", func)` to monitor when a calendar date has been selected.
        //
        //		Call `widget.on("change", func)` to monitor when a calendar date has been selected.
        //
        // example:
        // |    <input value="21-12-2012" class="date" type="text"
        // |           data-dojo-type="Datepicker" data-dojo-props="format:'dd-M-yyyy'">
        // example:
        // |    <div class="input-append" id="mydate">
        // |        <input value="21-12-2012" class="date" type="text" />
        // |        <span class="add-on"><i class="icon-th"></i></span>
        // |    </div>
        // |    new Datepicker({
        // |        format:'dd-M-yyyy',
        // |        selector: '.add-on',
        // |        trigger: 'click'
        // |    }, dojo.byId("#mydate"));
        // example:
        // |    <button class="btn" id="dateBtn">...</button>
        // |    new Datepicker({
        // |        trigger: 'click'
        // |    }, dojo.byId("#dateBtn"));

        // trigger: String
        //          the event that causes the calendar to be displayed. Default is 'focus'.
        trigger: "focus",

        // type: String
        //          what type of tooltip style widget to display. Default is 'datepicker'.
        type: "datepicker",

        // viewMode: Number|String
        //          the start view mode for the calendar. Default is 0.
        viewMode: 0,
        _setViewModeAttr: function(val){
            this._set("viewMode", val);
            if(this._calendar){ this._calendar.set("viewMode", val); }
        },

        // minViewMode: Number|String
        //          the start view mode for the calendar. Default is 0.
        minViewMode: 0,
        _setMinViewModeAttr: function(val){
            this._set("minViewMode", val);
            if(this._calendar){ this._calendar.set("minViewMode", val); }
        },

        // value: String|Date
        //          the start date for the calendar. Default is today's date.
        value: (new Date()),
        _setValueAttr: function(val){
            this._set("value", val);
            if(this._calendar){ this._calendar.set("date", val); }
        },

        // weekStart: Number
        //          the numeric day that the week starts on. Usually 0-Sunday or 1-Monday. Default is 0.
        weekStart: 0,
        _setWeekStartAttr: function(val){
            this._set("weekStart", val);
            if(this._calendar){ this._calendar.set("weekStart", val); }
        },

        // format: String
        //          format the date should use to parse on input and format on output. Default is 'M/d/yyyy'.
        format: "M/d/yyyy",
        _setFormatAttr: function(val){
            this._set("format", val);
            if(this._calendar){ this._calendar.set("format", val); }
        },

        // placement: String|Function
        //          where the popup should be displayed. Values are top, bottom, left, right. Default is ['below'].
        placement: ["below"],

        updateCalendar: function (/*String|Date?*/ val) {
            // summary:
            //      updates the linked calendar widget to the date passed in. If the date value is missing, the
            //      input date is used if it exists, otherwise, today's is used.
            if (this._inputNode) {
                val = val || this._inputNode.value;
            } else {
                val = val || new Date();
            }
            this.set("value", val);
        },

        _resetContent: function(){
            // summary:
            //      reset the popup content to contain the Calendar widget. This method should not be overridden.
            // tags:
            //      private extension
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
             // summary:
             //     initialize input or component to handle events needed to display calendar popup.
             // tags:
             //		protected extension
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
