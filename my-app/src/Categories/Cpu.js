import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

const Cpu = ({ onSubmit, setIsValidParent }) => {
  const currentUser = useSelector((state) => state.auth.userId);

  const initialValues = {
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: 0,
    warranty_period: "",
    isCPU: 1, // Oznaka da je proizvod CPU
    cores: "",
    threads: "",
    base_clock: "",
    boost_clock: "",
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
    warranty_period: Yup.number()
      .required("Warranty period is required")
      .min(0, "Warranty period must be at least 0 years"),
    cores: Yup.number()
      .required("Cores are required")
      .min(1, "Cores must be at least 1"),
    threads: Yup.number()
      .required("Threads are required")
      .min(1, "Threads must be at least 1"),
    base_clock: Yup.number()
      .required("Base clock is required")
      .min(0, "Base clock must be positive"),
    boost_clock: Yup.number()
      .required("Boost clock is required")
      .min(0, "Boost clock must be positive"),
    socket: Yup.string().required("Socket is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
        setIsValidParent(true);
        console.log("CPU details submitted: ", values);
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
              label="Cores"
              name="cores"
              type="number"
              value={values.cores}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="cores" />}
            />
            <TextField
              label="Threads"
              name="threads"
              type="number"
              value={values.threads}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="threads" />}
            />
            <TextField
              label="Base Clock (GHz)"
              name="base_clock"
              type="number"
              step="0.1"
              value={values.base_clock}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="base_clock" />}
            />
            <TextField
              label="Boost Clock (GHz)"
              name="boost_clock"
              type="number"
              step="0.1"
              value={values.boost_clock}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="boost_clock" />}
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
              Submit CPU Details
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Cpu;
