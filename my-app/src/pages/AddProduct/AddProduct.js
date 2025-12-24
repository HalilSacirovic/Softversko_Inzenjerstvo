// import {
//   Box,
//   Button,
//   Container,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";
// import NavBar from "../../components/NavBar";
// import { CategoriesNav } from "../../components/CateregoriesNav";
// import UploadImage from "../../components/UploadImage";
// import Laptop from "../../Categories/Laptop";
// import Cpu from "../../Categories/Cpu";
// import Gpu from "../../Categories/Gpu";
// import Desktop from "../../Categories/Desktop";
// import Psu from "../../Categories/Psu";
// import MotherBoard from "../../Categories/MotherBoard";
// import Ram from "../../Categories/Ram";
// import Storage from "../../Categories/Storage";
// import { useSelector } from "react-redux";

// const AddProduct = () => {
//   const [category, setCategory] = useState("");
//   const [productDetails, setProductDetails] = useState({});
//   const [key, setKey] = useState(null);

//   const [isValid, setIsValid] = useState(false); // State to hold isValid

//   const handleIsValidChange = (isValid) => {
//     setIsValid(isValid);
//   };

//   const handleCategoryChange = (event) => {
//     setCategory(event.target.value);
//   };

//   const handleProductDetailsChange = (details) => {
//     setProductDetails((prevState) => ({
//       ...prevState,
//       ...details, // Add new details to state
//     }));
//   };

//   const currentUser = useSelector((state) => state.auth.userId);
//   console.log("trenutni user", currentUser);

//   const handleAddProduct = async () => {
//     const key = category;
//     if (isValid) {
//       const productData = {
//         name: productDetails.name || "",
//         manufacturer: productDetails.manufacturer || "",
//         price: productDetails.price || 0,
//         description: productDetails.description || "",
//         stock_quantity: productDetails.stock_quantity || 0,
//         power_requirement: productDetails.power_requirement || null,
//         form_factor: productDetails.form_factor || "",
//         warranty_period: productDetails.warranty_period || 0,
//         isGPU: productDetails.isGPU || 0,
//         isCPU: productDetails.isCPU || 0,
//         isPSU: productDetails.isPSU || 0,
//         isMotherboard: productDetails.isMotherboard || 0,
//         isRAM: productDetails.isRAM || 0,
//         isStorage: productDetails.isStorage || 0,
//         isDesktop: productDetails.isDesktop || 0,
//         isLaptop: productDetails.isLaptop || 0, // Označava da je laptop
//         screen_size: productDetails.screen_size || null,
//         screen_resolution: productDetails.screen_resolution || "",
//         battery_capacity: productDetails.battery_capacity || 0,
//         weight: productDetails.weight || 0,
//         is_touchscreen: productDetails.is_touchscreen ? 1 : 0,
//         laptop_processor: productDetails.laptop_processor || "",
//         laptop_gpu: productDetails.laptop_gpu || "",
//         laptop_ram: productDetails.laptop_ram || "",
//         laptop_storage: productDetails.laptop_storage || "",
//         gpu_chipset: productDetails.gpu_chipset || null,
//         memory_size: productDetails.memory_size || null,
//         memory_type: productDetails.memory_type || "",
//         clock_speed: productDetails.clock_speed || null,
//         cores: productDetails.cores || null,
//         threads: productDetails.threads || null,
//         base_clock: productDetails.base_clock || null,
//         boost_clock: productDetails.boost_clock || null,
//         socket: productDetails.socket || "",
//         power_output: productDetails.power_output || null,
//         certification: productDetails.certification || "",
//         modularity: productDetails.modularity || "",
//         chipset: productDetails.chipset || "",
//         ram_slots: productDetails.ram_slots || null,
//         max_ram_capacity: productDetails.max_ram_capacity || null,
//         supported_ram_type: productDetails.supported_ram_type || "",
//         ram_capacity: productDetails.ram_capacity || null,
//         ram_speed: productDetails.ram_speed || null,
//         ram_latency: productDetails.ram_latency || "",
//         ram_type: productDetails.ram_type || "",
//         storage_capacity: productDetails.storage_capacity || null,
//         storage_type: productDetails.storage_type || "",
//         interface: productDetails.interface || "",
//         read_speed: productDetails.read_speed || null,
//         write_speed: productDetails.write_speed || null,
//         desktop_processor: productDetails.desktop_processor || "",
//         desktop_gpu: productDetails.desktop_gpu || "",
//         desktop_ram: productDetails.desktop_ram || "",
//         desktop_storage: productDetails.desktop_storage || "",
//         power_supply: productDetails.power_supply || "",
//         case_type: productDetails.case_type || "",
//         posted_by: currentUser,
//       };

//       try {
//         const response = await fetch(
//           `http://localhost:5000/add-product?key=${key}`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(productData),
//           }
//         );

//         const result = await response.json();
//         if (response.status === 201) {
//           console.log(result.message);
//           console.log("product data", productData);
//         } else {
//           console.error(result.error);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     } else {
//       alert("not valid data");
//     }
//   };

