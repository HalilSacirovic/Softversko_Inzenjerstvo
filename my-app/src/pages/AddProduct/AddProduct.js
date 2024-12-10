import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid2,
  Input,
  TextField,
  Typography,
} from "@mui/material";
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

          <Grid size={6} sx={{ height: 200, paddingLeft: 5 }}>
            <Typography variant="h4" pb={2}>
              Add Information
            </Typography>

            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Model"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Brand"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <BasicSelect label="Category" />

            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Label"
              />
              <FormControlLabel
                required
                control={<Checkbox />}
                label="Required"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddProduct;
