import React, { useState } from "react";
import "./Home.css";
import ProductCard from "../../components/ProductCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import NestedList from "../../components/NestedList";
import { useNavigate } from "react-router-dom";
import { Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import NavBar from "../../components/NavBar";
import { CategoriesNav } from "../../components/CateregoriesNav";
import RangeSlider from "../../components/Slider";

const HomePage = () => {
  const [product, setProduct] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [filter, setFilter] = React.useState("all");
  const [sortCriteria, setSortCriteria] = React.useState(""); // State za sortiranje

  React.useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);

  const handleFilter = (category) => {
    setFilter(category);

    if (category === "all") {
      setFilteredProducts(product);
    } else {
      const filtered = product.filter((item) => {
        return item[category];
      });
      setFilteredProducts(filtered);
    }
  };

  const handleSortChange = (event) => {
    const criteria = event.target.value;
    setSortCriteria(criteria);

    let sortedProducts = [...filteredProducts];

    switch (criteria) {
      case "priceAsc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "nameAsc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating":
        sortedProducts.sort((a, b) => b.rating - a.rating); // Pretpostavljamo da `rating` postoji
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="all-div">
      <NavBar />
      <Container fixed>
        <div className="main-section">
          <CategoriesNav />
          <div className="filters">
            <button onClick={() => handleFilter("all")}>All</button>
            <button onClick={() => handleFilter("isGPU")}>GPU</button>
            <button onClick={() => handleFilter("isCPU")}>CPU</button>
            <button onClick={() => handleFilter("isLaptop")}>Laptop</button>
            <button onClick={() => handleFilter("isDesktop")}>Desktop</button>
            <button onClick={() => handleFilter("isMotherboard")}>
              Motherboard
            </button>
            <button onClick={() => handleFilter("isRAM")}>RAM</button>
            <button onClick={() => handleFilter("isStorage")}>Storage</button>
          </div>

          {/* Dropdown za sortiranje */}
          <Box sx={{ my: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="sort-label">Sortiraj po</InputLabel>
              <Select
                labelId="sort-label"
                id="sort-select"
                value={sortCriteria}
                onChange={handleSortChange}
              >
                <MenuItem value="priceAsc">Cena (rastuće)</MenuItem>
                <MenuItem value="priceDesc">Cena (opadajuće)</MenuItem>
                <MenuItem value="nameAsc">Ime (A-Z)</MenuItem>
                <MenuItem value="nameDesc">Ime (Z-A)</MenuItem>
                <MenuItem value="rating">Ocena</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex" }}>
            <div className="filters">
              <NestedList name="Price" subname={<RangeSlider />} />
              <NestedList name="Name" subname="Lenovo" />
              <NestedList name="Manufacturer" subname="Lenovo" />
              <NestedList name="State" subname="NEW" />
              <NestedList name="Type" subname="Laptop" width="350" />
            </div>

            <Grid container>
              {filteredProducts.map((item) => {
                return (
                  <Grid item key={item.id}>
                    <ProductCard
                      id={item.id}
                      price={item.price}
                      name={item.name}
                      description={item.description}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
