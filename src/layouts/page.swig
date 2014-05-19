<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>{% block title %}{% endblock %} - Dojo Bootstrap</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Kevin Armstrong">
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{baseUrl}}/css/prettify.css">
    <link rel="stylesheet" href="{{baseUrl}}/css/styles.css">
    {% if selected == 'DatePicker' %}
        <link rel="stylesheet" href="{{baseUrl}}/css/datepicker.css">
    {% endif %}
    {% if selected == 'Marquee' %}
        <link rel="stylesheet" href="{{baseUrl}}/css/marquee.css">
        <link rel="stylesheet" href="{{baseUrl}}/css/marquee-example.css">
    {% endif %}
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <!-- fav and touch icons -->
    <link rel="shortcut icon" href="{{baseUrl}}/img/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144"
          href="{{baseUrl}}/css/img/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114"
          href="{{baseUrl}}/css/img/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72"
          href="{{baseUrl}}/css/img/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="{{baseUrl}}/css/img/ico/apple-touch-icon-57-precomposed.png">
</head>
<body class="page" data-spy="scroll" data-target="#page-nav" data-offset="0">
    <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="{{baseUrl}}">Dojo Bootstrap</a>
            </div>
            <ul class="nav navbar-nav"></ul>
            <ul class="nav navbar-nav pull-right">
                <li><a href="https://github.com/xsokev/Dojo-Bootstrap/zipball/master">
                    <i class="icon-download-alt"></i>Download v3.0</a></li>
            </ul>
        </div>
        <header class="jumbotron jumbotron-page subhead">
            <h2>{{ selected }} Module</h2>
        </header>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-2">
                <div style="position: relative;">
                    <div class="nav-header">Modules</div>
                    <ul id="menu" class="nav nav-list bs-docs-sidenav">
                        {% for menu in modules %}
                        {%   if menu == selected %}
                        <li class="active"><a href="#">{{menu}}</a></li>
                        {%   else %}
                        <li><a href="{{baseUrl}}/{{menu|lower}}.html">{{menu}}</a></li>
                        {%   endif %}
                        {% endfor %}
                    </ul>
                </div>
            </div>
            <div class="col-md-10">
                <div class="row-fluid">
                    <div class="col-md-9 container-body">
                    {% block content %}{% endblock %}
                    </div>
                    <div id="page-nav" class="col-md-3">
                        <ul class="nav nav-pills nav-stacked bs-page-sidenav affix">
                            <li><h1>{{ selected|title }}.js</h1></li>
                            <li class="menu-link-top"><a href="#"><i class="icon-arrow-up"></i>back to top</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="{{baseUrl}}/js/config.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/dojo/1.9.3/dojo/dojo.js"></script>
    <script src="{{baseUrl}}/js/prettify.js"></script>
    {% block initscript %}{% endblock %}
    <script type="text/javascript">
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-5131920-5']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    </script>
</body>
</html>