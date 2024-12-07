import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import NavBar from "../../components/NavBar";
import { CategoriesNav } from "../../components/CateregoriesNav";

const Product = () => {
  return (
    <Box>
      <NavBar />
      <Container>
        <CategoriesNav />
        <Grid container spacing={2}>
          <Grid size={8}>NESTO</Grid>
          <Grid>NESTO</Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Product;
