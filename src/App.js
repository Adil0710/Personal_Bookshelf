import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import BookshelfPage from './components/BookshelfPage';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Clear any existing toast notifications when the route changes
    toast.dismiss();
  }, [location]);

  return (
    <div className="App min-h-screen bg-[#21251f] w-full p-5 pb-2  text-gray-100 flex flex-col">
      <div className="content flex-grow">
        {location.pathname === "/" ? (
          <nav className='flex justify-end'>
            <Link to="/bookshelf" className='specialBtn rounded-2xl text-xs sm:text-base font-medium'>My Bookshelf</Link>
          </nav>
        ) : (
          <nav className='flex justify-end'>
            <Link to="/" className='specialBtn rounded-2xl text-xs sm:text-base font-medium'>Search Book</Link>
          </nav>
        )}
        <Routes>
          <Route exact path="/" element={<SearchPage />} />
          <Route path="/bookshelf" element={<BookshelfPage />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <footer className="text-center text-xs sm:text-base text-gray-400 mt-10">Developed by | <a className=' text-gray-200 hover:text-gray-50 duration-300' href='https://adil0710.github.io/' target='_blank'>Adil Patel</a></footer>
    </div>
  );
}

export default App;
