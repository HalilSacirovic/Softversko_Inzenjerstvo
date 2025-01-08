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
import { jwtDecode } from "jwt-decode";

const CartPage = () => {
  const [cartData, setCartData] = useState([]);
  const [value, setValue] = useState(1);

  const getUserFromToken = (token) => {
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded;
    } catch (error) {
      return null;
    }
  };

  const token = localStorage.getItem("auth_token"); // Pretpostavka da čuvaš token u localStorage
  const user = getUserFromToken(token);

  const items = [
    {
      name: "Laptop LENOVO Legion 5",
      description: "15ARH7H R7/16/1/3070",
      details: 'AMD Ryzen 7 6800H do 4.70 GHz, 15.6", GeForce RTX 3070, 16GB',
      price: "204,439.00 RSD",
    },
    {
      name: "Grafička karta BIOSTAR RX560",
      description: "4GB GDDR5 128bit",
      details: "Grafička AMD Radeon RX 560, 4GB, 128bit",
      price: "15,999.00 RSD",
    },
    {
      name: "Laptop LENOVO IdeaPad Gaming 3",
      description: "15ACH6 R5/16/512",
      details: 'AMD Ryzen 5 5500H do 4.20 GHz, 15.6", GeForce RTX 2050, 16GB',
      price: "77,999.00 RSD",
    },
    {
      name: "Laptop LENOVO IdeaPad 1",
      description: "15ALC7 R5/8/512",
      details:
        'AMD Lucienne Ryzen 5 5500U do 4.0GHz, 15.6", Integrisana AMD Radeon, 8GB',
      price: "44,499.00 RSD",
    },
    {
      name: "Laptop ASUS Vivobook S 15 OLED",
      description: "S5507QA-MA067W",
      details:
        'Snapdragon X Plus/16GB/1TB, 15.6", Integrisana Qualcomm Adreno X Graphics, 16GB',
      price: "143,109.00 RSD",
    },
    {
      name: "Laptop ASUS ProArt Z213 OLED",
      description: "Snapdragon X Plus/16/1TB",
      details: "Integrisana Qualcomm Adreno Graphics, 16GB",
      price: "195,549.00 RSD",
    },
  ];

  useEffect(() => {
    fetch(`http://localhost:5000/cart/${user.userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCartData(data);
        } else {
          setCartData([]);
        }
        console.log("dataaaaafo review", data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);

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
              {cartData.map((item, index) => (
                <Paper key={index} sx={{ p: 2, mb: 2 }}>
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
                      <Typography variant="h6">{item.c_price}</Typography>
                      <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="center"
                        mt={1}
                      >
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setValue(value - 1);
                          }}
                        >
                          -
                        </Button>
                        <Typography sx={{ mx: 1 }}>{value}</Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setValue(value + 1);
                          }}
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
                  682,094.00 RSD
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Popust: 0.00 RSD
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Osvojeni bodovi: 500
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Iznos kupovine: 682,094.00 RSD
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  sx={{ mb: 2 }}
                >
                  Nastavite
                </Button>
                <TextField
                  fullWidth
                  placeholder="PROMO KOD"
                  size="small"
                  sx={{ mb: 1 }}
                />
                <Button variant="outlined" fullWidth>
                  Primeni kod
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default CartPage;
