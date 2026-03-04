import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const EditProfileModal = ({ open, onClose, userId, profile, onSaved }) => {
  const initial = useMemo(
    () => ({
      first_name: profile?.first_name || "",
      last_name: profile?.last_name || "",
      city: profile?.city || "",
      address: profile?.address || "",
      phone_number: profile?.phone_number || "",
      bio: profile?.bio || "",
    }),
    [profile]
  );

  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Kad se otvori modal ili se promeni profil, resetuj formu
  useEffect(() => {
    if (open) {
      setForm(initial);
      setError("");
      setLoading(false);
    }
  }, [open, initial]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    if (!form.first_name.trim()) return "Ime je obavezno.";
    if (!form.last_name.trim()) return "Prezime je obavezno.";
    // phone_number optional, ali ako unese nešto, možeš dodati provere
    return "";
  };

  const handleSave = async () => {
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:5000/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // ako imaš auth header:
          // Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
        body: JSON.stringify({
          first_name: form.first_name,
          username: form.username,
          last_name: form.last_name,
          city: form.city,
          address: form.address,
          phone_number: form.phone_number,
          bio: form.bio,

          // ostala polja NE diramo, ali backend PATCH očekuje sve.
          // Ako tvoj backend zaista zahteva sva polja,
          // prosledi i ostala iz profile (username/email/...) ovde.
          // U idealnom slučaju backend treba da radi "partial update".
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || data?.message || "Greška pri snimanju.");
      }

      // odmah update UI
      onSaved?.({
        ...profile,
        ...form,
      });

      onClose?.();
    } catch (e) {
      setError(e.message || "Došlo je do greške.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 900 }}>Izmeni profil</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Izmeni osnovne podatke profila.
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          {error ? <Alert severity="error">{error}</Alert> : null}

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Ime"
              value={form.first_name}
              onChange={handleChange("first_name")}
              fullWidth
              autoFocus
            />
            <TextField
              label="Prezime"
              value={form.last_name}
              onChange={handleChange("last_name")}
              fullWidth
            />
            <TextField
              label="username"
              value={form.username}
              onChange={handleChange("username")}
              fullWidth
            />
          </Stack>

          <TextField
            label="Grad"
            value={form.city}
            onChange={handleChange("city")}
            fullWidth
          />

          <TextField
            label="Adresa"
            value={form.address}
            onChange={handleChange("address")}
            fullWidth
          />

          <TextField
            label="Broj telefona"
            value={form.phone_number}
            onChange={handleChange("phone_number")}
            fullWidth
          />

          <TextField
            label="Bio"
            value={form.bio}
            onChange={handleChange("bio")}
            fullWidth
            multiline
            minRows={3}
          />
        </Stack>

        <Box sx={{ height: 8 }} />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          disabled={loading}
          sx={{ textTransform: "none", fontWeight: 800 }}
        >
          Otkaži
        </Button>
        <Button
          onClick={handleSave}
          disabled={loading}
          variant="contained"
          sx={{ textTransform: "none", fontWeight: 900, borderRadius: 3 }}
        >
          {loading ? "Čuvam..." : "Sačuvaj"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfileModal;
