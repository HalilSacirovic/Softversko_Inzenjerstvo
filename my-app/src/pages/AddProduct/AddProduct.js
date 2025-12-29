import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddRentalItem = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    rental_price: "",
    description: "",
    item_condition: "",
    quantity: 1,
    availability: 1,
  });

  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentUser = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  const imagePreview = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  const handleProductDetailsChange = (event) => {
    const { name, value } = event.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (file) => {
    if (!file) return;
    setImage(file);
  };

  const canSubmit =
    image &&
    productDetails.name.trim() &&
    String(productDetails.rental_price).trim() &&
    productDetails.description.trim() &&
    productDetails.item_condition.trim() &&
    Number(productDetails.quantity) > 0;

  const handleAddRentalItem = async () => {
    if (!canSubmit) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", productDetails.name);
      formData.append("rental_price", productDetails.rental_price);
      formData.append("description", productDetails.description);
      formData.append("item_condition", productDetails.item_condition);
      formData.append("quantity", productDetails.quantity);
      formData.append("availability", productDetails.availability);
      formData.append("posted_by", currentUser);

      const response = await fetch("http://localhost:5000/add-rental-item", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.status === 201) {
        alert("Uspešno dodat proizvod!");
        navigate("/");
      } else {
        console.error(result?.error || result);
        alert("Greška prilikom dodavanja proizvoda.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Greška: server nije dostupan ili upload nije uspeo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          RENTIFY
        </Typography>
        <Typography variant="h6" sx={{ color: "text.secondary", mt: 0.5 }}>
          Dodaj predmet za iznajmljivanje
        </Typography>

        <Paper
          elevation={0}
          sx={{
            mt: 3,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            overflow: "hidden",
          }}
        >
          <Grid container>
            {/* LEFT: Image upload */}
            <Grid
              item
              xs={12}
              md={5}
              sx={{
                bgcolor: "rgba(25,118,210,0.03)",
                p: { xs: 2.5, md: 3 },
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Fotografija
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 0.5 }}
              >
                Dodaj jasnu sliku predmeta (JPG/PNG).
              </Typography>

              <Box
                sx={{
                  mt: 2,
                  borderRadius: 3,
                  border: "2px dashed",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  height: 320,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {imagePreview ? (
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Preview"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Stack spacing={1} alignItems="center" sx={{ px: 2 }}>
                    <CloudUploadOutlinedIcon fontSize="large" />
                    <Typography sx={{ fontWeight: 700 }}>
                      Prevuci i pusti sliku ovde
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      ili klikni na dugme ispod
                    </Typography>
                  </Stack>
                )}
              </Box>

              <Stack
                direction="row"
                spacing={1.5}
                sx={{ mt: 2 }}
                alignItems="center"
              >
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadOutlinedIcon />}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  Izaberi fotografiju
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files?.[0])}
                  />
                </Button>

                {image?.name && (
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {image.name}
                  </Typography>
                )}
              </Stack>

              <Typography
                variant="caption"
                sx={{ color: "text.secondary", mt: 2, display: "block" }}
              >
                Savet: dobra svetlost, neutralna pozadina, prikaži eventualna
                oštećenja.
              </Typography>
            </Grid>

            {/* RIGHT: Form */}
            <Grid item xs={12} md={7} sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Detalji predmeta
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 0.5 }}
              >
                Popuni osnovne informacije i objavi oglas.
              </Typography>

              <Divider sx={{ my: 2.5 }} />

              <Stack spacing={2.2}>
                <TextField
                  label="Naziv"
                  name="name"
                  value={productDetails.name}
                  onChange={handleProductDetailsChange}
                  placeholder="npr. Aku bušilica, GoPro, Šator..."
                  fullWidth
                />

                <TextField
                  label="Cena (po danu)"
                  name="rental_price"
                  value={productDetails.rental_price}
                  onChange={handleProductDetailsChange}
                  type="number"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">RSD</InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Opis"
                  name="description"
                  value={productDetails.description}
                  onChange={handleProductDetailsChange}
                  placeholder="Kratko opiši stanje, sadržaj paketa, pravila preuzimanja..."
                  fullWidth
                  multiline
                  minRows={4}
                />

                <TextField
                  label="Stanje"
                  name="item_condition"
                  value={productDetails.item_condition}
                  onChange={handleProductDetailsChange}
                  select
                  fullWidth
                >
                  <MenuItem value={"Kao novo"}>Kao novo</MenuItem>
                  <MenuItem value={"Odlično"}>Odlično</MenuItem>
                  <MenuItem value={"Dobro"}>Dobro</MenuItem>
                  <MenuItem value={"Polovno"}>Polovno</MenuItem>
                  <MenuItem value={"Potrebna popravka"}>
                    Potrebna popravka
                  </MenuItem>
                </TextField>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Količina"
                      name="quantity"
                      value={productDetails.quantity}
                      onChange={handleProductDetailsChange}
                      type="number"
                      fullWidth
                      inputProps={{ min: 1 }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <FormControlLabel
                        sx={{
                          m: 0,
                          px: 1.5,
                          py: 1.2,
                          borderRadius: 3,
                          border: "1px solid",
                          borderColor: "divider",
                          justifyContent: "space-between",
                          display: "flex",
                        }}
                        control={
                          <Switch
                            checked={Number(productDetails.availability) === 1}
                            onChange={(e) =>
                              setProductDetails((prev) => ({
                                ...prev,
                                availability: e.target.checked ? 1 : 0,
                              }))
                            }
                          />
                        }
                        label={
                          <Box>
                            <Typography
                              sx={{ fontWeight: 700, lineHeight: 1.2 }}
                            >
                              Dostupnost
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "text.secondary" }}
                            >
                              {Number(productDetails.availability) === 1
                                ? "Dostupno"
                                : "Nije dostupno"}
                            </Typography>
                          </Box>
                        }
                        labelPlacement="start"
                      />
                    </FormControl>
                  </Grid>
                </Grid>

                <Stack direction="row" spacing={1.5} sx={{ pt: 0.5 }}>
                  <Button
                    variant="contained"
                    onClick={handleAddRentalItem}
                    disabled={!canSubmit || isSubmitting}
                    sx={{
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: 800,
                      px: 3,
                      py: 1.2,
                    }}
                  >
                    {isSubmitting ? "Objavljujem..." : "Objavi oglas"}
                  </Button>

                  <Button
                    variant="outlined"
                    disabled={isSubmitting}
                    sx={{
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                    onClick={() => navigate(-1)}
                  >
                    Nazad
                  </Button>
                </Stack>

                {!canSubmit && (
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    * Popuni sva polja i dodaj sliku da bi dugme bilo aktivno.
                  </Typography>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddRentalItem;
