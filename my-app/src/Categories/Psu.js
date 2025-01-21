import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Box, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";

const PSU = ({ onSubmit, setIsValidParent }) => {
  const currentUser = useSelector((state) => state.auth.userId);

  const initialValues = {
    name: "",
    manufacturer: "",
    price: "",
    description: "",
    stock_quantity: 0,
    warranty_period: "",
    isPSU: 1,
    power_output: "",
    certification: "",
    modularity: "",
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
    power_output: Yup.number()
      .required("Power output is required")
      .min(0, "Power output must be positive"),
    certification: Yup.string().required("Certification is required"),
    modularity: Yup.string().required("Modularity is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSubmit(values);
        setIsValidParent(true);
        console.log("PSU details submitted: ", values);
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
              label="Power Output (Watts)"
              name="power_output"
              type="number"
              value={values.power_output}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="power_output" />}
            />
            <TextField
              label="Certification"
              name="certification"
              value={values.certification}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="certification" />}
            />
            <TextField
              label="Modularity"
              name="modularity"
              value={values.modularity}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              helperText={<ErrorMessage name="modularity" />}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: 2 }}
              onClick={handleSubmit}
            >
              Submit PSU Details
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PSU;
