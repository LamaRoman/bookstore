import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate

function DeleteBook({ onBookDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(onBookDelete);
  useEffect(() => {
    if (id) {
      const deleteBook = async () => {
        try {
          await axios.delete(`http://localhost:3000/books/${id}`);
          console.log("Book deleted successfully");
          onBookDelete; // Change to onBookDelete
          console.log("Navigating to home page...");
          navigate("/");
        } catch (error) {
          console.log("Error deleting book:", error);
        }
      };

      deleteBook();
    }
  }, [id, navigate, onBookDelete]);

  return <div></div>;
}

export default DeleteBook;
