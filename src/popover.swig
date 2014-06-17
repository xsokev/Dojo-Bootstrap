{% set selected = "Popover" %}
{% extends "layouts/page.swig" %}
{% block title %}{{selected|capitalize}}{% endblock %}
{% block content %}
<div class="marker" id="usage">
    <h3>Usage</h3>
    <p>Enable popovers via JavaScript:</p>
    <pre class="prettyprint linenums">query('#example').popover(options)</pre>

    <h4>Markup</h4>
    <p>For performance reasons, the Tooltip and Popover data-apis are opt in. If you would like to use them just specify a selector option.</p>
</div>

<div class="marker" id="options">
    <h3>Options</h3>
    <p>Options can be passed via data attributes or JavaScript. For data attributes, append the option name to <code>data-</code>, as in <code>data-animation=""</code>.</p>
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
            <td>animation</td>
            <td>boolean</td>
            <td>true</td>
            <td>apply a css fade transition to the tooltip</td>
        </tr>
        <tr>
            <td>html</td>
            <td>boolean</td>
            <td>true</td>
            <td>Insert html into the popover. If false, dojo's NodeList <code>text</code> method will be used to insert content into the dom. Use text if you're worried about XSS attacks.</td>
        </tr>
        <tr>
            <td>placement</td>
            <td>string|function</td>
            <td>'right'</td>
            <td>how to position the popover - top | bottom | left | right</td>
        </tr>
        <tr>
            <td>selector</td>
            <td>string</td>
            <td>false</td>
            <td>if a selector is provided, tooltip objects will be delegated to the specified targets</td>
        </tr>
        <tr>
            <td>trigger</td>
            <td>string</td>
            <td>'click'</td>
            <td>how popover is triggered - click | hover | focus | manual</td>
        </tr>
        <tr>
            <td>title</td>
            <td>string | function</td>
            <td>''</td>
            <td>default title value if `title` attribute isn't present</td>
        </tr>
        <tr>
            <td>content</td>
            <td>string | function</td>
            <td>''</td>
            <td>default content value if `data-content` attribute isn't present. If a callback function is provided, the scope will be the DOM-Node. There are no other parameters.</td>
        </tr>
        <tr>
            <td>delay</td>
            <td>number | object</td>
            <td>0</td>
            <td>
                <p>delay showing and hiding the popover (ms) - does not apply to manual trigger type</p>
                <p>If a number is supplied, delay is applied to both hide/show</p>
                <p>Object structure is: <code>delay: { show: 500, hide: 100 }</code></p>
            </td>
        </tr>
        </tbody>
    </table>
    <div class="alert alert-info">
        <strong>Heads up!</strong>
        Options for individual popovers can alternatively be specified through the use of data attributes.
    </div>
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
            <td>destroy</td>
            <td>Hides and destroys an element's popover.</td>
        </tr>
        <tr>
            <td>hide</td>
            <td>Hides an element's popover.</td>
        </tr>
        <tr>
            <td>show</td>
            <td>Shows an element's popover.</td>
        </tr>
        <tr>
            <td>toggle</td>
            <td>Toggles an element's popover.</td>
        </tr>
        </tbody>
    </table>
</div>

<div class="marker" id="examples">
    <h3>Examples</h3>
    <p>Add small overlays of content, like those on the iPad, to any element for housing secondary information. Hover over the button to trigger the popover. <strong>Requires <a href="{{baseUrl}}/tooltip">Tooltip</a> to be included.</strong></p>

    <h4>Static popover</h4>
    <p>Four options are available: top, right, bottom, and left aligned.</p>
    <div class="bs-docs-example bs-docs-example-popover">
        <div class="examples">
            <div class="popover top">
                <div class="arrow"></div>
                <h3 class="popover-title">Popover top</h3>
                <div class="popover-content">
                    <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
                </div>
            </div>

            <div class="popover right">
                <div class="arrow"></div>
                <h3 class="popover-title">Popover right</h3>
                <div class="popover-content">
                    <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
                </div>
            </div>

            <div class="popover left">
                <div class="arrow"></div>
                <h3 class="popover-title">Popover left</h3>
                <div class="popover-content">
                    <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
                </div>
            </div>

            <div class="popover bottom">
                <div class="arrow"></div>
                <h3 class="popover-title">Popover bottom</h3>
                <div class="popover-content">
                    <p>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
                </div>
            </div>
        </div>

        <div class="clearfix"></div>
    </div>
    <p>No markup shown as popovers are generated from JavaScript and content within a <code>data</code> attribute.</p>

    <h4>Live demo</h4>
    <div class="bs-docs-example" style="padding-bottom: 24px;">
        <a href="#" class="btn btn-large btn-danger" rel="popover" title="A Title" data-placement="top" data-content="And here's some amazing content. It's very engaging. right?">Click to toggle popover</a>
    </div>
</div>
{% endblock %}

{% block initscript %}
<script type="text/javascript" charset="utf-8">
    require([ 'dojo/query', '{{baseUrl}}/js/application.js', 'bootstrap/Popover' ], function(q){
        q("a[rel=popover]").popover().on('click', function(e){
            e.preventDefault();
        });
    });
</script>
{% endblock %}
