//-------------
const mixupArrayItems = function(valueArray) {
    let sourceArray = [];
    let newArray = [];
    const tot = valueArray.length
    
    //create an array with numberm zero to tot
    for (var i = 0; i < tot; i++) {
      sourceArray.push(i);
    }
    //pull out random number  from source to build new array
    while (sourceArray.length > 0) {
     let index = Math.floor(Math.random() * sourceArray.length);
     let value = sourceArray[index];
     sourceArray.splice(index, 1);
     newArray.push(value);
    }

    //use newArray to decide order of mixedValues
    var mixedValues = [];
    for(var n = 0; n < newArray.length; n++){
      let pointer = newArray[n];
      mixedValues.push(valueArray[pointer])
    }

    return mixedValues;
  }

  module.exports = mixupArrayItems;