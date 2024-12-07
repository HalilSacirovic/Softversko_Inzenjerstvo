import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import laptop from "../assets/laptop.png";

export default function ProductCard() {
  return (
    <Card sx={{ maxWidth: 255, marginLeft: 5, marginTop: 2 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="170"
        image={laptop}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lenovo Laptop
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Lenovo laptop with good battery life, good state good price
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="h5">$599.99</Typography>
      </CardActions>
    </Card>
  );
}
