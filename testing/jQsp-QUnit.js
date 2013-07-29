// var $panel = Panel;
var defaults = {
	delay               : 500,
    panelBodyName       : ".panel-body",
    panelIntroName      : ".panel-intro",
    panelTriggerName    : ".panel-trigger",
    panelPosition       : "top",
    triggerHPosition    : "right",
    triggerVPosition    : "bottom",
    triggerSlide        : true
};
var Panel = $(".panel");



module( "Basic Creation and Destruction" );

	test( "Initialize Object", function() {

		Panel.slidingPanel();
		deepEqual( Panel.data("slidingPanel"), defaults, "Data saved to DOM" );

		Panel.slidingPanel({delay: 500});
		deepEqual( Panel.data("slidingPanel").delay, 500, "DOM data stores options" );

	});

	test( "Destroy Object", function() {
	  
		Panel.slidingPanel("destroy");
		deepEqual( Panel.data("slidingPanel"), undefined, "Data removed from DOM" );
		deepEqual( Panel.hasClass("panel-top"), false, "Default class removed from .panel element");

	});



module( "Work With Options" );

	test( "Retrieve Options", function() {

		Panel.slidingPanel("destroy");
		Panel.slidingPanel();
		deepEqual( Panel.slidingPanel("options"), defaults, "Retrieved the options by passing options string" );
		
	});

	test( "Overwrite the Default Options After Initialization", function() {

		Panel.slidingPanel("options", {
			delay : 1000
		});
		deepEqual( Panel.slidingPanel("options").delay, 1000, "Over-write the default options after initialization" );
		deepEqual( Panel.data("slidingPanel").delay, 1000, "Over-write new options to data" );
		
	});

	

module( "Work With Clases" );

	test( "Check for Default Classes", function() {

		Panel.slidingPanel("destroy");
		Panel.slidingPanel();
		deepEqual( Panel.hasClass("panel-top"), true, "Panel has the default .panel-top class" );
		deepEqual( $(".panel-trigger").hasClass("trigger-bottom"), true, "Panel's trigger has the default trigger-bottom class" );
		deepEqual( $(".panel-trigger").hasClass("trigger-right"), true, "Panel's trigger has the default trigger-right class" );
	
	});

	test( "Re-apply Classes After Setting new Options", function() {

		Panel.slidingPanel("options", {
			panelPosition : "bottom", 
			triggerVPosition : "top"
		});
		deepEqual( Panel.hasClass( "panel-top" ), false, "" );
		deepEqual( Panel.hasClass( "panel-bottom" ), true, "" );
		deepEqual( $(".panel-trigger").hasClass( "trigger-bottom" ), false, "Previous trigger class is removed" );
		deepEqual( $(".panel-trigger").hasClass( "trigger-top" ), true, "New trigger class is re-applied after setting new options" );
	
	});



module( "Working With Events" );
	/*
	test( "Initial Default Event Attachment", function() {

		Panel.slidingPanel("destroy");
		Panel.slidingPanel();

		var panelBody = $(".panel-body");
		var panelTrigger = $(".panel-trigger");
		var delay = Panel.data("slidingPanel").delay;
		
		deepEqual( panelBody.css("display"), "none");

		panelTrigger.click(); 
		deepEqual( panelBody.css("display"), "block");

		panelTrigger.click();
		deepEqual( panelBody.css("display"), "none");
		
	});*/
