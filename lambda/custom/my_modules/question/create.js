const data = require(`../data`)
const choices = require(`./choices`)
const pool_maintenance = require(`./pool_maintenance`)

const create = function(attributes, type = `phobias`){
    pool_maintenance(attributes, data);

     const index = attributes.pool.phobias.shift();
     const tot = data.phobias.length;
     let obj = data[type][index]
    attributes.activePhobia = obj;
     
    let msg = `Your next fear is, ${`<break time="0.5s"/>`} ${obj.word}. `
     msg += `<break time="1s"/>`
     msg += `Is ${obj.word} the fear of `
     msg += `<break time="1s"/>`
    msg += choices(attributes, data);
    
     return msg;
}

module.exports = create;

