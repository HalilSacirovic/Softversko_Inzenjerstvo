import React, { useState } from "react";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddRentalItem = () => {
  // Stanje za proizvod
  const [productDetails, setProductDetails] = useState({
    name: "",
    rental_price: 0,
    description: "",
    item_condition: "",
    quantity: 1,
    availability: 1,
  });

  // Stanje za sliku
  const [image, setImage] = useState(null);
  const currentUser = useSelector((state) => state.auth.userId);
  // Navigate za navigaciju nakon uspešnog unosa
  const navigate = useNavigate();

  // Promena podataka proizvoda
  const handleProductDetailsChange = (event) => {
    const { name, value } = event.target;
    setProductDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Funkcija za upload slike
  const handleImageUpload = (file) => {
    setImage(file); // Čuvanje izabrane slike
  };

  // Funkcija za dodavanje proizvoda sa slikom
  const handleAddRentalItem = async () => {
    const formData = new FormData();
    formData.append("image", image); // Dodavanje slike u FormData
    formData.append("name", productDetails.name);
    formData.append("rental_price", productDetails.rental_price);
    formData.append("description", productDetails.description);
    formData.append("item_condition", productDetails.item_condition);
    formData.append("quantity", productDetails.quantity);
    formData.append("availability", productDetails.availability);
    formData.append("posted_by", currentUser);

    try {
      const response = await fetch("http://localhost:5000/add-rental-item", {
        method: "POST",
        body: formData, // Slanje FormData sa slikom
      });

      const result = await response.json();
      if (response.status === 201) {
        console.log(result.message);
      } else {
        console.error(result.error);
      }
      alert("Uspesno dodat proizvod!");
      navigate("/"); // Nakon uspešnog unosa, navigacija na početnu stranu
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <Grid container sx={{ marginTop: 2 }}>
        <Grid
          item
          xs={6}
          sx={{
            backgroundColor: "whitesmoke",
            height: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Komponenta za upload slike */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
          {image && (
            <Typography variant="body1">Selected file: {image.name}</Typography>
          )}
        </Grid>

        <Grid item xs={6} sx={{ paddingLeft: 5 }}>
          <Typography variant="h4" pb={2}>
            Add Rental Item
          </Typography>

          {/* Input za naziv proizvoda */}
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <input
              type="text"
              name="name"
              value={productDetails.name}
              onChange={handleProductDetailsChange}
              placeholder="Item Name"
              required
            />
          </FormControl>

          {/* Input za cenu iznajmljivanja */}
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <input
              type="number"
              name="rental_price"
              value={productDetails.rental_price}
              onChange={handleProductDetailsChange}
              placeholder="Rental Price"
              required
            />
          </FormControl>

          {/* Input za opis proizvoda */}
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <textarea
              name="description"
              value={productDetails.description}
              onChange={handleProductDetailsChange}
              placeholder="Description"
              required
            />
          </FormControl>

          {/* Input za stanje proizvoda */}
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <input
              type="text"
              name="item_condition"
              value={productDetails.item_condition}
              onChange={handleProductDetailsChange}
              placeholder="Condition"
              required
            />
          </FormControl>

          {/* Input za količinu proizvoda */}
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <input
              type="number"
              name="quantity"
              value={productDetails.quantity}
              onChange={handleProductDetailsChange}
              placeholder="Quantity"
              required
            />
          </FormControl>

          {/* Input za dostupnost proizvoda */}
          <FormControl fullWidth sx={{ marginTop: 2 }}>
            <select
              name="availability"
              value={productDetails.availability}
              onChange={handleProductDetailsChange}
              required
            >
              <option value={1}>Available</option>
              <option value={0}>Not Available</option>
            </select>
          </FormControl>

          {/* Dugme za dodavanje proizvoda */}
          <Button onClick={handleAddRentalItem} sx={{ marginTop: 3 }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddRentalItem;
