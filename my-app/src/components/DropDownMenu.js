import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

export default function FadeMenu({ handleFilter }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ color: "black" }}
      >
        <FormatAlignJustifyIcon sx={{ color: "black" }} />
        Categories
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            handleFilter("all");
          }}
        >
          All
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleFilter("isGPU");
          }}
        >
          GPU
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleFilter("isCPU");
          }}
        >
          CPU
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleFilter("isLaptop");
          }}
        >
          Laptop
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleFilter("isDesktop");
          }}
        >
          Desktop
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleFilter("isMotherboard");
          }}
        >
          Motherboard
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleFilter("isRAM");
          }}
        >
          RAM
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleFilter("isStorage");
          }}
        >
          Storage
        </MenuItem>
      </Menu>
    </div>
  );
}
