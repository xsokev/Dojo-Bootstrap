{% set selected = "Alert" %}
{% extends "layouts/page.swig" %}
{% block title %}{{selected|capitalize}}{% endblock %}
{% block content %}
	<div class="marker" id="usage">
        <h3>Usage</h3>
        <p>Wrap all alerts with close functionality. To have your alerts animate out when closed, make sure they have the <code>.fade</code> and <code>.in</code> class already applied to them.</p>
        <pre class="prettyprint linenums">query(".alert").alert()</pre>

        <h4>Markup</h4>
        <p>Just add <code>data-dismiss="alert"</code> to your close button to automatically give an alert close functionality.</p>
        <pre class="prettyprint">&lt;a class="close" data-dismiss="alert" href="#"&gt;&amp;times;&lt;/a&gt;</pre>
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
                <td>close</td>
                <td>
                    <p>Closes an alert.</p>
                </td>
            </tr>
            <tr><td colspan="2">
    <pre class="prettyprint linenums">query(".alert").alert('close');</pre>
                </td></tr>
            </tbody>
        </table>
    </div>

    <div class="marker" id="events">
        <h3>Events</h3>
        <p>Bootstrap's alert class exposes a few events for hooking into alert functionality.</p>
        <table class="table table-bordered table-condensed">
            <thead>
            <tr>
                <th style="width: 150px;">Event</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>close</td>
                <td>This event fires immediately when the <code>close</code> instance method is called.</td>
            </tr>
            <tr>
                <td>closed</td>
                <td>This event is fired when the alert has been closed (will wait for css transitions to complete).</td>
            </tr>
            </tbody>
        </table>
<pre class="prettyprint linenums">
query('#my-alert').bind('closed', function () {
// do something…
})
</pre>
    </div>

	<div class="marker" id="examples">
        <h3>Examples</h3>
        <p>Add dismiss functionality to all alerge messages with this plugin.</p>
        <div class="bs-docs-example">
            <div class="alert alert-warning fade in">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Holy guacamole!</strong> Best check yo self, you're not looking too good.
            </div>
        </div>

        <div class="bs-docs-example">
            <div class="alert alert-block alert-danger fade in">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <h4 class="alert-heading">Oh snap! You got an error!</h4>
                <p>Change this and that and try again. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum.</p>
                <p>
                    <a class="btn btn-danger" href="#">Take this action</a> <a class="btn btn-default" href="#">Or do this</a>
                </p>
            </div>
        </div>
    </div>
{% endblock %}

{% block initscript %}
<script type="text/javascript" charset="utf-8">
    require([ '{{baseUrl}}/js/application.js', 'bootstrap/Alert' ]);
</script>
{% endblock %}
