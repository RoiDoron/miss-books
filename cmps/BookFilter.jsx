import { bookService } from "../services/book.service.js"

const { useState,useEffect } = React


export function BookFilter({onSetFilter,filterBy} ) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

useEffect(()=>{
    onSetFilter(filterByToEdit)
},[filterByToEdit])

function onFilter(ev){
    ev.preventDefault()
    onSetFilter(filterByToEdit)
}

    function handelChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'number') value = +value
        setFilterByToEdit(prevFilterBy => ({...prevFilterBy,[field]:value}))
    }



    return <section className="book-filter">
        <h2>Filter our books</h2>

        <form onSubmit={onFilter}>
            <label htmlFor="title">Title</label>
            <input type="text"
                id="title"
                name="title"
                value={filterByToEdit.title}
                onChange={handelChange}
                placeholder="By title"
            />

            <label htmlFor="price">Price</label>
            <input type="number"
                id="price"
                name="maxPrice"
                value={filterByToEdit.maxPrice}
                onChange={handelChange}
                placeholder="By max price"
            />
            <button>Filter</button>
        </form>

    </section>
}