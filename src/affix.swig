{% set selected = "Affix" %}
{% extends "layouts/page.swig" %}
{% block title %}{{selected|capitalize}}{% endblock %}
{% block content %}
<div class="marker" id="usage">
    <h3>Usage</h3>
    <h4>Via data attributes</h4>
    <p>To easily add affix behavior to any element, just add <code>data-spy="affix"</code> to the element you want to spy on. Then use offsets to define when to toggle the pinning of an element on and off.</p>

    <pre class="prettyprint linenums">&lt;div data-spy="affix" data-offset-top="200"&gt;...&lt;/body&gt;</pre>

    <br/>
    <div class="alert alert-info">
        <strong>Heads up!</strong>
        It's up to you to manage the position of a pinned element. This is done by styling <code>affix</code>, <code>affix-top</code>, and <code>affix-bottom</code>.
    </div>

    <h4>Via JavaScript</h4>
    <p>Call the affix plugin via JavaScript:</p>
    <pre class="prettyprint linenums">query('#navbar').affix()</pre>
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
            <td>refresh</td>
            <td>
                <p>When using affix in conjunction with adding or removing of elements from the DOM, you'll want to call the refresh method:</p>
            </td>
        </tr>
        <tr><td colspan="2">
    <pre class="prettyprint linenums">
query('[data-spy="affix"]').forEach(function(elm){
    query(elm).affix('refresh')
});</pre>
        </td></tr>
        </tbody>
    </table>
</div>

<div class="marker" id="options">
    <h3>Options</h3>
    <p>Options can be passed via data attributes or JavaScript. For data attributes, append the option name to <code>data-</code>, as in <code>data-offset-top="200"</code>.</p>
    <table class="table table-bordered table-condensed">
        <thead>
        <tr>
            <th style="width: 100px;">Name</th>
            <th style="width: 100px;">type</th>
            <th style="width: 50px;">default</th>
            <th>description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>offset</td>
            <td>number | function | object</td>
            <td>10</td>
            <td>Pixels to offset from screen when calculating position of scroll. If a single number is provide, the offset will be applied in both top and left directions. To listen for a single direction, or multiple unique offsets, just provided an object <code>offset: { x: 10 }</code>. Use a function when you need to dynamically provide an offset (useful for some responsive designs).</td>
        </tr>
        </tbody>
    </table>
</div>
{% endblock %}

{% block initscript %}
<script type="text/javascript" charset="utf-8">
    require([ '{{baseUrl}}/js/application.js' ]);
</script>
{% endblock %}
