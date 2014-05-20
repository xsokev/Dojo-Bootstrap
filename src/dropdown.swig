{% set selected = "Dropdown" %}
{% extends "layouts/page.swig" %}
{% block title %}{{selected|capitalize}}{% endblock %}
{% block content %}
    <div class="marker" id="usage">
        <h3>Usage</h3>
        <h4>Via data attributes</h4>
        <p>Add <code>data-toggle="dropdown"</code> to a link or button to toggle a dropdown.</p>
<pre class="prettyprint linenums">
&lt;div class="dropdown"&gt;
  &lt;a class="dropdown-toggle" href="#"&gt;Dropdown trigger&lt;/a&gt;
  &lt;ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"&gt;
    ...
  &lt;/ul&gt;
&lt;/div&gt;
</pre>
        <p>To keep URLs intact, use the <code>data-target</code> attribute instead of <code>href="#"</code>.</p>
<pre class="prettyprint linenums">
&lt;div class="dropdown"&gt;
  &lt;a class="dropdown-toggle" id="dLabel" role="button" data-toggle="dropdown" data-target="#" href="/page.html"&gt;
    Dropdown
    &lt;b class="caret"&gt;&lt;/b&gt;
  &lt;/a&gt;
  &lt;ul class="dropdown-menu" role="menu" aria-labelledby="dLabel"&gt;
    ...
  &lt;/ul&gt;
