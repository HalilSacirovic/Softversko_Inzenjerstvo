import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

const Motherboard = ({ onSubmit, setIsValidParent }) => {
  const currentUser = useSelector((state) => state.auth.userId);

  const initialValues = {
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: 0,
    chipset: "",
    ram_slots: 0,
    max_ram_capacity: 0,
    supported_ram_type: "",
    socket: "",
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
    chipset: Yup.string().required("Chipset is required"),
    ram_slots: Yup.number()
      .required("RAM slots are required")
      .min(1, "There must be at least 1 RAM slot"),
    max_ram_capacity: Yup.number()
      .required("Max RAM capacity is required")
      .min(1, "Max RAM capacity must be at least 1 GB"),
    supported_ram_type: Yup.string().required("Supported RAM type is required"),
    socket: Yup.string().required("Socket is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
        setIsValidParent(true);
        console.log("Motherboard details submitted: ", values);
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
              label="Chipset"
              name="chipset"
              value={values.chipset}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="chipset" />}
            />
            <TextField
              label="RAM Slots"
              name="ram_slots"
              type="number"
              value={values.ram_slots}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="ram_slots" />}
            />
            <TextField
              label="Max RAM Capacity (GB)"
              name="max_ram_capacity"
              type="number"
              value={values.max_ram_capacity}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="max_ram_capacity" />}
            />
            <TextField
              label="Supported RAM Type"
              name="supported_ram_type"
              value={values.supported_ram_type}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="supported_ram_type" />}
            />
            <TextField
              label="Socket"
              name="socket"
              value={values.socket}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="socket" />}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
            >
              Submit Motherboard Details
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Motherboard;
