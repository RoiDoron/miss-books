import { BookPreview } from "./BookPreview.jsx";


export function BookList({ books, onSelectBook,onRemoveBook }) {
    return <ul className="book-list">

        {
            books.map(book => <li key={book.id}>
                <BookPreview
                    book={book}
                    onSelectBook={onSelectBook}
                />
                <button className="remove-btn" onClick={()=>onRemoveBook(book.id)}>X</button>
            </li>)
        }
    </ul>
}