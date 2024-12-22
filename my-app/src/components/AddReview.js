import React, { useState } from "react";
import { Box, Button, TextField, Rating, Typography } from "@mui/material";

const AddReview = ({ productId, userId }) => {
  const [rating, setRating] = useState(5); // Početna ocena
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!comment) {
      alert("Komentar je obavezan!");
      return;
    }

    console.log("PRODUCT & USER ID ", Number(productId), userId);

    const reviewData = {
      component_id: Number(productId),
      user_id: userId,
      rating: rating,
      comment: comment,
    };

    // Slanje recenzije na backend
    fetch("http://localhost:5000/reviews_product", {
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
    <Box>
      <Typography variant="h6">Dodajte svoju recenziju</Typography>
      <Box sx={{ marginTop: 2 }}>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
        />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <TextField
          label="Komentar"
          multiline
          rows={4}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Postavi recenziju
        </Button>
      </Box>
    </Box>
  );
};

export default AddReview;
