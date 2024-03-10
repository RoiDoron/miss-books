const { useState, useEffect } = React
import { bookService } from "../services/book.service.js"

import { BookList } from "../cmps/BooksList.jsx"

import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)
    // console.log(bookService.getDefaultFilter());
    // const [filterBy, setFilterBY] = useState(bookService.getDefaultFilter())
    useEffect(() => {
        loadBooks()
    },
        [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then((books) => {
                setBooks(books)
            })
    }

    function onSelectBook(book) {
        console.log(book);
        setSelectedBook(book)
    }

    function onSetFilter(fieldsToUpdate) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...fieldsToUpdate }))
    }

    if (!books) return <div>loading...</div>
    return <section className="book-index">
        {
            !selectedBook && <React.Fragment>
                <BookFilter
                    onSetFilter={onSetFilter}
                    filterBy={filterBy}
                />
                <BookList
                    books={books}
                    onSelectBook={onSelectBook}
                />
            </React.Fragment>
        }
        {
            selectedBook && <BookDetails
                book={selectedBook}
                onGoBack={() => onSelectBook(null)}
            />
        }
    </section>
}