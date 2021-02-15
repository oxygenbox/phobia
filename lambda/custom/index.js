
const Alexa = require('ask-sdk');
const data = require(`./my_modules/data`);
const interceptors = require(`./my_modules/interceptors`);
const lettersArray = [`a.`, `b.`, `c.`, `d.`, `e.`, `f.`, `g.`]
const score = require(`./my_modules/score`)
const tools = require(`./my_modules/myTools`);
const question = require(`./my_modules/question`);
const lastArrayItem = require('./my_modules/myTools/lastArrayItem');


/*
TODO
- hold on to question
- repeat intent
- celeb question
- score
- export
- first visit
- guess word as opposed to letters
- help
- fallback 
- reprompt

*/

//---------------
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        
        //score.reset(sessionAttributes)

        const delay = `<break time="0.5s"/>`
        let speakOutput = `So, What are you afraid of? `;
        speakOutput += delay
        speakOutput += `People are scared of all sorts of things. `;
        speakOutput += `Lets see how familiar you are with phobias. `
        speakOutput += delay + delay;
        speakOutput += question.create(sessionAttributes)
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//---------------
const AskPhobiaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AskPhobiaIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
        let speakOutput = `Ask Phobia Intent`;
        speakOutput += question.create(sessionAttributes)
        

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

//---------------
const AnswerPhobiaIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AnswerPhobiaIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const slotValue = tools.resolvedSlotValue(handlerInput.requestEnvelope, `fear`)
        let speakOutput = `Answer phobia intent. You sais ${slotValue}`;
        
        if(slotValue){
            if (slotValue.toLowerCase() === sessionAttributes.activePhobia.value){
                speakOutput += ` Thats is right ${sessionAttributes.activePhobia.word } `
                speakOutput += `is the fear of ${slotValue}`
            } else {
                speakOutput += `no that is wrong! `
            } 
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

//---------------
const GuessLetterIntentIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GuessLetterIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const slotValue = tools.resolvedSlotValue(handlerInput.requestEnvelope, `letter`)
        let speakOutput = `Guess letter intent ${slotValue}`;

        
        //const evaluatedAs =score.evaluate(sessionAttributes, slotValue)

        

        const index = lettersArray.indexOf(slotValue)
        if(index < 0 || index >= sessionAttributes.activePhobia.choices){
            speakOutput = `Sorry I did not get that! `
            speak += ` let me asked that again. `
        } else {
            const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()
            const choice  = sessionAttributes.activePhobia.choices[index];
            

            if(choice.toLowerCase() === sessionAttributes.activePhobia.value.toLowerCase()) {
                speakOutput = ` thats correct ${sessionAttributes.activePhobia.word} is the fear of ${sessionAttributes.activePhobia.value}. `
            } else {
                speakOutput += ` Sorry that  is incorrect. `
            }

            

            speakOutput += question.create(sessionAttributes)

           
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

//---------------
const ExamineWordIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ExamineWordIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes()

        let speakOutput = `Examine word intent`;

        if(sessionAttributes.activePhobia){
            let phobiaString = sessionAttributes.activePhobia.word
            speakOutput += ` the word is ${phobiaString}`
            let prefix = phobiaString.replace('phobia', ``);

           // speakOutput += ` the prefix is ${prefix} `
          //  speakOutput += ` slowed down <prosody rate="slow">${phobiaString}</prosody>`
           // speakOutput += ` even slower <prosody rate="x-slow">${phobiaString}</prosody>`
           speakOutput += ` OK, listen closely. `
            speakOutput += ` sixty percent <prosody rate="60%">${phobiaString}</prosody>`
            speakOutput += ` Alright one more time. `
            speakOutput += ` <prosody rate="50%">${phobiaString}</prosody>`
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

//---------------
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        let speakOutput = `Help intent called`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};



const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        let speakOutput = `Goodbye`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        let speakOutput = `Fallback intent called`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        let speakOutput = `'reflector intent called ${intentName})`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        let speakOutput = `Error HAndler called`;
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// 
exports.handler = Alexa.SkillBuilders.standard()
    .addRequestHandlers(
        LaunchRequestHandler,
        AskPhobiaIntentHandler,
        ExamineWordIntentHandler,
        AnswerPhobiaIntentHandler,
        GuessLetterIntentIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
        .addErrorHandlers(
            ErrorHandler)
        .withAutoCreateTable(true)
        .withTableName(`phobia-data`)
        .addRequestInterceptors(
            interceptors.RequestPersistenceInterceptor,
            interceptors.LogRequestInterceptor
        ).addResponseInterceptors(
            interceptors.ResponsePersistantInterceptor,
            interceptors.LoggingResponseInterceptor
        )
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();

//-----------
function getPhobiaChoices(attributes){
    const tot = 3
    let choiceArray = [];

    choiceArray.push(attributes.activePhobia.value)


    while(choiceArray.length < 3){
        let i = Math.floor(Math.random() * data.phobias.length);
        let value = data.phobias[i].value;
        if(choiceArray.indexOf(value) < 0){
            choiceArray.push(value) 
        }
    }
    const scrambledArray = tools.mixupArrayItems(choiceArray)
    attributes.activePhobia.choices = scrambledArray.slice();
    return tools.makeArraySpeakable(scrambledArray);
}

//-----------
function getCelebsChoices(attributes){
    const tot = 3
    let choiceArray = [];

    while(choiceArray.length < 3){
        let i = Math.floor(Math.random() * data.celebs.length);
        let value = data.celebs[i].name;
        if(choiceArray.indexOf(value) < 0){
            if(data.celebs[i].phobia != attributes.activePhobia.phobia){
                choiceArray.push(value) 
            } 
        }
    }
 
    const scrambledArray = tools.mixupArrayItems(choiceArray)
    attributes.activePhobia.choices = scrambledArray.slice();
    return tools.makeArraySpeakable(scrambledArray)

    /*
     {
              name: `Christina Ricci`,
            fear: `Indoor Plants`,
            phobia: `Botanophobia`,
            details: `Ricci admitted that touching a dirty houseplant is like torture. `
        },
    */
}

    //-----------------------
    /*
  
    */

     //-----------------------
     function celebQuestion(attributes){

        poolMaintainance.call(this, attributes);
 
         const index = attributes.pool.celebs.shift();
 
         const tot = data.celebs.length;
        // const index = Math.floor(Math.random() * tot)
        let obj = data.celebs[index]
        attributes.activePhobia = obj;
         
        //let msg = `Your next fear is, ${`<break time="0.5s"/>`} ${obj.word}. `
        let msg = `Which of these celebrities suffer from the fear of ${obj.fear}? `
         msg += `<break time="1s"/>`
         //msg += `Is it `
         //msg += `<break time="1s"/>`
         msg += getCelebsChoices.call(this, attributes);
         return msg;
     }

      function poolMaintainance(attributes){
        if(!attributes.pool){
            attributes.pool = {
                phobias:[],
                celebs:[]
            }
        }

        let topicArray = [`phobias`, `celebs`];
        for(var i=0; i < topicArray.length; i++){
            let topic = topicArray[i];
            
            if(attributes.pool[topic].length < 1){
                let tot = data[topic].length;
                //attributes.pool[topic]  = scrambleNumberArray(tot)
                attributes.pool[topic] = tools.scrambledNumberArray(tot);
            }
        }
        

    }
     
