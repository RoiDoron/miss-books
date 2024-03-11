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
    getDefaultFilter
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
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title, description,thumbnail,amount,currencyCode,isOnSale) {
    return {  title, description,thumbnail,listPrice:{amount,currencyCode,isOnSale} }
}

function getFilterBy() {
    return {...gFilterBy}
}

function getDefaultFilter(){
   return {title: '', maxPrice:200}
}

function setFilterBy(filterBy = {}) {
     if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return filterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(car => car.id === bookId)
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

function _createBook(title, description,thumbnail,amount,currencyCode,isOnSale) {
    const book = getEmptyBook(title, description,thumbnail,amount,currencyCode,isOnSale)
    book.id = utilService.makeId()
    return book
}

