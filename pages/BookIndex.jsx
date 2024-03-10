const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BooksList.jsx"
import { BookDetails } from "./BookDetails.jsx"

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [selectedBook, setSelectedBook] = useState(null)
    useEffect(() => {
        loadBooks()
    },
        [])

    function loadBooks() {
        bookService.query()
            .then((books) => {
                setBooks(books)
            })
    }

    function onSelectBook(book) {
        console.log(book);
        setSelectedBook(book)
    }

    if (!books) return <div>loading...</div>
    return <section className="book-index">
       { 
       !selectedBook && <React.Fragment>

        <BookList
            books={books}
            onSelectBook={onSelectBook}
            />
            </React.Fragment>
        }
        {
            selectedBook && <BookDetails
            book={selectedBook}
            onGoBack={()=> onSelectBook(null)}
            />
        }
    </section>
}