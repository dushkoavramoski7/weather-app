export const replaceObjInArray = function (newObject, oldObject, array) {
    let index = array.findIndex(x => x === oldObject);
    let firstPart = array.slice(0, index);
    let secondPart = array.slice(index + 1);
    return [...firstPart, newObject, ...secondPart];
};

export const addElementToArrayIfNotExist = function (object, array) {
    if(array.filter(element => element === object).length === 0) {
        array.push(object)
    }
    return array
}

export const mostFrequent = function (array)
{
    if(array.length === 0)
        return null;
    let modeMap = {};
    let maxEl = array[0], maxCount = 1;
    for(let i = 0; i < array.length; i++)
    {
        let el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}