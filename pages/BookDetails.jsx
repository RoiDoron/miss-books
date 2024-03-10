
export function BookDetails({ book, onGoBack }) {
    return <section className="book-details">
        <button onClick={onGoBack}>Go back</button>
<h1>title:{book.title}</h1>
<h5>description:{book.description}</h5>
<h5>price:{book.listPrice.amount}</h5>
<img src={`assets/image/BooksImages/${book.thumbnail}`} />
    </section>
}