import { AddReview } from "../cmps/AddReview.jsx"
import { LongTxt } from "../cmps/LongTxt.jsx"
import { Review } from "../cmps/Review.jsx"
import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM


export function BookDetails() {

    const [isLoading, setIsLoading] = useState(true)
    const [book, setBook] = useState(null)
    const [index, setIndex] = useState(0)
    const { bookId } = useParams()
    console.log(book);
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
        
    }, [bookId])

    function loadBook() {
        setIsLoading(true)
        bookService.get(bookId)
            .then(book => setBook(book))
            .catch(err => {
                console.log('Had problem loading book', err)
                navigate('/book')
            })
            .finally(() => {
                setIsLoading(false)
            })


    }

    function getPageCount() {
        if (book.pageCount > 500) return 'serious reader'
        else if (book.pageCount > 200) return 'Descent reader'
        else return 'Light reader'
    }

    function getPublishAge() {
        if (book.publishedDate < new Date().getFullYear() - 10) return 'Vintage'
        else if (book.publishedDate > new Date().getFullYear() - 1) return 'New'
        else return ''
    }

    function getPriceClass() {
        if (book.listPrice.amount > 150) return 'red'
        else if (book.listPrice.amount < 20) return 'green'
        else return ''
    }

    function onRemoveReview(index) {
        bookService.removeReview(bookId,index)
        .then((book)=>{
            setBook(book)
        })
        
    }
    if (isLoading) return <div>Loading details..</div>
    const { review } = book

    return <section className="book-details">
        
        <h1>title:{book.title}</h1>
        <h5>description:<LongTxt txt={book.description}/></h5>
        <h5 className={getPriceClass()}>price:{book.listPrice.amount} {book.listPrice.isOnSale?'On Sale!':''}</h5>
        <h5>pages:{book.pageCount} {getPageCount()}</h5>
        <h5>publish date: {book.publishedDate} {getPublishAge()}</h5>
        <img src={`assets/image/BooksImages/${book.thumbnail}`} />
        {book.review ? <ul className="book-list">

            {
                review.map((review,index) => <li key={review.fullName + book.id}>
                    <Review review={review} />
                    <button className="remove-btn" onClick={() => onRemoveReview(index)}>X</button>
                    
                </li>)
            }
        </ul> : <div></div>}

        <AddReview book={book} setBook={setBook}/>

        <div className="flex justify-between">
            <Link to={`/book/details/${book.prevBookId}`}><button>Prev</button></Link>
            <Link to={`/book/edit/${book.id}`}><button>Edit book</button></Link>
            <Link to={`/book/details/${book.nextBookId}`}><button>Next</button></Link>
        </div>

    </section>
}