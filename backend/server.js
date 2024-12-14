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
  database: "e-hub-db",
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

// POST route to add product
// app.post("/add-product", (req, res) => {
//   const productData = req.body;
//   const key = req.query;
//   console.log(key, "key");
//   const {
//     name,
//     manufacturer,
//     price,
//     description,
//     stock_quantity,
//     power_requirement,
//     form_factor,
//     warranty_period,
//     isLaptop,
//     screen_size,
//     screen_resolution,
//     battery_capacity,
//     weight,
//     is_touchscreen,
//     laptop_processor,
//     laptop_gpu,
//     laptop_ram,
//     laptop_storage,
//   } = productData;

//   // SQL query to insert data into the database
//   const query = `
//     INSERT INTO component (
//       name, manufacturer, price, description, stock_quantity, power_requirement, form_factor, warranty_period,
//       isLaptop, screen_size, screen_resolution, battery_capacity,
//       weight, is_touchscreen, laptop_processor, laptop_gpu, laptop_ram, laptop_storage
//     ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

//   const values = [
//     name,
//     manufacturer,
//     price,
//     description,
//     stock_quantity,
//     power_requirement,
//     form_factor,
//     warranty_period,
//     isLaptop,
//     screen_size,
//     screen_resolution,
//     battery_capacity,
//     weight,
//     is_touchscreen,
//     laptop_processor,
//     laptop_gpu,
//     laptop_ram,
//     laptop_storage,
//   ];

//   db.query(query, values, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Failed to add product" });
//     }
//     res.status(201).json({
//       message: "Product added successfully",
//       productId: result.insertId,
//     });
//   });
// });

// TEST OVDE ZA ADD RPODUCT

app.post("/add-product", (req, res) => {
  const productData = req.body; // Podaci o proizvodu prosleđeni iz forme
  const key = parseInt(req.query.key); // Ključ za odabir kategorije

  if (!key || key < 1 || key > 8) {
    return res.status(400).json({ error: "Invalid key provided" });
  }

  const commonValues = [
    productData.name,
    productData.manufacturer,
    productData.price,
    productData.description,
    productData.stock_quantity || 0,
    productData.warranty_period || null,
  ];

  let query = "";
  let values = [];

  switch (key) {
    case 1: // Laptop
      query = `
        INSERT INTO component (
          name, manufacturer, price, description, stock_quantity, warranty_period,
          isLaptop, screen_size, screen_resolution, battery_capacity,
          weight, is_touchscreen, laptop_processor, laptop_gpu, laptop_ram, laptop_storage
        ) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
      values = [
        ...commonValues,
        productData.screen_size,
        productData.screen_resolution,
        productData.battery_capacity,
        productData.weight,
        productData.is_touchscreen || 0,
        productData.laptop_processor,
        productData.laptop_gpu,
        productData.laptop_ram,
        productData.laptop_storage,
      ];
      break;

    case 2: // Desktop
      query = `
        INSERT INTO component (
          name, manufacturer, price, description, stock_quantity, warranty_period,
          isDesktop, form_factor, desktop_processor, desktop_gpu, desktop_ram, desktop_storage, power_supply, case_type
        ) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?);
      `;
      values = [
        ...commonValues,
        productData.form_factor,
        productData.desktop_processor,
        productData.desktop_gpu,
        productData.desktop_ram,
        productData.desktop_storage,
        productData.power_supply,
        productData.case_type,
      ];
      break;

    case 3: // CPU
      query = `
        INSERT INTO component (
          name, manufacturer, price, description, stock_quantity, warranty_period,
          isCPU, clock_speed, cores, threads, base_clock, boost_clock, socket
        ) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?);
      `;
      values = [
        ...commonValues,
        productData.clock_speed,
        productData.cores,
        productData.threads,
        productData.base_clock,
        productData.boost_clock,
        productData.socket,
      ];
      break;

    case 4: // GPU
      query = `
        INSERT INTO component (
          name, manufacturer, price, description, stock_quantity, warranty_period,
          isGPU, gpu_chipset, memory_size, memory_type, clock_speed
        ) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?);
      `;
      values = [
        ...commonValues,
        productData.gpu_chipset,
        productData.memory_size,
        productData.memory_type,
        productData.clock_speed,
      ];
      break;

    case 5: // PSU
      query = `
        INSERT INTO component (
          name, manufacturer, price, description, stock_quantity, warranty_period,
          isPSU, power_requirement, power_output, certification, modularity
        ) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?);
      `;
      values = [
        ...commonValues,
        productData.power_requirement,
        productData.power_output,
        productData.certification,
        productData.modularity,
      ];
      break;

    case 6: // Motherboard
      query = `
        INSERT INTO component (
          name, manufacturer, price, description, stock_quantity, warranty_period,
          isMotherboard, chipset, ram_slots, max_ram_capacity, supported_ram_type
        ) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?);
      `;
      values = [
        ...commonValues,
        productData.chipset,
        productData.ram_slots,
        productData.max_ram_capacity,
        productData.supported_ram_type,
      ];
      break;

    case 7: // RAM
      query = `
        INSERT INTO component (
          name, manufacturer, price, description, stock_quantity, warranty_period,
          isRAM, ram_capacity, ram_speed, ram_latency, ram_type
        ) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?);
      `;
      values = [
        ...commonValues,
        productData.ram_capacity,
        productData.ram_speed,
        productData.ram_latency,
        productData.ram_type,
      ];
      break;

    case 8: // Storage
      query = `
        INSERT INTO component (
          name, manufacturer, price, description, stock_quantity, warranty_period,
          isStorage, storage_capacity, storage_type, interface, read_speed, write_speed
        ) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?);
      `;
      values = [
        ...commonValues,
        productData.storage_capacity,
        productData.storage_type,
        productData.interface,
        productData.read_speed,
        productData.write_speed,
      ];
      break;

    default:
      return res.status(400).json({ error: "Invalid key provided" });
  }

  // Izvršavanje SQL upita
  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to add product" });
    }
    res.status(201).json({
      message: "Product added successfully",
      productId: result.insertId,
    });
  });
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM component", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get("/product/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM component WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Proizvod nije pronađen" });
    }
    res.json(result[0]); // Vraća podatke o proizvodu
  });
});
