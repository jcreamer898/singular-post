(function() {
	
	const compuboxApiUrl = "https://beta.compuboxdata.com/api/event?api_key=d4e4a39452581c0bc2d9b5401923cd53&event_id=14981"

  // Function must return the init function. close is optional
  return {

    // the init function is called after the script has been evaluated
    // comp: the composition object the script is attached to
		// context: gives access to common objects
    init: function(comp, context) {
       console.log("Initialize Composition script " + comp.name);
       const fighter1 = comp.find("Fighter 1 Stats");
       const nameHolders1 = comp.find("Name Holders 1")[0];
       const nameHolders2 = comp.find("Name Holders 2")[0];
       
       fetch("https://beta.compuboxdata.com/api/event?api_key=d4e4a39452581c0bc2d9b5401923cd53&event_id=14981", {
	      	method: "GET",
	      	headers: {
	      		Accept: "application/json",
	      	},
	      })
      	.then((res) => {
      		return res.json()
      	})
      	.then((json) => {
      		const fighter1 = json.Events["14981"].fighter1;
      		const fighter2 = json.Events["14981"].fighter2;
      		nameHolders1.updateData({
						"Fighter Name 1": `${fighter1.firstname} ${fighter1.lastname}`,
					});
      		
					nameHolders2.updateData({
						"Fighter Name 2": `${fighter2.firstname} ${fighter2.lastname}`,
					});
      	});

      // this listener receives messages from graphics SDK
      // these messages are usually triggered by the "send message to JavaScript" option
      // in the event panel of the composer. 
      // widgets can also send custom messages to the composition script using the  
      // sendCustomMessage of the widget SDK
      comp.addListener('message', (event, msg, e) => {
        // check if event originates from this sub comp
        if (msg.params && msg.params.compId === comp.id) {

        }
        e.stopPropagation();
      });


      // when the animation state of this comp or a sub comp changes
      comp.addListener('state_changed', (event, msg, e) => {
        // check if event originates from this sub comp
        if (msg.compositionId === comp.id) {

        }
        e.stopPropagation();
      });


      // when the control nodes of this comp or a sub comp changes
      comp.addListener('payload_changed', (event, msg, e) => {
        // check if event originates from this sub comp
        if (msg.compositionId === comp.id) {
          // fetch the current control node data
          const payload = comp.getPayload2();


        }
        e.stopPropagation();
      });


      // when the payload of a datanode of this comp or a sub comp changes
      comp.addListener('datanode_payload_changed', (event, msg, e) => {
        e.stopPropagation();
      });


			// when the sub comp is animated In and Out we receive detailed events here
      comp.addListener('timeline_event', (event, msg, e) => {
        // check if event originates from this sub comp
        if (msg.compositionId === comp.id) {

        }
        e.stopPropagation();
      });
    },

    // the close function will be called when the script will be unloaded. 
    // use this function to cleanup timeouts, intervals, XHR request and so on
    close: function(comp, context) {
      console.log("Close Composition script " + comp.name);
    }
  };
})();

