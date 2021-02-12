const data = require(`./data`);
const tools = require(`./tools`);

//-----------
// QUESTIONS
const question = {
    compose: function(attributes){
 
    },

    setActivePhobia: function(attributes) {
        if(!attributes.phobia.indexPool || attributes.phobia.indexPool.length < 1){
            attributes.phobia.indexPool = [];
            const  pool = tools.mixupArray(data.phobias.length).slice();

           
        }
    }
};
   
 
 
 
 
 
 module.exports = tools;





/*
const setActiveCast = function(attributes){
     if(!attributes.cast.pool || attributes.cast.pool.length < 1){
        attributes.cast.pool = [];
        const  pool = tools.mixupArray(data.cast.length).slice();
         for(var i = 0; i < pool.length; i++){
             let indexNum = pool[i];
             let typePool = tools.mixupArray(data.questionTypes.length);
             let castObj = {index: indexNum, types: typePool};
             attributes.cast.pool.push(castObj);
         } 
     }

     const castInfo = attributes.cast.pool.shift();
     const typeIndex = castInfo.types.shift();
     attributes.question.type = data.questionTypes[typeIndex];
     attributes.cast.index = castInfo.index;
     attributes.cast.active  = data.cast[attributes.cast.index];
     
     if(castInfo.types.length > 0){
        attributes.cast.pool.push(castInfo);
     }

    return attributes.cast.active
 };
*/