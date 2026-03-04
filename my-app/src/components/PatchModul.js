import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./editModal.css";

const CONDITIONS = ["New", "Like new", "Good", "Used", "Damaged"];

export default function EditRentalItemModal({
  open,
  onClose,
  product,
  productId,
  onSaved, // callback kad uspešno sačuva
}) {
  const initial = useMemo(
    () => ({
      name: product?.name ?? "",
      rental_price: product?.rental_price ?? "",
      description: product?.description ?? "",
      item_condition: product?.item_condition ?? "Good",
      quantity: product?.quantity ?? 1,
      availability: product?.availability ?? 1, // 1/0
    }),
    [product],
  );

  const [form, setForm] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (open && productId) {
      // Ako se modal otvori, učitaj podatke sa servera
      fetch("http://localhost:5000/rental-item/" + productId)
        .then((response) => response.json())
        .then((data) => {
          console.log("Dohvaćeni produkti:", data);
          setForm({
            name: data.name ?? "",
            rental_price: data.rental_price ?? "",
            description: data.description ?? "",
            item_condition: data.item_condition ?? "Good",
            quantity: data.quantity ?? 1,
            availability: data.availability ?? 1,
          });
        })
        .catch((error) => {
          console.error("Došlo je do greške:", error);
        });
    }
  }, [open, productId]); // Dodajemo productId kao zavisnost da se ponovo učita kada se promeni

  const handleChange = (key) => (e) => {
    let val = e.target.value;
    if (key === "quantity") val = Math.max(0, Number(val));
    if (key === "rental_price") val = val === "" ? "" : Number(val);
    if (key === "availability") val = Number(val); // 1/0
    setForm((s) => ({ ...s, [key]: val }));
  };

  const handleSave = async () => {
    setSaving(true);
    setErrorMsg("");

    try {
      const res = await fetch(
        `http://localhost:5000/rental_item_patch/${productId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data?.error || data?.message || "Greška pri snimanju");

      // javimo parent-u da updateuje UI + snackbar
      onSaved?.(form);
      onClose?.();
    } catch (e) {
      setErrorMsg(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={saving ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ className: "neoDialog" }}
    >
      <DialogTitle className="neoTitle">
        Edit Rental Item
        <IconButton
          className="neoClose"
          onClick={onClose}
          disabled={saving}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="neoContent">
        <div className="neoGlow" aria-hidden="true" />

        <div className="neoGrid">
          <TextField
            label="Name"
            value={form.name}
            onChange={handleChange("name")}
            fullWidth
            className="neoField"
          />

          <TextField
            label="Rental price"
            value={form.rental_price}
            onChange={handleChange("rental_price")}
            type="number"
            fullWidth
            className="neoField"
          />

          <TextField
            label="Condition"
            value={form.item_condition}
            onChange={handleChange("item_condition")}
            select
            fullWidth
            className="neoField"
          >
            {CONDITIONS.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Quantity"
            value={form.quantity}
            onChange={handleChange("quantity")}
            type="number"
            fullWidth
            className="neoField"
          />

          <TextField
            label="Availability"
            value={form.availability}
            onChange={handleChange("availability")}
            select
            fullWidth
            className="neoField"
          >
            <MenuItem value={1}>Available</MenuItem>
            <MenuItem value={0}>Unavailable</MenuItem>
          </TextField>

          <TextField
            label="Description"
            value={form.description}
            onChange={handleChange("description")}
            fullWidth
            multiline
            minRows={4}
            className="neoField neoDesc"
          />
        </div>

        {errorMsg ? <div className="neoError">{errorMsg}</div> : null}

        <div className="neoActions">
          <Button
            variant="outlined"
            className="neoBtnSecondary"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            className="neoBtnPrimary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <span className="neoSaving">
                <CircularProgress size={18} />
                Saving...
              </span>
            ) : (
              "OK"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
