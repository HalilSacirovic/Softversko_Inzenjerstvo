import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/user2")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dohvaćeni useri:", data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);

  return (
    <div>
      <h1>Lista Usera</h1>
      <ul>
        {users.length === 0 ? (
          <li>Nema Usera</li>
        ) : (
          users.map((user) => (
            <li key={user.id}>
              {user.username} - {user.name} -{user.lastName} - {user.yearBirth}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UserList;
