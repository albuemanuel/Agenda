var Notes = [];

function importNotes(notesJSON) {
    var notes = [];
    notesJSON.forEach(note => 
        notes.push(new Note(note.title, note.text, note.id))
    );
    return notes;
}

//var ID = 1;

function Note(title, text, id) {
    this.title = title;
    this.text = text;
    this.id = id;
}

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
        if (typeof (attributes[attribute]) === 'function') {
            element[attribute] = attributes[attribute];
        } else {
            element.setAttribute(attribute, attributes[attribute]);
        }
    }
    return element;
}

function createNote(note) {    
    return h('div', {}, [
        h('li', {}, [
            h('h2', {}, [note.title]),
            h('p', {}, [note.text]),
        ]),
        h('a', {
            href: "",
            onclick: (e) => {
                editNotePage(note);
                e.preventDefault();
            }
        }, ["Edit"]),
        h('a', {
            href: "",
            onclick: (e) => {
                deleteNotePage(note);
                e.preventDefault();
            }
        }, [" Delete"])
    ]);
}

function createNotes() {
    return h('div', {}, [
        h('h1', {}, ['Notes']),
        h('ul', {}, Notes.map(n => createNote(n)))
    ]);
}


async function addNote(note) {
    root.appendChild(h('h2', {}, ["Processing..."]));
    await timeout(500);
    Notes.push(note);
    await postData('./home/create', note);
    StartUp();
}

async function deleteNote(note) {
    root.appendChild(h('h2', {}, ["Processing..."]));
    await timeout(500);
    Notes.splice(Notes.indexOf(note), 1);
    await postData('./home/delete', note);
    StartUp();
}

async function editNote(note) {
    root.appendChild(h('h2', {}, ["Processing..."]));
    await timeout(500);
    await postData('./home/edit', note);
    StartUp();
}

class EditAddPage {
    constructor(action, note, nameOfAction = "default") {
        this.action = action;
        this.note = note;
        this.nameOfAction = nameOfAction;
    }

    save(title, text) {
        this.note.title = title;
        this.note.text = text;
        this.action(this.note);
    }

    render() {
        let me = this,
            addNoteLink = h('a', { href: "#" }, [`${this.nameOfAction}`]),
            textInput = h('textarea', { }, [this.note.text]),
            titleInput = h('input', { type: "text", value: this.note.title }, []),
            br = h('br', {}, []),
            br2 = h('br', {}, []);

        addNoteLink.onclick = () => me.save(titleInput.value, textInput.value);
        return h('div', {}, [titleInput, br, br2, textInput, addNoteLink]);
    }
}

function addNotePage() {
    root.innerHTML = "";
    var addNotePage = new EditAddPage(
        addNote,
        new Note("Title", "Text"),
        "Create"
    );

    root.appendChild(addNotePage.render());
    root.appendChild(h('a', { href: "", onclick: () => StartUp() }, ["Cancel"]));

}

function editNotePage(note) {
    root.innerHTML = "";
    var addNotePage = new EditAddPage(editNote, note, "Edit");

    root.appendChild(addNotePage.render());
    root.appendChild(h('a', { href: "", onclick: () => StartUp() }, ["Cancel"]));
}



function deleteNotePage(note) {
    root.innerHTML = "";
    var addNotePage = new EditAddPage(deleteNote, note, "Delete");

    root.appendChild(addNotePage.render());
    root.appendChild(h('a', { href: "", onclick: () => StartUp() }, ["Cancel"]));
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getData() {
    await timeout(500);
    const x = await fetch('http://localhost:51675/home/all');
    const info = await x.json();
    Notes = importNotes(info);
    StartUp();
}

function StartUp() {
    let root = document.getElementById('root');
    root.innerHTML = "";
    root.appendChild(createNotes());
    var addNoteLink = h('a', { href: "#", onclick: "addNotePage()" }, ["Add note"]);
    root.appendChild(addNoteLink);
}

const postData = (url = ``, data = {}) => {
    // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        //mode: "cors", // no-cors, cors, *same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => response.json()) // parses response to JSON
        .catch(error => console.error(`Fetch Error =\n`, error));
};

root.appendChild(h('h2', {}, ["Loading..."]));
getData();


