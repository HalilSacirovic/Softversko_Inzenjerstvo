import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Divider,
  Container,
} from "@mui/material";
import NavBar from "../../components/NavBar";
import PaymentModal from "../../components/PaymentModal";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [promoCode, setPromoCode] = useState("");
  const [isDiscount, setIsDiscount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [values, setValues] = useState({});
  const [discount, setDiscount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState(""); // Za poruku o praznoj korpi

  const navigate = useNavigate();

  const getUserFromToken = (token) => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      return null;
    }
  };

  const token = localStorage.getItem("auth_token");
  const user = getUserFromToken(token);

  // useEffect za dobijanje podataka iz korpe korisnika
  useEffect(() => {
    if (user && user.userId) {
      // Ako postoji korisnik, pozovemo API za korpu
      fetch(`http://localhost:5000/cart/${user.userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setCartData(data); // Učitaj podatke u korpu
          } else {
            setCartData([]); // Ako nije niz, postavi prazan niz
            setMessage("Nemate proizvode u korpi."); // Prikazivanje poruke ako korpa nije pronađena
          }
        })
        .catch((error) => {
          setMessage("Nemate proizvode u korpi."); // Prikazivanje poruke ako dođe do greške
        });
    }
  }, [user]);

  const handleIncrement = (id) => {
    setValues((prevValues) => ({
      ...prevValues,
      [id]: prevValues[id] + 1,
    }));
  };

  const handleDecrement = (id) => {
    setValues((prevValues) => ({
      ...prevValues,
      [id]: Math.max(0, prevValues[id] - 1),
    }));
  };

  const handleRemoveProduct = (productId) => {
    // Poslati zahtev za brisanje proizvoda
    fetch(`http://localhost:5000/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Ako je proizvod uspešno obrisan, ažuriraj stanje
          setCartData((prevData) =>
            prevData.filter((item) => item.id !== productId),
          );
          alert("Proizvod je uspešno obrisan!");
        } else {
          alert("Došlo je do greške prilikom brisanja proizvoda.");
        }
      })
      .catch((error) => {
        console.error("Greška prilikom brisanja:", error);
      });
  };

  const calculateTotalPrice = () => {
    return cartData.reduce(
      (sum, item) => sum + Number(item.ri_price) * (values[item.id] || 0),
      0,
    );
  };

  useEffect(() => {
    if (isDiscount) {
      const price = calculateTotalPrice();
      const discountValue = price * 0.2;
      setDiscount(discountValue);
    } else {
      setDiscount(0);
    }
  }, [isDiscount, cartData, values]);

  const handleDiscount = () => {
    if (promoCode === "halil20" && isDiscount === 0) {
      setIsDiscount(1);
    } else if (isDiscount === 1) {
      alert("Već ste iskoristili ovaj kod");
    } else {
      alert("Pogrešan KOD");
    }
  };

  const fullPrice = () => {
    const totalPrice = calculateTotalPrice();
    return isDiscount ? totalPrice - discount : totalPrice;
  };

  return (
    <>
      <NavBar />
      <Container>
        <Box p={4} sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
          <Typography variant="h4" gutterBottom>
            Vaša korpa
          </Typography>

          {/* Provera da li je korpa prazna */}
          {cartData.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                {message ||
                  "Vaša korpa je prazna. Dodajte proizvode da biste nastavili."}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => navigate("/products")}
              >
                Dodajte proizvode
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                {cartData.map((item) => (
                  <Paper key={item.id} sx={{ p: 2, mb: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={9}>
                        <Typography variant="h6">{item.ri_name}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {item.ri_details}
                        </Typography>
                      </Grid>
                      <Grid item xs={3} textAlign="right">
                        <Typography variant="h6">{item.ri_price}$</Typography>
                        <Box
                          display="flex"
                          justifyContent="flex-end"
                          alignItems="center"
                          mt={1}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleDecrement(item.id)}
                          >
                            -
                          </Button>
                          <Typography sx={{ mx: 1 }}>
                            {values[item.id] || 0}
                          </Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleIncrement(item.id)}
                          >
                            +
                          </Button>
                        </Box>
                        {/* Dugme za brisanje */}
                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={() => handleRemoveProduct(item.id)}
                          sx={{ mt: 2 }}
                        >
                          Izbriši
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Pregled narudžbine
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body1">
                    Cena za online plaćanje:
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {fullPrice()} $
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Discount: {discount.toFixed(2)} $
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    sx={{ mb: 2 }}
                    onClick={() => setOpenModal(true)}
                  >
                    Nastavite
                  </Button>
                  <TextField
                    fullWidth
                    placeholder="PROMO KOD"
                    size="small"
                    sx={{ mb: 1 }}
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button onClick={handleDiscount} variant="outlined" fullWidth>
                    Primeni kod
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}

          <PaymentModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onConfirm={() => {
              alert("Narudžbina je uspešno poslata!");
              setOpenModal(false);
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default CartPage;
