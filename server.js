//required modules
const fs = require('fs');
const path = require('path');

//create server application
const app = express();
const PORT = process.env.PORT || 3001;

const { notes } = require('./Develop/data/data.json')
const express = require('express');

//read the url or json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('Develop/public'));

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults
}

function findById(id, notesArray) {
    let result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote (body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '.Develop/data/data.json'),
        JSON.stringify({notes: notesArray}, null, 2)
    )
    return note;
}

function validateNote (note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results);
})

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString()

    if(!validateNote(req.body)) {
        res.status(404).send('The note is not properly formatted. Please use text only.')
    } else {
        const note = createNewNote(req.body, notes)
        res.json(note);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});