const reset = function(attributes){
    attributes.score  = {
        points: 0,
        correct:[],
        wrong:[],
        track:[]
    }
}

module.exports = reset;