const { Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx";


export function BookList({ books, onSelectBook,onRemoveBook }) {
    if (!books.length) return <div className="no-books-found">No books found</div>   

    return <ul className="book-list">
     
        {
            books.map(book => <li key={book.id}>
                <BookPreview
                    book={book}
                    onSelectBook={onSelectBook}
                />
                <Link to={`/book/edit/${book.id}`}><button>Edit book</button></Link>
                <button className="remove-btn" onClick={()=>onRemoveBook(book.id)}>X</button>
            </li>)
        }
    </ul>
}