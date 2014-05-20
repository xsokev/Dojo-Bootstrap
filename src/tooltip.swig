{% set selected = "Tooltip" %}
{% extends "layouts/page.swig" %}
{% block title %}{{selected|capitalize}}{% endblock %}
{% block content %}
<div class="marker" id="usage">
    <h3>Usage</h3>
    <p>Trigger the tooltip via JavaScript:</p>
    <pre class="prettyprint linenums">query('#example').tooltip(options)</pre>

    <h4>Markup</h4>
    <p>For performance reasons, the Tooltip and Popover data-apis are opt in. If you would like to use them just specify a selector option.</p>
    <pre class="prettyprint">&lt;a href="#" rel="tooltip" title="first tooltip"&gt;hover over me&lt;/a&gt;</pre>
</div>

<div class="marker" id="options">
    <h3>Options</h3>
    <p>Options can be passed via data attributes or JavaScript. For data attributes, append the option name to <code>data-</code>, as in <code>data-animation=""</code>.</p>
    <table class="table table-bordered table-condensed table-striped">
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
            <td>animation</td>
            <td>boolean</td>
            <td>true</td>
            <td>apply a css fade transition to the tooltip</td>
        </tr>
        <tr>
            <td>html</td>
            <td>boolean</td>
            <td>true</td>
            <td>Insert html into the tooltip. If false, jquery's <code>text</code> method will be used to insert content into the dom. Use text if you're worried about XSS attacks.</td>
        </tr>
        <tr>
            <td>placement</td>
            <td>string|function</td>
            <td>'top'</td>
            <td>how to position the tooltip - top | bottom | left | right</td>
        </tr>
        <tr>
            <td>selector</td>
            <td>string</td>
            <td>false</td>
            <td>If a selector is provided, tooltip objects will be delegated to the specified targets.</td>
        </tr>
        <tr>
            <td>title</td>
            <td>string | function</td>
            <td>''</td>
            <td>default title value if `title` tag isn't present</td>
        </tr>
        <tr>
            <td>trigger</td>
            <td>string</td>
            <td>'hover'</td>
            <td>how tooltip is triggered - click | hover | focus | manual</td>
        </tr>
        <tr>
            <td>delay</td>
            <td>number | object</td>
            <td>0</td>
            <td>
                <p>delay showing and hiding the tooltip (ms) - does not apply to manual trigger type</p>
                <p>If a number is supplied, delay is applied to both hide/show</p>
                <p>Object structure is: <code>delay: { show: 500, hide: 100 }</code></p>
            </td>
        </tr>
        </tbody>
    </table>
    <div class="alert alert-info">
        <strong>Heads up!</strong>
        Options for individual tooltips can alternatively be specified through the use of data attributes.
    </div>
</div>

<div class="marker" id="methods">
    <h3>Methods</h3>
    <table class="table table-bordered table-condensed table-striped">
        <thead>
        <tr>
            <th style="width: 100px;">Methods</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>destroy</td>
            <td>Hides and destroys an element's tooltip.</td>
        </tr>
        <tr>
            <td>hide</td>
            <td>Hides an element's tooltip.</td>
        </tr>
        <tr>
            <td>show</td>
            <td>Reveals an element's tooltip.</td>
        </tr>
        <tr>
            <td>toggle</td>
            <td>Toggles an element's tooltip.</td>
        </tr>
        </tbody>
    </table>
</div>

<div class="marker" id="examples">
    <h3>Examples</h3>
    <p>Inspired by the excellent jQuery.tipsy plugin written by Jason Frame; Tooltips are an updated version, which don't rely on images, use CSS3 for animations, and data-attributes for local title storage.</p>
    <p>Hover over the links below to see tooltips:</p>
    <div class="bs-docs-example tooltip-demo">
        <p class="muted" style="margin-bottom: 0;">Tight pants next level keffiyeh <a href="#" rel="tooltip" title="Default tooltip">you probably</a> haven't heard of them. Photo booth beard raw denim letterpress vegan messenger bag stumptown. Farm-to-table seitan, mcsweeney's fixie sustainable quinoa 8-bit american apparel <a href="#" rel="tooltip" title="Another tooltip">have a</a> terry richardson vinyl chambray. Beard stumptown, cardigans banh mi lomo thundercats. Tofu biodiesel williamsburg marfa, four loko mcsweeney's cleanse vegan chambray. A really ironic artisan <a href="#" rel="tooltip" title="Another one here too">whatever keytar</a>, scenester farm-to-table banksy Austin <a href="#" rel="tooltip" title="The last tip!">twitter handle</a> freegan cred raw denim single-origin coffee viral.
        </p>
    </div>

    <h4>Four directions</h4>
    <div class="bs-docs-example tooltip-demo">
        <ul class="bs-docs-tooltip-examples">
            <li><a href="#" rel="tooltip" data-placement="top" title="Tooltip on top">Tooltip on top</a></li>
            <li><a href="#" rel="tooltip" data-placement="right" title="Tooltip on right">Tooltip on right</a></li>
            <li><a href="#" rel="tooltip" data-placement="bottom" title="Tooltip on bottom">Tooltip on bottom</a></li>
            <li><a href="#" rel="tooltip" data-placement="left" title="Tooltip on left">Tooltip on left</a></li>
        </ul>
    </div>
</div>
{% endblock %}

{% block initscript %}
<script type="text/javascript" charset="utf-8">
    require([ '{{baseUrl}}/js/application.js', 'bootstrap/Tooltip' ], function(){
        var q = dojo.query;
        q('.tooltip-demo').tooltip({
            selector: "a[rel=tooltip]"
        });
    });
</script>
{% endblock %}
