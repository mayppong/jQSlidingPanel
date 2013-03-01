jQSlidingPanel

Hey gang,

This jQSlidingPanel is my test project for learning about jQuery design patterns, and unit-testing. The actual plug-in itself is just the jQSildingPanel.js and jQSildingPanel.css file. You can open up the demo.html file to see the what looks like. The two qUnit files are the testing I've done.

This is a pretty simple plugin and because of that, I think I could put more focus on learning the design pattern, the testing technique and the best practices. I'm not very good at giving version number but I feel (very emotionally) that this is not even worthy of being called an alpha product or I guess 0.1 for the inception is appropriate. 


What It Does:

	The plugin is called by 
		$(".panel").slidingPanel()
	It assumes that you have an HTML structure as follow:

		<div class="panel">
			<div class="panel-intro"> The portion that's always displayed. </div>
			<div class="panel-body"> The portion that's hidden. </div>
			<div class="panel-trigger"> Insert the trigger here. </div>
		</div>


Options:

	Currently the options are pretty limited and 

	delay               - the delay time for the sliding animation
	panelTriggerName    - the class name of the trigger
	panelIntroName      - the class name of the block of DOM that's always displayed
	panelBodyName       - the class name of the block of DOM that's hidden
	panelPosition       - the position of the panel (bottom, left, right, bottom)
	triggerHPosition    - trigger position (left, right)
	triggerVPosition    - trigger position (top, bottom)
	triggerSlide        - whether the trigger slide with the menu or not (boolean true, false)


	Here are the default options.

	delay               : 500,
	panelBodyName       : ".panel-body",
	panelIntroName      : ".panel-intro",
	panelTriggerName    : ".panel-trigger",
	panelPosition       : "top",
	triggerHPosition    : "right",
	triggerVPosition    : "bottom",
	triggerSlide        : true



To-Do:

	- Better default design
	- Validation for input options
	- Design testing method for events
	- Improve support for multiple instances (data storage)
	- Better procedure for destroying the plugin




