requirejs.config({
    baseUrl: './',
    paths: {
        jquery: 'vendor/jquery/dist/jquery.min',
        scripts: 'js/scripts'
    },
    config: {
        scripts: {
            deps: ['jquery']
        }
    }

});