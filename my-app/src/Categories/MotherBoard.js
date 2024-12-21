import { Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Motherboard = ({ onSubmit }) => {
  const currentUser = useSelector((state) => state.auth.userId);
  const [motherboardDetails, setMotherboardDetails] = useState({
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: 0,
    chipset: "",
    ram_slots: 0,
    max_ram_capacity: 0, // GB
    supported_ram_type: "",
    socket: "",
    posted_by: currentUser,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMotherboardDetails({
      ...motherboardDetails,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(motherboardDetails);
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={motherboardDetails.name}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Manufacturer"
        name="manufacturer"
        value={motherboardDetails.manufacturer}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={motherboardDetails.price}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        value={motherboardDetails.description}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Stock Quantity"
        name="stock_quantity"
        type="number"
        value={motherboardDetails.stock_quantity}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Chipset"
        name="chipset"
        value={motherboardDetails.chipset}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="RAM Slots"
        name="ram_slots"
        type="number"
        value={motherboardDetails.ram_slots}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Max RAM Capacity (GB)"
        name="max_ram_capacity"
        type="number"
        value={motherboardDetails.max_ram_capacity}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Supported RAM Type"
        name="supported_ram_type"
        value={motherboardDetails.supported_ram_type}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Socket"
        name="socket"
        value={motherboardDetails.socket}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: 2 }}>
        Submit Motherboard Details
      </Button>
    </Box>
  );
};

export default Motherboard;
