import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import UpdateBook from "./pages/UpdateBook";
import DeleteBook from "./pages/DeleteBook";
import CreateBook from "./pages/CreateBook";
import LoginForm from "./pages/LoginForm";
import CreateUser from "./pages/CreateUser";
function App() {
  return (
    <Routes>
      <Route path="/books/login" element={<LoginForm />} />
      <Route path="/" element={<Home />} />
      <Route path="/books/details/:id" element={<BookDetails />} />
      <Route path="/books/update/:id" element={<UpdateBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
      <Route path="/books/add/" element={<CreateBook />} />
      <Route path="/users/add/" element={<CreateUser />} />
      <Route path="/users/login/" element={<LoginForm />} />
    </Routes>
  );
}

export default App;