&lt;/div&gt;
</pre>

        <h4>Via JavaScript</h4>
        <p>Call the dropdowns via JavaScript:</p>
        <pre class="prettyprint linenums">query('.dropdown-toggle').dropdown()</pre>
    </div>

    <div class="marker" id="events">
        <h3>Events</h3>
        <table class="table table-bordered table-condensed">
            <thead>
            <tr>
                <th style="width: 100px;">Event</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>select</td>
                <td>Fires when an item from the associated list is selected. Returns <code>event</code> with <code>selectedItem</code> that corresponds to the selected <code>li</code> node</td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="marker" id="examples">
        <h3>Examples</h3>
        <p>Add dropdown menus to nearly anything with this simple plugin, including the navbar, tabs, and pills.</p>

        <h4>Within a navbar</h4>
        <div class="bs-docs-example">
            <div id="navbar-example" class="navbar navbar-default navbar-static">
                <div class="container-fluid">
					<div class="navbar-header">
						<button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-example-js-navbar-collapse">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
			  			<a class="navbar-brand" href="#">Project Name</a>
					</div>
					<div class="collapse navbar-collapse bs-example-js-navbar-collapse">
	                    <ul class="nav navbar-nav" role="navigation">
	                        <li class="dropdown">
	                            <a id="drop1" href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
	                            <ul class="dropdown-menu" role="menu" aria-labelledby="drop1">
	                                <li><a tabindex="-1" href="http://google.com">Action</a></li>
	                                <li><a tabindex="-1" href="#anotherAction">Another action</a></li>
	                                <li><a tabindex="-1" href="#">Something else here</a></li>
	                                <li class="divider"></li>
	                                <li><a tabindex="-1" href="#">Separated link</a></li>
	                            </ul>
	                        </li>
	                        <li class="dropdown">
	                            <a href="#" id="drop2" role="button" class="dropdown-toggle" data-toggle="dropdown">Dropdown 2 <b class="caret"></b></a>
	                            <ul class="dropdown-menu" role="menu" aria-labelledby="drop2">
	                                <li><a tabindex="-1" href="#">Action</a></li>
	                                <li><a tabindex="-1" href="#">Another action</a></li>
	                                <li><a tabindex="-1" href="#">Something else here</a></li>
	                                <li class="divider"></li>
	                                <li><a tabindex="-1" href="#">Separated link</a></li>
	                            </ul>
	                        </li>
	                    </ul>
					</div>
                </div>
            </div> <!-- /navbar-example -->
        </div>

        <h4>Within pills</h4>
        <div class="bs-docs-example">
            <ul class="nav nav-pills">
                <li class="active"><a href="#">Regular link</a></li>
                <li class="dropdown">
                    <a class="dropdown-toggle" id="drop4" role="button" data-toggle="dropdown" href="#">Dropdown <b class="caret"></b></a>
                    <ul id="menu1" class="dropdown-menu" role="menu" aria-labelledby="drop4">
                        <li><a tabindex="-1" href="#">Action</a></li>
                        <li><a tabindex="-1" href="#">Another action</a></li>
                        <li><a tabindex="-1" href="#">Something else here</a></li>
                        <li class="divider"></li>
                        <li><a tabindex="-1" href="#">Separated link</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle" id="drop5" role="button" data-toggle="dropdown" href="#">Dropdown 2 <b class="caret"></b></a>
                    <ul id="menu2" class="dropdown-menu" role="menu" aria-labelledby="drop5">
                        <li><a tabindex="-1" href="#">Action</a></li>
                        <li><a tabindex="-1" href="#">Another action</a></li>
                        <li><a tabindex="-1" href="#">Something else here</a></li>
                        <li class="divider"></li>
                        <li><a tabindex="-1" href="#">Separated link</a></li>
                    </ul>
                </li>
                <li class="dropdown pull-right">
                    <a class="dropdown-toggle" id="drop6" role="button" data-toggle="dropdown" href="#">Dropdown 3 <b class="caret"></b></a>
                    <ul id="menu3" class="dropdown-menu" role="menu" aria-labelledby="drop6">
                        <li><a tabindex="-1" href="#">Action</a></li>
                        <li><a tabindex="-1" href="#">Another action</a></li>
                        <li><a tabindex="-1" href="#">Something else here</a></li>
                        <li class="divider"></li>
                        <li><a tabindex="-1" href="#">Separated link</a></li>
                    </ul>
                </li>
            </ul> <!-- /tabs -->
        </div>

        <h4>Handling Events</h4>
        <div class="row-fluid">
            <div class="span2">
                <div class="btn-group">
                    <a href="#" id="dropfonts" role="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">Fonts&nbsp;<b class="caret"></b></a>
                    <ul class="dropdown-menu" role="menu" aria-labelledby="dropfonts">
                        <li><a tabindex="-1" href="#" class="font-arial">Arial</a></li>
                        <li><a tabindex="-1" href="#" class="font-tahoma">Tahoma</a></li>
                        <li><a tabindex="-1" href="#" class="font-times">Times</a></li>
                        <li><a tabindex="-1" href="#" class="font-verdana">Verdana</a></li>
                    </ul>
                </div>
            </div>
            <div id="dropfontstext" class="span10 font-arial">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum cursus sapien et pellentesque. Phasellus egestas eros eu nulla consequat et vehicula nisl hendrerit. Cras laoreet magna et arcu consequat a iaculis risus condimentum. Aenean sit amet posuere tellus. Integer ac nunc eget odio dictum rutrum laoreet a velit. Sed eget sapien a mi luctus volutpat. Proin dignissim congue lectus, quis fermentum est aliquet nec.</p>
                <p>Quisque in erat at lorem pharetra tincidunt. Aliquam erat volutpat. Vestibulum cursus commodo imperdiet. Curabitur sit amet auctor lectus. Vivamus nec vehicula tortor. Maecenas sodales velit in metus tempor in pharetra arcu consectetur. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas at nibh ac urna vestibulum hendrerit.</p>
            </div>
        </div>
    </div>
{% endblock %}

{% block initscript %}
<script type="text/javascript" charset="utf-8">
    require([ 'dojo/query', 'dojo/dom-class', 'dojo/_base/array', '{{baseUrl}}/js/application.js', 'bootstrap/Dropdown', 'bootstrap/Button', 'dojo/domReady!' ], function(q, domClass, array){
        var text = q('#dropfontstext'),
            drop = q('#dropfonts');
        drop.on('select', function(e){
            var a = q(e.selectedItem).query('> a');
            var cls = a[0].className;
            array.forEach(['font-arial', 'font-tahoma', 'font-times', 'font-verdana'], function(fontCls){
                text.removeClass(fontCls);
            });
            text.addClass(cls);
        });
    });
</script>
{% endblock %}
