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
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [productData, setProductData] = React.useState([]);
  const [reviewData, setReviewData] = useState([]);

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

  const token = localStorage.getItem("auth_token"); // Pretpostavka da čuvaš token u localStorage
  const user = getUserFromToken(token);

  console.log(user.userId, params.id, "USERID PARAMS ID");

  useEffect(() => {
    if (user.userId !== Number(params.id)) {
      navigate("/");
    }
    fetch(`http://localhost:5000/review_user/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviewData(data);
          console.log("PODACI ZA REVIES", data);
        } else {
          setReviewData([]);
        }
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setShowSnackbar(true);
    }
  };

  const handleDeleteWarning = () => {
    setShowDeleteWarning(!showDeleteWarning);
  };

  const handleDeleteProfile = () => {
    setShowDeleteWarning(false);
    alert("Profil bi bio obrisan (mock funkcija).");
  };

  useEffect(() => {
    fetch(`http://localhost:5000/userprofile/${params.id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProfileData(data);
        console.log("PROFILE DATA", data);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err.message);
      });
  }, [params.id]);

  React.useEffect(() => {
    fetch("http://localhost:5000/user_products/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dohvaćeni produkti:", data);
        setProductData(data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);

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
              <Typography color="textSecondary">
                {profileData.phone_number}
              </Typography>
            </>
          </Box>
          <IconButton onClick={handleEditToggle} sx={{ marginLeft: "auto" }}>
            <EditIcon />
          </IconButton>
        </Box>

        {/* Bio */}
        <Box
          sx={{
            mb: 3,
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: 2,
          }}
        >
          <Typography variant="h6">O meni</Typography>

          <Typography>{profileData.bio}</Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Recenzije */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Recenzije
          </Typography>
          {reviewData.map((review) => (
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
                  src={"trenutno nema"}
                  sx={{ width: 40, height: 40, mr: 2 }}
                />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {review.user_name}
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
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Proizvodi */}
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Moji proizvodi
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {productData && Object.keys(productData).length > 0 ? (
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

        {/* Brisanje profila */}
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteWarning}
          fullWidth
          sx={{ padding: "10px", fontSize: "16px", fontWeight: 600 }}
        >
          Obriši profil
        </Button>

        {/* Upozorenje za brisanje */}
        <Dialog
          open={showDeleteWarning}
          onClose={handleDeleteWarning}
          aria-labelledby="delete-warning-title"
        >
          <DialogTitle id="delete-warning-title">Obriši profil</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Da li ste sigurni da želite obrisati svoj profil? Ova radnja je
              nepovratna.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteWarning} color="primary">
              Otkaži
            </Button>
            <Button onClick={handleDeleteProfile} color="error">
              Obriši
            </Button>
          </DialogActions>
        </Dialog>

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

export default ProfilePage;
