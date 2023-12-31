import {useState, useEffect} from "react";
import axios from "axios";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
    };

    useEffect(() => {
        fetchBooks();
    }, [])

    const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title
        });

        let updatedBooks = [
            ...books,
            response.data
        ]
        setBooks(updatedBooks)
    };

    const deleteBookById = async (id) => {
        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });

        setBooks(updatedBooks)
    };

    const editBookById = async (id, newTitle) => {
        const updatedBooks = books.map((book) => {
                if(book.id === id) {
                    return {...book, title: newTitle}
                }
                return book;
        });
        setBooks(updatedBooks)
    }

    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList books={books} onEdit={editBookById} onDelete={deleteBookById}/>
            <BookCreate onCreate={createBook}/>
        </div>
    );
}

export default App;