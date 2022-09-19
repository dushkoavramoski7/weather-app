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

export const formatAMPMHours = function (date) {
    let hours = date.getUTCHours();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    return hours + ' '+ ampm;
}

export const formatAMPMHoursAndMinutes = function (date) {
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let ampm = hours >= 12 ? 'AM' : 'PM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}