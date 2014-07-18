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

See the [Tests wiki page](https://github.com/xsokev/Dojo-Bootstrap/wiki/Tests) for info on running and writing Dojo Bootstrap tests.

## Useful resources

+ [Dojo-Bootstrap Website with examples for all the modules](http://xsokev.github.io/Dojo-Bootstrap/)
+ [Dojo Reference Guide (latest release version)](http://dojotoolkit.org/reference-guide/)
+ [Dojo Reference Guide (Dojo trunk)](http://livedocs.dojotoolkit.org/)
+ [Bootstrap](http://getbootstrap.com/)

## License

Dojo Bootstrap is licensed under the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
