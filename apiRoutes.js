// const fs = require('fs');
// const router = require('express').Router();
// const { v4: uuidv4 } = require('uuid');
// router.get('/api/notes', (req, res) => {
//     let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
//     res.json(notes);
// });
// router.post('/api/notes', (req, res) => {
//     let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
//     let newNote = req.body;
//     newNote.id = uuidv4();
//     notes.push(newNote);
//     fs.writeFileSync('./db/db.json', JSON.stringify(notes));
//     res.json(notes);
// }); 
// router.delete('/notes/:id', (req, res) => { 
//     let notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
//     notes = notes.filter(note => note.id !== req.params.id);
//     fs.writeFileSync('./db/db.json', JSON.stringify(notes));
//     res.json(notes);
// }   
// );
// module.exports = router;   //exporting the router to be used in the server.js file