import React from "react";
import { Formik } from "formik";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { setData } from "../../store/authSlice"; // Import Redux akcije
import { authSlice } from "../../store/authSlice";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode za dekodiranje tokena

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux dispatch za slanje akcija

  return (
    <div className="div">
      <div className="box">
        <div className="logo">
          <h1>Logo</h1>
        </div>

        <div className="header">
          <h1>Welcome Back!</h1>
          <p>Please enter your details</p>
        </div>

        <div className="inputs">
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              console.log("Validating values:", values); // Prati validaciju
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              console.log("Validation errors:", errors); // Prati greške validacije
              return errors;
            }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              console.log("Submitting values:", values); // Prati podatke koji se šalju
              fetch("http://localhost:5000/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((res) => {
                  console.log("Response status:", res.status); // Prati status odgovora
                  if (!res.ok) {
                    throw new Error("Prijava neuspešna");
                  }
                  return res.json();
                })
                .then((data) => {
                  console.log("Response data:", data); // Prati podatke iz odgovora
                  if (data.token) {
                    console.log("Token received:", data.token); // Prati primljeni token
                    localStorage.setItem("auth_token", data.token);

                    // Dekodiranje tokena i postavljanje podataka u Redux
                    const decoded = jwtDecode(data.token);
                    console.log("Decoded token data:", decoded); // Prati dekodirane podatke
                    dispatch(authSlice.actions.setData(decoded)); // Slanje podataka u Redux

                    navigate("/");
                  }
                })
                .catch((err) => {
                  console.error("Error during login:", err); // Prati greške
                  setErrors({ email: "Neuspešna prijava. Proverite podatke." });
                })
                .finally(() => {
                  console.log("Submission complete"); // Prati završetak slanja
                  setSubmitting(false);
                });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className="login_inputs"
                />
                {errors.email && touched.email && errors.email}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className="login_inputs"
                />
                {errors.password && touched.password && errors.password}

                <div className="btn">
                  <button type="submit" disabled={isSubmitting}>
                    Log In
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
