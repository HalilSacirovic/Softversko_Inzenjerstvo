import { Box, TextField } from "@mui/material";

const Desktop = () => {
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
      <TextField label="Processor" />
      <TextField label="Graphic Card" />
      <TextField label="RAM" />
      <TextField label="Storage" />
      <TextField label="Power Supply" />
      <TextField label="Case Type " />
    </Box>
  );
};

export default Desktop;
