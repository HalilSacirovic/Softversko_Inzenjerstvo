import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

const Desktop = ({ onSubmit, setIsValidParent }) => {
  const currentUser = useSelector((state) => state.auth.userId);

  const initialValues = {
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: 0,
    warranty_period: "",
    isDesktop: 1,
    form_factor: "",
    desktop_processor: "",
    desktop_gpu: "",
    desktop_ram: "",
    desktop_storage: "",
    power_supply: "",
    case_type: "",
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
    form_factor: Yup.string().required("Form factor is required"),
    desktop_processor: Yup.string().required("Processor is required"),
    desktop_gpu: Yup.string().required("GPU is required"),
    desktop_ram: Yup.number()
      .required("RAM is required")
      .min(1, "RAM must be at least 1 GB"),
    desktop_storage: Yup.number()
      .required("Storage is required")
      .min(1, "Storage must be at least 1 GB"),
    power_supply: Yup.number()
      .required("Power supply is required")
      .min(1, "Power supply must be positive"),
    case_type: Yup.string().required("Case type is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
        setIsValidParent(true);
        console.log("Desktop details submitted: ", values);
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
              label="Form Factor"
              name="form_factor"
              value={values.form_factor}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="form_factor" />}
            />
            <TextField
              label="Processor"
              name="desktop_processor"
              value={values.desktop_processor}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="desktop_processor" />}
            />
            <TextField
              label="Graphic Card"
              name="desktop_gpu"
              value={values.desktop_gpu}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="desktop_gpu" />}
            />
            <TextField
              label="RAM (GB)"
              name="desktop_ram"
              type="number"
              value={values.desktop_ram}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="desktop_ram" />}
            />
            <TextField
              label="Storage (GB)"
              name="desktop_storage"
              type="number"
              value={values.desktop_storage}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="desktop_storage" />}
            />
            <TextField
              label="Power Supply (Watts)"
              name="power_supply"
              type="number"
              value={values.power_supply}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="power_supply" />}
            />
            <TextField
              label="Case Type"
              name="case_type"
              value={values.case_type}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="case_type" />}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
            >
              Submit Desktop Details
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Desktop;
