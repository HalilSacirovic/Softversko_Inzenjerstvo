import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/NavBar";
import Laptop from "../../assets/laptop.png";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate, useParams } from "react-router-dom";

const StatCard = ({ label, value }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      borderRadius: 4,
      border: "1px solid",
      borderColor: "divider",
      bgcolor: "rgba(250,252,255,1)",
      textAlign: "left",
    }}
  >
    <Typography sx={{ fontWeight: 900, fontSize: 18 }}>{value}</Typography>
    <Typography variant="caption" sx={{ color: "text.secondary" }}>
      {label}
    </Typography>
  </Paper>
);

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [profileData, setProfileData] = useState({});
  const [productData, setProductData] = useState([]);
  const [reviewData, setReviewData] = useState([]);

  const [tab, setTab] = useState(0);

  const params = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("auth_token");

  const user = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error("Neuspešno dekodiranje tokena:", e);
      return null;
    }
  }, [token]);

  // Prosecna ocena
  const avgRating = useMemo(() => {
    if (!reviewData?.length) return 0;
    const sum = reviewData.reduce((acc, r) => acc + Number(r.rating || 0), 0);
    return Math.round((sum / reviewData.length) * 10) / 10;
  }, [reviewData]);

  // Guard: ne dozvoli drugim userima da otvore ovaj profil (kao u tvom kodu)
  useEffect(() => {
    if (user?.userId && user.userId !== Number(params.id)) {
      navigate("/");
    }
  }, [user, params.id, navigate]);

  // Reviews
  useEffect(() => {
    fetch(`http://localhost:5000/review_user/${params.id}`)
      .then((r) => r.json())
      .then((data) => setReviewData(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Došlo je do greške:", error));
  }, [params.id]);

  // Profile data
  useEffect(() => {
    fetch(`http://localhost:5000/userprofile/${params.id}`)
      .then((r) => r.json())
      .then((data) => setProfileData(data || {}))
      .catch((err) => console.error("Error fetching profile:", err.message));
  }, [params.id]);

  // User products
  useEffect(() => {
    fetch(`http://localhost:5000/user_products/${params.id}`)
      .then((r) => r.json())
      .then((data) => setProductData(Array.isArray(data) ? data : []))
      .catch((error) => console.error("Došlo je do greške:", error));
  }, [params.id]);

  const handleEditToggle = () => {
    setIsEditing((s) => !s);
    // ako zatvaraš edit (mock), pokaži snackbar
    if (isEditing) setShowSnackbar(true);
  };

  const handleDeleteWarning = () => setShowDeleteWarning((s) => !s);

  const handleDeleteProfile = () => {
    setShowDeleteWarning(false);
    alert("Profil bi bio obrisan (mock funkcija).");
  };

  return (
    <>
      <NavBar />

      <Box sx={{ minHeight: "100vh", bgcolor: "rgba(245,247,250,1)" }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          {/* HERO / COVER */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 5,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box
              sx={{
                height: 220,
                position: "relative",
                background:
                  "radial-gradient(circle at 10% 20%, rgba(66,165,245,0.45), transparent 50%), radial-gradient(circle at 70% 10%, rgba(25,118,210,0.55), transparent 55%), linear-gradient(135deg, rgba(18,32,46,0.45), rgba(18,32,46,0.0))",
              }}
            >
              <Button
                onClick={handleEditToggle}
                startIcon={<EditIcon />}
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  textTransform: "none",
                  fontWeight: 900,
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.9)",
                  border: "1px solid",
                  borderColor: "divider",
                  backdropFilter: "blur(10px)",
                  "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                }}
              >
                Izmeni profil
              </Button>

              {/* Avatar overlap */}
              <Box sx={{ position: "absolute", left: 28, bottom: -52 }}>
                <Avatar
                  sx={{
                    width: 116,
                    height: 116,
                    bgcolor: "rgba(255,255,255,0.9)",
                    border: "3px solid white",
                    color: "primary.main",
                    fontWeight: 900,
                    boxShadow: "0 20px 50px rgba(0,0,0,0.18)",
                  }}
                  src={"https://via.placeholder.com/150"}
                >
                  {(profileData?.username?.[0] || "R").toUpperCase()}
                </Avatar>
              </Box>

              {/* Name block */}
              <Box sx={{ position: "absolute", left: 170, bottom: 18 }}>
                <Typography
                  sx={{ color: "white", fontWeight: 900, fontSize: 26 }}
                >
                  {profileData?.username || "Korisnik"}
                </Typography>
                <Typography sx={{ color: "rgba(235,240,250,0.95)" }}>
                  {profileData?.email || "—"}{" "}
                  {profileData?.phone_number
                    ? ` · ${profileData.phone_number}`
                    : ""}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Chip
                    label="Rentify član"
                    size="small"
                    sx={{
                      fontWeight: 900,
                      bgcolor: "rgba(255,255,255,0.85)",
                      border: "1px solid",
                      borderColor: "divider",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Chip
                    label="Aktivan korisnik"
                    size="small"
                    sx={{
                      fontWeight: 900,
                      bgcolor: "rgba(255,255,255,0.85)",
                      border: "1px solid",
                      borderColor: "divider",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                </Stack>
              </Box>
            </Box>

            {/* BODY */}
            <Box sx={{ p: { xs: 2, md: 3 }, pt: 8 }}>
              {/* STATS */}
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <StatCard label="Proizvodi" value={productData.length} />
                </Grid>
                <Grid item xs={6} md={3}>
                  <StatCard
                    label="Prosek ocena"
                    value={avgRating ? `${avgRating} ★` : "—"}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <StatCard label="Recenzije" value={reviewData.length} />
                </Grid>
                <Grid item xs={6} md={3}>
                  <StatCard label="Rezervacije" value={"—"} />
                </Grid>
              </Grid>

              {/* TABS */}
              <Paper
                elevation={0}
                sx={{
                  mt: 2.5,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                }}
              >
                <Tabs
                  value={tab}
                  onChange={(_, v) => setTab(v)}
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{
                    px: 1,
                    "& .MuiTab-root": {
                      textTransform: "none",
                      fontWeight: 900,
                    },
                  }}
                >
                  <Tab label="O meni" />
                  <Tab label={`Proizvodi (${productData.length})`} />
                  <Tab label={`Recenzije (${reviewData.length})`} />
                </Tabs>
              </Paper>

              {/* TAB CONTENT */}
              <Box sx={{ mt: 2.5 }}>
                {tab === 0 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2.2,
                          borderRadius: 4,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Typography sx={{ fontWeight: 900, mb: 1 }}>
                          O meni
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}>
                          {profileData?.bio || "Nema bio opisa."}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          <Chip
                            label="Lokacija: Beograd"
                            sx={{ fontWeight: 900 }}
                          />
                          <Chip
                            label="Verifikovan email"
                            sx={{ fontWeight: 900 }}
                          />
                        </Stack>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2.2,
                          borderRadius: 4,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography sx={{ fontWeight: 900 }}>
                            Prosek ocena
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Rating
                              value={avgRating || 0}
                              readOnly
                              precision={0.1}
                            />
                            <Typography sx={{ fontWeight: 900 }}>
                              {avgRating ? avgRating : "—"}
                            </Typography>
                          </Stack>
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Ovde možeš dodati još info kasnije: verifikacije,
                          način preuzimanja, “response time”, itd.
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                )}

                {tab === 1 && (
                  <>
                    {productData.length === 0 ? (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          borderRadius: 4,
                          border: "1px solid",
                          borderColor: "divider",
                          textAlign: "center",
                        }}
                      >
                        <Typography sx={{ fontWeight: 900, mb: 0.5 }}>
                          Nema proizvoda
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Dodaj prvi predmet koji želiš da iznajmljuješ.
                        </Typography>
                      </Paper>
                    ) : (
                      <Grid container spacing={2}>
                        {productData.map((product) => (
                          <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <Card
                              sx={{
                                borderRadius: 4,
                                overflow: "hidden",
                                border: "1px solid",
                                borderColor: "divider",
                                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                                "&:hover": {
                                  boxShadow: "0 20px 55px rgba(0,0,0,0.14)",
                                },
                              }}
                            >
                              <img
                                src={Laptop}
                                alt={product.product_name}
                                style={{
                                  width: "100%",
                                  height: 180,
                                  objectFit: "cover",
                                }}
                              />
                              <CardContent>
                                <Typography sx={{ fontWeight: 900 }}>
                                  {product.product_name}
                                </Typography>
                                <Typography sx={{ color: "text.secondary" }}>
                                  {product.product_price}
                                </Typography>
                              </CardContent>

                              <Box
                                sx={{
                                  px: 2,
                                  pb: 2,
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <Link to={`/product/${product.product_id}`}>
                                  <Button
                                    size="small"
                                    startIcon={<ShoppingCartIcon />}
                                    variant="outlined"
                                    sx={{
                                      borderRadius: 3,
                                      textTransform: "none",
                                      fontWeight: 900,
                                    }}
                                  >
                                    Detalji
                                  </Button>
                                </Link>

                                <Chip
                                  label="Dostupno"
                                  size="small"
                                  sx={{ fontWeight: 900 }}
                                />
                              </Box>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </>
                )}

                {tab === 2 && (
                  <>
                    {reviewData.length === 0 ? (
                      <Paper
                        elevation={0}
                        sx={{
                          p: 4,
                          borderRadius: 4,
                          border: "1px solid",
                          borderColor: "divider",
                          textAlign: "center",
                        }}
                      >
                        <Typography sx={{ fontWeight: 900, mb: 0.5 }}>
                          Nema recenzija
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Kada korisnici ostave recenziju, biće prikazana ovde.
                        </Typography>
                      </Paper>
                    ) : (
                      <Stack spacing={1.5}>
                        {reviewData.map((review) => (
                          <Paper
                            key={review.id}
                            elevation={0}
                            sx={{
                              p: 2,
                              borderRadius: 4,
                              border: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            <Stack
                              direction="row"
                              spacing={1.5}
                              alignItems="center"
                            >
                              <Avatar
                                sx={{
                                  width: 40,
                                  height: 40,
                                  bgcolor: "rgba(25,118,210,0.15)",
                                  color: "primary.main",
                                  fontWeight: 900,
                                }}
                              >
                                {(review.user_name?.[0] || "U").toUpperCase()}
                              </Avatar>

                              <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontWeight: 900 }}>
                                  {review.user_name}
                                </Typography>
                                <Rating
                                  value={review.rating}
                                  readOnly
                                  precision={0.5}
                                />
                              </Box>
                            </Stack>

                            <Typography sx={{ mt: 1, color: "text.secondary" }}>
                              {review.comment}
                            </Typography>
                          </Paper>
                        ))}
                      </Stack>
                    )}
                  </>
                )}
              </Box>

              {/* DANGER */}
              <Paper
                elevation={0}
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "rgba(245,210,210,1)",
                  bgcolor: "rgba(255,245,245,1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 900, color: "error.main" }}>
                    Obriši profil
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(130,70,70,1)" }}
                  >
                    Ova radnja je nepovratna.
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteWarning}
                  sx={{
                    borderRadius: 3,
                    textTransform: "none",
                    fontWeight: 900,
                  }}
                >
                  Obriši profil
                </Button>
              </Paper>
            </Box>
          </Paper>

          {/* Delete dialog */}
          <Dialog open={showDeleteWarning} onClose={handleDeleteWarning}>
            <DialogTitle>Obriši profil</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Da li ste sigurni da želite obrisati svoj profil? Ova radnja je
                nepovratna.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleDeleteWarning}
                sx={{ textTransform: "none", fontWeight: 800 }}
              >
                Otkaži
              </Button>
              <Button
                onClick={handleDeleteProfile}
                color="error"
                sx={{ textTransform: "none", fontWeight: 900 }}
              >
                Obriši
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbar */}
          <Snackbar
            open={showSnackbar}
            autoHideDuration={3000}
            onClose={() => setShowSnackbar(false)}
            message="Podaci uspešno izmenjeni!"
          />
        </Container>
      </Box>
    </>
  );
};

export default ProfilePage;
