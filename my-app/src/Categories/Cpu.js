import { Box, TextField } from "@mui/material";

const Cpu = () => {
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
      <TextField label="Clock Speed" />
      <TextField label="Threads" />
      <TextField label="Cores" />
      <TextField label="Base Clock " />
      <TextField label="Boost Clock" />
      <TextField label="Socket " />
    </Box>
  );
};

export default Cpu;
