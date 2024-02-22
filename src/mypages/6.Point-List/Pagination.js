import styled from "styled-components";
import style from "./pagination.module.css";

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <nav className={style.nav}>
      <button
        className={style.button}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        &lt;
      </button>
      
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button
            className={style.button}
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : undefined}
          >
            {i + 1}
          </button>
        ))}

      <button
        className={style.button}
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
      >
        &gt;
      </button>
    </nav>
  );
}

export default Pagination;
