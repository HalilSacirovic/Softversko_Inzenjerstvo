import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

import laptop from "../assets/laptop.png";

const MotionCard = motion(Card);

export default function ProductCard(props) {
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = React.useState([]);

  const token = React.useMemo(() => localStorage.getItem("auth_token"), []);
  const user = React.useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (e) {
      console.error("Neuspešno dekodiranje tokena:", e);
      return null;
    }
  }, [token]);

  React.useEffect(() => {
    fetch(`http://localhost:5000/incart`)
      .then((r) => r.json())
      .then((data) => setIsInCart(data))
      .catch((err) => console.error("Došlo je do greške:", err));
  }, []);

  const alreadyInCart = React.useMemo(() => {
    return isInCart.some((item) => item.produkt_id === props.id);
  }, [isInCart, props.id]);

  const handleAddToCart = async () => {
    const data = { user_id: user.userId, produkt_id: props.id };

    try {
      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      await res.json();
      alert("Dodato u korpu!");
    } catch (e) {
      console.error(e);
      alert("Greška prilikom dodavanja u korpu.");
    }
  };

  const imageSrc = props.imageUrl || laptop;
  console.log(imageSrc, "image src");

  return (
    <MotionCard
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 350, damping: 24 }}
      sx={{
        width: 300,
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        position: "relative",
        "&:hover": {
          boxShadow: "0 20px 55px rgba(0,0,0,0.14)",
        },
        // Image zoom on hover:
        "&:hover .rentify-media": {
          transform: "scale(1.07)",
        },
        "&:hover .rentify-overlay": {
          opacity: 1,
        },
      }}
    >
      {/* Clickable area (image + content) */}
      <Box
        onClick={() => navigate("/product/" + props.id)}
        sx={{ cursor: "pointer" }}
      >
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            src={`http://localhost:5000${imageSrc}`}
            alt={props.name}
            className="rentify-media"
            sx={{
              height: 190,
              objectFit: "cover",
              transition: "transform 600ms cubic-bezier(.2,.8,.2,1)",
            }}
          />

          {/* Gradient for readability */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0) 55%)",
              pointerEvents: "none",
            }}
          />

          {/* Chips */}
          <Stack
            direction="column"
            spacing={1}
            sx={{ position: "absolute", top: 12, left: 12 }}
          >
            <Chip
              label={props.availability === 0 ? "NEDOSTUPNO" : "DOSTUPNO"}
              size="small"
              sx={{
                fontWeight: 800,
                bgcolor:
                  props.availability === 0
                    ? alpha("#d32f2f", 0.15)
                    : alpha("#2e7d32", 0.15),
                color: props.availability === 0 ? "#b71c1c" : "#1b5e20",
                border: "1px solid",
                borderColor:
                  props.availability === 0
                    ? alpha("#d32f2f", 0.25)
                    : alpha("#2e7d32", 0.25),
                backdropFilter: "blur(6px)",
              }}
            />
            {props.item_condition ? (
              <Chip
                label={props.item_condition}
                size="small"
                sx={{
                  fontWeight: 800,
                  bgcolor: "rgba(255,255,255,0.75)",
                  border: "1px solid",
                  borderColor: "divider",
                  backdropFilter: "blur(6px)",
                }}
              />
            ) : null}
          </Stack>

          {/* Price badge on image */}
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: 12,
              px: 1.2,
              py: 0.6,
              borderRadius: 999,
              bgcolor: "rgba(255,255,255,0.82)",
              border: "1px solid",
              borderColor: "divider",
              backdropFilter: "blur(8px)",
            }}
          >
            <Typography sx={{ fontWeight: 900, fontSize: 13 }}>
              {props.price} / dan
            </Typography>
          </Box>

          {/* Hover hint */}
          <Box
            className="rentify-overlay"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              opacity: 0,
              transition: "opacity 200ms ease",
              px: 1.2,
              py: 0.6,
              borderRadius: 999,
              bgcolor: "rgba(255,255,255,0.85)",
              border: "1px solid",
              borderColor: "divider",
              backdropFilter: "blur(8px)",
            }}
          >
            <Typography sx={{ fontSize: 12, fontWeight: 800 }}>
              Pogledaj detalje
            </Typography>
          </Box>
        </Box>

        <CardContent sx={{ pt: 2, pb: 1.5 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 900,
              fontSize: 16,
              lineHeight: 1.2,
              mb: 0.7,
            }}
          >
            {props.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: 40,
            }}
          >
            {props.description}
          </Typography>
        </CardContent>
      </Box>

      {/* Bottom actions row */}
      <Box
        sx={{
          px: 2,
          pb: 2,
          pt: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack spacing={0.2}>
          <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
            {props.price}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            po danu
          </Typography>
        </Stack>

        <Tooltip
          title={alreadyInCart ? "Već je u korpi" : "Dodaj u korpu"}
          arrow
        >
          {/* span zbog disabled tooltip bug-a */}
          <span>
            <IconButton
              disabled={alreadyInCart || props.availability === 0}
              onClick={(e) => {
                e.stopPropagation();
                if (!user?.userId)
                  return alert("Moraš prvo da se registruješ!");
                if (alreadyInCart) return alert("Already in cart");
                handleAddToCart();
              }}
              sx={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                color: "white",
                background:
                  alreadyInCart || props.availability === 0
                    ? "rgba(140,140,140,0.35)"
                    : "linear-gradient(135deg, rgba(25,118,210,1), rgba(66,165,245,1))",
                boxShadow:
                  alreadyInCart || props.availability === 0
                    ? "none"
                    : "0 10px 20px rgba(25,118,210,0.25)",
                transition: "transform 160ms ease, box-shadow 160ms ease",
                "&:hover": {
                  transform:
                    alreadyInCart || props.availability === 0
                      ? "none"
                      : "scale(1.06)",
                  boxShadow:
                    alreadyInCart || props.availability === 0
                      ? "none"
                      : "0 16px 30px rgba(25,118,210,0.33)",
                },
              }}
            >
              {alreadyInCart ? (
                <CheckCircleIcon sx={{ fontSize: 22 }} />
              ) : (
                <ShoppingCartIcon sx={{ fontSize: 22 }} />
              )}
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </MotionCard>
  );
}
