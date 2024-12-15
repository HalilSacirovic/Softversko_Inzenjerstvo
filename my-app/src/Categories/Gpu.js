import { Box, TextField, Button } from "@mui/material";
import React, { useState } from "react";

const GPU = ({ onSubmit }) => {
  const [gpuDetails, setGpuDetails] = useState({
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: 0,
    warranty_period: "",
    isGPU: 1,
    gpu_chipset: "",
    memory_size: "",
    memory_type: "",
    clock_speed: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGpuDetails({ ...gpuDetails, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(gpuDetails);
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={gpuDetails.name}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Manufacturer"
        name="manufacturer"
        value={gpuDetails.manufacturer}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={gpuDetails.price}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        value={gpuDetails.description}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Stock Quantity"
        name="stock_quantity"
        type="number"
        value={gpuDetails.stock_quantity}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Warranty Period (Years)"
        name="warranty_period"
        type="number"
        value={gpuDetails.warranty_period}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Chipset"
        name="gpu_chipset"
        value={gpuDetails.gpu_chipset}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Memory Size (GB)"
        name="memory_size"
        type="number"
        value={gpuDetails.memory_size}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Memory Type"
        name="memory_type"
        value={gpuDetails.memory_type}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Clock Speed (MHz)"
        name="clock_speed"
        type="number"
        value={gpuDetails.clock_speed}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button onClick={handleSubmit} variant="contained" sx={{ marginTop: 2 }}>
        Submit GPU Details
      </Button>
    </Box>
  );
};

export default GPU;
