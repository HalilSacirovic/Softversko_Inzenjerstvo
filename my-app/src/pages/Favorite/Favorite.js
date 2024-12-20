import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

const FavoriteProducts = () => {
  const mockProducts = [
    {
      id: 1,
      name: "Laptop",
      price: "$1000",
      description: "Powerful laptop for professionals.",
    },
    {
      id: 2,
      name: "Gaming PC",
      price: "$1500",
      description: "High-performance desktop for gaming.",
    },
    {
      id: 3,
      name: "Graphics Card",
      price: "$500",
      description: "Top-notch GPU for video rendering.",
    },
  ];

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        Omiljeni Proizvodi
      </Typography>
      <Grid container spacing={4}>
        {mockProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography color="textSecondary" gutterBottom>
                  {product.price}
                </Typography>
                <Typography variant="body2">{product.description}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="secondary" fullWidth>
                  Ukloni iz favorita
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavoriteProducts;