//   const components = {
//     1: (
//       <Laptop
//         onSubmit={handleProductDetailsChange}
//         setIsValidParent={handleIsValidChange}
//       />
//     ),
//     2: (
//       <Desktop
//         onSubmit={handleProductDetailsChange}
//         setIsValidParent={handleIsValidChange}
//       />
//     ),
//     3: (
//       <Cpu
//         onSubmit={handleProductDetailsChange}
//         setIsValidParent={handleIsValidChange}
//       />
//     ),
//     4: (
//       <Gpu
//         onSubmit={handleProductDetailsChange}
//         setIsValidParent={handleIsValidChange}
//       />
//     ),
//     5: (
//       <Psu
//         onSubmit={handleProductDetailsChange}
//         setIsValidParent={handleIsValidChange}
//       />
//     ),
//     6: (
//       <MotherBoard
//         onSubmit={handleProductDetailsChange}
//         setIsValidParent={handleIsValidChange}
//       />
//     ),
//     7: (
//       <Ram
//         onSubmit={handleProductDetailsChange}
//         setIsValidParent={handleIsValidChange}
//       />
//     ),
//     8: (
//       <Storage
//         onSubmit={handleProductDetailsChange}
//         setIsValidParent={handleIsValidChange}
//       />
//     ),
//   };

//   return (
//     <Box>
//       <NavBar />
//       <Container>
//         <Grid container sx={{ marginTop: 2 }}>
//           <Grid
//             size={6}
//             sx={{
//               backgroundColor: "whitesmoke",
//               height: 500,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <UploadImage />
//           </Grid>

//           <Grid size={6} sx={{ height: 200, paddingLeft: 5 }}>
//             <Typography variant="h4" pb={2}>
//               Add Information
//             </Typography>

//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">Category</InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={category}
//                 label="Category"
//                 onChange={handleCategoryChange}
//               >
//                 <MenuItem key={1} value={1}>
//                   Laptop
//                 </MenuItem>
//                 <MenuItem key={2} value={2}>
//                   PC (Desktop)
//                 </MenuItem>
//                 <MenuItem key={3} value={3}>
//                   CPU (Processor)
//                 </MenuItem>
//                 <MenuItem key={4} value={4}>
//                   GPU (Graphic Card)
//                 </MenuItem>
//                 <MenuItem key={5} value={5}>
//                   PSU (Power Supply)
//                 </MenuItem>
//                 <MenuItem key={6} value={6}>
//                   MotherBoard
//                 </MenuItem>
//                 <MenuItem key={7} value={7}>
//                   RAM Memory
//                 </MenuItem>
//                 <MenuItem key={8} value={8}>
//                   Storage
//                 </MenuItem>
//               </Select>
//             </FormControl>

//             {components[category]}

//             <Button onClick={handleAddProduct}>Submit</Button>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default AddProduct;

import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar";
import UploadImage from "../../components/UploadImage";
import { useNavigate } from "react-router-dom";

const AddRentalItem = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    rental_price: 0,
    description: "",
    condition: "",
    quantity: 1,
    availability: 1,
  });

  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.userId);

  const handleProductDetailsChange = (event) => {
    const { name, value } = event.target;
    setProductDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddRentalItem = async () => {
    const rentalItemData = {
      name: productDetails.name,
      rental_price: productDetails.rental_price,
      description: productDetails.description,
      condition: productDetails.condition,
      quantity: productDetails.quantity,
      availability: productDetails.availability,
      posted_by: currentUser,
    };

    try {
      const response = await fetch("http://localhost:5000/add-rental-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rentalItemData),
      });

      const result = await response.json();
      if (response.status === 201) {
        console.log(result.message);
      } else {
        console.error(result.error);
      }
      alert("Uspesno dodat produkt ");
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box>
      <NavBar />
      <Container>
        <Grid container sx={{ marginTop: 2 }}>
          <Grid
            item
            xs={6}
            sx={{
              backgroundColor: "whitesmoke",
              height: 500,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <UploadImage />
          </Grid>

          <Grid item xs={6} sx={{ paddingLeft: 5 }}>
            <Typography variant="h4" pb={2}>
              Add Rental Item
            </Typography>

            {/* Input Fields for Rental Item */}
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <input
                type="text"
                name="name"
                value={productDetails.name}
                onChange={handleProductDetailsChange}
                placeholder="Item Name"
                required
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <input
                type="number"
                name="rental_price"
                value={productDetails.rental_price}
                onChange={handleProductDetailsChange}
                placeholder="Rental Price"
                required
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <textarea
                name="description"
                value={productDetails.description}
                onChange={handleProductDetailsChange}
                placeholder="Description"
                required
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <input
                type="text"
                name="condition"
                value={productDetails.condition}
                onChange={handleProductDetailsChange}
                placeholder="Condition"
                required
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <input
                type="number"
                name="quantity"
                value={productDetails.quantity}
                onChange={handleProductDetailsChange}
                placeholder="Quantity"
                required
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <select
                name="availability"
                value={productDetails.availability}
                onChange={handleProductDetailsChange}
                required
              >
                <option value={1}>Available</option>
                <option value={0}>Not Available</option>
              </select>
            </FormControl>

            <Button onClick={handleAddRentalItem} sx={{ marginTop: 3 }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AddRentalItem;
