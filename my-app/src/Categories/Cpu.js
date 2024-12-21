import { Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Cpu = ({ onSubmit }) => {
  const currentUser = useSelector((state) => state.auth.userId);
  const [cpuDetails, setCpuDetails] = useState({
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: 0,
    warranty_period: "",
    isCPU: 1, // Oznaka da je proizvod CPU
    cores: "",
    threads: "",
    base_clock: "",
    boost_clock: "",
    socket: "",
    posted_by: currentUser,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCpuDetails({
      ...cpuDetails,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(cpuDetails); // Prosleđivanje podataka parent komponenti
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={cpuDetails.name}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Manufacturer"
        name="manufacturer"
        value={cpuDetails.manufacturer}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={cpuDetails.price}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        value={cpuDetails.description}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Stock Quantity"
        name="stock_quantity"
        type="number"
        value={cpuDetails.stock_quantity}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Warranty Period (Years)"
        name="warranty_period"
        type="number"
        value={cpuDetails.warranty_period}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Cores"
        name="cores"
        type="number"
        value={cpuDetails.cores}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Threads"
        name="threads"
        type="number"
        value={cpuDetails.threads}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Base Clock (GHz)"
        name="base_clock"
        type="number"
        step="0.1"
        value={cpuDetails.base_clock}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Boost Clock (GHz)"
        name="boost_clock"
        type="number"
        step="0.1"
        value={cpuDetails.boost_clock}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Socket"
        name="socket"
        value={cpuDetails.socket}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: 2 }}>
        Submit CPU Details
      </Button>
    </Box>
  );
};

export default Cpu;
