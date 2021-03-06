const router = require('express').Router();
const { filterByQuery, findById, createNewNote, validateNote } = require('../../lib/notes')
const { notes } = require('../../data/data')

router.get('/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results);
})

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString()

    if(!validateNote(req.body)) {
        res.status(404).send('The note is not properly formatted. Please use text only.')
    } else {
        const note = createNewNote(req.body, notes)
        res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => {  
    for(let i = 0; i < notes.length; i++) {
        res.send(notes[i]);
        notes.splice(i, 1)
        break;
    }
})

module.exports  = router;