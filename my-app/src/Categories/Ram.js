import { Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";

const RAM = ({ onSubmit }) => {
  const [ramDetails, setRamDetails] = useState({
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: 0,
    ram_capacity: 0, // GB
    ram_speed: 0, // MHz
    ram_latency: "",
    ram_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRamDetails({
      ...ramDetails,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(ramDetails);
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={ramDetails.name}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Manufacturer"
        name="manufacturer"
        value={ramDetails.manufacturer}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={ramDetails.price}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        value={ramDetails.description}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Stock Quantity"
        name="stock_quantity"
        type="number"
        value={ramDetails.stock_quantity}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="RAM Capacity (GB)"
        name="ram_capacity"
        type="number"
        value={ramDetails.ram_capacity}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="RAM Speed (MHz)"
        name="ram_speed"
        type="number"
        value={ramDetails.ram_speed}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="RAM Latency"
        name="ram_latency"
        value={ramDetails.ram_latency}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="RAM Type"
        name="ram_type"
        value={ramDetails.ram_type}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: 2 }}>
        Submit RAM Details
      </Button>
    </Box>
  );
};

export default RAM;
