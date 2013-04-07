var dojoConfig = {
    async: 1,
    cacheBust: 1,
    parseOnLoad: false,
    tlmSiblingOfDojo: false,
    packages: [
        { name: "dojo", location: "../../dojo-sdk-1.8.3/dojo" },
        { name: "dijit", location: "../../dojo-sdk-1.8.3/dijit" },
        { name: "bootstrap", location: "http://dev.dojobootstrap.com/2x" },
        { name: "experimental", location: "http://dev.dojobootstrap.com/2x/experimental" },
        { name: "tests", location: "http://dev.dojobootstrap.com/2x/experimental/tests" }
    ]
};