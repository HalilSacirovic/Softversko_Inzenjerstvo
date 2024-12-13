import { Box, TextField } from "@mui/material";

const Gpu = () => {
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
      <TextField label="Gpu Chipset" />
      <TextField label="Memory Size" />
      <TextField label="Memory Type" />
      <TextField label="Clock Speed " />
    </Box>
  );
};

export default Gpu;
