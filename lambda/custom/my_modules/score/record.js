const reset = require(`./reset`)

const record = function(attributes, isCorrect){
    
    if(!attributes.score){
        reset(attributes)
    }

    if(isCorrect){
        attributes.score.points += 1;
        attributes.score.correct.push(1);
        attributes.score.track.push(1)
    } else {
        attributes.score.wrong.push(1);
        attributes.score.track.push(0)
    }

}

module.exports = record;