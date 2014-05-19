{% set selected = "Modal" %}
{% extends "layouts/page.swig" %}
{% block title %}{{selected|capitalize}}{% endblock %}
{% block content %}
<div class="marker" id="usage">
    <h3>Usage</h3>

    <h4>Via data attributes</h4>
    <p>Activate a modal without writing JavaScript. Set <code>data-toggle="modal"</code> on a controller element, like a button, along with a <code>data-target="#foo"</code> or <code>href="#foo"</code> to target a specific modal to toggle.</p>
    <pre class="prettyprint">&lt;button type="button" data-toggle="modal" data-target="#myModal"&gt;Launch modal&lt;/button&gt;</pre>

    <h4>Via JavaScript</h4>
    <p>Call a modal with id <code>myModal</code> with a single line of JavaScript.</p>
    <p>Activates your content as a modal. Accepts an optional options <code>object</code>.</p>
    <pre class="prettyprint linenums">query('#myModal').modal(options)</pre>
</div>

<div class="marker" id="options">
    <h3>Options</h3>
    <p>Options can be passed via data attributes or JavaScript. For data attributes, append the option name to <code>data-</code>, as in <code>data-backdrop=""</code>.</p>
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
            <td>backdrop</td>
            <td>boolean</td>
            <td>true</td>
            <td>Includes a modal-backdrop element. Alternatively, specify <code>static</code> for a backdrop which doesn't close the modal on click.</td>
        </tr>
        <tr>
            <td>keyboard</td>
            <td>boolean</td>
            <td>true</td>
            <td>Closes the modal when escape key is pressed</td>
        </tr>
        <tr>
            <td>show</td>
            <td>boolean</td>
            <td>true</td>
            <td>Shows the modal when initialized.</td>
        </tr>
        <tr>
            <td>remote</td>
            <td>path</td>
            <td>false</td>
            <td><p>If a remote url is provided, content will be loaded via jQuery's <code>load</code> method and injected into the <code>.modal-body</code>. If you're using the data api, you may alternatively use the <code>href</code> tag to specify the remote source. An example of this is shown below:</p>
                <pre class="prettyprint"><code>&lt;a data-toggle="modal" href="remote.html" data-target="#modal"&gt;click me&lt;/a&gt;</code></pre></td>
        </tr>
        </tbody>
    </table>
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
            <td>Hides a modal.</td>
        </tr>
        <tr>
            <td>show</td>
            <td>Shows a modal.</td>
        </tr>
        <tr>
            <td>toggle</td>
            <td>Toggles a modal.</td>
        </tr>
        </tbody>
    </table>
</div>

<div class="marker" id="events">
    <h3>Events</h3>
    <p>Bootstrap's modal class exposes a few events for hooking into modal functionality.</p>
    <table class="table table-bordered table-condensed">
        <thead>
        <tr>
            <th style="width: 150px;">Event</th>
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
            <td>This event is fired when the modal has been made visible to the user (will wait for css transitions to complete).</td>
        </tr>
        <tr>
            <td>hide</td>
            <td>This event is fired immediately when the <code>hide</code> instance method has been called.</td>
        </tr>
        <tr>
            <td>hidden</td>
            <td>This event is fired when the modal has finished being hidden from the user (will wait for css transitions to complete).</td>
        </tr>
        </tbody>
    </table>
<pre class="prettyprint linenums">query('#myModal').on('hidden', function () {
    // do something…
})</pre>
</div>

<div class="marker" id="examples">
    <h3>Examples</h3>
    <p>Modals are streamlined, but flexible, dialog prompts with the minimum required functionality and smart defaults.</p>

    <h4>Static example</h4>
    <p>A rendered modal with header, body, and set of actions in the footer.</p>
    <div class="bs-docs-example" style="background-color: #f5f5f5;">
        <div class="modal" style="position: relative; top: auto; left: auto; margin: 0 auto 20px; z-index: 1; max-width: 100%;">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h3>Modal header</h3>
            </div>
            <div class="modal-body">
                <p>One fine body…</p>
            </div>
            <div class="modal-footer">
                <a href="#" class="btn">Close</a>
                <a href="#" class="btn btn-primary">Save changes</a>
            </div>
        </div>
    </div>
<pre class="prettyprint">
&lt;div class="modal hide fade"&gt;
  &lt;div class="modal-header"&gt;
    &lt;button type="button" class="close" data-dismiss="modal" aria-hidden="true"&gt;&amp;times;&lt;/button&gt;
    &lt;h3&gt;Modal header&lt;/h3&gt;
  &lt;/div&gt;
  &lt;div class="modal-body"&gt;
    &lt;p&gt;One fine body…&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class="modal-footer"&gt;
    &lt;a href="#" class="btn"&gt;Close&lt;/a&gt;
    &lt;a href="#" class="btn btn-primary"&gt;Save changes&lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;
</pre>

    <h4>Live demo</h4>
    <p>Toggle a modal via JavaScript by clicking the button below. It will slide down and fade in from the top of the page.</p>
    <!-- sample modal content -->
    <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h3 id="myModalLabel">Modal Heading</h3>
        </div>
        <div class="modal-body">
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem.</p>

            <h4>Popover in a modal</h4>
            <p>This <a href="#" role="button" class="btn popover-test" title="A Title" data-trigger="click" data-content="And here's some amazing content. It's very engaging. right?">button</a> should trigger a popover on hover.</p>

            <h4>Tooltips in a modal</h4>
            <p><a href="#" class="tooltip-test" title="Tooltip">This link</a> and <a href="#" class="tooltip-test" title="Tooltip">that link</a> should have tooltips on hover.</p>

            <hr>

            <h4>Overflowing text to show optional scrollbar</h4>
            <p>We set a fixed <code>max-height</code> on the <code>.modal-body</code>. Watch it overflow with all this extra lorem ipsum text we've included.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal">Close</button>
            <button class="btn btn-primary">Save changes</button>
        </div>
    </div>
    <div class="bs-docs-example" style="padding-bottom: 24px;">
        <a data-toggle="modal" href="#myModal" class="btn btn-primary btn-large">Launch demo modal</a>
    </div>
<pre class="prettyprint">
&lt;-- Button to trigger modal --&gt;
&lt;a href="#myModal" role="button" class="btn" data-toggle="modal"&gt;Launch demo modal&lt;/a&gt;

&lt;-- Modal --&gt;
&lt;div class="modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"&gt;
  &lt;div class="modal-header"&gt;
    &lt;button type="button" class="close" data-dismiss="modal" aria-hidden="true"&gt;&times;&lt;/button&gt;
    &lt;h3 id="myModalLabel"&gt;Modal header&lt;/h3&gt;
  &lt;/div&gt;
  &lt;div class="modal-body"&gt;
    &lt;p&gt;One fine body…&lt;/p&gt;
  &lt;/div&gt;
  &lt;div class="modal-footer"&gt;
    &lt;button class="btn" data-dismiss="modal" aria-hidden="true"&gt;Close&lt;/button&gt;
    &lt;button class="btn btn-primary"&gt;Save changes&lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;
</pre>
</div>

{% endblock %}

{% block initscript %}
<script type="text/javascript" charset="utf-8">
    require([ 'dojo/query', '{{baseUrl}}/js/application.js', 'bootstrap/Tooltip', 'bootstrap/Popover', 'bootstrap/Modal' ], function(q){
        q('.tooltip-test').tooltip();
        q('.popover-test').popover();
    });
</script>
{% endblock %}
