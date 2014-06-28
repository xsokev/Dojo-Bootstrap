require({
    cacheBust: true,
    packages: [
        { name: 'bootstrap', location: '../../../' }
    ]
},[
    'bootstrap/tests/support',
    'bootstrap/tests/alert',
    'bootstrap/tests/button',
    'bootstrap/tests/dropdown',
    'bootstrap/tests/modal',
    // 'bootstrap/tests/popover',
    // 'bootstrap/tests/tab',
    'bootstrap/tests/tooltip',
    'bootstrap/tests/scrollspy',
    // 'bootstrap/tests/collapse',
    'bootstrap/tests/carousel'
], {});
