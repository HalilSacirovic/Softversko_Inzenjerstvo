import {
  Box,
  Button,
  Container,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import NavBar from "../../components/NavBar";
import { CategoriesNav } from "../../components/CateregoriesNav";
import { purple } from "@mui/material/colors";
import Specifications from "../../components/Specifications";
import NestedList from "../../components/NestedList";
import React from "react";
import { useParams } from "react-router-dom";

const Product = () => {
  const params = useParams();
  console.log(params);

  const [data, setData] = React.useState({});
  React.useEffect(() => {
    fetch("http://localhost:5000/product/" + params.id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dohvaćeni produkti:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);

  return (
    <Box>
      <NavBar />
      <Container>
        <CategoriesNav />
        <Grid container spacing={1} sx={{ marginTop: 1 }}>
          <Grid size={8}>
            <Box sx={{ backgroundColor: "blue", height: 500, display: "flex" }}>
              <Grid size={2} sx={{ backgroundColor: "yellow", height: 400 }}>
                Ovde idu manje slike
              </Grid>

              <Grid size={10} sx={{ backgroundColor: "aqua", height: 400 }}>
                Ovde ide velika slika
              </Grid>
            </Box>
          </Grid>

          <Grid size={4}>
            <Box sx={{ height: 500 }}>
              <Box>
                <Typography variant="h5">{data.name}</Typography>
                <Box>
                  <Rating name="size-medium" defaultValue={5} />
                  Review
                </Box>
              </Box>
              <Box sx={{ marginTop: 4 }}>
                <Typography variant="h5">{data.price} $</Typography>
              </Box>
              <Box sx={{ marginTop: 4 }}>
                <Button
                  sx={{
                    width: "300px",
                    backgroundColor: "orange",
                    color: "black",
                    borderRadius: 4,
                  }}
                >
                  ADD TO CART
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={1} sx={{ marginTop: 2 }}>
          <Grid size={8}>
            <Box
              sx={{
                border: "1px solid black",
                height: 200,
                borderRadius: 2,
                display: "flex",
              }}
            >
              <Grid size={6} sx={{ backgroundColor: "purple" }}>
                a
              </Grid>
              <Grid size={6} sx={{ backgroundColor: "#82b1ff" }}>
                a
              </Grid>
            </Box>
            <Box sx={{ marginTop: 5 }}>
              <NestedList
                name="Specifications"
                subname={<Specifications data={data} />}
                width="500"
              />
              <NestedList name="Reviews" subname="reviews ovde" width="500" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Product;
