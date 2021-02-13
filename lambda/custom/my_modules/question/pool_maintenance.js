const tools = require(`../myTools`);

const pool_maintenance = function(attributes, data){
        //init properties if the dont exist
       
        if(!attributes.pool){
            attributes.pool = {
                phobias:[],
                celebs:[]
            }
        }
        
        const topicArray = [`phobias`, `celebs`];
        //loop through topic
        for(var i=0; i < topicArray.length; i++){
            
            let topic = topicArray[i];
            attributes.pool[topic] = []
            //if topic pool is empty fill it
           
            if(attributes.pool[topic].length < 1){
                let tot = data[topic].length;
               attributes.pool[topic] = [1, 2, 3, 4, 5, tot]
               attributes.pool[topic] = tools.scrambledNumberArray(tot);
            }
        } //end loop
    }

    module.exports = pool_maintenance;