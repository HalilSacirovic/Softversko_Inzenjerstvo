import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

const Laptop = ({ onSubmit, setIsValidParent }) => {
  const currentUser = useSelector((state) => state.auth.userId);

  const initialValues = {
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: "",
    power_requirement: "",
    form_factor: "",
    warranty_period: "",
    screen_size: "",
    screen_resolution: "",
    battery_capacity: "",
    weight: "",
    is_touchscreen: false,
    laptop_processor: "",
    laptop_gpu: "",
    laptop_ram: "",
    laptop_storage: "",
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
    power_requirement: Yup.string().required("Power requirement is required"),
    form_factor: Yup.string().required("Form factor is required"),
    warranty_period: Yup.number()
      .required("Warranty period is required")
      .min(0, "Warranty period must be at least 0 years"),
    screen_size: Yup.number()
      .required("Screen size is required")
      .min(0, "Screen size must be positive"),
    screen_resolution: Yup.string().required("Screen resolution is required"),
    battery_capacity: Yup.number()
      .required("Battery capacity is required")
      .min(0, "Battery capacity must be positive"),
    weight: Yup.number()
      .required("Weight is required")
      .min(0, "Weight must be positive"),
    laptop_processor: Yup.string().required("Processor is required"),
    laptop_gpu: Yup.string().required("GPU is required"),
    laptop_ram: Yup.number()
      .required("RAM is required")
      .min(1, "RAM must be at least 1GB"),
    laptop_storage: Yup.number()
      .required("Storage is required")
      .min(1, "Storage must be at least 1GB"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
        setIsValidParent(true);
        console.log("Laptop details submitted: ", values);
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
              label="Power Requirement (Watts)"
              name="power_requirement"
              value={values.power_requirement}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="power_requirement" />}
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
              label="Screen Size (inches)"
              name="screen_size"
              type="number"
              value={values.screen_size}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="screen_size" />}
            />
            <TextField
              label="Screen Resolution"
              name="screen_resolution"
              value={values.screen_resolution}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="screen_resolution" />}
            />
            <TextField
              label="Battery Capacity (mAh)"
              name="battery_capacity"
              type="number"
              value={values.battery_capacity}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="battery_capacity" />}
            />
            <TextField
              label="Weight (kg)"
              name="weight"
              type="number"
              value={values.weight}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="weight" />}
            />
            <TextField
              label="Processor"
              name="laptop_processor"
              value={values.laptop_processor}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="laptop_processor" />}
            />
            <TextField
              label="GPU"
              name="laptop_gpu"
              value={values.laptop_gpu}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="laptop_gpu" />}
            />
            <TextField
              label="RAM (GB)"
              name="laptop_ram"
              type="number"
              value={values.laptop_ram}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="laptop_ram" />}
            />
            <TextField
              label="Storage (GB)"
              name="laptop_storage"
              type="number"
              value={values.laptop_storage}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="laptop_storage" />}
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Touchscreen</InputLabel>
              <Select
                name="is_touchscreen"
                value={values.is_touchscreen}
                onChange={handleChange}
              >
                <MenuItem value={true}>Yes</MenuItem>
                <MenuItem value={false}>No</MenuItem>
              </Select>
              <FormHelperText>
                <ErrorMessage name="is_touchscreen" />
              </FormHelperText>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
            >
              Submit Laptop Details
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Laptop;
