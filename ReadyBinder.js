(function ($) {

    var defaults =  {
        target : $("body"),
        attribute : "class",
        delimiter : " ",
        handlers : {}
    };

    function wireUp(options) {

        var settings, handlerKeys;

        settings = $.extend({}, defaults, options);
        handlerKeys = settings.target
                        .attr(settings.attribute)
                        .split(settings.delimiter);

        for (var i = 0; i < handlerKeys.length; i++) {

            var handler = settings.handlers[handlerKeys[i]];

            if (handler) {
                handler();
            }

        }

    }

    $.readyBinder = function(options) {

        //allow for selector as well as wrapped jQuery set
        if(typeof options.target === "string") {
            options.target = $(options.target);
        }

        wireUp(options);
    };

    $.fn.readyBinder = function(options) {
        wireUp(options);
    }

    $.fn.start.defaults = defaults;

})(jQuery);
