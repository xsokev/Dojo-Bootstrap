# Dojo-Bootstrap

An implementation of the excellent [Bootstrap](http://getbootstrap.com) framework using the [Dojo Toolkit](http://dojotoolkit.org). This project replaces the Bootstrap JavaScript components with AMD-compatible Dojo modules. Tested with Dojo 1.9.3 and Bootstrap 3.1.1.

## Quick Start

+ `git clone git://github.com/xsokev/Dojo-Bootstrap.git`
+ Add [dojo sdk](https://github.com/dojo) (or a symbolic link to the dojo sdk) under the vendor folder as follows:
```
└── vendor
    └── dojo
        ├── dojo
        └── util
```
+ Point your browser to `http://host/path/to/Dojo-bootstrap/tests/index.html`

## Integration

See examples in test/test_*.html

### In Brief
```
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Dojo-Bootstrap</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="path/to/bootstrap/styles.css">
        </head>
    
        <body>
            <button type="button" id="loading-button" class="btn btn-primary" data-loading-text="Loading...">Load</button>
        
            <script>
                var dojoConfig = {
                    async: 1,
                    packages: [
                        { name: "bootstrap", location: "path/to/Dojo-Bootstrap" }
                    ]
                };
            </script>
        
            <script type="text/javascript" src="path/to/dojo/dojo/dojo.js"></script>
    
            <script>
                require(["bootstrap/Button", "dojo/query"], function (Button, query) {
                    query("#loading-button").on("click", function(e){
                        query(e.target).button('loading');
                        setTimeout(function(){
                            query(e.target).button('reset');
                        }, 2000);
                    });
                });
            </script>
        </body>
    </html>
```
## Tests

Currently this project is in the process of transitioning from using DOH to using [the Intern](http://theintern.io/) to run the test suites. As test suites are converted to use the Intern, the DOH suites will be phased out.

### Intern Tests

To run the intern tests, you will need to first install the Intern by running the following at the command line:

`npm install`

**NOTE**: The Intern looks for Dojo to be installed under the `vendor` (see above).

#### Running the Intern Unit Test Suites

To run the Intern tests in a browser:

1. open your browser *and* the browser's console window
2. load `http://host/path/to/Dojo-bootstrap/node_modules/intern/client.html?config=tests/intern`

You should see something like: 

![screen shot 2014-06-27 at 7 47 55 pm](https://cloud.githubusercontent.com/assets/662944/3419594/b8ed8aa4-fe6e-11e3-9f53-d2e94b378aad.png)

#### Writing Intern Unit Test Suites

If you would like to help convert the remaining DOH unit test suites to the Intern, please note that [we are trying to simultaneously update the test suites so that their test data and conditions match the Bootsrap v3 test suites](https://github.com/xsokev/Dojo-Bootstrap/issues/97). We would appreciate help with this effort.

For more on writing tests with the Intern, see [the guide on the Intern wiki](https://github.com/theintern/intern/wiki/Writing-Tests-with-Intern). The current unit test suites use the [object style syntax](https://github.com/theintern/intern/wiki/Writing-Tests-with-Intern#object). For a step by step tutorial on getting started with the Intern, see [the Intern tutorial](https://github.com/theintern/intern-tutorial).

### DOH Tests

**NOTE**: The DOH tests expect the Dojo util package to be installed along with Dojo under the `vendor` (see above).

The easiest way to run the DOH test suites is to link to the DOH test runner from `tests/index.html` clicking the "Complete" link. You can also open it directly in a browser with:

`http://host/path/to/Dojo-bootstrap/vendor/dojo/util/doh/runner.html?test=../../../../tests/complete.js`

## Useful resources

+ [Dojo-Bootstrap Website with examples for all the modules](http://xsokev.github.io/Dojo-Bootstrap/)
+ [Dojo Reference Guide (latest release version)](http://dojotoolkit.org/reference-guide/)
+ [Dojo Reference Guide (Dojo trunk)](http://livedocs.dojotoolkit.org/)
+ [Bootstrap](http://getbootstrap.com/)
+ [The Intern](http://theintern.io/)
+ [The Intern Wiki](https://github.com/theintern/intern/wiki)

## License

Dojo Bootstrap is licensed under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
