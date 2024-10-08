import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";

const StyledOneBook = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #feb47b;
  border-radius: 8px;
  background-color: #fff9f0;
  font-family: "Gill Sans", "Trebuchet MS", sans-serif;

  h3 {
    font-size: 2rem;
    color: #333;
  }

  .book-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    font-size: 1rem;
    color: #555;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.5;
    color: #333;
    text-align: justify;
  }
`;

const SpecificBook = () => {

    const { id } = useParams();
    const [data, setData] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5500/books/${id}`)
        .then(res => res.json())
        .then(data => setData(data))
    }, [id]);

    return ( 
        <StyledOneBook>
         
          {data && (
            <>
              <h3>{data.title || 'Loading...'}</h3>
              <div className="book-info">
                <span>Author: {data.author}</span>
                <span>Genres: {data.genres?.join(", ")}</span>
                <span>Pages: {data.pages}</span>
                <span>Publish Date: {data.publishDate ? new Date(data.publishDate).toDateString() : ''}</span>
                <span>Rating: {data.rating}</span>
              </div>
              <p>Description: {data.description}</p>
            </>
          )}
      </StyledOneBook>
     );
}
 
export default SpecificBook;