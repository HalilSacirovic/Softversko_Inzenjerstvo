import { Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Storage = ({ onSubmit }) => {
  const currentUser = useSelector((state) => state.auth.userId);
  const [storageDetails, setStorageDetails] = useState({
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: 0,
    storage_capacity: 0, // GB
    storage_type: "",
    interface: "",
    read_speed: 0, // MB/s
    write_speed: 0, // MB/s
    posted_by: currentUser,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStorageDetails({
      ...storageDetails,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(storageDetails);
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={storageDetails.name}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Manufacturer"
        name="manufacturer"
        value={storageDetails.manufacturer}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={storageDetails.price}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        value={storageDetails.description}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Stock Quantity"
        name="stock_quantity"
        type="number"
        value={storageDetails.stock_quantity}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Storage Capacity (GB)"
        name="storage_capacity"
        type="number"
        value={storageDetails.storage_capacity}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Storage Type"
        name="storage_type"
        value={storageDetails.storage_type}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Interface"
        name="interface"
        value={storageDetails.interface}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Read Speed (MB/s)"
        name="read_speed"
        type="number"
        value={storageDetails.read_speed}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Write Speed (MB/s)"
        name="write_speed"
        type="number"
        value={storageDetails.write_speed}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: 2 }}>
        Submit Storage Details
      </Button>
    </Box>
  );
};

export default Storage;
