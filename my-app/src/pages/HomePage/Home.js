import React from "react";
import NavBar from "../../components/NavBar";
import ProductCard from "../../components/ProductCard";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useSearchParams } from "react-router-dom";

const clampNumber = (value, fallback = 0) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const getPriceBounds = (items) => {
  if (!items?.length) return { min: 0, max: 1000 };
  const prices = items
    .map((x) => clampNumber(x.rental_price, 0))
    .filter((p) => Number.isFinite(p));

  if (!prices.length) return { min: 0, max: 1000 };

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  // da slider ne bude min=max (edge case)
  if (min === max) return { min: Math.max(0, min - 1), max: max + 1 };

  return { min, max };
};

const HomePage = () => {
  const [products, setProducts] = React.useState([]);
  const [searchParams] = useSearchParams();

  // URL search (NavBar ti već radi navigate("/?keyword=..."))
  const keyword = (searchParams.get("keyword") || "").trim();

  // Sort
  const [sortCriteria, setSortCriteria] = React.useState("newest");

  // Filters (Rentify spec)
  const [availability, setAvailability] = React.useState("all"); // all | available | unavailable
  const [condition, setCondition] = React.useState("all"); // all | vrednost iz item_condition
  const [onlyInStock, setOnlyInStock] = React.useState(false); // quantity > 0

  // Price slider state
  const [priceRange, setPriceRange] = React.useState([0, 1000]);

  // Fetch
  React.useEffect(() => {
    fetch("http://localhost:5000/rental-items")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data || []);

        const bounds = getPriceBounds(data || []);
        setPriceRange([bounds.min, bounds.max]);
      })
      .catch((error) => console.error("Došlo je do greške:", error));
  }, []);

  // Options for condition dropdown (iz realnih podataka)
  const conditionOptions = React.useMemo(() => {
    const set = new Set();
    for (const p of products) {
      if (p?.item_condition) set.add(String(p.item_condition));
    }
    return Array.from(set);
  }, [products]);

  // Price bounds (da slider zna min/max)
  const priceBounds = React.useMemo(() => getPriceBounds(products), [products]);

  // Filter + Sort u jednom mestu (stabilno + lakše održavanje)
  const filteredProducts = React.useMemo(() => {
    let list = [...products];

    // 1) keyword filter
    if (keyword) {
      const q = keyword.toLowerCase();
      list = list.filter((item) =>
        String(item?.name || "")
          .toLowerCase()
          .includes(q)
      );
    }

    // 2) price range filter
    const [minP, maxP] = priceRange;
    list = list.filter((item) => {
      const p = clampNumber(item?.rental_price, 0);
      return p >= minP && p <= maxP;
    });

    // 3) availability filter
    if (availability !== "all") {
      const want = availability === "available" ? 1 : 0;
      list = list.filter((item) => Number(item?.availability) === want);
    }

    // 4) condition filter
    if (condition !== "all") {
      list = list.filter(
        (item) => String(item?.item_condition || "") === String(condition)
      );
    }

    // 5) only in stock
    if (onlyInStock) {
      list = list.filter((item) => clampNumber(item?.quantity, 0) > 0);
    }

    // Sort
    const sorters = {
      priceAsc: (a, b) =>
        clampNumber(a?.rental_price) - clampNumber(b?.rental_price),
      priceDesc: (a, b) =>
        clampNumber(b?.rental_price) - clampNumber(a?.rental_price),
      nameAsc: (a, b) =>
        String(a?.name || "").localeCompare(String(b?.name || "")),
      nameDesc: (a, b) =>
        String(b?.name || "").localeCompare(String(a?.name || "")),
      availableFirst: (a, b) =>
        Number(b?.availability) - Number(a?.availability),
      newest: (a, b) => clampNumber(b?.id, 0) - clampNumber(a?.id, 0), // fallback: veći id = novije
    };

    const sorter = sorters[sortCriteria];
    if (sorter) list.sort(sorter);

    return list;
  }, [
    products,
    keyword,
    priceRange,
    availability,
    condition,
    onlyInStock,
    sortCriteria,
  ]);

  const clearFilters = () => {
    setAvailability("all");
    setCondition("all");
    setOnlyInStock(false);
    setSortCriteria("newest");
    setPriceRange([priceBounds.min, priceBounds.max]);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "rgba(245,247,250,1)" }}>
      <NavBar />

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {/* Top row: title + sort */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", md: "center" }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography sx={{ fontWeight: 900, fontSize: 22 }}>
              Predmeti za iznajmljivanje
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {filteredProducts.length} rezultata
              {keyword ? ` za "${keyword}"` : ""}
            </Typography>
          </Box>
        </Stack>

        {/* Main layout: filters + grid */}
        <Grid container spacing={2}>
          {/* Filters */}
          <Grid xs={12} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography sx={{ fontWeight: 900 }}>Filteri</Typography>
                <Button
                  onClick={clearFilters}
                  startIcon={<RestartAltIcon />}
                  sx={{
                    textTransform: "none",
                    fontWeight: 800,
                    borderRadius: 3,
                  }}
                >
                  Reset
                </Button>
              </Stack>

              <Divider sx={{ my: 1.5 }} />

              <AccordionDetails>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    minWidth: 220,
                    bgcolor: "white",
                    borderRadius: 3,
                  }}
                >
                  <InputLabel id="sort-label">Sortiraj</InputLabel>
                  <Select
                    labelId="sort-label"
                    label="Sortiraj"
                    value={sortCriteria}
                    onChange={(e) => setSortCriteria(e.target.value)}
                    sx={{ borderRadius: 3 }}
                  >
                    <MenuItem value="newest">Najnovije</MenuItem>
                    <MenuItem value="availableFirst">Dostupno prvo</MenuItem>
                    <MenuItem value="priceAsc">Cena (rastuće)</MenuItem>
                    <MenuItem value="priceDesc">Cena (opadajuće)</MenuItem>
                    <MenuItem value="nameAsc">Ime (A-Z)</MenuItem>
                    <MenuItem value="nameDesc">Ime (Z-A)</MenuItem>
                  </Select>
                </FormControl>
              </AccordionDetails>

              {/* PRICE */}
              <Accordion
                disableGutters
                elevation={0}
                defaultExpanded
                sx={{
                  "&:before": { display: "none" },
                  bgcolor: "transparent",
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 800 }}>
                    Cena (po danu)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1.2}>
                    <Slider
                      value={priceRange}
                      min={priceBounds.min}
                      max={priceBounds.max}
                      onChange={(_, v) => setPriceRange(v)}
                      valueLabelDisplay="auto"
                    />
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={`Min: ${priceRange[0]}`}
                        size="small"
                        sx={{ fontWeight: 800 }}
                      />
                      <Chip
                        label={`Max: ${priceRange[1]}`}
                        size="small"
                        sx={{ fontWeight: 800 }}
                      />
                    </Stack>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* AVAILABILITY */}
              <Accordion
                disableGutters
                elevation={0}
                defaultExpanded
                sx={{ "&:before": { display: "none" }, bgcolor: "transparent" }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 800 }}>Dostupnost</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl fullWidth size="small">
                    <InputLabel id="avail-label">Prikaži</InputLabel>
                    <Select
                      labelId="avail-label"
                      label="Prikaži"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      sx={{ borderRadius: 3, bgcolor: "white" }}
                    >
                      <MenuItem value="all">Sve</MenuItem>
                      <MenuItem value="available">Samo dostupno</MenuItem>
                      <MenuItem value="unavailable">Samo nedostupno</MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    variant={onlyInStock ? "contained" : "outlined"}
                    onClick={() => setOnlyInStock((s) => !s)}
                    sx={{
                      mt: 1.5,
                      width: "100%",
                      borderRadius: 3,
                      textTransform: "none",
                      fontWeight: 900,
                    }}
                  >
                    {onlyInStock
                      ? "U ponudi: uključeno"
                      : "Samo u ponudi (qty > 0)"}
                  </Button>
                </AccordionDetails>
              </Accordion>

              {/* CONDITION */}
              <Accordion
                disableGutters
                elevation={0}
                defaultExpanded
                sx={{ "&:before": { display: "none" }, bgcolor: "transparent" }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 800 }}>
                    Stanje predmeta
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl fullWidth size="small">
                    <InputLabel id="cond-label">Stanje</InputLabel>
                    <Select
                      labelId="cond-label"
                      label="Stanje"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                      sx={{ borderRadius: 3, bgcolor: "white" }}
                    >
                      <MenuItem value="all">Sve</MenuItem>
                      {conditionOptions.map((c) => (
                        <MenuItem key={c} value={c}>
                          {c}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>

          {/* Products grid */}
          <Grid xs={12} md={9}>
            {filteredProducts.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: "divider",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontWeight: 900, mb: 0.5 }}>
                  Nema rezultata
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Pokušaj da proširiš opseg cene ili promeniš filtere.
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={2}>
                {filteredProducts.map((item) => (
                  <Grid
                    key={item.id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <ProductCard
                      id={item.id}
                      price={item.rental_price}
                      name={item.name}
                      description={item.description}
                      availability={item.availability}
                      item_condition={item.item_condition}
                      quantity={item.quantity}
                      imageUrl={item.image_url} // ako imaš u bazi
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
