import React, { useEffect, useState } from "react";
import Laptop from "../../assets/laptop.png";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Paper,
  Rating,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { jwtDecode } from "jwt-decode";

const ProfileUser = () => {
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [rating, setRating] = useState(5); // Početna ocena
  const [comment, setComment] = useState("");
  const [reviewsData, setReviewData] = useState([]);
  const [hasReviewed, setHasReviewed] = useState(false);

  const params = useParams();

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

  const navigate = useNavigate();
  // Primer upotrebe:
  const token = localStorage.getItem("auth_token"); // Pretpostavka da čuvaš token u localStorage
  const user = getUserFromToken(token);

  const reviewData = {
    reviewer_id: user.userId,
    reviewed_id: params.id,
    rating: rating,
    comment: comment,
  };

  useEffect(() => {
    if (params.id && user.userId && String(params.id) === String(user.userId)) {
      navigate(`/profile/${user.userId}`);
    }
    fetch(`http://localhost:5000/userprofile/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err.message);
      });

    fetch(`http://localhost:5000/user_products/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    fetch(`http://localhost:5000/review_user/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviewData(data);
          console.log("PODACI ZA REVIES", data);
          const alreadyReviewed = data.some(
            (review) => review.reviewer_id === user.userId
          );
          console.log(alreadyReviewed, "alreadyreviews");
          setHasReviewed(alreadyReviewed);
        } else {
          setReviewData([]);
        }
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, [params.id]);

  const isReviewed = () => {
    hasReviewed
      ? alert("Vec ste dodali jednu recenziju za ovog korisnika")
      : handleReviewSubmit();
  };
  const handleReviewSubmit = () => {
    fetch("http://localhost:5000/reviews_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Recenzija je uspešno postavljena!");
        setRating(5);
        setComment("");
      })
      .catch((error) => {
        console.error("Greška:", error);
      });
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          maxWidth: "900px",
          margin: "auto",
          padding: "20px",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Profil */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: 2,
          }}
        >
          <Avatar
            sx={{ width: 100, height: 100, mr: 2 }}
            src="https://via.placeholder.com/150"
          />
          <Box>
            <>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {profileData.username}
              </Typography>
              <Typography color="textSecondary">{profileData.email}</Typography>
            </>
          </Box>
        </Box>

        {/* Recenzije */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recenzije
          </Typography>
          {reviewsData.length < 1 ? (
            <Typography variant="body1" sx={{ color: "textSecondary", mt: 2 }}>
              Nema recenzija za ovog korisnika.
            </Typography>
          ) : (
            reviewsData.map((review) => (
              <Card
                key={review.id}
                sx={{
                  mb: 2,
                  padding: "10px",
                  boxShadow: 1,
                  backgroundColor: "#fff",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar
                    src={review.avatar}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {`${review.user_name} ${review.user_lastname}`}
                  </Typography>
                  <Rating
                    value={review.rating}
                    readOnly
                    precision={0.5}
                    sx={{ ml: 2 }}
                  />
                </Box>
                <Typography>{review.comment}</Typography>
              </Card>
            ))
          )}

          {/* Forma za dodavanje recenzije */}
          <Card sx={{ padding: "10px", boxShadow: 1, backgroundColor: "#fff" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Dodaj recenziju
            </Typography>
            <Rating
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              precision={0.5}
              sx={{ mb: 2 }}
            />
            <TextField
              multiline
              rows={3}
              placeholder="Dodajte komentar"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={isReviewed}
              disabled={!rating || !comment}
            >
              Pošalji recenziju
            </Button>
          </Card>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Proizvodi */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Moji proizvodi
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {productData && Object.keys(productData).length === 0 ? (
              <Typography>User aint selling any product</Typography>
            ) : (
              productData.map((product) => (
                <Grid item xs={12} sm={6} key={product.id}>
                  <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
                    <img
                      src={Laptop}
                      alt={product.product_name}
                      style={{ width: "100%", borderRadius: "8px 8px 0 0" }}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {product.product_name}
                      </Typography>
                      <Typography color="textSecondary">
                        {product.product_price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Link to={`/product/${product.product_id}`}>
                        <Button
                          size="small"
                          startIcon={<ShoppingCartIcon />}
                          variant="outlined"
                        >
                          Detalji
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Snackbar za potvrdu editovanja */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
          message="Podaci uspešno izmenjeni!"
        />
      </Box>
    </>
  );
};

export default ProfileUser;
