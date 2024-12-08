import "./Home.css";
import * as React from "react";
import ProductCard from "../../components/ProductCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import NestedList from "../../components/CollapseButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToggleButton, Typography } from "@mui/material";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import NavBar from "../../components/NavBar";
import { CategoriesNav } from "../../components/CateregoriesNav";

const HomePage = () => {
  // const location = useLocation();

  const navigate = useNavigate();
  // console.log(location);

  // const user = {
  //   id: 1,
  //   username: "halil",
  // };
  // OVO JE PRIMER ZBOG PARAMSA, UZEO SAM USER ALI ZA PRODUKT TREBA, ZNACI UZIMA SE ID PRODUKTA I SALJE SE NA TU STRANICU I POSLE IZ BAZE SE FECHUJU PODACI I UZIMA SE TAJ ID IZ PARAMSA KAKO BI DOBIO TAJ PRODUKT KOJ IMI TREBA

  return (
    <div className="all-div">
      <NavBar />
      <Container fixed>
        <div className="main-section">
          <CategoriesNav />

          <div className="products">
            <div className="filters">
              <NestedList name="Price" subname="$100,000- $200.000" />
              <NestedList name="Name" subname="Lenovo" />
              <NestedList name="Manufacturer" subname="Lenovo" />
              <NestedList name="State" subname="NEW" />
              <NestedList name="Type" subname="Laptop" width="350" />
            </div>

            <Grid container>
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
    </div>
  );
};

export default HomePage;
