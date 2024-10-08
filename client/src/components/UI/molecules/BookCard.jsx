import React from "react";
import styled from "styled-components";

const StyledBookCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f9f9f9;
  font-family: "Gill Sans", "Trebuchet MS", sans-serif;


  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  .book-info {
    font-size: 0.9rem;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  a {
    font-size: 0.9rem;
    color: #007bff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const BookCard = ({ book }) => {
  const { _id, title, description, author, genres, pages, publishDate, rating } = book;

  const getPartialDescription = (desc) => {
    return desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
  };

  const handleReadMore = () => {
    window.open(`/books/${_id}`, '_blank', 'noopener noreferrer');
  };

  return (
    <StyledBookCard>
      <h3>{title}</h3>
      <div className="book-info">
        <span>Author: {author}</span>
        <span>Genres: {genres.join(", ")}</span>
        <span>Pages: {pages}</span>
        <span>Publish Date: {new Date(publishDate).toDateString()}</span>
        <span>Rating: {rating}</span>
      </div>
      <p>Description: {getPartialDescription(description)}</p>
      <button onClick={handleReadMore}>Read More </button>
    </StyledBookCard>
  );
};

export default BookCard;
