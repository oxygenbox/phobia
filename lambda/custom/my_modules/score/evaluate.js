
const record = require(`./record`)

const evaluate = function(attribute, slotValue) {
    const lettersArray = [`a.`, `b.`, `c.`, `d.`, `e.`, `f.`, `g.`]
    const index = lettersArray.indexOf(slotValue)
    //invalid response
    if(index < 0 || index >= attribute.activePhobia.choices){ 
        return "invalid"
    } 

    const choice  = attribute.activePhobia.choices[index];
    if(choice.toLowerCase() !== attribute.activePhobia.value.toLowerCase()) {
        record(attribute, false)
        return `wrong `
    }
        record(attribute, true)

        return `correct `
}

module.exports = evaluate;



