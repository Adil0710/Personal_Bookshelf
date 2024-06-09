import React from 'react';

const BookCard = ({ book, onAddToBookshelf }) => {
  return (
    <div className="book-card bg-[#2d2d2d] border border-[#3e3e3e] rounded-lg pt-6 px-6 min-h-[230px] relative w-[350px]">
      <h3 className='mb-2'><span className=' font-bold'>Book Title :</span>&nbsp; <span className=' text-gray-300'>{book.title}.</span></h3>
      <p className=' mb-2'><span className=' font-bold'>Author :</span>&nbsp; <span className=' text-gray-300'>{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}.</span></p>
      <p className=' mb-2'><span className=' font-bold'>Edition Count :</span>&nbsp; <span className=' text-gray-300'>{book.edition_count}.</span></p>
      <button onClick={onAddToBookshelf} className=' fontm border-gray-500 text-xs sm:text-base absolute specialBtna rounded-2xl left-1/2 bottom-0 transform -translate-x-1/2 -translate-y-1/2'>Add to Bookshelf</button>
    </div>
  );
};

export default BookCard;
