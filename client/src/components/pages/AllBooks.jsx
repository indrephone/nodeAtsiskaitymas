import { useState, useEffect } from "react";
import styled from "styled-components";
import BookCard from "../UI/molecules/BookCard";
import { useFormik } from "formik";

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

  const formik = useFormik({
    initialValues: {
      title: '',
      genres_in: [],
      year_gte: '',
      year_lte: '',
      isAvailable: false, // For "Available"
      isNotAvailable: false // For "Not Available"
    },
    onSubmit: values => {
      console.log(values);
    },
  });
  

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
          <form onSubmit={formik.handleSubmit}> 
  <div>
    <label htmlFor="title">Title:</label>
    <input 
      type="text" 
      id="title" 
      name="title"
      value={formik.values.title}
      onChange={formik.handleChange}
    />
  </div>

  {/* Genres Fieldset */}
  <fieldset>
    <legend>Select Genres:</legend>
    <div>
      <label htmlFor="classic">Classic</label>
      <input 
        type="checkbox" 
        name="genres_in" 
        id="classic"
        value="Classic"
        onChange={formik.handleChange}
        checked={formik.values.genres_in.includes('Classic')}
      />
    </div>

    <div>
      <label htmlFor="fiction">Fiction</label>
      <input 
        type="checkbox" 
        name="genres_in" 
        id="fiction"
        value="Fiction"
        onChange={formik.handleChange}
        checked={formik.values.genres_in.includes('Fiction')}
      />
    </div>

    <div>
      <label htmlFor="non_fiction">Non-Fiction</label>
      <input 
        type="checkbox" 
        name="genres_in" 
        id="non_fiction"
        value="NonFiction"
        onChange={formik.handleChange}
        checked={formik.values.genres_in.includes('NonFiction')}
      />
    </div>

    <div>
      <label htmlFor="mystery">Mystery</label>
      <input 
        type="checkbox" 
        name="genres_in" 
        id="mystery"
        value="Mystery"
        onChange={formik.handleChange}
        checked={formik.values.genres_in.includes('Mystery')}
      />
    </div>

    <div>
      <label htmlFor="romance">Romance</label>
      <input 
        type="checkbox" 
        name="genres_in" 
        id="romance"
        value="Romance"
        onChange={formik.handleChange}
        checked={formik.values.genres_in.includes('Romance')}
      />
    </div>
  </fieldset>

  <div>
    <label htmlFor="year_gte">Year from:</label>
    <input 
      type="number" 
      id="year_gte" 
      name="year_gte"
      value={formik.values.year_gte}
      onChange={formik.handleChange}
    />
  </div>

  <div>
    <label htmlFor="year_lte">Year to:</label>
    <input 
      type="number" 
      id="year_lte" 
      name="year_lte"
      value={formik.values.year_lte}
      onChange={formik.handleChange}
    />
  </div>

  {/* Availability Fieldset */}
  <fieldset>
    <legend>Availability</legend>
    <div>
      <label>
        <input 
          type="checkbox" 
          name="isAvailable" 
          onChange={formik.handleChange}
          checked={formik.values.isAvailable}
        />
        Available
      </label>
    </div>

    <div>
      <label>
        <input 
          type="checkbox" 
          name="isNotAvailable" 
          onChange={formik.handleChange}
          checked={formik.values.isNotAvailable}
        />
        Not Available
      </label>
    </div>
  </fieldset>

  <button type="submit">Submit</button>
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
