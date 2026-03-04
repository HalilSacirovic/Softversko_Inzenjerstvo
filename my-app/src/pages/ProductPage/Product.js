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
import { green, purple } from "@mui/material/colors";
import Specifications from "../../components/Specifications";
import NestedList from "../../components/NestedList";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewList from "../../components/Review";
import AddReview from "../../components/AddReview";
import { jwtDecode } from "jwt-decode";

const Product = () => {
  const params = useParams();
  console.log(params);

  const [reviews, setReviews] = useState([]);
  const [valueReview, setValueReview] = useState();
  const [userRatingId, setUserRatingId] = useState();
  const [userRating, setUserRating] = useState([]);
  const [isInCart, setIsInCart] = React.useState([]);

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

  const handleAddToCart = () => {
    if (!user || !user.userId) {
      alert("Morate biti prijavljeni da biste dodali proizvod u korpu!");
      return;
    }
    const data = {
      user_id: user.userId,
      produkt_id: params.id,
    };

    fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Dodato u korpi!");
      })
      .catch((error) => {
        console.error("Greška:", error);
      });
  };

  React.useEffect(() => {
    fetch("http://localhost:5000/rental-item/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dohvaćeni produkti:", data);
        console.log("ID", data.user_id);
        setUserRatingId(data.user_id);
        setData(data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });

    fetch(`http://localhost:5000/review/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
          // Ako je data niz, postavi ga u state
        } else {
          setReviews([]); // Ako nije niz, postavi prazan niz
        }
        console.log("dataaaaafo review", data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });

    fetch(`http://localhost:5000/incart`)
      .then((response) => response.json())
      .then((data) => {
        setIsInCart(data);
        console.log("cartdata", data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);

  console.log("userati", userRatingId);
  useEffect(() => {
    fetch(`http://localhost:5000/review_user/${userRatingId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUserRating(data);
          // Ako je data niz, postavi ga u state
        } else {
          setUserRating([]); // Ako nije niz, postavi prazan niz
        }
        console.log("USERREVIES TYPE SHI", data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, [userRatingId]);

  const CountReview = () => {
    let total = 0;
    let counter = 0;

    reviews.forEach((element) => {
      counter++;
      total += Number(element.rating);
    });

    const value = counter > 0 ? total / counter : 0;
    return Math.round(value * 10) / 10;
  };

  const CountReviewUser = () => {
    let total = 0;
    let counter = 0;

    userRating.forEach((element) => {
      counter++;
      total += Number(element.rating);
    });

    const value = counter > 0 ? total / counter : 0;
    return Math.round(value * 10) / 10;
  };

  const handleIsInCart = (productId) => {
    if (!Array.isArray(isInCart)) return false;

    return isInCart.some(
      (item) => Number(item.produkt_id) === Number(productId),
    );
  };
  return (
    <Box>
      <NavBar />
      <Container>
        {/* GLAVNI WRAPPER: LEVO (veće, premium) + DESNO (sticky buy box) */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 2, md: 4 },
            alignItems: "flex-start",
            mt: 3,
            flexDirection: { xs: "column", lg: "row" },
          }}
        >
          {/* LEFT SIDE (veći i elegantniji) */}
          <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
            {/* IMAGE (premium frame) */}
            <Box
              sx={{
                height: { xs: 360, md: 560 },
                borderRadius: 3,
                overflow: "hidden",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.02))",
                border: "1px solid rgba(0,0,0,0.10)",
                boxShadow: "0 18px 60px rgba(0,0,0,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={data.image_url}
                alt={data.name}
                style={{
                  width: "92%",
                  height: "92%",
                  objectFit: "contain",
                  borderRadius: 16,
                }}
              />
            </Box>

            {/* SELLER CARD (professional) */}
            <Box
              sx={{
                mt: 3,
                borderRadius: 3,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "rgba(255,255,255,0.92)",
                boxShadow: "0 18px 55px rgba(0,0,0,0.08)",
                p: { xs: 2.2, md: 3 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2.5,
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                {/* left part */}
                <Box sx={{ display: "flex", gap: 2.2, alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 78,
                      height: 78,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #0B0B10, #2B2B38)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#E7D27C",
                      fontWeight: 900,
                      fontSize: 28,
                      boxShadow: "0 14px 36px rgba(0,0,0,0.18)",
                      flexShrink: 0,
                    }}
                  >
                    {(data.user_name?.charAt(0) || "U").toUpperCase()}
                  </Box>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                      }}
                    >
                      {data.user_name} {data.user_lastname}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mt: 0.6,
                      }}
                    >
                      <Rating
                        name="read-only"
                        value={CountReviewUser()}
                        readOnly
                        precision={0.1}
                      />
                      <Typography sx={{ fontWeight: 900 }}>
                        {CountReviewUser()}
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        ({userRating.length} reviews)
                      </Typography>
                    </Box>

                    <Typography
                      sx={{ mt: 1, color: "text.secondary", fontSize: 15 }}
                    >
                      <b>@</b>
                      {data.username} • <b>Email:</b> {data.user_email} •{" "}
                      <b>Phone:</b> {data.user_phone || "N/A"}
                    </Typography>
                  </Box>
                </Box>

                {/* right button */}
                <Button
                  sx={{
                    borderRadius: 999,
                    px: 2.4,
                    py: 1.1,
                    fontWeight: 900,
                    backgroundColor: "rgba(11,11,16,0.06)",
                    color: "rgba(11,11,16,0.85)",
                    "&:hover": { backgroundColor: "rgba(11,11,16,0.10)" },
                  }}
                  onClick={() => {
                    user && user.userId
                      ? user.userId === data.user_id
                        ? navigate(`/profile/${user.userId}`)
                        : navigate(`/user_profile/${data.user_id}`)
                      : navigate(`/user_profile/${data.user_id}`);
                  }}
                >
                  Seller details
                </Button>
              </Box>
            </Box>

            {/* NESTED SECTIONS (spacing + full width) */}
            <Box sx={{ mt: 4, display: "grid", gap: 1.5 }}>
              <NestedList
                name="Specifications"
                subname={<Specifications data={data} />}
                width="100%"
              />
              <NestedList
                name="Reviews"
                subname={<ReviewList productId={params.id} />}
                width="100%"
              />
              <NestedList
                name="Add Review"
                subname={
                  user && user.userId ? (
                    <AddReview productId={params.id} userId={user.userId} />
                  ) : (
                    <Typography variant="body1" color="error">
                      You need to be logged to add review
                    </Typography>
                  )
                }
                width="100%"
              />
            </Box>
          </Box>

          {/* RIGHT SIDE - STICKY BUY BOX */}
          <Box
            sx={{
              width: { xs: "100%", lg: 320 },
              position: { lg: "sticky" },
              top: { lg: 100 }, // ako ti NavBar prekriva, stavi 90 ili 96
              alignSelf: "flex-start",
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 3,
              padding: 3,
              boxShadow: "0 22px 70px rgba(0,0,0,0.12)",
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, letterSpacing: "-0.02em" }}
            >
              {data.name}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
              <Rating
                name="read-only"
                value={CountReview()}
                readOnly
                precision={0.1}
              />
              <Typography paddingLeft={2} sx={{ fontWeight: 800 }}>
                {CountReview()}
              </Typography>
            </Box>

            <Typography
              sx={{ marginTop: 1, color: "text.secondary" }}
              variant="body2"
            >
              Total Reviews: ({reviews.length})
            </Typography>

            <Box sx={{ marginTop: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                ${data.rental_price}
              </Typography>
            </Box>

            <Box sx={{ marginTop: 3 }}>
              <Button
                sx={{
                  width: "100%",
                  background:
                    "linear-gradient(135deg, #E7D27C 0%, #C9A227 55%, #B88D14 100%)",
                  color: "#0B0B10",
                  borderRadius: 999,
                  padding: "12px",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  boxShadow: "0 16px 40px rgba(201,162,39,0.35)",
                  ":hover": {
                    background:
                      "linear-gradient(135deg, #F0DB86 0%, #D1AA2F 55%, #C59715 100%)",
                    boxShadow: "0 18px 48px rgba(201,162,39,0.45)",
                  },
                }}
                onClick={() => {
                  if (data.availability === 0) {
                    alert("Item is not available");
                  } else if (handleIsInCart(Number(data.id))) {
                    alert("Already in cart");
                  } else {
                    handleAddToCart();
                  }
                }}
              >
                ADD TO CART
              </Button>
            </Box>

            <Typography sx={{ mt: 1.2, fontSize: 13, color: "text.secondary" }}>
              Secure checkout • Premium listing
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Product;
