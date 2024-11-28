import React, { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState();
  const [country, setCounty] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = {
      username,
      firstName,
      lastName,
      email,
      password,
      phoneNum,
      street,
      city,
      postalCode,
      country,
      dateOfBirth,
      profilePicture,
    };
    console.log("Poslat objekat:", newUser);

    try {
      const response = await fetch("http://localhost:5000/users2", {
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          country:
          <input
            type="text"
            value={country}
            onChange={(e) => setCounty(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          postalCode
          <input
            type="number"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Street:
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          phoneNum:
          <input
            type="number"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          ProfilePic:
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Datum rođenja:
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Dodaj korisnika</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
