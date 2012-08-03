require({
    baseUrl:'../',
    selectorEngine: 'acme',
    packages: [
        { name: 'dojo', location: './dojo' },
        { name: 'bootstrap', location: './bootstrap' }
    ],
    cache: {}
}, [ 'bootstrap' ]);