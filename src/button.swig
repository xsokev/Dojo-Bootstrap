{% set selected = "Button" %}
{% extends "layouts/page.swig" %}
{% block title %}{{selected|capitalize}}{% endblock %}
{% block content %}
    <div class="marker" id="usage">
        <h3>Usage</h3>
        <p>Enable buttons via JavaScript:</p>
        <pre class="prettyprint linenums">query('.nav-tabs').button()</pre>

        <h4>Markup</h4>
        <p>Data attributes are integral to the button plugin. Check out the example code below for the various markup types.</p>
    </div>

    <div class="marker" id="methods">
        <h3>Methods</h3>
        <table class="table table-bordered table-condensed">
            <thead>
            <tr>
                <th style="width: 100px;">Method</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>loading</td>
                <td>
                    <p>Sets button state to loading - disables button and swaps text to loading text. Loading text should be defined on the button element using the data attribute <code>data-loading-text</code>.</p>
                    <div class="alert alert-info">
                        <strong>Heads up!</strong>
                        <a href="https://github.com/twitter/bootstrap/issues/793">Firefox persists the disabled state across page loads</a>. A workaround for this is to use <code>autocomplete="off"</code>.
                    </div>
                </td>
            </tr>
            <tr><td colspan="2">
                    <pre class="prettyprint">&lt;button class="btn" data-loading-text="loading..." &gt;...&lt;/button&gt;</pre>
            </td></tr>
            <tr>
                <td>reset</td>
                <td>
                    <p>Resets button state - swaps text to original text.</p>
                </td>
            </tr>
            <tr>
                <td>toggle</td>
                <td>
                    <p>Toggles push state. Gives the button the appearance that it has been activated.</p>
                    <div class="alert alert-info">
                        <strong>Heads up!</strong>
                        You can enable auto toggling of a button by using the <code>data-toggle</code> attribute.
                    </div>
                </td>
            </tr>
            <tr><td colspan="2">
                    <pre class="prettyprint">&lt;button class="btn" data-toggle="button" &gt;…&lt;/button&gt;</pre>
            </td></tr>
            <tr>
                <td>&lt;string&gt;</td>
                <td>
                    <p>Resets button state - swaps text to any data defined text state.</p>
                </td>
            </tr>
            <tr><td colspan="2">
<pre class="prettyprint linenums">&lt;button class="btn" data-complete-text="done!"&gt;...&lt;/button&gt;
&lt;script&gt;
  query('.btn').button('complete')
&lt;/script&gt;
</pre>
            </td></tr>
            </tbody>
        </table>
    </div>

    <div class="marker" id="examples">
        <h3>Examples</h3>
        <p>Do more with buttons. Control button states or create groups of buttons for more components like toolbars.</p>

        <h4>Stateful</h4>
        <p>Add data-loading-text="Loading..." to use a loading state on a button.</p>
        <div class="bs-docs-example" style="padding-bottom: 24px;">
            <button type="button" id="fat-btn" data-loading-text="loading..." class="btn btn-primary">
                Loading state
            </button>
        </div>
<pre class="prettyprint">&lt;button class="btn btn-primary" data-loading-text="Loading..."&gt;Loading state&lt;/button&gt;</pre>

        <h4>Single toggle</h4>
        <p>Add data-toggle="button" to activate toggling on a single button.</p>
        <div class="bs-docs-example" style="padding-bottom: 24px;">
            <button type="button" class="btn btn-primary" data-toggle="button">Single Toggle</button>
        </div>
<pre class="prettyprint">&lt;button class="btn" data-toggle="button"&gt;Single Toggle&lt;/button&gt;</pre>

        <h4>Checkbox</h4>
        <p>Add data-toggle="buttons-checkbox" for checkbox style toggling on btn-group.</p>
        <div class="bs-docs-example" style="padding-bottom: 24px;">
            <div class="btn-group" data-toggle="buttons-checkbox">
                <button type="button" class="btn btn-primary">Left</button>
                <button type="button" class="btn btn-primary">Middle</button>
                <button type="button" class="btn btn-primary">Right</button>
            </div>
        </div>
<pre class="prettyprint">
&lt;div class="btn-group" data-toggle="buttons-checkbox"&gt;
  &lt;button class="btn"&gt;Left&lt;/button&gt;
  &lt;button class="btn"&gt;Middle&lt;/button&gt;
  &lt;button class="btn"&gt;Right&lt;/button&gt;
&lt;/div&gt;
</pre>

        <h4>Radio</h4>
        <p>Add data-toggle="buttons-radio" for radio style toggling on btn-group.</p>
        <div class="bs-docs-example" style="padding-bottom: 24px;">
            <div class="btn-group" data-toggle="buttons-radio">
                <button type="button" class="btn btn-primary">Left</button>
                <button type="button" class="btn btn-primary">Middle</button>
                <button type="button" class="btn btn-primary">Right</button>
            </div>
        </div>
<pre class="prettyprint">
&lt;div class="btn-group" data-toggle="buttons-radio"&gt;
  &lt;button class="btn"&gt;Left&lt;/button&gt;
  &lt;button class="btn"&gt;Middle&lt;/button&gt;
  &lt;button class="btn"&gt;Right&lt;/button&gt;
&lt;/div&gt;
</pre>
    </div>
{% endblock %}

{% block initscript %}
<script type="text/javascript" charset="utf-8">
    require([ '{{baseUrl}}/js/application.js', 'bootstrap/Button' ], function(){
        var q = dojo.query;
        q("#fat-btn").on("click", function(e){
            q(e.target).button('loading');
            setTimeout(function(){
                q(e.target).button('reset');
            }, 3000);
        });
    });
</script>
{% endblock %}
