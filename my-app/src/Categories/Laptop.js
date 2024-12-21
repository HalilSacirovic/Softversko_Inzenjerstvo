import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Laptop = ({ onSubmit }) => {
  const currentUser = useSelector((state) => state.auth.userId);
  const [laptopDetails, setLaptopDetails] = useState({
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: 0,
    power_requirement: "",
    form_factor: "",
    warranty_period: "",
    isLaptop: 1,
    screen_size: "",
    screen_resolution: "",
    battery_capacity: 5,
    weight: 1.5,
    is_touchscreen: 0,
    laptop_processor: "",
    laptop_gpu: "",
    laptop_ram: "",
    laptop_storage: "",
    posted_by: currentUser,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLaptopDetails({
      ...laptopDetails,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Send only the four necessary fields to the parent
    const details = {
      name: laptopDetails.name,
      manufacturer: laptopDetails.manufacturer,
      price: laptopDetails.price,
      description: laptopDetails.description,
      stock_quantity: laptopDetails.stock_quantity,
      power_requirement: laptopDetails.power_requirement,
      form_factor: laptopDetails.form_factor,
      warranty_period: laptopDetails.warranty_period,
      isLaptop: laptopDetails.isLaptop,
      screen_size: laptopDetails.screen_size,
      screen_resolution: laptopDetails.screen_resolution,
      battery_capacity: laptopDetails.battery_capacity,
      weight: laptopDetails.weight,
      is_touchscreen: laptopDetails.is_touchscreen,
      laptop_processor: laptopDetails.laptop_processor,
      laptop_gpu: laptopDetails.laptop_gpu,
      laptop_ram: laptopDetails.laptop_ram,
      laptop_storage: laptopDetails.laptop_storage,
    };
    onSubmit(details); // Send data to parent component
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={laptopDetails.name}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Manufacturer"
        name="manufacturer"
        value={laptopDetails.manufacturer}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={laptopDetails.price}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        value={laptopDetails.description}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Stock Quantity"
        name="stock_quantity"
        type="number"
        value={laptopDetails.stock_quantity}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Power Requirement (Watts)"
        name="power_requirement"
        type="number"
        value={laptopDetails.power_requirement}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Form Factor"
        name="form_factor"
        value={laptopDetails.form_factor}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Warranty Period (Years)"
        name="warranty_period"
        type="number"
        value={laptopDetails.warranty_period}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Screen Size (inches)"
        name="screen_size"
        type="number"
        value={laptopDetails.screen_size}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Screen Resolution"
        name="screen_resolution"
        value={laptopDetails.screen_resolution}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Battery Capacity (mAh)"
        name="battery_capacity"
        type="number"
        value={laptopDetails.battery_capacity}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Weight (kg)"
        name="weight"
        type="number"
        value={laptopDetails.weight}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Touchscreen</InputLabel>
        <Select
          name="is_touchscreen"
          value={laptopDetails.is_touchscreen}
          onChange={handleChange}
        >
          <MenuItem value={true}>Yes</MenuItem>
          <MenuItem value={false}>No</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Processor"
        name="laptop_processor"
        value={laptopDetails.laptop_processor}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Graphic Card"
        name="laptop_gpu"
        value={laptopDetails.laptop_gpu}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="RAM (GB)"
        name="laptop_ram"
        type="number"
        value={laptopDetails.laptop_ram}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Storage (GB)"
        name="laptop_storage"
        type="number"
        value={laptopDetails.laptop_storage}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: 2 }}>
        Submit Laptop Details
      </Button>
    </Box>
  );
};

export default Laptop;
