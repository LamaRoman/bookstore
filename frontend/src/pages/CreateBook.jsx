import React, { useState } from "react";
import axios from "axios";
import "./createbook.css";
function CreateBook({ onBookAdded }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [photo, setPhoto] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("author", author);
    formData.append("publishYear", publishYear);
    formData.append("photo", photo);

    try {
      await axios.post(`http://localhost:3000/books`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Book created successfully");
      onBookAdded();
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <div id="form-wrapper">
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit} id="form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label htmlFor="publishYear">Publish Year</label>
        <input
          type="text"
          name="publishYear"
          value={publishYear}
          onChange={(e) => setPublishYear(e.target.value)}
        />

        <label htmlFor="photo">Photo</label>
        <input
          type="file"
          name="photo"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateBook;
