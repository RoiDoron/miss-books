

export function BookPreview({book}){
    return <article  className="book-preview">
<h1>{book.title}</h1>
<img src={`assets/image/BooksImages/${book.thumbnail}`}/>
<h3>price:{book.listPrice.amount}</h3>

    </article>
}