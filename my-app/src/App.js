import React, { useState, useEffect } from "react";
import AddProduct from "./pages/AddProduct/AddProduct";
import AddUser from "./pages/ForTesting";
import UserList from "./pages/ListUser";
import SignUp from "./pages/SignUp/SignUp";

const ItemsList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dohvaćeni podaci:", data);
        setItems(data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);

  return (
    <div>
      <h1>Lista proizvoda</h1>
      <ul>
        {items.length === 0 ? (
          <li>Nema proizvoda</li>
        ) : (
          items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price} €{item.category} - {item.description}
            </li>
          ))
        )}
      </ul>
      <AddProduct />
      <AddUser />
      <UserList />
      <SignUp />
    </div>
  );
};

export default ItemsList;
