import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import laptop from "../assets/laptop.png";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ProductCard(props) {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    console.log(`${props.name} je dodato u korpu`);
    // Dodaj funkcionalnost za dodavanje u korpu
  };

  return (
    <Card
      sx={{
        width: 250,
        marginLeft: 5,
        marginTop: 2,
        height: 330,
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      {/* Slika proizvoda */}
      <CardMedia
        component="img"
        alt={props.name}
        height="170"
        image={laptop} // Možeš zameniti sa dinamičkim URL-om slike
        sx={{
          objectFit: "cover",
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
        }}
      />

      {/* Detalji proizvoda */}
      <CardContent
        onClick={() => {
          navigate("/product/" + props.id);
        }}
        sx={{
          paddingBottom: 2,
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {props.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.description}
        </Typography>
      </CardContent>

      {/* Cena i dugme za dodavanje u korpu */}
      <CardActions
        sx={{
          justifyContent: "space-between",
          padding: 1.5,
          // backgroundColor: "#fafafa",
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          ${props.price}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            minWidth: "35px",
            height: "35px",
            borderRadius: "50%",
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ff9800",
            ":hover": {
              backgroundColor: "#e68900",
            },
          }}
          onClick={handleAddToCart}
        >
          <ShoppingCartIcon sx={{ fontSize: 20, color: "#fff" }} />
        </Button>
      </CardActions>
    </Card>
  );
}
