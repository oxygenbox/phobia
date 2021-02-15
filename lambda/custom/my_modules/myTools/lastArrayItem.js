const lastArrayItem = function(srcArray) {
    const tot = srcArray.length
    if(tot > 0){
        return srcArray[tot-1];
    }

    return null
};

module.exports = lastArrayItem;




