import {
  Box,
  Button,
  Container,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import NavBar from "../../components/NavBar";
import { CategoriesNav } from "../../components/CateregoriesNav";
import { purple } from "@mui/material/colors";
import Specifications from "../../components/Specifications";
import NestedList from "../../components/NestedList";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewList from "../../components/Review";
import AddReview from "../../components/AddReview";
import { jwtDecode } from "jwt-decode";

const Product = () => {
  const params = useParams();
  console.log(params);

  const navigate = useNavigate();
  const getUserFromToken = (token) => {
    if (!token) return null;

    try {
      const decoded = jwtDecode(token); // Dekodira payload iz JWT
      return decoded; // Vraća korisničke podatke (npr. `id`, `username`)
    } catch (error) {
      console.error("Neuspešno dekodiranje tokena:", error);
      return null;
    }
  };

  // Primer upotrebe:
  const token = localStorage.getItem("auth_token"); // Pretpostavka da čuvaš token u localStorage
  const user = getUserFromToken(token);

  console.log("Prijavljeni korisnik:", user);

  const [data, setData] = React.useState({});
  React.useEffect(() => {
    fetch("http://localhost:5000/product/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dohvaćeni produkti:", data);
        console.log("ID", data.user_id);
        setData(data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);

  return (
    <Box>
      <NavBar />
      <Container>
        <CategoriesNav />
        <Grid container spacing={1} sx={{ marginTop: 1 }}>
          <Grid size={8}>
            <Box sx={{ backgroundColor: "blue", height: 500, display: "flex" }}>
              <Grid size={2} sx={{ backgroundColor: "yellow", height: 400 }}>
                Ovde idu manje slike
              </Grid>

              <Grid size={10} sx={{ backgroundColor: "aqua", height: 400 }}>
                Ovde ide velika slika
              </Grid>
            </Box>
          </Grid>

          <Grid size={4}>
            <Box sx={{ height: 500 }}>
              <Box>
                <Typography variant="h5">{data.name}</Typography>
                <Box>
                  <Rating name="size-medium" defaultValue={5} />
                  Review
                </Box>
              </Box>
              <Box sx={{ marginTop: 4 }}>
                <Typography variant="h5">{data.price} $</Typography>
              </Box>
              <Box sx={{ marginTop: 4 }}>
                <Button
                  sx={{
                    width: "300px",
                    backgroundColor: "orange",
                    color: "black",
                    borderRadius: 4,
                  }}
                >
                  ADD TO CART
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ marginTop: 2 }}>
          <Grid size={8}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                padding: 3,
                display: "flex",
                alignItems: "center",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f9f9f9",
              }}
            >
              {/* Avatar korisnika */}
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: "#6c63ff",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 28,
                  color: "white",
                  fontWeight: "bold",
                  marginRight: 3,
                }}
              >
                {data.user_name?.charAt(0).toUpperCase()}
              </Box>

              {/* Informacije o korisniku */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {`${data.user_name} ${data.user_lastname}`}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#555", marginTop: 1 }}
                >
                  <strong>Username:</strong> {data.username}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#555", marginTop: 1 }}
                >
                  <strong>Email:</strong> {data.user_email}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#555", marginTop: 1 }}
                >
                  <strong>Phone:</strong> {data.user_phone || "N/A"}
                </Typography>
                <Button
                  sx={{ backgroundColor: "#bdbdbd", color: "black" }}
                  onClick={() => {
                    {
                      user.userId === data.user_id
                        ? navigate(`/profile/${user.userId}`)
                        : navigate(`/user_profile/${data.user_id}`);
                    }
                  }}
                >
                  Details
                </Button>
              </Box>
            </Box>

            <Box sx={{ marginTop: 5 }}>
              <NestedList
                name="Specifications"
                subname={<Specifications data={data} />}
                width="500"
              />
              <NestedList
                name="Reviews"
                subname={<ReviewList productId={params.id} />}
                width="500"
              />
              <NestedList
                name="Add Review"
                subname={
                  <AddReview productId={params.id} userId={user.userId} />
                }
                width="500"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Product;
