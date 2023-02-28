import React from 'react';
import styles from './Pages.module.css';

export default function Pages({ videogamesPerPage, allVideogames, currentPage, setCurrentPage }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(allVideogames / videogamesPerPage);

  if (currentPage > 2 && totalPages > 4) {
    pageNumbers.push('<<', currentPage - 1, currentPage);
    if (currentPage + 1 < totalPages) {
      pageNumbers.push(currentPage + 1, '>>');
    } else if (currentPage === totalPages - 1) {
      pageNumbers.push(currentPage + 1);
    }
  } else if (currentPage === 2 && totalPages > 4) {
    pageNumbers.push('<<', 1, currentPage, currentPage + 1);
    if (currentPage + 1 < totalPages) {
      pageNumbers.push(currentPage + 2, '>>');
    } else if (currentPage === totalPages - 1) {
      pageNumbers.push(currentPage + 1);
    }
  } else if (currentPage === 1 && totalPages > 4) {
    pageNumbers.push(1, 2, 3, '>>');
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className={styles.container}>
      {currentPage > 1 && (
        <button className={styles.btn} onClick={() => setCurrentPage(currentPage - 1)}>
          Anterior
        </button>
      )}

      {pageNumbers.map((number, index) => (
        <button
          key={index}
          className={`${styles.btn} ${currentPage === number ? styles.active : ''}`}
          onClick={() => {
            if (number !== '<<' && number !== '>>') {
              setCurrentPage(number);
            } else if (number === '<<') {
              setCurrentPage(1);
            } else {
              setCurrentPage(totalPages);
            }
          }}
        >
          {number}
        </button>
      ))}

      {currentPage < totalPages && (
        <button className={styles.btn} onClick={() => setCurrentPage(currentPage + 1)}>
          Siguiente
        </button>
      )}
    </div>
  );
}
