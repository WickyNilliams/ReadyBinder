(function ($) {

    var defaults =  {
        target : $("body"),
        attribute : "class",
        delimiter : " "
    };

    function wireUp(handlers, options) {

        var settings, handlerDeclarations, handler;

        handlers = handlers || {};
        settings = $.extend({}, defaults, options);
        handlerDeclarations = settings.target
                        .attr(settings.attribute)
                        .split(settings.delimiter);

        for (var i = 0; i < handlerDeclarations.length; i++) {
            handler = handlers[handlerDeclarations[i]];
            if (handler) {
                handler();
            }
        }
    }

    $.readyBinder = function(handlers, options) {
        options = options || {};

        if(typeof options.target === "string") {
            //allow for selector as well as wrapped jQuery set
            options.target = $(options.target);
        }

        wireUp(handlers, options);
    };

    $.fn.readyBinder = function(handlers, options) {

        options = options || {};
        options.target = this;
        wireUp(handlers, options);

        return this; //allow for method chaining
    };

    $.fn.readyBinder.defaults = defaults;

})(jQuery);
