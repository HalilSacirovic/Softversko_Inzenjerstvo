import { ToggleButton, Typography } from "@mui/material";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export const CategoriesNav = () => {
  return (
    <div className="all_product">
      <ToggleButton
        value="justify"
        aria-label="justified"
        size="small"
        sx={{ border: "1px solid grey", marginRight: 1 }}
      >
        <FormatAlignJustifyIcon sx={{ color: "black" }} />
        <Typography sx={{ paddingLeft: 1, color: "black" }}>
          {" "}
          Categories
        </Typography>
      </ToggleButton>
      <ToggleButton
        value="justify"
        aria-label="justified"
        size="small"
        sx={{ border: "1px solid grey" }}
      >
        <TrendingDownIcon sx={{ color: "black" }} />
        <Typography sx={{ paddingLeft: 1, color: "black" }}> Sale</Typography>
      </ToggleButton>
    </div>
  );
};
