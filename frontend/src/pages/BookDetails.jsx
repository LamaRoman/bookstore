import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();

  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/books/${id}`);
      const data = await response.json();
      setBook(data);
    };

    fetchData();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {book.name}
      {book.author}
      {book.publishYear}
    </div>
  );
};

export default BookDetails;
