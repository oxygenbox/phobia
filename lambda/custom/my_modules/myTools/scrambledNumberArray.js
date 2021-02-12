const { LakeFormation } = require("aws-sdk");

const scrambledNumberArray = function(num) {
    let sourceArray = [];
    let newArray = [];
    //create an array with numberm zero tp num
    for (var i = 0; i < num; i++) {
      sourceArray.push(i);
    }
    
    //pull out random number  from source to build new array
    while (sourceArray.length > 0) {
     let index = Math.floor(Math.random() * sourceArray.length);
     let value = sourceArray[index];
     sourceArray.splice(index, 1);
     newArray.push(value);
    }
    return newArray;
  }


  module.exports = scrambledNumberArray;
