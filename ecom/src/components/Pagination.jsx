import React from 'react'

function Pagination({ pageCount, onPageChange, currentPage }) {
    const pageNumbers = [];
    return (
        <nav className="pagination-container">
          <button
            onClick={() => onPageChange(0)}
            disabled={currentPage === 0}
          >
            First
          </button>
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => onPageChange(number - 1)}
              className={`page-item ${currentPage === number - 1 ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => onPageChange(pageCount - 1)}
            disabled={currentPage === pageCount - 1}
          >
            Last
          </button>
        </nav>
      );
}

export default Pagination
