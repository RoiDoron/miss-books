const { useState, useEffect } = React

import { bookService } from "../services/book.service.js";


export function AddReview({ book, setBook }) {
    const [review, setReview] = useState()

    function onAddReview(ev) {
        ev.preventDefault()
        bookService.addReview(book.id, review)
            .then((book) => {
                setBook(book)
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
        setReview(prevReview => ({ ...prevReview, [field]: value }))
        console.log(review);

    }

    return <section className="book-edit">
        <h3>review</h3>
        <form onSubmit={onAddReview}>
            <label htmlFor="name">Full name</label>
            <input
                type="text"
                id="name"
                placeholder="Full name"

                onChange={handleChange}
                name="fullName"
            // value={review.fullName}
            />
            <label htmlFor="rating">Rating</label>
            <input
                type="range"
                min="1"
                max="5"
                id="rating"
                placeholder="Rating"

                onChange={handleChange}
                name="rating"
            // value={review.rating}
            />
            <label htmlFor="readAt">Reding date</label>
            <input
                type="date"
                id="readAt"
                placeholder="Rating"

                onChange={handleChange}
                name="readAt"
            // value={review.readAt}
            />
            <button>submit</button>
        </form>
    </section>
}