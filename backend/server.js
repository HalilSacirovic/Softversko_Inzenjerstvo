const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 5000;

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

app.get("/items", (req, res) => {
  db.query("SELECT * FROM items", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// app.post("/users", (req, res) => {
//   // Ekstrakcija podataka iz tela zahteva
//   const {
//     username,
//     password,
//     email,
//     firstName,
//     lastName,
//     phoneNumber,
//     street,
//     city,
//     postalCode,
//     country,
//     dateOfBirth,
//     profilePicture,
//     isAdmin,
//   } = req.body;

//   // Postavljanje elemenata na null ako nisu definisani
//   const sanitizedUser = {
//     username: username || null,
//     password: password || null,
//     email: email || null,
//     firstName: firstName || null,
//     lastName: lastName || null,
//     phoneNumber: phoneNumber || null,
//     street: street || null,
//     city: city || null,
//     postalCode: postalCode || null,
//     country: country || null,
//     dateOfBirth: dateOfBirth || null,
//     profilePicture: profilePicture || null,
//     isAdmin: isAdmin !== undefined ? isAdmin : 0, // Ako nije definisano, postavi na 0 (nije admin)
//   };

//   // SQL query za umetanje korisnika u bazu
//   const query = `
//     INSERT INTO users (
//       username, password, email, firstName, lastName,
//       phoneNumber, street, city, postalCode, country,
//       dateOfBirth, profilePicture, isAdmin
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;

//   // Priprema vrednosti za umetanje
//   const values = Object.values(sanitizedUser);

//   // Izvršavanje query-ja
//   db.query(query, values, (err, result) => {
//     if (err) {
//       console.error("Greška prilikom umetanja korisnika u bazu:", err);
//       return res.status(500).json({
//         error: "Greška prilikom umetanja korisnika u bazu",
//         details: err.message,
//       });
//     }

//     // Uspešan odgovor
//     res.status(201).json({
//       message: "Korisnik je uspešno dodat!",
//       id: result.insertId,
//     });
//   });
// });

// app.post("/user2", (req, res) => {
//   // Ekstrakcija podataka iz tela zahteva
//   const { username, name, password, lastName, dateOfBirth } = req.body;

//   // Postavljanje elemenata na null ako nisu definisani

//   // SQL query za umetanje korisnika u bazu
//   const query = `
//     INSERT INTO users (
//       username, name, password, name, lastName,dateOfBirth) VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   // Priprema vrednosti za umetanje

//   // Izvršavanje query-ja
//   db.query(
//     query,
//     [username, name, password, lastName, dateOfBirth],
//     (err, result) => {
//       if (err) {
//         console.error("Greška prilikom umetanja korisnika u bazu:", err);
//         return res.status(500).json({
//           error: "Greška prilikom umetanja korisnika u bazu",
//           details: err.message,
//         });
//       }

//       // Uspešan odgovor
//       res.status(201).json({
//         message: "Korisnik je uspešno dodat!",
//         id: result.insertId,
//       });
//     }
//   );
// });

app.post("/user2", (req, res) => {
  const { username, password, name, lastName, dateOfBirth } = req.body;

  const query =
    "INSERT INTO user2 (username,password,name,lastName,yearBirth) VALUES (?, ?, ?, ? ,?)";
  db.query(
    query,
    [username, password, name, lastName, dateOfBirth],
    (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Greška pri unosu proizvoda", error: err });
      } else {
        res.status(201).json({
          message: "Proizvod uspešno dodat",
          productId: result.insertId,
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
