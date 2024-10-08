import React from "react";
import { Link } from "react-router-dom"; // Or any method to open in a new tab
import styled from "styled-components";

const StyledBookCard = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  width: 250px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f9f9f9;

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
    return desc.length > 100 ? desc.substring(0, 30) + "..." : desc;
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
      <p>{getPartialDescription(description)}</p>
      <Link href={`/books/${_id}`} target="_blank" rel="noopener noreferrer">
        Read more
      </Link>
    </StyledBookCard>
  );
};

export default BookCard;
