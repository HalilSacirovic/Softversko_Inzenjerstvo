import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

const Gpu = ({ onSubmit, setIsValidParent }) => {
  const currentUser = useSelector((state) => state.auth.userId);

  const initialValues = {
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: 0,
    warranty_period: "",
    isGPU: 1, // Oznaka da je proizvod GPU
    gpu_chipset: "",
    memory_size: "",
    memory_type: "",
    clock_speed: "",
    posted_by: currentUser,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    manufacturer: Yup.string().required("Manufacturer is required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be greater than or equal to 0"),
    description: Yup.string().required("Description is required"),
    stock_quantity: Yup.number()
      .required("Stock quantity is required")
      .min(0, "Stock quantity must be greater than or equal to 0"),
    warranty_period: Yup.number()
      .required("Warranty period is required")
      .min(0, "Warranty period must be at least 0 years"),
    gpu_chipset: Yup.string().required("GPU chipset is required"),
    memory_size: Yup.number()
      .required("Memory size is required")
      .min(1, "Memory size must be at least 1 GB"),
    memory_type: Yup.string().required("Memory type is required"),
    clock_speed: Yup.number()
      .required("Clock speed is required")
      .min(0, "Clock speed must be positive"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
        setIsValidParent(true);
        console.log("GPU details submitted: ", values);
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form>
          <Box sx={{ marginTop: 2 }}>
            <TextField
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="name" />}
            />
            <TextField
              label="Manufacturer"
              name="manufacturer"
              value={values.manufacturer}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="manufacturer" />}
            />
            <TextField
              label="Price"
              name="price"
              type="number"
              value={values.price}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="price" />}
            />
            <TextField
              label="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="description" />}
            />
            <TextField
              label="Stock Quantity"
              name="stock_quantity"
              type="number"
              value={values.stock_quantity}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="stock_quantity" />}
            />
            <TextField
              label="Warranty Period (Years)"
              name="warranty_period"
              type="number"
              value={values.warranty_period}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="warranty_period" />}
            />
            <TextField
              label="GPU Chipset"
              name="gpu_chipset"
              value={values.gpu_chipset}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="gpu_chipset" />}
            />
            <TextField
              label="Memory Size (GB)"
              name="memory_size"
              type="number"
              value={values.memory_size}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="memory_size" />}
            />
            <TextField
              label="Memory Type"
              name="memory_type"
              value={values.memory_type}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="memory_type" />}
            />
            <TextField
              label="Clock Speed (MHz)"
              name="clock_speed"
              type="number"
              value={values.clock_speed}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="clock_speed" />}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
            >
              Submit GPU Details
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Gpu;
