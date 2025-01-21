import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

const Storage = ({ onSubmit, setIsValidParent }) => {
  const currentUser = useSelector((state) => state.auth.userId);

  const initialValues = {
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: 0,
    storage_capacity: 0, // GB
    storage_type: "",
    interface: "",
    read_speed: 0, // MB/s
    write_speed: 0, // MB/s
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
    storage_capacity: Yup.number()
      .required("Storage capacity is required")
      .min(1, "Storage capacity must be at least 1 GB"),
    storage_type: Yup.string().required("Storage type is required"),
    interface: Yup.string().required("Interface is required"),
    read_speed: Yup.number()
      .required("Read speed is required")
      .min(0, "Read speed must be positive"),
    write_speed: Yup.number()
      .required("Write speed is required")
      .min(0, "Write speed must be positive"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
        setIsValidParent(true);
        console.log("Storage details submitted:", values);
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
              label="Storage Capacity (GB)"
              name="storage_capacity"
              type="number"
              value={values.storage_capacity}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="storage_capacity" />}
            />
            <TextField
              label="Storage Type"
              name="storage_type"
              value={values.storage_type}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="storage_type" />}
            />
            <TextField
              label="Interface"
              name="interface"
              value={values.interface}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="interface" />}
            />
            <TextField
              label="Read Speed (MB/s)"
              name="read_speed"
              type="number"
              value={values.read_speed}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="read_speed" />}
            />
            <TextField
              label="Write Speed (MB/s)"
              name="write_speed"
              type="number"
              value={values.write_speed}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="write_speed" />}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
            >
              Submit Storage Details
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Storage;
