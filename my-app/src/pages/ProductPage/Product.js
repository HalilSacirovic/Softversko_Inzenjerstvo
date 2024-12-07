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
        <Grid container spacing={1}>
          <Grid size={8}>
            <Box sx={{ backgroundColor: "blue", height: 500, display: "flex" }}>
              {/* <Box sx={{ backgroundColor: "purple", height: 400 }}>TEST</Box>
              <Box sx={{ backgroundColor: "PINK", height: 400 }}>AWAW</Box> */}
              <Grid size={2} sx={{ backgroundColor: "yellow", height: 400 }}>
                TEKS
              </Grid>

              <Grid size={10} sx={{ backgroundColor: "aqua", height: 400 }}>
                TEKS
              </Grid>
            </Box>
          </Grid>

          <Grid size={4}>
            <Box sx={{ backgroundColor: "red", height: 500 }}> tets</Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Product;
