/* ==========================================================
 * Calendar.js v2.0.0
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
    "dojo/text!./templates/Calendar.tpl",
    "./Support",
    "./_BootstrapWidget",
    "dojo/_base/declare",
    "dijit/_TemplatedMixin",
    "dojo/query",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/on",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/date",
    "dojo/date/locale",
    "dojo/NodeList-dom",
    "dojo/NodeList-traverse"
], function (template, support, _BootstrapWidget, declare, _TemplatedMixin, query, lang, array, on, domClass, domConstruct, dateDate, dateLocale) {
    "use strict";

    var _modes = [
        { clsName: 'days', navFnc: 'Month', navStep: 1 },
        { clsName: 'months', navFnc: 'FullYear', navStep: 1 },
        { clsName: 'years', navFnc: 'FullYear', navStep: 10 }
    ];

    var _dates = {
        days: dateLocale.getNames("days", "wide"),
        daysShort: dateLocale.getNames("days", "abbr"),
        daysMin: array.map(dateLocale.getNames("days", "abbr"), function(day){ return day.substring(0,2); }),
        months: dateLocale.getNames("months", "wide"),
        monthsShort: dateLocale.getNames("months", "abbr")
    };

    var _fillDow = function () {
        var dowCnt = this.weekStart,
            html = '';
        while (dowCnt < this.weekStart + 7) {
            html += '<th class="dow">'+_dates.daysMin[(dowCnt++)%7]+'</th>';
        }
        domConstruct.place(html, this.daysOfWeekNode);
    };

    var _fillMonths = function () {
        var html = '',
            rows = 3,
            months = 12,
            columns = months/rows;
        for (var i = 0; i < months; i++) {
            if(i%columns === 0){
                html += '<div class="row-fluid">';
            }
            html += '<span class="month span'+(12/columns)+'" data-month="'+i+'">'+_dates.monthsShort[i]+'</span>';
            if(i%columns === rows){
                html += '</div>';
            }
        }
        domConstruct.place(html, this.monthsNode);
    };

    var _fillYears = function(){
        var year = new Date(this.viewDate).getFullYear() - 1,
            currentYear = this.date.getFullYear(),
            html = '',
            rows = 3,
            years = 12,
            columns = years/rows;
        this.yearsNodeHeader.innerHTML = (year+1) + '-' + (year + (years-2));
        for (var i = 0; i < years; i++) {
            if(i%columns === 0){
                html += '<div class="row-fluid">';
            }
            html += '<span class="year span'+(12/columns)+(i === 0 || i === 11 ? ' old' : '')+(currentYear === year ? ' active' : '')+'">'+(year+i)+'</span>';
            if(i%columns === rows){
                html += '</div>';
            }
            //year += 1;
        }
        this.yearsNode.innerHTML = html;
    };

    var _fill = function () {
        var clsName,
            html = [],
            d = new Date(this.viewDate),
            year = d.getFullYear(),
            month = d.getMonth(),
            currentDate = this.date.valueOf(),
            currentYear = this.date.getFullYear(),
            runningDate = new Date(year, month-1, 28,0,0,0,0),
            day = dateDate.getDaysInMonth(runningDate);

        query('.datepicker-days th.switch', this.domNode)[0].innerHTML = _dates.months[month]+' '+year;

        runningDate.setDate(day);
        runningDate.setDate(day - (runningDate.getDay() - this.weekStart + 7)%7);

        var endDate = new Date(runningDate);
        endDate.setDate(endDate.getDate() + 42);

        while(runningDate.valueOf() < endDate.valueOf()) {
            if (runningDate.getDay() === this.weekStart) {
                html.push('<tr>');
            }
            clsName = this.dateClass(runningDate);
            if(runningDate.getMonth() === 11 && month === 0){
                clsName += ' old';
            } else if (runningDate.getMonth() === 0 && month === 11) {
                clsName += ' new';
            } else if (runningDate.getMonth() < month) {
                clsName += ' old';
            } else if (runningDate.getMonth() > month) {
                clsName += ' new';
            }
            if (runningDate.valueOf() === currentDate) {
                clsName += ' active';
            }
            html.push('<td class="day'+clsName+'">'+runningDate.getDate() + '</td>');
            if (runningDate.getDay() === this.weekEnd) {
                html.push('</tr>');
            }
            runningDate.setDate(runningDate.getDate()+1);
        }
        domConstruct.empty(this.daysNode);
        domConstruct.place(html.join(' '), this.daysNode);

        var months = query('.datepicker-months', this.domNode);
        query('th.switch', months[0])[0].innerHTML = year;
        query('span', months[0]).removeClass('active');
        if (currentYear === year) {
            domClass.add(query('span', months[0])[this.date.getMonth()], 'active');
        }
        _fillYears.call(this);
    };

    var _showMode = function (dir) {
        if (dir) {
            this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir));
        }
        query('>div', this.domNode).hide();
        query('>div.datepicker-'+_modes[this.viewMode].clsName, this.domNode).show();
    };

    var _mousedown = function (e) {
        e.stopPropagation();
        e.preventDefault();
    };

    var _click = function (e) {
        var month, year, day;
        e.stopPropagation();
        e.preventDefault();
        var target = query(e.target).closest('span, td, th');
        if (target.length === 1) {
            switch(target[0].nodeName.toLowerCase()) {
                case 'th':
                    switch(target[0].className) {
                        case 'switch':
                            _showMode.call(this, 1);
                            break;
                        case 'prev':
                        case 'next':
                            this.viewDate['set'+_modes[this.viewMode].navFnc].call(
                                this.viewDate,
                                this.viewDate['get'+_modes[this.viewMode].navFnc].call(this.viewDate) +
                                    _modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1)
                            );
                            _fill.call(this);
                            break;
                    }
                    break;
                case 'span':
                    if (domClass.contains(target[0], 'month')) {
                        month = support.getData(target[0], 'month');
                        this.viewDate.setMonth(month);
                    } else {
                        var yearText = target[0].innerText || target[0].textContent;
                        year = parseInt(yearText, 10) || 0;
                        this.viewDate.setFullYear(year);
                    }
                    if(this.viewMode === this.minViewMode){
                        this.set("date", new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 1,0,0,0,0));
                        _set.call(this);
                    }
                    _showMode.call(this, -1);
                    _fill.call(this);
                    break;
                case 'td':
                    if (domClass.contains(target[0], 'day')){
                        var dayText = target[0].innerText || target[0].textContent;
                        day = parseInt(dayText, 10) || 1;
                        month = this.viewDate.getMonth();
                        year = this.viewDate.getFullYear();
                        if (domClass.contains(target[0], 'old')) {
                            month -= 1;
                            if(month < 0){
                                month = 11;
                                year -= 1;
                            }
                        } else if (domClass.contains(target[0], 'new')) {
                            month += 1;
                            if(month > 12){
                                month = 0;
                                year += 1;
                            }
                        }
                        this.set("date", new Date(year, month, day,0,0,0,0));
                        _set.call(this);
                    }
                    break;
            }
        }
    };

    var _set = function(){
        this.emit('changeDate', lang.mixin(support.eventObject, {
            date:this.date,
            formattedDate: dateLocale.format(this.date, {
                datePattern: this.format,
                selector: "date"
            })
        }));
    };

    // summary:
    //      Widget for displaying a calendar
    return declare("Calendar", [_BootstrapWidget, _TemplatedMixin], {
        templateString: template,

        baseClass: "calendar",

        // date: String|Date
        //          the start date for the calendar
        date: (new Date()),
        _setDateAttr: function(val){
            var newDate,
                today = new Date();
            if(val instanceof Date){
                newDate = new Date(val.getFullYear(),val.getMonth(),val.getDate(),0,0,0);
            } else if(typeof val === "string") {
                var parsedDate = dateLocale.parse(val, {
                    datePattern: this.format,
                    selector: "date"
                });
                if(parsedDate){
                    newDate = new Date(parsedDate.getFullYear(),parsedDate.getMonth(),parsedDate.getDate(),0,0,0);
                } else {
                    newDate = new Date(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0);
                }
            } else {
                newDate = new Date(today.getFullYear(),today.getMonth(),today.getDate(),0,0,0);
            }
            this._set("date", newDate);
            this.viewDate = new Date(this.date);
            if(this.started){ _fill.call(this); }
        },

        // viewMode: Number|String
        //          the start view mode for the calendar
        viewMode: 0,
        _setViewModeAttr: function(val){
            if (typeof val === 'string') {
                switch (val) {
                    case 'months':
                        this._set("viewMode", 1);
                        break;
                    case 'years':
                        this._set("viewMode", 2);
                        break;
                    default:
                        this._set("viewMode", 0);
                        break;
                }
            } else {
                this._set("viewMode", val);
            }
        },

        // minViewMode: Number|String
        //          the start view mode for the calendar
        minViewMode: 0,
        _setMinViewModeAttr: function(val){
            if (typeof val === 'string') {
                switch (val) {
                    case 'months':
                        this._set("minViewMode", 1);
                        break;
                    case 'years':
                        this._set("minViewMode", 2);
                        break;
                    default:
                        this._set("minViewMode", 0);
                        break;
                }
            } else {
                this._set("minViewMode", val);
            }
        },

        // dateClass: String|Function
        //          the function to use to determine
        dateClass: function(date){ return ''; },
        _setDateClassAttr: function(val){
            if(typeof val === "string"){
                this._set("dateClass", function(){ return val; });
            } else if(typeof val === "function") {
                this._set("dateClass", val);
            } else {
                this._set("dateClass", function(){ return ''; });
            }
        },

        // weekStart: Number
        //          the numeric day that the week starts on. Usually 0-Sunday or 1-Monday
        weekStart: 0,

        // format: String
        //          format the date should use to parse on input and format on output
        format: "M/d/yyyy",

        postCreate:function () {
            this.viewMode = this.minViewMode;
            this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;

            this.own(on(this.domNode, 'mousedown', lang.hitch(this, _mousedown)));
            this.own(on(this.domNode, 'click', lang.hitch(this, _click)));

            _fillDow.call(this);
            _fillMonths.call(this);
            _showMode.call(this);
        },

        startup: function(){
            this.started = true;
            this.set("date", this.date);
        }
    });
});