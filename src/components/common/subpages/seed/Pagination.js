import React from "react";
import styles from "./Pagination.css";

const Pagination = props => {
  const { currentPage, totalPages, handlePageChange, hideNextButton, salesLoading} = props;

  const renderFirstButton = () => {
    if (currentPage === 1) {
      return null;
    }

    return (
      <button title="First page" onClick={() => handlePageChange(1)}>
        <i className="arrow left-double"></i>
      </button>
    );
  };

  const renderPreviousButton = () => {
    if (currentPage === 1) {
      return null;
    }

    return (
      <button title="Previous page" onClick={() => handlePageChange(currentPage - 1)}>
        <i className="arrow left"></i>
      </button>
    );
  };

  const renderNextButton = () => {
    if (currentPage === totalPages) {
      return null;
    }

    return (
      <button title="Next page" onClick={() => handlePageChange(currentPage + 1)}>
        <i className="arrow right"></i>
      </button>
    );
  };

  const renderLastButton = () => {
    if (currentPage === totalPages) {
      return null;
    }

    return (
      <button title="Last page" onClick={() => handlePageChange(totalPages)}>
        <i className="arrow right-double"></i>
      </button>
    );
  };

  return (
    <div className="pagination-container">
      {!salesLoading && renderPreviousButton()}
      <span style={{margin:10}}> {currentPage}  </span>
      {!salesLoading && !hideNextButton && renderNextButton()}
      {false && renderLastButton()}
    </div>
  );
};

export default Pagination;
