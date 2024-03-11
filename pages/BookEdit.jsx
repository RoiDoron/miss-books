
const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouter

import { bookService } from "../services/book.service.js"

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(null)
    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        console.log(bookService.get(bookId))
        bookService.get(bookId)
            .then(book => setBookToEdit(book))
            .catch(err => {
                console.log('Had problem loading book', err)
                navigate('/book')
            })

    }

    function onSaveBook(ev) {
        ev.preventDefault()

        bookService.save(bookToEdit)
            .then(savedBook => {
                navigate('/book')
                console.log(savedBook);
            })
            .catch(err => {
                console.log('Had problem saving book', err)

            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }
        if (target.name === 'amount') {
            console.log('hi');
            setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit,listPrice: { ...bookToEdit.listPrice, [field]: value }}))
        } else {
            setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, [field]: value }))
        }
       
    }
   
    if(!bookToEdit)return <div>loading</div>

    const { title, listPrice } = bookToEdit
    
    return <section className="book-edit">
        <form onSubmit={onSaveBook}>
            <label htmlFor="title"> Title:</label>
            <input
                type="text"
                id="title"
                placeholder="Enter title"

                name="title"
                onChange={handleChange}
                value={title}
            />

            <label htmlFor="amount"> Price:</label>
            <input
                type="number"
                id="amount"
                placeholder="Enter price"

                name="amount"
                onChange={handleChange}
                value={listPrice.amount}
            />
            <button>Save</button>
        </form>

    </section>
}