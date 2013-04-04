var dojoConfig = {
    async: 1,
    cacheBust: 1,
    parseOnLoad: false,
    tlmSiblingOfDojo: false,
    packages: [
        { name: "dojo", location: "../../dojo-sdk-1.8.3/dojo" },
        { name: "dijit", location: "../../dojo-sdk-1.8.3/dijit" },
        { name: "bootstrap", location: "../../../2x" },
        { name: "tests", location: "http://dev.dojobootstrap.com/tests" }
    ]
};