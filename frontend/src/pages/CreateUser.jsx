import axios from "axios";
import React, { useState } from "react";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username,
      email,
      password,
    };

    axios
      .post(`http://localhost:3000/users`, user)
      .then(console.log("redirecting to backend..."));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default CreateUser;
