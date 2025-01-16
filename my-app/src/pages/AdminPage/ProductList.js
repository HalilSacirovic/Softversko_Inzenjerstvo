import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
} from "@mui/material";
import NavBar from "../../components/NavBar";

// Komponenta za prikazivanje Laptopa
const LaptopTable = ({ laptops, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>Laptops</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Warranty Period</TableCell>
              <TableCell>Processor</TableCell>
              <TableCell>RAM</TableCell>
              <TableCell>Storage</TableCell>
              <TableCell>Screen Size</TableCell>
              <TableCell>Battery Capacity</TableCell>
              <TableCell>User Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {laptops.map((laptop) => (
              <TableRow key={laptop.id}>
                <TableCell>{laptop.id}</TableCell>
                <TableCell>{laptop.name}</TableCell>
                <TableCell>{laptop.manufacturer}</TableCell>
                <TableCell>{laptop.price}</TableCell>
                <TableCell>{laptop.stock_quantity}</TableCell>

                <TableCell>{laptop.warranty_period}</TableCell>
                <TableCell>{laptop.laptop_processor}</TableCell>
                <TableCell>{laptop.laptop_ram} GB</TableCell>
                <TableCell>{laptop.laptop_storage} GB</TableCell>
                <TableCell>{laptop.screen_size} inches</TableCell>
                <TableCell>{laptop.battery_capacity} mAh</TableCell>
                <TableCell>{laptop.user_rating}</TableCell>
                <TableCell sx={{ textAlign: "right", paddingRight: 20 }}>
                  <Button
                    onClick={() => handleEdit(laptop)}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(laptop.id)}
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// Komponenta za prikazivanje Desktopa
const DesktopTable = ({ desktops, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>Desktops</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Warranty Period</TableCell>
              <TableCell>Processor</TableCell>
              <TableCell>RAM</TableCell>
              <TableCell>GPU</TableCell>
              <TableCell>Storage</TableCell>
              <TableCell>Power Supply</TableCell>
              <TableCell>User Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {desktops.map((desktop) => (
              <TableRow key={desktop.id}>
                <TableCell>{desktop.id}</TableCell>
                <TableCell>{desktop.name}</TableCell>
                <TableCell>{desktop.manufacturer}</TableCell>
                <TableCell>{desktop.price}</TableCell>
                <TableCell>{desktop.stock_quantity}</TableCell>

                <TableCell>{desktop.warranty_period}</TableCell>
                <TableCell>{desktop.desktop_processor}</TableCell>
                <TableCell>{desktop.desktop_ram} GB</TableCell>
                <TableCell>{desktop.desktop_gpu}</TableCell>
                <TableCell>{desktop.desktop_storage} GB</TableCell>
                <TableCell>{desktop.power_supply}</TableCell>
                <TableCell>{desktop.user_rating}</TableCell>
                <TableCell sx={{ textAlign: "right", paddingRight: 20 }}>
                  <Button
                    onClick={() => handleEdit(desktop)}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(desktop.id)}
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// Komponenta za prikazivanje CPU
const CPUTable = ({ cpus, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>CPUs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Warranty Period</TableCell>
              <TableCell>Cores</TableCell>
              <TableCell>Threads</TableCell>
              <TableCell>Base Clock</TableCell>
              <TableCell>Boost Clock</TableCell>
              <TableCell>Socket</TableCell>
              <TableCell>User Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cpus.map((cpu) => (
              <TableRow key={cpu.id}>
                <TableCell>{cpu.id}</TableCell>
                <TableCell>{cpu.name}</TableCell>
                <TableCell>{cpu.manufacturer}</TableCell>
                <TableCell>{cpu.price}</TableCell>
                <TableCell>{cpu.stock_quantity}</TableCell>

                <TableCell>{cpu.warranty_period}</TableCell>
                <TableCell>{cpu.cores}</TableCell>
                <TableCell>{cpu.threads}</TableCell>
                <TableCell>{cpu.base_clock} GHz</TableCell>
                <TableCell>{cpu.boost_clock} GHz</TableCell>
                <TableCell>{cpu.socket}</TableCell>
                <TableCell>{cpu.user_rating}</TableCell>
                <TableCell sx={{ textAlign: "right", paddingRight: 20 }}>
                  <Button
                    onClick={() => handleEdit(cpu)}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(cpu.id)}
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// Komponenta za prikazivanje GPU
const GPTable = ({ gpus, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>GPUs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Warranty Period</TableCell>
              <TableCell>VRAM</TableCell>
              <TableCell>Core Clock</TableCell>
              <TableCell>Boost Clock</TableCell>
              <TableCell>Interface</TableCell>
              <TableCell>User Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gpus.map((gpu) => (
              <TableRow key={gpu.id}>
                <TableCell>{gpu.id}</TableCell>
                <TableCell>{gpu.name}</TableCell>
                <TableCell>{gpu.manufacturer}</TableCell>
                <TableCell>{gpu.price}</TableCell>
                <TableCell>{gpu.stock_quantity}</TableCell>

                <TableCell>{gpu.warranty_period}</TableCell>
                <TableCell>{gpu.vram} GB</TableCell>
                <TableCell>{gpu.core_clock} MHz</TableCell>
                <TableCell>{gpu.boost_clock} MHz</TableCell>
                <TableCell>{gpu.interface}</TableCell>
                <TableCell>{gpu.user_rating}</TableCell>
                <TableCell sx={{ textAlign: "right", paddingRight: 20 }}>
                  <Button
                    onClick={() => handleEdit(gpu)}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(gpu.id)}
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// Komponenta za prikazivanje PSU
const PSUTable = ({ psus, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>PSUs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Warranty Period</TableCell>
              <TableCell>Wattage</TableCell>
              <TableCell>Certification</TableCell>
              <TableCell>User Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {psus.map((psu) => (
              <TableRow key={psu.id}>
                <TableCell>{psu.id}</TableCell>
                <TableCell>{psu.name}</TableCell>
                <TableCell>{psu.manufacturer}</TableCell>
                <TableCell>{psu.price}</TableCell>
                <TableCell>{psu.stock_quantity}</TableCell>

                <TableCell>{psu.warranty_period}</TableCell>
                <TableCell>{psu.wattage} W</TableCell>
                <TableCell>{psu.certification}</TableCell>
                <TableCell>{psu.user_rating}</TableCell>
                <TableCell sx={{ textAlign: "right", paddingRight: 20 }}>
                  <Button
                    onClick={() => handleEdit(psu)}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(psu.id)}
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// Komponenta za prikazivanje RAM
const RAMTable = ({ rams, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>RAMs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Warranty Period</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Speed</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>User Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rams.map((ram) => (
              <TableRow key={ram.id}>
                <TableCell>{ram.id}</TableCell>
                <TableCell>{ram.name}</TableCell>
                <TableCell>{ram.manufacturer}</TableCell>
                <TableCell>{ram.price}</TableCell>
                <TableCell>{ram.stock_quantity}</TableCell>

                <TableCell>{ram.warranty_period}</TableCell>
                <TableCell>{ram.capacity} GB</TableCell>
                <TableCell>{ram.speed} MHz</TableCell>
                <TableCell>{ram.type}</TableCell>
                <TableCell>{ram.user_rating}</TableCell>
                <TableCell sx={{ textAlign: "right", paddingRight: 20 }}>
                  <Button
                    onClick={() => handleEdit(ram)}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(ram.id)}
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// Komponenta za prikazivanje Storage uređaja
const StorageTable = ({ storages, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>Storage Devices</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Warranty Period</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>User Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {storages.map((storage) => (
              <TableRow key={storage.id}>
                <TableCell>{storage.id}</TableCell>
                <TableCell>{storage.name}</TableCell>
                <TableCell>{storage.manufacturer}</TableCell>
                <TableCell>{storage.price}</TableCell>
                <TableCell>{storage.stock_quantity}</TableCell>

                <TableCell>{storage.warranty_period}</TableCell>
                <TableCell>{storage.capacity} GB</TableCell>
                <TableCell>{storage.type}</TableCell>
                <TableCell>{storage.user_rating}</TableCell>
                <TableCell sx={{ textAlign: "right", paddingRight: 20 }}>
                  <Button
                    onClick={() => handleEdit(storage)}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(storage.id)}
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// Komponenta za Motherboard
const MotherboardTable = ({ motherboards, handleEdit, handleDelete }) => {
  return (
    <div>
      <h2>Motherboards</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Warranty Period</TableCell>
              <TableCell>Socket</TableCell>
              <TableCell>Warranty Period</TableCell>
              <TableCell>User Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {motherboards.map((motherboard) => (
              <TableRow key={motherboard.id}>
                <TableCell>{motherboard.id}</TableCell>
                <TableCell>{motherboard.name}</TableCell>
                <TableCell>{motherboard.manufacturer}</TableCell>
                <TableCell>{motherboard.price}</TableCell>
                <TableCell>{motherboard.stock_quantity}</TableCell>

                <TableCell>{motherboard.warranty_period}</TableCell>
                <TableCell>{motherboard.socket}</TableCell>
                <TableCell>{motherboard.user_rating}</TableCell>
                <TableCell sx={{ textAlign: "right", paddingRight: 20 }}>
                  <Button
                    onClick={() => handleEdit(motherboard)}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(motherboard.id)}
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = (value) => {
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(filtered); // Ažuriraj filtriranu listu
  };

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const handleEdit = (product) => {
    // Implementirajte funkcionalnost za uređivanje proizvoda
  };

  const handleDelete = (id) => {
    // Implementirajte funkcionalnost za brisanje proizvoda
  };

  const laptops = filteredProducts.filter((product) => product.isLaptop);
  const desktops = filteredProducts.filter((product) => product.isDesktop);
  const cpus = filteredProducts.filter((product) => product.isCPU);
  const gpus = filteredProducts.filter((product) => product.isGPU);
  const psus = filteredProducts.filter((product) => product.isPSU);
  const rams = filteredProducts.filter((product) => product.isRAM);
  const motherboards = filteredProducts.filter(
    (product) => product.isMotherboard
  );
  const storages = filteredProducts.filter((product) => product.isStorage);

  return (
    <div>
      <NavBar />
      <Box sx={{ padding: 2, display: "flex", justifyContent: "left" }}>
        <TextField
          variant="outlined"
          placeholder="Search by the name"
          fullWidth
          sx={{
            maxWidth: 600,
            backgroundColor: "white",
            border: "1px solid black",
            outline: "none !important",
            borderRadius: 3,
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "black", // Stil za hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "black", // Uklanja plavi outline pri fokusu
              },
            },
          }}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Box>
      <LaptopTable
        laptops={laptops}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <DesktopTable
        desktops={desktops}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <CPUTable
        cpus={cpus}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <RAMTable
        rams={rams}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <GPTable
        gpus={gpus}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <PSUTable
        psus={psus}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <StorageTable
        storages={storages}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <MotherboardTable
        motherboards={motherboards}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ProductCatalog;
