{% set selected = "Scrollspy" %}
{% extends "layouts/page.swig" %}
{% block title %}{{selected|capitalize}}{% endblock %}
{% block content %}
<div class="marker" id="usage">
    <h3>Usage</h3>

    <h4>Via data attributes</h4>
    <p>To easily add scrollspy behavior to your topbar navigation, just add <code>data-spy="scroll"</code> to the element you want to spy on (most typically this would be the body) and <code>data-target=".navbar"</code> to select which nav to use. You'll want to use scrollspy with a <code>.nav</code> component.</p>
    <pre class="prettyprint html">&lt;body data-spy="scroll" data-target=".navbar"&gt;...&lt;/body&gt;</pre>

    <h4>Via JavaScript</h4>
    <p>Call the scrollspy via JavaScript:</p>
    <pre class="prettyprint linenums">query('#navbar').scrollspy()</pre>
    <br/>
    <div class="alert alert-info">
        <strong>Heads up!</strong>
        Navbar links must have resolvable id targets. For example, a <code>&lt;a href="#home"&gt;home&lt;/a&gt;</code> must correspond to something in the dom like <code>&lt;div id="home"&gt;&lt;/div&gt;</code>.
    </div>
</div>

<div class="marker" id="options">
    <h3>Options</h3>
    <p>Options can be passed via data attributes or JavaScript. For data attributes, append the option name to <code>data-</code>, as in <code>data-offset=""</code>.</p>
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
            <td>number</td>
            <td>10</td>
            <td>Pixels to offset from top when calculating position of scroll.</td>
        </tr>
        </tbody>
    </table>
</div>

<div class="marker" id="methods">
    <h3>Methods</h3>
    <table class="table table-bordered table-condensed">
        <thead>
        <tr>
            <th style="width: 100px;">Methods</th>
            <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>refresh</td>
            <td>When using scrollspy in conjunction with adding or removing of elements from the DOM, you'll need to call the refresh method like so:</td>
        </tr>
        <tr>
            <td colspan="2">
<pre class="prettyprint linenums">
query('[data-spy="scroll"]').forEach(function () {
  var queryspy = query(this).scrollspy('refresh')
});
</pre>
            </td>
        </tr>
        </tbody>
    </table>
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
            <td>activate</td>
            <td>This event fires whenever a new item becomes activated by the scrollspy.</td>
        </tr>
        </tbody>
    </table>
</div>

<div class="marker" id="examples">
    <h3>Example</h3>
    <p>The ScrollSpy plugin is for automatically updating nav targets based on scroll position. Scroll the area below the navbar and watch the active class change. The dropdown sub items will be highlighted as well.</p>
    <div class="bs-docs-example">
        <div id="navbar-example" class="navbar navbar-static">
            <div class="navbar-inner">
                <div class="container" style="width: auto;">
                    <a class="brand" href="#">Project Name</a>
                    <ul class="nav">
                        <li><a href="#fat">@fat</a></li>
                        <li><a href="#mdo">@mdo</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#one">one</a></li>
                                <li><a href="#two">two</a></li>
                                <li class="divider"></li>
                                <li><a href="#three">three</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div data-spy="scroll" data-target="#navbar-example" data-offset="0" class="scrollspy-example">
            <h4 id="fat">@fat</h4>
            <p>Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg hoodie minim qui you probably haven't heard of them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh artisan ullamco consequat.</p>
            <h4 id="mdo">@mdo</h4>
            <p>Veniam marfa mustache skateboard, adipisicing fugiat velit pitchfork beard. Freegan beard aliqua cupidatat mcsweeney's vero. Cupidatat four loko nisi, ea helvetica nulla carles. Tattooed cosby sweater food truck, mcsweeney's quis non freegan vinyl. Lo-fi wes anderson +1 sartorial. Carles non aesthetic exercitation quis gentrify. Brooklyn adipisicing craft beer vice keytar deserunt.</p>
            <h4 id="one">one</h4>
            <p>Occaecat commodo aliqua delectus. Fap craft beer deserunt skateboard ea. Lomo bicycle rights adipisicing banh mi, velit ea sunt next level locavore single-origin coffee in magna veniam. High life id vinyl, echo park consequat quis aliquip banh mi pitchfork. Vero VHS est adipisicing. Consectetur nisi DIY minim messenger bag. Cred ex in, sustainable delectus consectetur fanny pack iphone.</p>
            <h4 id="two">two</h4>
            <p>In incididunt echo park, officia deserunt mcsweeney's proident master cleanse thundercats sapiente veniam. Excepteur VHS elit, proident shoreditch +1 biodiesel laborum craft beer. Single-origin coffee wayfarers irure four loko, cupidatat terry richardson master cleanse. Assumenda you probably haven't heard of them art party fanny pack, tattooed nulla cardigan tempor ad. Proident wolf nesciunt sartorial keffiyeh eu banh mi sustainable. Elit wolf voluptate, lo-fi ea portland before they sold out four loko. Locavore enim nostrud mlkshk brooklyn nesciunt.</p>
            <h4 id="three">three</h4>
            <p>Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle rights whatever. Anim keffiyeh carles cardigan. Velit seitan mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean shorts, williamsburg hoodie minim qui you probably haven't heard of them et cardigan trust fund culpa biodiesel wes anderson aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh artisan ullamco consequat.</p>
            <p>Keytar twee blog, culpa messenger bag marfa whatever delectus food truck. Sapiente synth id assumenda. Locavore sed helvetica cliche irony, thundercats you probably haven't heard of them consequat hoodie gluten-free lo-fi fap aliquip. Labore elit placeat before they sold out, terry richardson proident brunch nesciunt quis cosby sweater pariatur keffiyeh ut helvetica artisan. Cardigan craft beer seitan readymade velit. VHS chambray laboris tempor veniam. Anim mollit minim commodo ullamco thundercats.
            </p>
        </div>
    </div>
    <br/>
    <div class="alert alert-info">The nav list on the right also uses the Scrollspy module.</div>
</div>


{% endblock %}

{% block initscript %}
<script type="text/javascript" charset="utf-8">
    require([ '{{baseUrl}}/js/application.js', 'bootstrap/Scrollspy', 'bootstrap/Dropdown' ]);
</script>
{% endblock %}
