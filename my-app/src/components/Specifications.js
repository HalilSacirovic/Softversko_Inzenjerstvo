import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Specifications({ data }) {
  // Funkcija koja kreira objekat sa relevantnim podacima
  const getRelevantData = (item) => {
    if (item.isLaptop) {
      return {
        Name: item.name,
        Manufacturer: item.manufacturer,
        Description: item.description,
        Price: `$${item.price}`,
        Processor: item.laptop_processor || "N/A",
        GPU: item.laptop_gpu || "N/A",
        RAM: item.laptop_ram || "N/A",
        Storage: item.laptop_storage || "N/A",
        "Screen Size": `${item.screen_size || "N/A"} inches`,
        Touchscreen: item.is_touchscreen ? "Yes" : "No",
        Weight: `${item.weight || "N/A"} kg`,
        "Battery Capacity": `${item.battery_capacity || "N/A"} mAh`,
      };
    }
    if (item.isDesktop) {
      return {
        Name: item.name,
        Manufacturer: item.manufacturer,
        Description: item.description,
        Price: `$${item.price}`,
        Processor: item.desktop_processor || "N/A",
        GPU: item.desktop_gpu || "N/A",
        RAM: item.desktop_ram || "N/A",
        Storage: `${item.desktop_storage} GB` || "N/A",
        PowerSupply: item.power_supply || "N/A",
        "Case Type": item.case_type || "N/A",
      };
    }
    if (item.isCPU) {
      return {
        Name: item.name,
        Manufacturer: item.manufacturer,
        Price: `$${item.price}`,
        Description: item.description,
        "Clock Speed": item.clock_speed || "N/A",
        Cores: item.cores || "N/A",
        Threads: item.threads || "N/A",
        "Base Clock": item.base_clock || "N/A",
        "Boost Clock": item.boost_clock || "N/A",
        Socket: item.socket || "N/A",
      };
    }
    if (item.isGPU) {
      return {
        Name: item.name,
        Manufacturer: item.manufacturer,
        Price: `$${item.price}`,
        Description: item.description,
        Chipset: item.gpu_chipset || "N/A",
        "Memory Size": item.memory_size || "N/A",
        "Memory Type": item.memory_type || "N/A",
      };
    }
    if (item.isRAM) {
      return {
        Name: item.name,
        Manufacturer: item.manufacturer,
        Price: `$${item.price}`,
        Description: item.description,
        Capacity: item.ram_capacity || "N/A",
        Speed: item.ram_speed || "N/A",
        Latency: item.ram_latency || "N/A",
        "RAM Type": item.ram_type || "N/A",
      };
    }
    if (item.isStorage) {
      return {
        Name: item.name,
        Manufacturer: item.manufacturer,
        Price: `$${item.price}`,
        Description: item.description,
        Capacity: item.storage_capacity || "N/A",
        Type: item.storage_type || "N/A",
        Interface: item.interface || "N/A",
        "Read Speed": item.read_speed || "N/A",
        "Write Speed": item.write_speed || "N/A",
      };
    }
    if (item.isMotherboard) {
      return {
        Name: item.name,
        Manufacturer: item.manufacturer,
        Price: `$${item.price}`,
        Description: item.description,
        Chipset: item.chipset || "N/A",
        Socket: item.socket || "N/A",
        "RAM Slots": item.ram_slots || "N/A",
        "Max RAM Capacity": item.max_ram_capacity || "N/A",
        "Supported RAM Type": item.supported_ram_type || "N/A",
        "Form Factor": item.form_factor || "N/A",
      };
    }
    return { Message: "No specifications available for this item" };
  };

  // Poziv funkcije za kreiranje relevantnog objekta
  const relevantData = getRelevantData(data);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Specification</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(relevantData).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
