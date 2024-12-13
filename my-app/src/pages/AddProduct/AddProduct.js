import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { CategoriesNav } from "../../components/CateregoriesNav";
import UploadImage from "../../components/UploadImage";
import Laptop from "../../Categories/Laptop";
import Cpu from "../../Categories/Cpu";
import Gpu from "../../Categories/Gpu";
import Desktop from "../../Categories/Desktop";
import Psu from "../../Categories/Psu";
import MotherBoard from "../../Categories/MotherBoard";
import Ram from "../../Categories/Ram";
import Storage from "../../Categories/Storage";

const AddProduct = () => {
  const [category, setCategory] = useState("");
  const [productDetails, setProductDetails] = useState({});

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleProductDetailsChange = (details) => {
    setProductDetails((prevState) => ({
      ...prevState,
      ...details, // Add new details to state
    }));
  };

  const handleAddProduct = async () => {
    // Send only the necessary details: name, manufacturer, price, description
    const productData = {
      name: productDetails.name || "",
      manufacturer: productDetails.manufacturer || "",
      price: productDetails.price || 0,
      description: productDetails.description || "",
      stock_quantity: productDetails.stock_quantity || 0,
      power_requirement: productDetails.power_requirement || null,
      form_factor: productDetails.form_factor || "",
      warranty_period: productDetails.warranty_period || 0,
      isLaptop: 1, // Označava da je laptop
      screen_size: productDetails.screen_size || "",
      screen_resolution: productDetails.screen_resolution || "",
      battery_capacity: productDetails.battery_capacity || 0,
      weight: productDetails.weight || 0,
      is_touchscreen: productDetails.is_touchscreen ? 1 : 0, // Pretvara boolean u 0/1
      laptop_processor: productDetails.laptop_processor || "",
      laptop_gpu: productDetails.laptop_gpu || "",
      laptop_ram: productDetails.laptop_ram || "",
      laptop_storage: productDetails.laptop_storage || "",
    };

    try {
      const response = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();
      if (response.status === 201) {
        console.log(result.message);
      } else {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const components = {
    1: <Laptop onSubmit={handleProductDetailsChange} />,
    2: <Desktop onSubmit={handleProductDetailsChange} />,
    3: <Cpu onSubmit={handleProductDetailsChange} />,
    4: <Gpu onSubmit={handleProductDetailsChange} />,
    5: <Psu onSubmit={handleProductDetailsChange} />,
    6: <MotherBoard onSubmit={handleProductDetailsChange} />,
    7: <Ram onSubmit={handleProductDetailsChange} />,
    8: <Storage onSubmit={handleProductDetailsChange} />,
  };

  return (
    <Box>
      <NavBar />
      <Container>
        <CategoriesNav />
        <Grid container sx={{ marginTop: 2 }}>
          <Grid
            size={6}
            sx={{
              backgroundColor: "whitesmoke",
              height: 500,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <UploadImage />
          </Grid>

          <Grid size={6} sx={{ height: 200, paddingLeft: 5 }}>
            <Typography variant="h4" pb={2}>
              Add Information
            </Typography>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem key={1} value={1}>
                  Laptop
                </MenuItem>
                <MenuItem key={2} value={2}>
                  PC (Desktop)
                </MenuItem>
                <MenuItem key={3} value={3}>
                  CPU (Processor)
                </MenuItem>
                <MenuItem key={4} value={4}>
                  GPU (Graphic Card)
                </MenuItem>
                <MenuItem key={5} value={5}>
                  PSU (Power Supply)
                </MenuItem>
                <MenuItem key={6} value={6}>
                  MotherBoard
                </MenuItem>
                <MenuItem key={7} value={7}>
                  RAM Memory
                </MenuItem>
                <MenuItem key={8} value={8}>
                  Storage
                </MenuItem>
              </Select>
            </FormControl>

            {components[category]}

            <Button onClick={handleAddProduct}>Submit Product</Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddProduct;
