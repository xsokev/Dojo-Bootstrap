{% set selected = "Typeahead" %}
{% extends "layouts/page.swig" %}
{% block title %}{{selected|capitalize}}{% endblock %}
{% block content %}
<div class="marker" id="usage">
    <h3>Usage</h3>

    <h4>Via data attributes</h4>
    <p>Add data attributes to register an element with typeahead.</p>
    <pre class="prettyprint">&lt;input type="text" data-provide="typeahead" data-items="10"&gt;</pre>

    <h4>Via JavaScript</h4>
    <p>Call the typeahead manually with:</p>
    <pre class="prettyprint linenums">query('.typeahead').typeahead()</pre>
</div>

<div class="marker" id="options">
    <h3>Options</h3>
    <p>Options can be passed via data attributes or JavaScript. For data attributes, append the option name to <code>data-</code>, as in <code>data-source=""</code>.</p>
    <table class="table table-bordered table-condensed table-striped">
        <thead>
        <tr>
            <th style="width: 100px;">Name</th>
            <th style="width: 50px;">type</th>
            <th style="width: 100px;">default</th>
            <th>description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>source</td>
            <td>array, function</td>
            <td>[ ]</td>
            <td>The data source to query against. May be an array of strings or a function. The function is passed two arguments, the <code>query</code> value in the input field and the <code>process</code> callback. The function may be used synchronously by returning the data source directly or asynchronously via the <code>process</code> callback's single argument.</td>
        </tr>
        <tr>
            <td>items</td>
            <td>number</td>
            <td>8</td>
            <td>The max number of items to display in the dropdown.</td>
        </tr>
        <tr>
            <td>minLength</td>
            <td>number</td>
            <td>1</td>
            <td>The minimum character length needed before triggering autocomplete suggestions</td>
        </tr>
        <tr>
            <td>matcher</td>
            <td>function</td>
            <td>case insensitive</td>
            <td>The method used to determine if a query matches an item. Accepts a single argument, the <code>item</code> against which to test the query. Access the current query with <code>this.query</code>. Return a boolean <code>true</code> if query is a match.</td>
        </tr>
        <tr>
            <td>sorter</td>
            <td>function</td>
            <td>exact match,<br> case sensitive,<br> case insensitive</td>
            <td>Method used to sort autocomplete results. Accepts a single argument <code>items</code> and has the scope of the typeahead instance. Reference the current query with <code>this.query</code>.</td>
        </tr>
        <tr>
            <td>highlighter</td>
            <td>function</td>
            <td>highlights all default matches</td>
            <td>Method used to highlight autocomplete results. Accepts a single argument <code>item</code> and has the scope of the typeahead instance. Should return html.</td>
        </tr>
        </tbody>
    </table>
</div>

<div class="marker" id="methods">
    <h3>Methods</h3>
    <p>To use the Typeahead methods, you must get an instance of the Typeahead class which is stored in the element's data store.</p>
<pre class="prettyprint linenums">var typeahead = query("#aNode").data("typeahead");</pre>
    <br/>
    <table class="table table-bordered table-condensed table-striped">
        <thead>
        <tr>
            <th style="width: 100px;">Method</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>hide</td>
            <td>Hides the typeahead list.</td>
        </tr>
        <tr>
            <td>show</td>
            <td>Shows the typeahead list.</td>
        </tr>
        <tr>
            <td>process</td>
            <td>Shows the typeahead list.</td>
        </tr>
        </tbody>
    </table>
</div>

<div class="marker" id="examples">
    <h3>Examples</h3>
    <p>A basic, easily extended plugin for quickly creating elegant typeaheads with any form text input.</p>
    <div class="bs-docs-example well">
        <label for="state">State: </label>
        <input type="text" class="span4" data-provide="typeahead" data-items="4" data-source='["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]'>
    </div>

    <pre class="prettyprint">&lt;input type="text" data-provide="typeahead"&gt;</pre>

    <h4>Example with Ajax</h4>
    <p>This example uses ajax to feed the source for typeahead</p>
    <div class="bs-docs-example well">
        <label>Zip code:</label>
        <input type="text" id="zipcode" class="span3" style="margin: 0 auto;" autocomplete='off' data-provide="typeahead" data-items="10">
        <span id="zipcode_citystate" class="help-block" style="color: #999;">&nbsp;</span>
    </div>
    <pre class="prettyprint">&lt;input id="zipcode" type="text" data-provide="typeahead" data-items="10"&gt;</pre>
    <br/>
<pre class="prettyprint linenums">query('#zipcode').typeahead({
    minLength: 3,
    source: function (query, process) {
        return request('/zipcodes/'+query, {handleAs:'json'})
                .then(function (data) {
                    process(data);
                });
        }
});</pre>
</div>
{% endblock %}

{% block initscript %}
<script type="text/javascript" charset="utf-8">
    require([ 'dojo/request/script', '{{baseUrl}}/js/application.js', 'bootstrap/Typeahead' ], function(request){
        var q = dojo.query;
        q('#zipcode').typeahead({
            minLength: 3,
            source: function (query, process) {
                return request('http://dojobootstrap.com/zipcode/query/'+query, {jsonp:'callback'}).then(function (data) {
                    process(data);
                });
            }
        }).on('change', function(){
            q('#zipcode_citystate')[0].innerHTML = '&nbsp;';
            request('http://dojobootstrap.com/zipcode/citystate/'+this.value, {jsonp:'callback'}).then(function (data) {
                q('#zipcode_citystate')[0].innerHTML = data.location;
            });
        });
    });
</script>
{% endblock %}
