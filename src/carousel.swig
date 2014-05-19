{% set selected = "Carousel" %}
{% extends "layouts/page.swig" %}
{% block title %}{{selected|capitalize}}{% endblock %}
{% block content %}
    <div class="marker" id="usage">
        <h3>Usage</h3>
        <h4>Via data attributes</h4>
<pre class="prettyprint">
&lt;div id="myCarousel" class="carousel slide"&gt;
  &lt;!-- Carousel items --&gt;
  &lt;div class="carousel-inner"&gt;
    &lt;div class="active item"&gt;…&lt;/div&gt;
    &lt;div class="item"&gt;…&lt;/div&gt;
    &lt;div class="item"&gt;…&lt;/div&gt;
  &lt;/div&gt;
  &lt;!-- Carousel nav --&gt;
  &lt;a class="carousel-control left" href="#myCarousel" data-slide="prev"&gt;&amp;lsaquo;&lt;/a&gt;
  &lt;a class="carousel-control right" href="#myCarousel" data-slide="next"&gt;&amp;rsaquo;&lt;/a&gt;
&lt;/div&gt;
</pre>

        <h4>Via JavaScript</h4>
        <p>Call carousel manually with:</p>
        <pre class="prettyprint linenums">query('.carousel').carousel()</pre>
    </div>

    <div class="marker" id="options">
        <h3>Options</h3>
        <p>Options can be passed via data attributes or JavaScript. For data attributes, append the option name to <code>data-</code>, as in <code>data-interval=""</code>.</p>
        <table class="table table-bordered table-condensed">
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
                <td>interval</td>
                <td>number</td>
                <td>5000</td>
                <td>The amount of time to delay between automatically cycling an item. If false, carousel will not automatically cycle.</td>
            </tr>
            <tr>
                <td>pause</td>
                <td>string</td>
                <td>"hover"</td>
                <td>Pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on mouseleave.</td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="marker" id="methods">
        <h3>Methods</h3>
        <h4>.carousel(options)</h4>
        <p>Initializes the carousel with an optional options <code>object</code> and starts cycling through items.</p>
    <pre class="prettyprint linenums">
    query('.carousel').carousel({
      interval: 2000
    })
    </pre>
        <br/>
        <table class="table table-bordered table-condensed">
            <thead>
            <tr>
                <th style="width: 100px;">Method</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>cycle</td>
                <td>Cycles through the carousel items from left to right.</td>
            </tr>
            <tr>
                <td>pause</td>
                <td>Stops the carousel from cycling through items.</td>
            </tr>
            <tr>
                <td>next</td>
                <td>Cycles to the next item.</td>
            </tr>
            <tr>
                <td>prev</td>
                <td>Cycles to the previous item.</td>
            </tr>
            <tr>
                <td>&lt;number></td>
                <td>Cycles the carousel to a particular frame (0 based, similar to an array).</td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="marker" id="events">
        <h3>Events</h3>
        <p>Bootstrap's carousel class exposes two events for hooking into carousel functionality.</p>
        <table class="table table-bordered table-condensed">
            <thead>
            <tr>
                <th style="width: 100px;">Event</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>slide</td>
                <td>This event fires immediately when the <code>slide</code> instance method is invoked.</td>
            </tr>
            <tr>
                <td>slid</td>
                <td>This event is fired when the carousel has completed its slide transition.</td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="marker" id="example">
        <h3>Example</h3>
        <p>The slideshow below shows a generic plugin and component for cycling through elements like a carousel.</p>
        <div class="bs-docs-example">
            <div id="myCarousel" class="carousel slide">
                <div class="carousel-inner">
                    <div class="item active">
                        <img src="{{baseUrl}}/img/carousel-01.jpg" alt="">
                        <div class="carousel-caption">
                            <h4>First Thumbnail label</h4>
                            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                        </div>
                    </div>
                    <div class="item">
                        <img src="{{baseUrl}}/img/carousel-02.jpg" alt="">
                        <div class="carousel-caption">
                            <h4>Second Thumbnail label</h4>
                            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                        </div>
                    </div>
                    <div class="item">
                        <img src="{{baseUrl}}/img/carousel-03.jpg" alt="">
                        <div class="carousel-caption">
                            <h4>Third Thumbnail label</h4>
                            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                        </div>
                    </div>
                    <div class="item">
                        <img src="{{baseUrl}}/img/carousel-04.jpg" alt="">
                        <div class="carousel-caption">
                            <h4>Fourth Thumbnail label</h4>
                            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                        </div>
                    </div>
                </div>
                <a class="left carousel-control" href="#myCarousel" data-slide="prev">&lsaquo;</a>
                <a class="right carousel-control" href="#myCarousel" data-slide="next">&rsaquo;</a>
            </div>
        </div>

        <div class="alert alert-warning">
            <strong>Heads up!</strong>
            When implementing this carousel, remove the images we have provided and replace them with your own.
        </div>
    </div>
{% endblock %}

{% block initscript %}
<script type="text/javascript" charset="utf-8">
    require([ 'dojo/query', '{{baseUrl}}/js/application.js', 'bootstrap/Carousel' ], function(q){
        q('#myCarousel').carousel();
    });
</script>
{% endblock %}
