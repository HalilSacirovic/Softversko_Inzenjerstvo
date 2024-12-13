import { Box, TextField } from "@mui/material";

const MotherBoard = () => {
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
      <TextField label="Chipset" />
      <TextField label="Ram_slots" />
      <TextField label="Max Ram Capacity" />
      <TextField label="Supported RAM Type " />
    </Box>
  );
};

export default MotherBoard;
