import React, { useState } from "react";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [yearBirth, setYearBirth] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      username,
      password,
      name,
      lastName,
      yearBirth,
    };

    try {
      const response = await fetch("http://localhost:5000/user2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage("Korisnik je uspešno dodat!");
      } else {
        setMessage("Greška prilikom dodavanja korisnika.");
      }
    } catch (error) {
      setMessage("Došlo je do greške. Pokušajte ponovo.");
      console.error("Error adding user:", error);
    }
  };

  return (
    <div>
      <h1>Dodaj novog korisnika</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Korisničko ime:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Lozinka:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Ime:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Prezime:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Datum rođenja:
          <input
            type="date"
            value={yearBirth}
            onChange={(e) => setYearBirth(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Dodaj korisnika</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddUser;
