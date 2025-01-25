import React, { useState, useEffect } from "react";
import { Box, Typography, Rating, Paper, Button } from "@mui/material";

const ReviewList = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false); // State za kontrolu prikaza recenzija

  const CountReview = () => {
    let total = 0;
    let counter = 0;

    reviews.forEach((element) => {
      counter++;
      total += Number(element.rating);
    });

    return total / counter;
  };

  const productIds = Number(productId);

  console.log("PRODUCT ID", productIds);

  // Dohvatanje recenzija za proizvod
  useEffect(() => {
    fetch(`http://localhost:5000/review/${productIds}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setReviews([]);
        }
        console.log("dataaaaafo review", data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, [productIds]);

  // Logika za prikazivanje recenzija (3 ili sve)
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <Box>
      <Typography variant="h6">Reviews </Typography>
      {reviews.length === 0 ? (
        <Typography variant="body1">
          This product doesnt have any review
        </Typography>
      ) : (
        <>
          {displayedReviews.map((review) => (
            <Paper key={review.id} sx={{ marginBottom: 2, padding: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#6c63ff",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bold",
                    marginRight: 2,
                  }}
                >
                  {review.user_name?.charAt(0).toUpperCase()}
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {review.user_name}
                  </Typography>
                  <Rating name="read-only" value={review.rating} readOnly />
                  <Typography variant="body2" sx={{ marginTop: 1 }}>
                    {review.comment}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}

          {reviews.length > 3 && (
            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll ? "Prikaži manje" : "Prikaži više"}
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ReviewList;
