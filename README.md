Dojo-Bootstrap
==============

An implementation of the excellent [Twitter Bootstrap](http://twitter.github.com/bootstrap/) framework using Dojo. It is a port of version 2.1.0.

This implementation allows you use the javascript components of Twitter Bootstrap without the need to include jQuery. It also takes advantage of AMD, allowing you to easily use in your page only the modules that you need and create a single deployable script for production.

This project has been tested with [Dojo 1.8.0](http://dojotoolkit.org/download/).

Quick Start
-----------

First clone the repository using `git clone --recursive`.

Add a script tag that links to your base dojo.js file.
<pre>
&lt;script data-dojo-config="async: 1, tlmSiblingOfDojo: 0, isDebug: 1" src="PATH_TO_SCRIPTS/dojo/dojo.js"></script>
</pre>
At the bottom of your page, add the following code:

<pre>
	require({  
	    packages: [  
	        { name: 'dojo', location: 'PATH_TO_SCRIPTS/dojo' },  
	        { name: 'bootstrap', location: 'PATH_TO_SCRIPTS/bootstrap' }  
	    ]  
	}, [   
		'bootstrap/Button',  
		'dojo/domReady!'  
	], function(){  
	  
	});  
</pre>

You can also place this code in a separate script (recommended) that serves as the main entry script for your page.
<pre>
&lt;script src="PATH_TO_SCRIPTS/application.js" type="text/javascript"></script>
</pre>

Useful resources
----------------

* [Dojo Reference Guide (latest release version)](http://dojotoolkit.org/reference-guide/)
* [Dojo Reference Guide (Dojo trunk)](http://livedocs.dojotoolkit.org/)
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/)

License
-------

Dojo Bootstrap is licensed under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)