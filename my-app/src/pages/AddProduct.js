import React, { useState } from "react";

const AddProduct = () => {
  // State za formu
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("Novo");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProduct = {
      name,
      category,
      price,
      condition,
      description,
      brand,
      model,
    };

    try {
      const response = await fetch("http://localhost:5000/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("Proizvod je uspešno postavljen!");
      } else {
        setMessage("Greška prilikom postavljanja proizvoda.");
      }
    } catch (error) {
      setMessage("Došlo je do greške. Pokušajte ponovo.");
      console.error("Error posting product:", error);
    }
  };

  return (
    <div>
      <h1>Dodaj novi proizvod</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Naziv proizvoda:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Kategorija:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Cena:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Stanje:
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <option value="Novo">Novo</option>
            <option value="Polovno">Polovno</option>
          </select>
        </label>
        <br />
        <label>
          Opis:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Brend:
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Model:
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Postavi proizvod</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProduct;
