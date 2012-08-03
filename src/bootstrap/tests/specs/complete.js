require({
    packages: [ { name: 'bootstrap', location: '../bootstrap' } ]
},[
    'bootstrap/tests/specs/support',
    //'bootstrap/tests/specs/alert',
    'bootstrap/tests/specs/button', 
    'bootstrap/tests/specs/dropdown', 
    'bootstrap/tests/specs/modal', 
    'bootstrap/tests/specs/popover', 
    'bootstrap/tests/specs/tab', 
    'bootstrap/tests/specs/tooltip', 
    'bootstrap/tests/specs/scrollspy', 
    'bootstrap/tests/specs/collapse'
], {});
