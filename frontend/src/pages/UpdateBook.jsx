import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateBook = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/books/${id}`);
      const data = await response.json();

      setName(data.name);
      setAuthor(data.author);
      setPublishYear(data.publishYear);
    };

    fetchData();
  }, [id]);

  const handleSubmit = () => {
    const data = {
      name,
      author,
      publishYear,
    };

    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then(() => console.log("Data saved"))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>

        <label htmlFor="author">Author</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        ></input>

        <label htmlFor="author">Publish Year</label>
        <input
          type="text"
          name="author"
          value={publishYear}
          onChange={(e) => {
            setPublishYear(e.target.value);
          }}
        ></input>

        <input type="submit" value="submit" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default UpdateBook;
