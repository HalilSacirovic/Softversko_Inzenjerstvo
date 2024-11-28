const express = require("express");
const mysql = require("mysql2");
// const bodyParser = require("body-parser");
const app = express();
const port = 5000;
// app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`Server je pokrenut na portu ${port}`);
});

const cors = require("cors");
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "electronichub_db",
});

db.connect((err) => {
  if (err) {
    console.error("Greška pri povezivanju sa bazom:", err);
  } else {
    console.log("Uspešno povezano sa MySQL bazom!");
  }
});

/// USERS /////////////////////
app.get("/user2", (req, res) => {
  db.query("SELECT * FROM user2", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post("/user2", (req, res) => {
  const { username, password, name, lastName, yearBirth } = req.body;

  console.log("Podaci za unos:", {
    username,
    password,
    name,
    lastName,
    yearBirth,
  });

  const query =
    "INSERT INTO user2 (username, password, name, lastName, yearBirth) VALUES (?, ?, ?, ?, ?)";

  db.query(
    query,
    [username, password, name, lastName, yearBirth],
    (err, result) => {
      if (err) {
        console.error("SQL greška:", err.sqlMessage);
        res
          .status(500)
          .json({ message: "Greška pri unosu korisnika", error: err });
      } else {
        res.status(201).json({
          message: "Korisnik uspešno dodat",
          userId: result.insertId,
        });
      }
    }
  );
});

////////////////////////////////////////////////////////////////////////

app.get("/items", (req, res) => {
  db.query("SELECT * FROM items", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post("/items", (req, res) => {
  const { name, category, price, description, brand, model } = req.body;

  console.log("Podaci za unos:", {
    name,
    category,
    price,
    description,
    brand,
    model,
  });

  const query =
    "INSERT INTO items (name, category, price, description,brand,model) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [name, category, price, description, brand, model],
    (err, result) => {
      if (err) {
        console.error("SQL greška:", err.sqlMessage);
        res
          .status(500)
          .json({ message: "Greška pri unosu korisnika", error: err });
      } else {
        res.status(201).json({
          message: "Korisnik uspešno dodat",
          userId: result.insertId,
        });
      }
    }
  );
});

app.patch("/items/:id", (req, res) => {
  const { id } = req.params;
  const { name, category, price, condition, description, brand, model } =
    req.body;

  const query = `
    UPDATE items
    SET name = ?, category = ?, price = ?, condition = ?, description = ?, brand = ?, model = ?
    WHERE id = ?
  `;
  const values = [
    name,
    category,
    price,
    condition,
    description,
    brand,
    model,
    id,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Proizvod nije pronađen" });
    }
    res.json({ message: "Proizvod je uspešno ažuriran" });
  });
});

app.post("/users2", (req, res) => {
  const {
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
  } = req.body;

  console.log("Podaci za unos:", {
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
  });

  const query =
    "INSERT INTO users2 (username, firstName, lastName,email,password,phoneNum,street,city,postalCode,country,dateOfBirth,profilePicture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    query,
    [
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
    ],
    (err, result) => {
      if (err) {
        console.error("SQL greška:", err.sqlMessage);
        res
          .status(500)
          .json({ message: "Greška pri unosu korisnika", error: err });
      } else {
        res.status(201).json({
          message: "Korisnik uspešno dodat",
          userId: result.insertId,
        });
      }
    }
  );
});
