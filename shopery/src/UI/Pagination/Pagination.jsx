import React, { useMemo } from 'react'
import '../Pagination/Pagination.css'

function Pagination(props) {

    const {
    currentPage,
    totalPage,
    pagesPerPageGroup,
    handlePreviousButtonClick,
    handleNextButtonClick,
    handlePageChangeButtonClick,
    handlePreviousPageGroupButtonClick,
    handleNextPageGroupButtonClick,
  } = props;


  const currentPageGroup = useMemo(() => {
  return getCurrentPageGroup(currentPage, totalPage, pagesPerPageGroup);
}, [currentPage, totalPage, pagesPerPageGroup]);


const _handlePreviousButtonClick = (event) => {
  handlePreviousButtonClick(event, currentPageGroup);
};

const _handleNextButtonClick = (event) => {
  handleNextButtonClick(event, currentPageGroup);
};

const _handlePageChangeButtonClick = (event) => {
   handlePageChangeButtonClick(event, currentPageGroup);
};

const _handlePreviousPageGroupButtonClick = (event) => {
  handlePreviousPageGroupButtonClick(event, currentPageGroup)
};
const _handleNextPageGroupButtonClick = (event) => {
  handleNextPageGroupButtonClick(event, currentPageGroup);
};
  return (
  <div className="pagination-wrapper">
    <ul className="ul">
      <li>
        <button
          className="button button--border-left-radius button--border-right-none"
           disabled={currentPage === 1}
            onClick={_handlePreviousButtonClick}
        >
          Prev
        </button>
      </li>
      {/* First ellipsis */}
      {currentPageGroup[0] > pagesPerPageGroup ? (
        <li>
          <button className="button"
          onClick={_handlePreviousPageGroupButtonClick}
          >&hellip;</button>
        </li>
      ) : null}
      {currentPageGroup.map((pageNumber) => {
        return (
          <li key={pageNumber}>
            <button
              className="button button--border-right-none"
              style={
                currentPage === pageNumber ? { backgroundColor: "gray" } : {}
              }
              id={pageNumber}
              onClick={_handlePageChangeButtonClick}

            >
              {pageNumber}
            </button>
          </li>
        );
      })}
      {/* Second ellipsis */}
      {currentPageGroup[currentPageGroup.length - 1] !== totalPage ? (
        <li>
          <button className="button" 
          onClick={_handleNextPageGroupButtonClick}
          >&hellip;</button>
        </li>
      ) : null}
      <li>
        <button
          className="button button--border-right-radius button--border-left-none"
          disabled={currentPage === totalPage}
          onClick={_handleNextButtonClick}
        >
          Next
        </button>
      </li>
    </ul>
  </div>
);
}

export default Pagination



const getCurrentPageGroup = (currentPage, totalPage, pagesPerPageGroup) => {
  let minPageLimit =
    Math.floor(currentPage / pagesPerPageGroup) * pagesPerPageGroup + 1;

  if (currentPage % pagesPerPageGroup === 0) {
    minPageLimit -= pagesPerPageGroup;
  }

  let maxPageLimit = minPageLimit + pagesPerPageGroup - 1;

  if (maxPageLimit > totalPage) {
    maxPageLimit = totalPage;
  }

  const currentPageGroup = [];

  for (let i = minPageLimit; i <= maxPageLimit; i++) {
    currentPageGroup.push(i);
  }

  return currentPageGroup;
};