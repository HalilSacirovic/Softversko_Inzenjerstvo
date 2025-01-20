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

const CartPage = () => {
  const [promoCode, setPromoCode] = useState("");
  const [isDiscount, setIsDiscount] = useState(0);
  const [cartData, setCartData] = useState([]);
  const [values, setValues] = useState({});
  const [discount, setDiscount] = useState(0);
  const [openModal, setOpenModal] = useState(false);

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

  useEffect(() => {
    fetch(`http://localhost:5000/cart/${user.userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCartData(data);

          const initialValues = {};
          data.forEach((item) => {
            initialValues[item.id] = 1;
          });
          setValues(initialValues);
        }
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, [user.userId]);

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

  const calculateTotalPrice = () => {
    return cartData.reduce(
      (sum, item) => sum + Number(item.c_price) * (values[item.id] || 0),
      0
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {cartData.map((item) => (
                <Paper key={item.id} sx={{ p: 2, mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={9}>
                      <Typography variant="h6">{item.c_name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.c_manufacturer}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {item.c_details}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} textAlign="right">
                      <Typography variant="h6">{item.c_price}$</Typography>
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
