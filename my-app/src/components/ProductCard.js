import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import laptop from "../assets/laptop.png";
import { useNavigate } from "react-router-dom";

export default function ProductCard(props) {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 250, marginLeft: 5, marginTop: 2, height: 330 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="170"
        image={laptop}
      />
      <CardContent
        onClick={() => {
          navigate("/product/" + props.id);
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Typography variant="h5">${props.price}</Typography>
      </CardActions>
    </Card>
  );
}
