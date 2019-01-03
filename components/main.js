globalInfo = { tags: {}, items: [] }
globalView = 'CRM';
archiveInfo = [];
archivedTag = {href:""};
//TO-DO find alternative to this global used id
lastModified = new Date(0);

function saveItems() {
    $.post("utils.php", { requestType: "write", records: JSON.stringify(globalInfo), token: new Date().getTime() }, (data) => {
        console.log(data);
    });
}

function getTag(i) {
    return globalInfo.tags[i];
}

function getTagWithName(name) {
    for (key in globalInfo.tags)
        if (globalInfo.tags[key].name == name)
            return globalInfo.tags[key];

    return undefined;
}

function getTagsName(){
    var names = []
    for (key in globalInfo.tags)
        names.push(globalInfo.tags[key].name);
    return names;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function getLastId() {
    if (globalInfo.items.length == 0) return 0;
    return Math.max(...globalInfo.items.map(e => e.id));
}


function mapTagsProperty(property){
    var result = [];
    for (var k in globalInfo.tags){
        if (property in globalInfo.tags[k]) {
            result.push(globalInfo.tags[k][property]);
        }
    }

    return result;
}

function updateValue(a, b){
    return function (event, c) {
        if (event.target.type == "checkbox") {
            a[b] = event.target.checked;
        } else {
            a[b] = event.target.value.trim();
        }
        saveItems();
    }
    this.update();
}