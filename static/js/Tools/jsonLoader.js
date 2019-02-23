function loadJSON(file, callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType('application/json');
    xhr.open('GET', file, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == '200') {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
}
export { loadJSON };
//# sourceMappingURL=jsonLoader.js.map