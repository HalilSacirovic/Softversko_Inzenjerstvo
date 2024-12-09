import { Box, Container, Grid2 } from "@mui/material";
import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import { CategoriesNav } from "../../components/CateregoriesNav";
import Grid from "@mui/material/Grid2";
import UploadImage from "../../components/UploadImage";

const AddProduct = () => {
  return (
    <Box>
      <NavBar />
      <Container>
        <CategoriesNav />
        <Grid container>
          <Grid size={6} sx={{ backgroundColor: "red", height: 500 }}>
            <UploadImage />
          </Grid>

          <Grid size={6} sx={{ backgroundColor: "BLUE", height: 200 }}>
            {" "}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddProduct;
