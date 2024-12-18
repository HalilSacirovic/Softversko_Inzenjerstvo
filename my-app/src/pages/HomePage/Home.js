import "./Home.css";
import * as React from "react";
import ProductCard from "../../components/ProductCard";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import NestedList from "../../components/NestedList";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Slider, ToggleButton, Typography } from "@mui/material";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import NavBar from "../../components/NavBar";
import { CategoriesNav } from "../../components/CateregoriesNav";
import RangeSlider from "../../components/Slider";

const HomePage = () => {
  // const location = useLocation();

  const [product, setProduct] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [filter, setFilter] = React.useState("all");

  React.useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dohvaćeni produkti:", data);
        setProduct(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);
  const navigate = useNavigate();
  const handleFilter = (category) => {
    setFilter(category); // Postavi trenutni filter
    console.log(category);
    if (category === "all") {
      setFilteredProducts(product); // Prikazi sve proizvode
    } else {
      const filtered = product.filter((item) => {
        return item[category];
      });

      setFilteredProducts(filtered);
    }
  };

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
                // console.log("Prikazujem item:", item);
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
