import "./Home.css";
import * as React from "react";

import ProductCard from "../../components/ProductCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import NestedList from "../../components/CollapseButton";

const HomePage = () => {
  return (
    <Container fixed>
      <div className="navbar">
        <div className="logo">
          <h1>E-HUB</h1>
        </div>
        <div className="search_bar">
          <input placeholder="Search for product"></input>
        </div>
        <div className="icons">
          <ul>
            <li>Login</li>
            <li>User</li>
            <li>Favorite</li>
            <li>Admin</li>
            <li>AddProduct</li>
          </ul>
        </div>
      </div>

      <div className="main-section">
        <div className="all_product">
          <button>Products</button>
          <button>On Sale</button>
        </div>

        <div className="products">
          <div className="filters">
            <NestedList name="Price" subname="$100,000- $200.000" />
            <NestedList name="Name" subname="Lenovo" />
            <NestedList name="Manufacturer" subname="Lenovo" />
            <NestedList name="State" subname="NEW" />
            <NestedList name="Type" subname="Laptop" />
          </div>

          <Grid container spacing={0}>
            <Grid size={4}>
              <ProductCard />
            </Grid>
            <Grid size={4}>
              <ProductCard />
            </Grid>
            <Grid size={4}>
              <ProductCard />
            </Grid>
            <Grid size={4}>
              <ProductCard />
            </Grid>
            <Grid size={4}>
              <ProductCard />
            </Grid>
            <Grid size={4}>
              <ProductCard />
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
