const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { Home } from './pages/Home.jsx'

export function App() {
    return <Router>
        <section className="app-main-layout">
            <AppHeader />

            <main className="full-main-layout">
                <Routes>
                    <Route path='/' element={<Home />} />
                    
                    <Route path='/book' element={<BookIndex />} />
                    <Route path='/book/edit' element={<BookEdit />} />
                    <Route path='/book/edit/:bookId' element={<BookEdit />} />
                    <Route path='/book/details/:bookId' element={<BookDetails />} />
                    
                    
                    <Route path='/about' element={<About />} />


                </Routes>
                {/* {page === 'home' && <Home />}
            {page === 'about' && <About />}
            {page === 'book' && <BookIndex />} */}

            </main>
            <UserMsg/>
        </section>
    </Router>
}