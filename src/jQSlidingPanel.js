
// I wish I remember why I passed in window, document and undefined.
; (function( $, window, document, undefined ) {

  /**
   * This is the object holding all variables and method of the function
   * TODO:
   * Break the options out and move everything else as part of the prototype
   * it doesn't need to be initialized for each object.
   */
  var SlidingPanel = {

    /**
     * Object members for storing values
     * _default - default values set by May
     * _options - current options used by the plug-in
     */
    _defaults: {
      delay               : 500,
      panelBodyName       : ".panel-body",
      panelIntroName      : ".panel-intro",
      panelTriggerName    : ".panel-trigger",
      panelPosition       : "top",
      triggerHPosition    : "right",
      triggerVPosition    : "bottom",
      triggerSlide        : true
    },
    _options: { },

    /**
     * This function "initialize" the plug-in and apply options to the object. 
     * It then returns the DOM that's pass in back and not the SlidingPanel object. 
     * To allow for tracking of the SlidingPanel object as an instance, 
     * we write all the neccessary data to each DOM element using jQ's .data() with the title "slidingPanel".
     * 
     * @param   object  options
     *
     * @return  object  the DOM we're working on
     */
    init: function( options ) {
      // For some reason, options parameter isn't accessible from inside each()
      $.extend( SlidingPanel._options, SlidingPanel._defaults, options );
      SlidingPanel._applyOptions( this );

      return this.each( function( ) {
        // Make the options available
        var options = SlidingPanel.options();

        var data = $(this).data("slidingPanel");
        if( !data )
        {
          $(this).data( "slidingPanel", SlidingPanel._options );
        }

        //Check for existence of the panel structure
        if( ! $(options.panelTrigger, this) ) {
          
        }
      });
    },

    /**
     * The destroy function needs to be called explicitly. It doesn't get call
     * when the DOM element is removed. Not that it should matter since everything is 
     * store inside the DOM anyway.
     */
    destroy: function( ) {
      return this.each( function() {
        var options     = SlidingPanel._options;
        var thisPanel   = $(this);
        var thisBody    = $( options.panelBodyName, thisPanel );
        var thisTrigger = $( options.panelTriggerName, thisPanel );

        thisPanel.removeData("slidingPanel");

        thisPanel.removeClass("panel-top panel-bottom panel-left panel-right");

        thisBody.removeClass("hidden");

        thisTrigger.removeClass( "trigger-bottom trigger-fixed trigger-left trigger-right trigger-slide trigger-top" );

      });
    },
    
    /**
     * This function is for working with options of the slidingPanel instance.
     * 
     * @param   object  options if none, it will return the all of current options 
     * as an object otherwise, it will merge the input object with the current options.
     * 
     * @return  object  current options
     */
    options: function( options ) {
      if( typeof options === 'undefined' ) {
        return SlidingPanel._options;
      }
      else {
        return this.each( function() {
          $.extend( SlidingPanel._options, options );
          SlidingPanel._applyOptions( this );
          $(this).data( "slidingPanel", SlidingPanel._options );
        });
      }
    },


    /*****

      PRIVATE FUNCTIONS

      Gotchas: 
      Since the private methods aren't called by the main plugin $.fn.slidingPanel
      They don't have the element apply as part of the call with .apply( elements, arguments)
      !! Remember to pass the specific elements along !!

     *****/

    /**
     * This function should be called everytime the plug-in options changes
     * 
     */
    _applyOptions: function( thisPanel ) {

      SlidingPanel._applyClasses( thisPanel );
      SlidingPanel._attachEvents( thisPanel );

    },

    /**
     * This function is for applying CSS styling based on the options.
     * It should only be called from _applyOptions() and not called directly.
     * 
     * There has to be a way better for checking these classes...
     */
    _applyClasses: function( thisPanel ) {
      var options     = SlidingPanel.options();

      var thisPanel   = $( thisPanel );
      var thisBody    = $( options.panelBodyName, thisPanel );
      var thisTrigger = $( options.panelTriggerName, thisPanel );

      thisBody.addClass("hidden");

      switch( options.panelPosition ) {
        case "bottom":
          thisPanel.removeClass( "panel-left panel-right panel-top" );
          thisPanel.addClass( "panel-bottom" );
          break;
        case "left":
          thisPanel.removeClass( "panel-bottom panel-right panel-top" );
          thisPanel.addClass( "panel-bottom" );
          break;
        case "right":
          thisPanel.removeClass( "panel-bottom panel-left panel-top" );
          thisPanel.addClass( "panel-bottom" );
          break;
        case "top":
          thisPanel.removeClass( "panel-bottom panel-left panel-right" );
          thisPanel.addClass( "panel-top" );
          break;
      }
      
      switch( options.triggerSlide ) {
        case true:
          thisTrigger.removeClass( "trigger-notslide" );
          thisTrigger.addClass( "trigger-slide" );
          break;
        case false:
          thisTrigger.removeClass( "trigger-slide" );
          thisTrigger.addClass( "trigger-notslide" );
          break;
      }

      switch( options.triggerHPosition ) {
        case "left":
          thisTrigger.removeClass( "trigger-right" );
          thisTrigger.addClass( "trigger-left" );
          break; 

        case "right":
          thisTrigger.removeClass( "trigger-left" );
          thisTrigger.addClass( "trigger-right" );
          break;
      }

      switch( options.triggerVPosition ) {
        case "bottom":
          thisTrigger.removeClass( "trigger-top" );
          thisTrigger.addClass( "trigger-bottom" );
          break;
        case "top":
          thisTrigger.removeClass( "trigger-bottom" );
          thisTrigger.addClass( "trigger-top" );
          break;  
      }

    },

    /**
     * This attachEvents function is hacked together and doesn't have
     * much of a forethought put into. I also couldn't do unit testing on this.
     */
    _attachEvents: function( thisPanel ) {
      var options = SlidingPanel.options();

      // Attach trigger event for sliding
      $( options.panelTriggerName, thisPanel ).click( function() {
        $( options.panelBodyName, thisPanel ).toggleClass("hidden", options.delay);
      });
    }

  };

  /**
   * This is the actual function that interact with the users. 
   * Feels like it needs some kind of validation and checks just in case.
   */
  $.fn.slidingPanel = function( method ) {
    
    // if method passed to the function exists, 
    // call that method and pass the unlisted arguments to that method
    if ( SlidingPanel[method] ) {
      return SlidingPanel[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
    } 

    // Otherwise, if method is an object, 
    // initialize the plug in and pass the unlisted arguments to the init method
    else if ( typeof method === 'object' || !method ) {
      return SlidingPanel.init.apply( this, arguments );
    } 

    //
    else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.SlidingPanel' );
    }    
  };

// I wish I remember why the window and document was also passed in.
})( jQuery, window , document );
