// var $panel = $(".panel");
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




module( "Basic Creation and Destruction" );

	test( "Initialize Object", function() {

		$(".panel").slidingPanel();
		deepEqual( $(".panel").data("slidingPanel"), defaults, "Data saved to DOM" );

		$(".panel").slidingPanel({delay: 500});
		deepEqual( $(".panel").data("slidingPanel").delay, 500, "DOM data stores options" );

	});

	

	test( "Destroy Object", function() {
	  
		$(".panel").slidingPanel("destroy");
		deepEqual( $(".panel").data("slidingPanel"), undefined, "Data removed from DOM" );
		deepEqual( $(".panel").hasClass("panel-top"), false, "Default class removed from .panel element");

	});



module( "Work With Options" );

	test( "Retrieve Options", function() {

		$(".panel").slidingPanel();
		deepEqual( $(".panel").slidingPanel("options"), defaults, "Retrieved the options by passing options string" );
	
	});

	test( "Overwrite the Default Options After Initialization", function() {

		$(".panel").slidingPanel("destroy");
		$(".panel").slidingPanel();
		$(".panel").slidingPanel("options", {
			delay : 1000
		});
		deepEqual( $(".panel").slidingPanel("options").delay, 1000, "Over-write the default options after initialization" );
		deepEqual( $(".panel").data("slidingPanel").delay, 1000, "Over-write new options to data" );
		
	});

	

module( "Work With Clases" );

	test( "Check for Default Classes", function() {

		deepEqual( $(".panel").hasClass("panel-top"), true, "Panel has the default .panel-top class" );
		deepEqual( $(".panel-body").hasClass("hidden"), true, "Panel's body has the default hidden class" );
		deepEqual( $(".panel-trigger").hasClass("trigger-bottom"), true, "Panel's trigger has the default trigger-bottom class" );
		deepEqual( $(".panel-trigger").hasClass("trigger-right"), true, "Panel's trigger has the default trigger-right class" );

	});

	test( "Re-apply Classes After Setting new Options", function() {

		$(".panel").slidingPanel("options", {
			panelPosition : "bottom", 
			triggerVPosition : "top"
		});
		deepEqual( $(".panel").hasClass( "panel-top" ), false, "" );
		deepEqual( $(".panel").hasClass( "panel-bottom" ), true, "" );
		deepEqual( $(".panel-trigger").hasClass( "trigger-bottom" ), false, "Previous trigger class is removed" );
		deepEqual( $(".panel-trigger").hasClass( "trigger-top" ), true, "New trigger class is re-applied after setting new options" );

	});



module( "Working With Events" );

/*
	test( "Initial Default Event Attachment", function() {

		var panelBody = $(".panel-body");
		var panelTrigger = $(".panel-trigger");

		deepEqual( panelBody.css("height"), "0px");

		panelTrigger.click();
		notEqual( panelBody.css("height"), "0px");

		panelTrigger.click();
		deepEqual( panelBody.css("height"), "0px");

	});
*/