import { ToggleButton, Typography } from "@mui/material";

import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import FadeMenu from "./DropDownMenu";

export const CategoriesNav = ({ handleFilter }) => {
  return (
    <div>
      <ToggleButton
        value="justify"
        aria-label="justified"
        size="small"
        sx={{ border: "1px solid black", marginRight: 1 }}
      >
        <FadeMenu handleFilter={handleFilter} />
      </ToggleButton>
    </div>
  );
};
