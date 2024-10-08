import { useState, useEffect, useRef } from "react";
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
  const filterString = useRef(''); // filter string
  const sortString = useRef(''); // sort string

  const formik = useFormik({
    initialValues: {
      title: '',
      genres_in: [],
      year_gte: '',
      year_lte: '',
      availability: '', // 'available' or 'notAvailable'
    },
    onSubmit: values => {
     applyFilters(values); // Apply filters when the form is submitted
    },
  });

  // Function to handle filter and fetch data
  const applyFilters = (values) => {
    const { title, year_gte, year_lte, genres_in, availability } = values;

    filterString.current = `title=${title || ''}`;

     // Year filtering: Format the year to strings that can be lexically compared
  if (year_gte) {
    filterString.current += `&minYear=${year_gte}-01-01`; // Start of the year
  } else {
    filterString.current += `&minYear=0-01-01`; // Default to the earliest possible
  }

  if (year_lte) {
    filterString.current += `&maxYear=${year_lte}-12-31`; // End of the year
  } else {
    filterString.current += `&maxYear=9999-12-31`; // Default to the latest possible
  }

    // Append genres if selected
    if (genres_in.length > 0) {
      filterString.current += `&genre=${genres_in.join(",")}`;
    }

    // Add availability filter
    if (availability === 'available') {
      filterString.current += `&availability=true`;
    } else if (availability === 'notAvailable') {
      filterString.current += `&availability=false`;
    }

    console.log('Filter String:', filterString.current); // Debugging: check the constructed filter string
    fetchBooks(); // Fetch data with the new filter
  };

   // Function to handle sorting
   const fetchOrdered = (e) => {
    const sortValue = e.target.value; // This is passed from the button
    sortString.current = sortValue;
    fetchBooks(); // Fetch data with sorting and filters applied
  };

  // Fetch books with filters and sorting
  const fetchBooks = () => {
    fetch(`http://localhost:5500/books?${filterString.current}&${sortString.current}`)
      .then(res => res.json())
      .then(data => setBooks(data));
  };

  // Fetch books on the first render (initial load)
  useEffect(() => {
    fetchBooks();
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

            {/* Year Fields */}
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

              {/* Available */}
              <div>
                <label>
                  <input 
                    type="radio" 
                    name="availability" 
                    value="available" 
                    onChange={formik.handleChange}
                    checked={formik.values.availability === 'available'} 
                  />
                  Available
                </label>
              </div>

              {/* Not Available */}
              <div>
                <label>
                  <input 
                    type="radio" 
                    name="availability" 
                    value="notAvailable" 
                    onChange={formik.handleChange}
                    checked={formik.values.availability === 'notAvailable'} 
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
          <button value="rating=1" onClick={fetchOrdered}>Rating ASC</button>
          <button value="rating=-1" onClick={fetchOrdered}>Rating DESC</button>
          <button value="publishDate=1" onClick={fetchOrdered}>Published ASC</button>
          <button value="publishDate=-1" onClick={fetchOrdered}>Published DESC</button>
          <button value="pages=1" onClick={fetchOrdered}>Pages ASC</button>
          <button value="pages=-1" onClick={fetchOrdered}>Pages DESC</button>
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
