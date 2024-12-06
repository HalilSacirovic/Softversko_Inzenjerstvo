import "./Home.css";
import * as React from "react";

import ProductCard from "../../components/ProductCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import NestedList from "../../components/CollapseButton";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
      <div className="navbar">
        <Container>
          <div className="nav_container">
            <div className="logo">
              <h1>E-HUB</h1>
            </div>
            <div className="search_bar">
              <input placeholder="Search for product"></input>
            </div>
            <div className="icons">
              <ul>
                {/* <Link to={"/signup/" + user.id}>Login</Link */}
                <Link to={"/signup"}>Login</Link>
                <li
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  User
                </li>
                <li>Favorite</li>
                <li>Admin</li>
                <li>AddProduct</li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
      <Container fixed>
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
