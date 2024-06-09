import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const removeFromBookshelf = (bookToRemove) => {
    const updatedBookshelf = bookshelf.filter(book => book.key !== bookToRemove.key);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    toast.error('Removed from Bookshelf!', {
      className: 'toast-success-black',
    });
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  // Filter bookshelf based on search query
  const filteredBookshelf = bookshelf.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className='font-semibold flex justify-center py-8 items-center gap-6 flex-col'>
      <h1 className='sm:text-4xl text-base'>My Bookshelf</h1>
      <input 
        className='font-normal sm:w-1/3 w-full sm:text-base text-sm bg-[#424242] px-2 py-2 rounded-2xl border border-[#6d6d6d] focus:outline-none placeholder-gray-300 caret-gray-300 focus:ring-1 focus:ring-[#a341ff] focus:border-[#a341ff]'
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search in bookshelf..."
      />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <div className="bookshelf flex flex-wrap justify-evenly gap-6 mt-10">
        {filteredBookshelf.length === 0 && (
          <p className="text-gray-400 flex gap-3 items-center justify-center flex-col sm:text-xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <i className="fa-solid fa-triangle-exclamation text-3xl"></i>No books found.
          </p>
        )}
        {filteredBookshelf.map((book, index) => (
          <div key={index} className="book-card bg-[#2d2d2d] border border-[#3e3e3e] rounded-lg pt-6 px-6 min-h-[230px] relative max-w-[350px]">
            <h3 className='mb-2'><span className='font-bold'>Book Title:</span>&nbsp;<span className='text-gray-300'>{book.title}.</span></h3>
            <p className='mb-2'><span className='font-bold'>Author:</span>&nbsp;<span className='text-gray-300'>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}.</span></p>
            <p className='mb-2'><span className='font-bold'>Edition Count:</span>&nbsp;<span className='text-gray-300'>{book.edition_count}.</span></p>
            <button onClick={() => removeFromBookshelf(book)} className='font-medium border-gray-500 text-xs sm:text-base absolute specialBtnr bg-rose-600 text-gray-200 rounded-2xl left-1/2 bottom-0 transform -translate-x-1/2 -translate-y-1/2'>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookshelfPage;
