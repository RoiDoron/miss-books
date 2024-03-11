import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

import { gBooks } from './bookData.service.js'

const BOOK_KEY = 'bookDB'
// var gFilterBy = {txt: '', minSpeed: 0}
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy,
    getDefaultFilter,
    addReview,
    removeReview
}
window.bs = bookService

function query(filterBy = getDefaultFilter()) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            console.log(books);

            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount <= filterBy.maxPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => _setNextPrevBookId(book))
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        book = _createBook(book.title, book.listPrice.amount)
        console.log(book);

        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title, description, thumbnail, amount, currencyCode, isOnSale, pageCount, publishedDate) {
    return { title, publishedDate, description, pageCount, thumbnail, listPrice: { amount, currencyCode, isOnSale } }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function getDefaultFilter() {
    return { title: '', maxPrice: 200 }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return filterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = gBooks
        // books.push(_createBook('harry poter','wizrds book','1.jpg',109,'EUR',false))
        // books.push(_createBook('harry poter 2','wizrds book','2.jpg',10,'EUR',true))
        // books.push(_createBook('harry poter 3','wizrds book','3.jpg',85,'EUR',false))

        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, amount, description = utilService.makeLorem(100), thumbnail = getRandomPic(), currencyCode = "EUR", isOnSale = false, pageCount = utilService.getRandomIntInclusive(100, 1000), publishedDate = utilService.getRandomIntInclusive(1980, 2024)) {
    const book = getEmptyBook(title, description, thumbnail, amount, currencyCode, isOnSale, pageCount, publishedDate)
    book.id = utilService.makeId()
    return book
}

function getRandomPic() {
    return `${utilService.getRandomIntInclusive(1, 20)}.jpg`
}

function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}

function addReview(bookId, review) {
    const book = get(bookId)
        .then((book) => {
            if (!book.review) book.review = []
            book.review.push(review)
            save(book)
            console.log(book);
            return book
        })
    return book
}

function removeReview(bookId, index) {
    const book = get(bookId)
        .then((book) => {
            book.review.splice(index, 1)
            save(book)
            console.log(book);
            return book
        })
        return book
}
