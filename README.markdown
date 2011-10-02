#readyBinder README

##What's the Problem?

Currently there are two common approaches to managing code for your document ready events:

The first approach is simply to have a single document ready handler which is the same on every page of your site. As you add more functionality to different parts of your website, your document ready handler will inevitably become less focused, more bloated and will start to include code which isn't relevant to every page. So this approach can be inefficient and a maintenance problem.

The second, more complex, approach involves generating highly-relevant document ready handlers on the server on a page-by-page basis. Whilst this approach this approach solves the maintenance issue, and keep handlers focused and efficient, it violates separation of concerns as it forces your back-end application to be aware of, and responsible for, purely front-end concerns (outputting javascript code). Also, you may forgo the benefits of client-side caching by including your document ready handlers inline in the page.

`readyBinder` allows you to have one document ready handler that can be used ubiquitously throughout your entire site, which aims to solve the issues relating to each of the above approaches and offer a consistent approach to document ready event management.

##How Does This Solve the Problem?

With `readyBinder`, everything is wired up declaratively on a per-page basis. This is achieved by specifying, on any attribute on any DOM element, which encapsulated pieces of logic you wish to to to execute for the current page. E.G.

    <body class="article">

You simply supply `readyBinder` with an object which contains functions encapsulating various pieces of document ready logic. Only code which has been declared relevant to the current page will be executed by `readyBinder` E.G.

    var handlers = {
        article : function() {
            // code specific to article pages here
        },
        landingPage : function() {
            // code specific to landing pages here
        }
        //etc.
    }

This means:

   * Your document ready handler will be more efficient, only executing code that is needed for the current page
   * You will have less maintenance overhead as the document ready handler isn't taken care of by server side code, and it is now very lean
   * A separation of concerns is achieved, because the server-side app no longer needs to be responsible for outputting document ready handlers
   * Finally you can avoid inline document ready handlers, keeping your markup clean and allowing for the use of client-side caching.

###A note on separation of concerns:
Whilst `readyBinder` eliminates the need for the server to output highly-focused document ready handlers per-page, the server must still be responsible for outputting the declarations for each page.

If, for instance, document ready functionality was grouped by type of page (e.g. certain pages always require specific pieces of javascript to be executed) then the server could output a body element with a class which semantically described the type of page being served (as seen in the example above). This means the approach does not violate separation of concerns as the server is simply outputting a semantic description of the page, and is in no way aware of the existence of javascript (and it especially doesn't need to know how to output valid javascript!).

If you wished for more fine-grained control over code (if there is variation even amongst "article" pages for instance),you could declare which types of functionality you need on this page e.g. `<body class="carousel">`. This effectively equates to two  at a page-level or at a "widget"-level.

##GREAT! So How Do I Use It?

The simplest use case is as follows:

    // assuming a previously defined "handlers" object
    // (e.g. as defined in the example above)
    $(function() {
        // this is the only document ready handler you'll ever need!
        $.`readyBinder`(handlers);
    }

By default `readyBinder` will look for declarations in the class attribute of the body element, but this can easily be changed to use any other attribute (HTML5 `data-*` attributes are ideal alternatives).