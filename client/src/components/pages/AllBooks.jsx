import { useState, useEffect } from "react";
import styled from "styled-components";
import BookCard from "../UI/molecules/BookCard";

const StyledSection = styled.section`
  > h1 {
    text-align: center;
    font-size: 3rem;
    font-family: "Gill Sans Extrabold", sans-serif;
  }

  > div {
    min-height: 100vh;
    display: grid;
    gap: 5px;
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr;
    font-family: "Gill Sans", "Trebuchet MS", sans-serif;


    > div:nth-child(1) {
      grid-area: 1 / 1 / 3 / 2;
      border: 3px solid #ff7e5f;
      padding: 10px;

      > form > div {
        display: flex;
        flex-direction: column;
      }
    }

    > div:nth-child(2) {
      grid-area: 1 / 2 / 2 / 3;
      border: 3px solid #ff7e5f;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      > button {
        margin: 5px;
        padding: 10px 15px;
        background-color: #feb47b;
        border-color: #ff7e5f;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    > div:nth-child(3) {
      grid-area: 2 / 2 / 3 / 3;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      border: 3px solid #ff7e5f;
      
      > div {
        border: 1px solid #ff7e5f;
        min-height: 350px;
        width: 200px;
      }
    }
  }
`;

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5500/books`)
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <StyledSection>
      <h1>All Books</h1>
      <div>
        {/* Filter everything */}
        <div>
          <h4>Filter</h4>
          <form>
            <div>
              {/* Formik form content goes here */}
            </div>
          </form>
        </div>

        {/* Sort everything */}
        <div>
          <h4>Sorting</h4>
          <button value="ratingAsc">Rating ASC</button>
          <button value="ratingDesc">Rating DESC</button>
          <button value="releasedAsc">Released ASC</button>
          <button value="releasedDesc">Released DESC</button>
          <button value="pagesAsc">Pages ASC</button>
          <button value="pagesDesc">Pages DESC</button>
        </div>

        {/* Display all books */}
        <div>
          { 
            books.map(book =>
              <BookCard 
                key={book._id} 
                book={book}
              />
            )
          }
        </div>
      </div>
    </StyledSection>
  );
};

export default AllBooks;
