const fs = require('fs');
const util = require('util');
const readfromFile = util.promisify(fs.readFile);
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const path = require('path');
const app = express(); //creating an instance of express
const PORT = process.env.PORT || 3001; //setting the port to 3001

app.use(express.urlencoded({ extended: true }));
// Used when receiving JSON objects from a POST method
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, 'index.html')) })

app.get('/api/notes', (req, res) => {
    readfromFile('./db/db.json', 'utf8').then((data) => 
        res.json(JSON.parse(data))
    );

});
app.post('/api/notes', (req, res) => { 
    const { title, text } = req.body;
    if (title && text){
        const newNote = {
            title,
            text,
            id: uuidv4()
        };
        const response = {status: 'success', body: newNote};
        readfromFile('./db/db.json', 'utf8').then((data) => {
            const notes = JSON.parse(data);
            notes.push(newNote);
            fs.writeFileSync('./db/db.json', JSON.stringify(notes));
            res.json(notes);
        });
    }
    // readfromFile('./db/db.json', 'utf8').then((data) => {
    //     let notes = JSON.parse(data);
    //     let newNote = req.body;
    //     newNote.id = uuidv4();
    //     notes.push(newNote);
    //     fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    //     res.json(notes);
    // });
});
app.delete('/api/notes/:id', (req, res) => {
    readfromFile('./db/db.json', 'utf8').then((data) => {
        let notes = JSON.parse(data);
        notes = notes.filter(note => note.id !== req.params.id);
        fs.writeFileSync('./db/db.json', JSON.stringify(notes));
        res.json(notes);
    });
});
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});