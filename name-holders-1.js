(function() {

  // Function must return the init function. close is optional
  return {

    // the init function is called after the script has been evaluated
    // comp: the composition object the script is attached to
		// context: gives access to common objects
    init: function(comp, context) {
    	// const fighterName = comp.findWidget("Fighter Name 1");
    	// console.log(fighterName)
      comp.updateData = (data) => {
      	comp.setPayload({
      		"Fighter Name 1": data["Fighter Name 1"],
      		
      	});
      }
    },

    // the close function will be called when the script will be unloaded. 
    // use this function to cleanup timeouts, intervals, XHR request and so on
    close: function(comp, context) {
      console.log("Close Composition script " + comp.name);
    }
  };
})();
