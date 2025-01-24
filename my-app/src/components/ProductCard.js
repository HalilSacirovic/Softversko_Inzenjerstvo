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
import { jwtDecode } from "jwt-decode";

export default function ProductCard(props) {
  const navigate = useNavigate();
  const [isInCart, setIsInCart] = React.useState([]);

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

  const handleAddToCart = () => {
    const data = {
      user_id: user.userId,
      produkt_id: props.id,
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
        alert("You added item in a cart");
      })
      .catch((error) => {
        console.error("Greška:", error);
      });
  };

  React.useEffect(() => {
    fetch(`http://localhost:5000/incart`)
      .then((response) => response.json())
      .then((data) => {
        setIsInCart(data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);

  const handleIsInCart = (productId) => {
    return isInCart.some((item, idx) => item.produkt_id === productId);
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
          onClick={() => {
            if (user && user.userId) {
              handleIsInCart(props.id)
                ? alert("Already in cart")
                : handleAddToCart(props.id);
            } else {
              alert("You need to register first!");
            }
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 20, color: "#fff" }} />
        </Button>
      </CardActions>
    </Card>
  );
}
