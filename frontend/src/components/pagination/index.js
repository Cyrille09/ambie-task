import React from 'react';
import ReactPaginate from 'react-paginate';

export function Pagination({ pageCount, changePage }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next"
      previousLabel="Previous"
      pageCount={pageCount}
      onPageChange={changePage}
      containerClassName={'paginationBttns'}
      previousLinkClassName={'previousBttn'}
      nextLinkClassName={'nextBttn'}
      disabledClassName={'paginationDisabled'}
      activeClassName={'paginationActive'}
    />
  );
}
