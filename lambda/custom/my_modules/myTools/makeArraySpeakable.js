const    lbls = require(`./labels.json`)

const  makeArraySpeakable = function(srcArray, labelType = `letters`) {
    const lastEntry = srcArray.pop();
    const labels = lbls[labelType]
    
    let msg = ``
    for(var i =0; i< srcArray.length; i++){
        
        msg += `${labels[i]} `;
        msg += srcArray[i];
        msg += `, `
    }
    msg += `or ${labels[srcArray.length]} `;
    msg +=  lastEntry
    return msg;
  }

  module.exports = makeArraySpeakable;