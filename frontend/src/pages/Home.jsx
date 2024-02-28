import React, { useEffect, useState } from "react";
import axios from "axios";
import "./home.css";
import { Link } from "react-router-dom";
import CreateBook from "./CreateBook";
import DeleteBook from "./DeleteBook";

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    fetchTotalDocuments();
    fetchData();
  }, []);

  const fetchTotalDocuments = async () => {
    const response = await axios.get(`http://localhost:3000/books/count`);
    const totalDocuments = response.data.totalDocuments;

    const pages = Math.ceil(totalDocuments / 2);
    setTotalPages(pages);
  };
  const fetchData = async (pageNumber = 1) => {
    console.log("Fetching page:", pageNumber); // Add this line
    try {
      const response = await axios.get(
        `http://localhost:3000/books/?pageNumber=${pageNumber}&limit=2`
      );
      setData(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // call back function to fetch data again when new book is created or deleted
  const handleBookAdded = () => {
    fetchData();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/books/search?search=${search}`
      );
      setData(response.data);
    } catch (error) {
      console.log("Error searching data:", error);
    }
  };

  return (
    <div id="main">
      <CreateBook onBookAdded={handleBookAdded} />
      <DeleteBook onBookDelete={handleBookAdded} />
      <div id="book-table-container">
        <div id="book-table">
          <div id="search-box">
            <form onSubmit={handleSearch}>
              <input
                id="search-input"
                type="text"
                name="search"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button id="search-submit" type="submit">
                Search
              </button>
            </form>
          </div>
          <table>
            <caption>The complete users database</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
                <th>Publish Year</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id}>
                  <td className="table-data">{item.name}</td>
                  <td className="table-data">{item.author}</td>
                  <td className="table-data">{item.publishYear}</td>
                  <td>
                    <img
                      id="table-img"
                      src={`http://localhost:3000/${item.fileUrl}`}
                      alt="Book Cover"
                    />
                  </td>
                  <td>
                    <div id="action">
                      <Link to={`/books/details/${item._id}`}>Details</Link>
                      <Link to={`/books/update/${item._id}`}>Update</Link>
                      <Link to={`/books/delete/${item._id}`}>Delete</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              id="pagination-button"
              key={index}
              onClick={() => {
                fetchData(index + 1);
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
