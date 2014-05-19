{% set selected = "Collapse" %}
{% extends "layouts/page.swig" %}
{% block title %}{{selected|capitalize}}{% endblock %}
{% block content %}

    <div class="marker" id="usage">
        <h3>Usage</h3>
        <h4>Via data attributes</h4>
        <p>Just add <code>data-toggle="collapse"</code> and a <code>data-target</code> to element to automatically assign control of a collapsible element. The <code>data-target</code> attribute accepts a css selector to apply the collapse to. Be sure to add the class <code>collapse</code> to the collapsible element. If you'd like it to default open, add the additional class <code>in</code>.</p>
        <p>To add accordion-like group management to a collapsible control, add the data attribute <code>data-parent="#selector"</code>. Refer to the demo to see this in action.</p>

        <h4>Via JavaScript</h4>
        <p>Enable manually with:</p>
        <pre class="prettyprint linenums">query(".collapse").collapse()</pre>
        <br/>
    </div>

    <div class="marker" id="options">
        <h3>Options</h3>
        <p>Options can be passed via data attributes or JavaScript. For data attributes, append the option name to <code>data-</code>, as in <code>data-parent=""</code>.</p>
        <table class="table table-bordered table-striped">
            <thead>
            <tr>
                <th style="width: 100px;">Name</th>
                <th style="width: 50px;">type</th>
                <th style="width: 50px;">default</th>
                <th>description</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>parent</td>
                <td>selector</td>
                <td>false</td>
                <td>If selector then all collapsible elements under the specified parent will be closed when this collapsible item is shown. (similar to traditional accordion behavior)</td>
            </tr>
            <tr>
                <td>toggle</td>
                <td>boolean</td>
                <td>true</td>
                <td>Toggles the collapsible element on invocation</td>
            </tr>
            </tbody>
        </table>
        <h4>.collapse(options)</h4>
        <p>Activates your content as a collapsible element. Accepts an optional options <code>object</code>.
<pre class="prettyprint linenums">
query('#myCollapsible').collapse({
  toggle: false
})
</pre>
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
                    <td>hide</td>
                    <td>Hides a collapsible element.</td>
                </tr>
                <tr>
                    <td>show</td>
                    <td>Shows a collapsible element.</td>
                </tr>
                <tr>
                    <td>toggle</td>
                    <td>Toggles a collapsible element to shown or hidden.</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="marker" id="events">
        <h3>Events</h3>
        <p>Bootstrap's collapse class exposes a few events for hooking into collapse functionality.</p>
        <table class="table table-bordered table-condensed">
            <thead>
            <tr>
                <th style="width: 100px;">Event</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>show</td>
                <td>This event fires immediately when the <code>show</code> instance method is called.</td>
            </tr>
            <tr>
                <td>shown</td>
                <td>This event is fired when a collapse element has been made visible to the user (will wait for css transitions to complete).</td>
            </tr>
            <tr>
                <td>hide</td>
                <td>
                    This event is fired immediately when the <code>hide</code> method has been called.
                </td>
            </tr>
            <tr>
                <td>hidden</td>
                <td>This event is fired when a collapse element has been hidden from the user (will wait for css transitions to complete).</td>
            </tr>
            <tr>
                <td colspan="2">
<pre class="prettyprint linenums">
query('#myCollapsible').on('hidden', function () {
  // do something…
})</pre>
                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="marker" id="example">
        <h3>Example</h3>
        <p>Using the collapse plugin, we built a simple accordion style widget:</p>

        <div class="bs-docs-example">
            <div class="panel-group" id="accordion2">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">
                            Collapsible Group Item #1
                        </a></h4>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse in">
                        <div class="panel-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">
                            Collapsible Group Item #2
                        </a></h4>
                    </div>
                    <div id="collapseTwo" class="panel-collapse collapse">
                        <div class="panel-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion2" href="#collapseThree">
                            Collapsible Group Item #3
                        </a></h4>
                    </div>
                    <div id="collapseThree" class="panel-collapse collapse">
                        <div class="panel-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

{% endblock %}

{% block initscript %}
<script type="text/javascript" charset="utf-8">
    require([ '{{baseUrl}}/js/application.js', 'bootstrap/Collapse' ]);
</script>
{% endblock %}
