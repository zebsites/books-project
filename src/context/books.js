// import createContext (and useState - but this is not part of context,
// it's just so we can share state across components
import { createContext, useState } from "react";
import axios from "axios";

// create the context object
const BooksContext = createContext();

// create the Provider
function Provider({ children }) {

  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books');
    setBooks(response.data);
  };

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
    await axios.delete(`http://localhost:3001/books/${id}`);
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks)
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle
    });
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return {...book, ...response.data}
      }
      return book;
    });
    setBooks(updatedBooks)
  };

  const valueToShare = {
    books,
    deleteBookById,
    editBookById,
    createBook,
    fetchBooks
  }

  return (
    <BooksContext.Provider value={valueToShare}>
        { children }
    </BooksContext.Provider>
  );
}

export { Provider };

// export the context object as default
export default BooksContext;
