import { Box, TextField } from "@mui/material";
const Psu = () => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <TextField label="Name" />
      <TextField label="Manufacturer" />
      <TextField label="Price" />
      <TextField label="Description" />
      <TextField label="Stock_Quantity" />
      <TextField label="Power_Requirement" />
      <TextField label="Form Factor" />
      <TextField label="Warranty Period" />
      <TextField label="Power Ouput" />
      <TextField label="Certification" />
      <TextField label="Modularity" />
    </Box>
  );
};

export default Psu;
