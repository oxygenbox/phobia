const tools = require(`../myTools`);

const choices = function(attributes, data, type = `phobias`, tot = 3){
   
    let choiceArray = [];
    choiceArray.push(attributes.activePhobia.value)
    
    while(choiceArray.length < tot){
        
        let i = Math.floor(Math.random() * data[type].length);
        let value = data[type][i].value;
        if(choiceArray.indexOf(value) < 0){
            choiceArray.push(value) 
        }
    }
    const scrambledArray = tools.mixupArrayItems(choiceArray)
    //*
   // scrambledArray = choiceArray.slice();
    attributes.activePhobia.choices = scrambledArray.slice();
    return tools.makeArraySpeakable(scrambledArray);
    //*/

    return ` test choice ${scrambledArray}`
}

module.exports = choices