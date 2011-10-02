/*
this could be declared in a separate file or a previously
defined object - use revealing module pattern for bonus points ;-)
*/
var handlers = {

    // some trivial functionality
    time : function() {
        var $time = $(".time");
        var $target = $time.find("p");

        //pre-populate
        $target.text(new Date().toString());

        $time.find("button").click(function() {
            $target.text(new Date().toString());
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

    $.readyBinder(handlers, {
        target: $("html"), // our declarations are attached to the HTML element. note, we could pass a string selector instead
        attribute: "data-readyBinder", // we can use the HTML5 data-* attribute to house the declarations
        delimiter: ";" //our declarations are semicolon delimited
    });

    /*
    alternatively, use selector syntax.
    simply exclude the target property
    */
    // $("html").readyBinder(handlers, {
    //    attribute: "data-readyBinder",
    //    delimiter: ";"
    // });
});