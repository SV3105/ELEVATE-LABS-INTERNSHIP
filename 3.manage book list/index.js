const express = require('express');
const app = express();
const PORT = 3300;

app.use(express.json());

let books = []
let nextId = 1;

app.get('/books', (req, res) => {
    res.status(200).json(books); // 200 - OK
})

app.post('/books', (req, res) => {
    const {title, author} = req.body;

    if(!title || !author) {
        return res.status(400).json({ message : 'Title and author are required'}); // 400- bad req
    }

    const newBook = {id: nextId++, title, author};
    books.push(newBook);
    res.status(201).json(newBook) //201 - created status
})

app.put('/books/:id' , (req, res) => {
    const bookId = parseInt(req.params.id);
    const {title, author} = req.body;
    const book = books.find(b => b.id === bookId);
    if(!book){
        return res.status(404).json({ message: "Book not found"})
    } 

    if(title) book.title = title;
    if(author) book.author = author;

    res.status(200).json(book);
})

app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === bookId);
    if(index === -1){
        return res.status(404).json({ message : 'Book not found'});
    }

    books.splice(index, -1);
    res.status(204).send(); //204 - No content
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})