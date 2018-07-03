﻿var Notes = [{
    id: 0,
    title: "First one",
    text: "long text here"
}, {
    id: 2,
    title: "Second one",
    text: "long text here"
}];

var ID = 0;

function Note(title, text) {
    this.title = title;
    this.text = text;
    this.id = ++ID;
}

//function addNoteRow(note) {
//    var noteRow = document.createElement("tr");
//    var title = document.createElement("td");
//    var text = document.createElement("td");
//    var id = document.createElement("td");

//    title.innerHTML = note.title;
//    text.innerHTML = note.text;
//    id.innerHTML = note.id;
//    noteRow.appendChild(title);
//    noteRow.appendChild(text);
//    noteRow.appendChild(id);
//    document.getElementsByTagName("table")[0].appendChild(noteRow);
//}


//function addNote(title, text) {
//    var note = new Note(title, text);
//    Notes.push(note);
//    addNoteRow(note);
//}

function h(tag, attributes, childNodes) {
    var element = document.createElement(tag);
    childNodes.forEach(c => {
        if (typeof c === 'string') {
           element.appendChild(document.createTextNode(c));
        } else {
           element.appendChild(c);
        }
    });
    for (let attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute]);
    }
    return element;
}

function createNote(note) {    
    return h('li', {}, [
        h('h2', {}, [note.title]),
        h('p', {}, [note.text])
     ]);
}

function createNotes() {
    return h('div', {}, [
        h('h1', {}, ['Notes']),
        h('ul', {}, Notes.map(n => createNote(n)))
    ]);
}


function addNote(note) {
    Notes.push(note);
    return createNotes();
}

function AddNotePage() {
    let titleInput = h('input', { type: "text", value: "Title" }, []);
    let textInput = h('textarea', { type: "text", value: "Text" }, ["Text"]);

    let addNoteLink = h('a', { href: "#" }, ["Add note"]);
    addNoteLink.onclick = function () { alert(titleInput.value) };

    this.render = function () {
        return h('div', {}, [titleInput, textInput, addNoteLink]);
    };
}

class EditSavePage {
    constructor(action) {
        this.action = action;
    }
    render() {
        let titleInput = h('input', { type: "text", value: "Title" }, []);
        let textInput = h('textarea', { type: "text", value: "Text" }, ["Text"]);

        let addNoteLink = h('a', { href: "#" }, ["Add note"]);
        addNoteLink.onclick = function () { alert(titleInput.value) };
        return h('div', {}, [titleInput, textInput, addNoteLink]);
    }
}

class AddNotePageC {
    
}

function addNotePage(root) {
    root.innerHTML = "";
    var addNotePage = new AddNotePageC();

    root.appendChild(addNotePage.render());

}

let root = document.getElementById('root');
root.appendChild(createNotes());
var noteLink = h('a', {onmouseover: "style='cursor: pointer'", onclick: "addNotePage(root)" }, ["Add note"]);
root.appendChild(noteLink);



//var newNote = new Note("NouaNotita", "Despre magari");

//addNote(newNote);

//root.getElementsByTagName('ul')[0].appendChild(addNote(newNote));
