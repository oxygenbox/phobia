
//-----------
/*INTERCEPTORS*/
const RequestPersistenceInterceptor = {
    async process(handlerInput){
      if(handlerInput.requestEnvelope.request.type === 'LaunchRequest'){
        //first visit grab data from db
        let persistentAttributes = await handlerInput.attributesManager.getPersistentAttributes();
        handlerInput.attributesManager.setSessionAttributes(persistentAttributes);
      }
      
      let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      
      if(Object.keys(sessionAttributes).length === 0) {
        const tools = require(`./tools`)
        tools.resetDB(sessionAttributes)
        //resetDB.call(this,sessionAttributes);
        handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
      }
    } 
  }
  
  const ResponsePersistantInterceptor = {
    async process(handlerInput){
       // Log Request
      console.log("==== REQUEST ======");
      console.log(JSON.stringify(handlerInput.requestEnvelope, null, 2));

      

      let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
      handlerInput.attributesManager.setPersistentAttributes(sessionAttributes);
      await handlerInput.attributesManager.savePersistentAttributes();
    }
  };


  const LogRequestInterceptor = {
    async process(handlerInput) {
     // if (debug) {
        console.log(`REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)}`);
    //  }
    }
  }
  
  const LoggingResponseInterceptor = {
    async process(handlerInput, response) {
     // if (debug) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    //  }
    }
  };
  





module.exports = {
    RequestPersistenceInterceptor,
    ResponsePersistantInterceptor,
    LogRequestInterceptor,
    LoggingResponseInterceptor
}