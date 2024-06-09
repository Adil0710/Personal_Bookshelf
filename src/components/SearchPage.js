import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard';
import { TailSpin } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    const delay = 500;
    clearTimeout(timeoutId);

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
        setResults(response.data.docs);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (query.length > 0) {
      const id = setTimeout(fetchResults, delay);
      setTimeoutId(id);
    } else {
      setResults([]);
      setLoading(false);
      setError(null);
    }

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const addToBookshelf = (book) => {
    try {
      const currentBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
      const bookExists = currentBookshelf.some(item => item.key === book.key);

      if (bookExists) {
        toast.error('Book already exists in the bookshelf!', {
          className: 'toast-success-black',
        });
      } else {
        localStorage.setItem('bookshelf', JSON.stringify([...currentBookshelf, book]));
        toast.success('Added to Bookshelf!', {
          className: 'toast-success-black',
        });
      }
    } catch (error) {
      toast.error('Failed to add to Bookshelf.', {
        className: 'toast-success-black',
      });
    }
  };

  return (
    <div>
      <div className=' font-semibold flex justify-center py-8 items-center gap-6 flex-col'>
        <h1 className=' sm:text-4xl text-base'>Search Book</h1>
        <input 
            className='font-normal sm:w-1/3 w-full sm:text-base text-sm bg-[#424242] px-2 py-2 rounded-2xl border border-[#6d6d6d] focus:outline-none placeholder-gray-300 caret-gray-300 focus:ring-1 focus:ring-[#a341ff] focus:border-[#a341ff]'
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search for books..."
        />

      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      {!loading && query.length === 0 && <p className=" text-gray-400 flex gap-3 flex-col items-center justify-center text-xs sm:text-xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"><i className="fa-solid fa-magnifying-glass text-3xl"></i>Enter a book name to search.</p>}
      {loading && <p className="absolute flex flex-col gap-4 justify-center items-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"><TailSpin
  color="white" height="50" width="50"
/>
Please Wait !
</p>}
      {!loading && query.length > 0 && (
        <div className="results flex flex-wrap justify-evenly gap-6 mt-10">
          {error && <p>{error}</p>}
          {results.length === 0 && !error && <p className=" text-gray-400 flex gap-3 items-center justify-center flex-col sm:text-xl absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"><i className="fa-solid fa-triangle-exclamation text-3xl"></i>No books found.</p>}
          {results.map((book) => (
            <BookCard key={book.key} book={book} onAddToBookshelf={() => addToBookshelf(book)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
