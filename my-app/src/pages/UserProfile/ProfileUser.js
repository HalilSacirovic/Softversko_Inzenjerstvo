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
  Divider,
  Grid,
  Paper,
  Rating,
  Snackbar,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const StatCard = ({ label, value }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      borderRadius: 4,
      border: "1px solid",
      borderColor: "divider",
      bgcolor: "rgba(250,252,255,1)",
    }}
  >
    <Typography sx={{ fontWeight: 900, fontSize: 18 }}>{value}</Typography>
    <Typography variant="caption" sx={{ color: "text.secondary" }}>
      {label}
    </Typography>
  </Paper>
);

const ProfileUser = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({});
  const [productData, setProductData] = useState([]);
  const [reviewsData, setReviewData] = useState([]);

  const [tab, setTab] = useState(0);

  // Review form
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hasReviewed, setHasReviewed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Snackbar
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const token = localStorage.getItem("auth_token");

  const user = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Neuspešno dekodiranje tokena:", error);
      return null;
    }
  }, [token]);

  const avgRating = useMemo(() => {
    if (!reviewsData?.length) return 0;
    const sum = reviewsData.reduce((acc, r) => acc + Number(r.rating || 0), 0);
    return Math.round((sum / reviewsData.length) * 10) / 10;
  }, [reviewsData]);

  // Ako korisnik otvori svoj profil kroz ovu rutu -> preusmeri na /profile/:id
  useEffect(() => {
    if (
      user?.userId &&
      params?.id &&
      String(params.id) === String(user.userId)
    ) {
      navigate(`/profile/${user.userId}`);
    }
  }, [user, params.id, navigate]);

  const fetchAll = async () => {
    try {
      // profile
      const profileRes = await fetch(
        `http://localhost:5000/userprofile/${params.id}`
      );
      const profileJson = await profileRes.json();
      setProfileData(profileJson || {});

      // products
      const prodRes = await fetch(
        `http://localhost:5000/user_products/${params.id}`
      );
      const prodJson = await prodRes.json();
      setProductData(Array.isArray(prodJson) ? prodJson : []);

      // reviews
      const revRes = await fetch(
        `http://localhost:5000/review_user/${params.id}`
      );
      const revJson = await revRes.json();
      const arr = Array.isArray(revJson) ? revJson : [];
      setReviewData(arr);

      // hasReviewed (ako user nije ulogovan -> false)
      if (user?.userId) {
        const alreadyReviewed = arr.some(
          (review) => String(review.reviewer_id) === String(user.userId)
        );
        setHasReviewed(alreadyReviewed);
      } else {
        setHasReviewed(false);
      }
    } catch (e) {
      console.error(e);
      setSnack({
        open: true,
        message: "Greška pri učitavanju profila.",
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (!params?.id) return;
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id, user?.userId]);

  const handleReviewSubmit = async () => {
    if (!user?.userId) {
      setSnack({
        open: true,
        message: "Moraš biti prijavljen da bi ostavio recenziju.",
        severity: "warning",
      });
      return;
    }

    if (hasReviewed) {
      setSnack({
        open: true,
        message: "Već si ostavio recenziju za ovog korisnika.",
        severity: "info",
      });
      return;
    }

    if (!rating || !comment.trim()) {
      setSnack({
        open: true,
        message: "Unesi ocenu i komentar.",
        severity: "warning",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        reviewer_id: user.userId,
        reviewed_id: params.id,
        rating,
        comment: comment.trim(),
      };

      const res = await fetch("http://localhost:5000/reviews_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      await res.json();

      setSnack({
        open: true,
        message: "Recenzija je uspešno postavljena!",
        severity: "success",
      });

      setRating(5);
      setComment("");
      setHasReviewed(true);

      // refetch reviews da se odmah vidi nova recenzija
      await fetchAll();
    } catch (e) {
      console.error(e);
      setSnack({
        open: true,
        message: "Greška pri slanju recenzije.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  {(profileData?.username?.[0] || "U").toUpperCase()}
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
                  {profileData?.email || "—"}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Chip
                    label="Rentify korisnik"
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
                    label={avgRating ? `Ocena: ${avgRating} ★` : "Bez ocene"}
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
                  <StatCard label="Recenzije" value={reviewsData.length} />
                </Grid>
                <Grid item xs={6} md={3}>
                  <StatCard label="Dostupno" value={"—"} />
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
                  <Tab label="Pregled" />
                  <Tab label={`Proizvodi (${productData.length})`} />
                  <Tab label={`Recenzije (${reviewsData.length})`} />
                </Tabs>
              </Paper>

              {/* TAB CONTENT */}
              <Box sx={{ mt: 2.5 }}>
                {/* PREGLED */}
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
                          O korisniku
                        </Typography>
                        <Typography sx={{ color: "text.secondary" }}>
                          {profileData?.bio || "Korisnik još nije dodao opis."}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          <Chip
                            label="Brza komunikacija (placeholder)"
                            sx={{ fontWeight: 900 }}
                          />
                          <Chip
                            label="Pouzdan renter (placeholder)"
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
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography sx={{ fontWeight: 900 }}>
                            Ocene
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
                          Ovaj blok je super da kasnije ubaciš: “response time”,
                          verifikacije, preferirani način preuzimanja, itd.
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                )}

                {/* PROIZVODI */}
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
                          Korisnik nema proizvode
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          Kada doda predmete, biće prikazani ovde.
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

                {/* RECENZIJE + FORMA */}
                {tab === 2 && (
                  <Grid container spacing={2}>
                    {/* Lista recenzija */}
                    <Grid item xs={12} md={7}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 2.2,
                          borderRadius: 4,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Typography sx={{ fontWeight: 900, mb: 1.5 }}>
                          Recenzije
                        </Typography>

                        {reviewsData.length < 1 ? (
                          <Typography sx={{ color: "text.secondary" }}>
                            Nema recenzija za ovog korisnika.
                          </Typography>
                        ) : (
                          <Stack spacing={1.5}>
                            {reviewsData.map((review) => (
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
                                    src={review.avatar}
                                  >
                                    {(
                                      review.user_name?.[0] || "U"
                                    ).toUpperCase()}
                                  </Avatar>

                                  <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontWeight: 900 }}>
                                      {`${review.user_name || ""} ${
                                        review.user_lastname || ""
                                      }`.trim()}
                                    </Typography>
                                    <Rating
                                      value={review.rating}
                                      readOnly
                                      precision={0.5}
                                    />
                                  </Box>
                                </Stack>

                                <Typography
                                  sx={{ mt: 1, color: "text.secondary" }}
                                >
                                  {review.comment}
                                </Typography>
                              </Paper>
                            ))}
                          </Stack>
                        )}
                      </Paper>
                    </Grid>

                    {/* Forma */}
                    <Grid item xs={12} md={5}>
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
                            Dodaj recenziju
                          </Typography>

                          {hasReviewed && (
                            <Chip
                              label="Već si ocenio"
                              size="small"
                              sx={{ fontWeight: 900 }}
                            />
                          )}
                        </Stack>

                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary", mt: 0.5 }}
                        >
                          Budi fer — opiši iskustvo kratko i jasno.
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Rating
                          value={rating}
                          onChange={(_, newValue) => setRating(newValue)}
                          precision={0.5}
                        />

                        <TextField
                          multiline
                          minRows={4}
                          placeholder="Dodaj komentar…"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          fullWidth
                          sx={{ mt: 2 }}
                        />

                        <Button
                          variant="contained"
                          startIcon={<SendRoundedIcon />}
                          onClick={handleReviewSubmit}
                          disabled={
                            isSubmitting ||
                            hasReviewed ||
                            !rating ||
                            !comment.trim()
                          }
                          sx={{
                            mt: 2,
                            width: "100%",
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: 900,
                            py: 1.2,
                          }}
                        >
                          {isSubmitting ? "Šaljem..." : "Pošalji recenziju"}
                        </Button>

                        {!user?.userId && (
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              mt: 1,
                              display: "block",
                            }}
                          >
                            * Moraš biti prijavljen da bi ostavio recenziju.
                          </Typography>
                        )}
                      </Paper>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </Box>
          </Paper>
        </Container>

        {/* Snackbar */}
        <Snackbar
          open={snack.open}
          autoHideDuration={3500}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
        >
          <Alert
            onClose={() => setSnack((s) => ({ ...s, open: false }))}
            severity={snack.severity}
            sx={{ width: "100%" }}
          >
            {snack.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ProfileUser;
