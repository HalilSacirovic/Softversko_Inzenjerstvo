import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Box,
} from "@mui/material";

const PaymentModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Unesite podatke o plaćanju</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField label="Broj kartice" type="text" fullWidth required />
          <TextField label="Ime na kartici" type="text" fullWidth required />
          <TextField
            label="Datum isteka (MM/YY)"
            type="text"
            fullWidth
            required
          />
          <TextField label="CVV" type="password" fullWidth required />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Otkaži
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          Potvrdi plaćanje
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;
