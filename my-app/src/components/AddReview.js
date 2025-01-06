import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Rating, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const AddReview = ({ productId, userId }) => {
  const [rating, setRating] = useState(5); // Početna ocena
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [hasReviewed, setHasReviewed] = useState(false);

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

  const token = localStorage.getItem("auth_token"); // Pretpostavka da čuvaš token u localStorage
  const user = getUserFromToken(token);

  useEffect(() => {
    fetch(`http://localhost:5000/review/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
          const alreadyReviewed = data.some(
            (review) => review.user_id === user.userId
          );
          console.log(alreadyReviewed, "alreadyreviews");
          setHasReviewed(alreadyReviewed);
          // Ako je data niz, postavi ga u state
        } else {
          setReviews([]); // Ako nije niz, postavi prazan niz
        }
        console.log("dataaaaafo review", data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);

  const handleSubmit = async () => {
    if (!comment) {
      alert("Komentar je obavezan!");
      return;
    }

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

  const isReviewed = () => {
    hasReviewed
      ? alert("Vec ste dodali jednu recenziju za ovaj proizvod")
      : handleSubmit();
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
        <Button onClick={isReviewed} variant="contained" color="primary">
          Postavi recenziju
        </Button>
      </Box>
    </Box>
  );
};

export default AddReview;
