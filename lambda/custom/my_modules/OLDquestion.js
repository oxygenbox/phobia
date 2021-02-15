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


*/