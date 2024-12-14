import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";

const Desktop = ({ onSubmit }) => {
  const [desktopDetails, setDesktopDetails] = useState({
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: 0,
    warranty_period: "",
    isDesktop: 1,
    form_factor: "",
    desktop_processor: "",
    desktop_gpu: "",
    desktop_ram: "",
    desktop_storage: "",
    power_supply: "",
    case_type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDesktopDetails({
      ...desktopDetails,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(desktopDetails); // Prosleđivanje podataka parent komponenti
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={desktopDetails.name}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Manufacturer"
        name="manufacturer"
        value={desktopDetails.manufacturer}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={desktopDetails.price}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        value={desktopDetails.description}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Stock Quantity"
        name="stock_quantity"
        type="number"
        value={desktopDetails.stock_quantity}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Warranty Period (Years)"
        name="warranty_period"
        type="number"
        value={desktopDetails.warranty_period}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Form Factor"
        name="form_factor"
        value={desktopDetails.form_factor}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Processor"
        name="desktop_processor"
        value={desktopDetails.desktop_processor}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Graphic Card"
        name="desktop_gpu"
        value={desktopDetails.desktop_gpu}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="RAM (GB)"
        name="desktop_ram"
        type="number"
        value={desktopDetails.desktop_ram}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Storage (GB)"
        name="desktop_storage"
        type="number"
        value={desktopDetails.desktop_storage}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Power Supply (Watts)"
        name="power_supply"
        type="number"
        value={desktopDetails.power_supply}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Case Type"
        name="case_type"
        value={desktopDetails.case_type}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: 2 }}>
        Submit Desktop Details
      </Button>
    </Box>
  );
};

export default Desktop;
