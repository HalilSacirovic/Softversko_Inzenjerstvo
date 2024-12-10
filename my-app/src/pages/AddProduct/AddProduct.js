import { Box, Button, Container, Grid2, Input } from "@mui/material";
import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { CategoriesNav } from "../../components/CateregoriesNav";
import Grid from "@mui/material/Grid2";
import UploadImage from "../../components/UploadImage";
import BasicSelect from "../../components/SelectInput";

const AddProduct = () => {
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

          <Grid size={6} sx={{ height: 200 }}>
            <BasicSelect />
            <Input />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddProduct;
