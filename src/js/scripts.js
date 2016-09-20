define('scripts', ['jquery'], function () {

    var ScriptsVar = {
        someVar: "hello world!"
    };

    var Scripts = {
        init: function () {
            Scripts.bindActions();
        },
        bindActions: function () {
            console.log(ScriptsVar.someVar);
        }
    };

    Scripts.init();
});
