function byId (id) {
    return document.getElementById(id);
}


function getToday () {
    return Math.floor(new Date().setHours(0,0,0,0) / 1000);
}


function getBeginningOfDay (date) {
    return Math.floor(new Date(date * 1000).setHours(0,0,0,0) / 1000);
}


function pad (s) {
    if (s < 10) {
        s = '0' + s;
    }
    return s;
}


function formatDate (date, format) {
    var yyyy = date.getFullYear();
    var MM = date.getMonth() + 1;
    var dd  = date.getDate();

    switch (format) {
        case 'YYYY-MM-DD':
            return yyyy + '-' + pad(MM) + '-' + pad(dd);
        case 'DD/MM/YYYY':
            return pad(dd) + '/' + pad(MM) + '/' + yyyy;
        case 'MM/DD/YYYY':
            return pad(MM) + '/' + pad(dd) + '/' + yyyy;
    }
}


function formatTime (time, format) {
    var hh = time.getHours();
    var mm = time.getMinutes();

    if (format === '12') {
        var ampm = hh >= 12 ? 'pm' : 'am';
        hh %= 12;
        hh = hh ? hh : 12;
        return pad(hh) + ':' + pad(mm) + ampm;
    }
    else {
        return pad(hh) + ':' + pad(mm);
    }
}


function downloadBlob (fileName, blob) {
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, fileName);
    }
    else {
        downloadUrl(URL.createObjectURL(blob), fileName);
    }
}


function downloadUrl (url, fileName) {
    var link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    setTimeout(function () {
        document.body.removeChild(link);
    }, 10000);
}


function getTableHeading () {
    var result = [PERIOD ? 'Time' : 'Destination'],
        pos = csBase.colPos;
    for (var i in pos) {
        result.push(COLUMNS[pos[i]]);
    }
    return result;
}
