import { Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const PSU = ({ onSubmit }) => {
  const currentUser = useSelector((state) => state.auth.userId);
  const [psuDetails, setPsuDetails] = useState({
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: 0,
    warranty_period: "",
    isPSU: 1,
    power_output: "",
    certification: "",
    modularity: "",
    posted_by: currentUser,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPsuDetails({ ...psuDetails, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(psuDetails);
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={psuDetails.name}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Manufacturer"
        name="manufacturer"
        value={psuDetails.manufacturer}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={psuDetails.price}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        value={psuDetails.description}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Stock Quantity"
        name="stock_quantity"
        type="number"
        value={psuDetails.stock_quantity}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Warranty Period (Years)"
        name="warranty_period"
        type="number"
        value={psuDetails.warranty_period}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Power Output (Watts)"
        name="power_output"
        type="number"
        value={psuDetails.power_output}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Certification"
        name="certification"
        value={psuDetails.certification}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Modularity"
        name="modularity"
        value={psuDetails.modularity}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: 2 }}>
        Submit PSU Details
      </Button>
    </Box>
  );
};

export default PSU;
