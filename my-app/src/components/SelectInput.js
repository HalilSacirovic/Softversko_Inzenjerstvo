import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

export default function BasicSelect(props) {
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedKey, setSelectedKey] = React.useState(null);
  const [columns, setColumns] = React.useState([]);
  const [inputs, setInputs] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5000/category")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Došlo je do greške:", error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedKey(null);
    setColumns([]);
    setInputs([]);
  };

  const handleCheckboxChange = (key) => {
    setSelectedKey((prevKey) => (prevKey === key ? null : key));
    handleCheckboxFetch(key);
  };

  const handleCheckboxFetch = (key) => {
    fetch(`http://localhost:5000/category/${selectedCategory}?key=${key}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Odgovor sa servera:", data);

        if (data && Array.isArray(data) && data.length > 0) {
          setColumns(data);

          const newInputs = data.map((column, index) => (
            <TextField
              key={index}
              label={column.COLUMN_NAME}
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          ));
          setInputs(newInputs); // Spremi inpute
        }
      })
      .catch((error) => {
        console.error("Greška prilikom slanja podataka:", error);
      });
  };

  return (
    <Box sx={{ minWidth: 200, paddingBottom: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategory}
          label={props.label}
          onChange={handleCategoryChange}
        >
          {categories.map((item) => (
            <MenuItem key={item.category_id} value={item.category_id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedCategory === 3 && (
        <FormGroup sx={{ marginTop: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedKey === 1}
                onChange={() => handleCheckboxChange(1)}
              />
            }
            label="CPU"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedKey === 2}
                onChange={() => handleCheckboxChange(2)}
              />
            }
            label="GPU"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedKey === 3}
                onChange={() => handleCheckboxChange(3)}
              />
            }
            label="PSU"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedKey === 4}
                onChange={() => handleCheckboxChange(4)}
              />
            }
            label="MotherBoard"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedKey === 5}
                onChange={() => handleCheckboxChange(5)}
              />
            }
            label="RAM"
          />
        </FormGroup>
      )}
      <Box sx={{ marginTop: 2 }}>{inputs}</Box>
    </Box>
  );
}
