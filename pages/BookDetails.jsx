
export function BookDetails({ book, onGoBack }) {
    function getPageCount() {
        if (book.pageCount > 500) return 'serious reader'
        else if (book.pageCount > 200) return 'Descent reader'
        else return 'Light reader'
    }

    function getPublishAge() {
        if (book.publishedDate < new Date().getFullYear()-10) return 'Vintage'
         else if (book.publishedDate > new Date().getFullYear()-1) return 'New'
         else return ''
    }

    function getPriceClass(){
        if(book.listPrice.amount > 150) return 'red'
        else if(book.listPrice.amount < 20) return 'green'
        else return ''
    }

    return <section className="book-details">
        <button onClick={onGoBack}>Go back</button>
        <h1>title:{book.title}</h1>
        <h5>description:{book.description}</h5>
        <h5 className={getPriceClass()}>price:{book.listPrice.amount}</h5>
        <h5>pages:{book.pageCount} { getPageCount()}</h5>
        <h5>publish date: {book.publishedDate} {getPublishAge()}</h5>
        <img src={`assets/image/BooksImages/${book.thumbnail}`} />
    </section>
}