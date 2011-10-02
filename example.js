/*
this could be declared in a separate file or a previously
defined object - revealing module pattern for bonus points ;-)
*/
var handlers = {

    //some trivial functionality
    time : function() {
        var $time = $(".time");
        $time.find("button").click(function() {
            $time.find("p").text(new Date().toString());
        });
    },

    saySomething : function() {
        var $say = $(".say");
        $say.find("button").click(function(){
            var toSay = $say.find("input").val();
            $say.find("p").text(toSay);
        })
    }
};

/*
with readyBinder you can have one
document ready handler which will never
need to be changed (unless you want to reconfigure),
and only the code you need to execute is executed.

everything is wired up declaratively, by specifying
the names of functions to execute on any attribute
on any element.

this means you no longer need server-side logic to
spit out a relevant ready handler per page - your handler
is now a write-once affair
*/
$(function() {

    $.readyBinder({
        target: $("html"), // our declarations are attached to the HTML element. note, we could pass a string selector instead
        attribute: "data-readyBinder", // we can use the HTML5 data-* attribute to house the declarations
        delimiter: ";", //our declarations are semicolon delimited
        handlers : handlers
    });

    /*
    alternatively, use selector syntax.
    simply exclude the target property
    */
    // $("html").readyBinder({
    //    attribute: "data-readyBinder",
    //    delimiter: ";",
    //    handlers : handlers
    // });
});