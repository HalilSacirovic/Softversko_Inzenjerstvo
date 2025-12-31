import React from "react";
import { Formik } from "formik";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authSlice } from "../../store/authSlice";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="loginPage">
      <div className="loginCard">
        {/* LEFT BRAND PANEL */}
        <div className="loginLeft">
          <div className="brandTop">
            <div className="brandMark">R</div>
            <div>
              <div className="brandName">RENTIFY</div>
              <div className="brandTag">Secure access to your rentals</div>
            </div>
          </div>

          <h1 className="leftTitle">Welcome back</h1>
          <p className="leftSubtitle">
            Prijavi se i nastavi tamo gde si stao. Tvoje stvari, tvoja zarada,
            tvoja fleksibilnost.
          </p>

          <div className="leftFeatures">
            <div className="featureItem">
              <span className="featureDot" />
              Brz pristup profilu i proizvodima
            </div>
            <div className="featureItem">
              <span className="featureDot" />
              Bezbedan nalog i token auth
            </div>
            <div className="featureItem">
              <span className="featureDot" />
              Samo par sekundi do rentovanja
            </div>
          </div>

          <div className="leftFooter">
            <div className="hint">Don’t have an account?</div>
            <button className="linkBtn" onClick={() => navigate("/signup")}>
              Sign up →
            </button>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="loginRight">
          <div className="formHeader">
            <h2>Log in</h2>
            <p>Please enter your details</p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Password is required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              fetch("http://localhost:5000/login", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" },
              })
                .then((res) => {
                  if (!res.ok) throw new Error("Prijava neuspešna");
                  return res.json();
                })
                .then((data) => {
                  if (data.token) {
                    localStorage.setItem("auth_token", data.token);

                    const decoded = jwtDecode(data.token);
                    dispatch(authSlice.actions.setData(decoded));

                    navigate("/");
                  }
                })
                .catch(() => {
                  setErrors({ email: "Neuspešna prijava. Proverite podatke." });
                })
                .finally(() => setSubmitting(false));
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
              <form onSubmit={handleSubmit} className="loginForm">
                <div className="field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={`neoInput ${
                      errors.email && touched.email ? "hasError" : ""
                    }`}
                    placeholder="email@domain.com"
                  />
                  {errors.email && touched.email && (
                    <div className="errorText">{errors.email}</div>
                  )}
                </div>

                <div className="field">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={`neoInput ${
                      errors.password && touched.password ? "hasError" : ""
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.password && touched.password && (
                    <div className="errorText">{errors.password}</div>
                  )}
                </div>

                <div className="rowBetween">
                  <label className="remember">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    className="linkBtnSmall"
                    onClick={() => alert("Forgot password flow")}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  className="submitBtn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Log in"}
                </button>

                <div className="bottomHint">
                  New here?{" "}
                  <button
                    type="button"
                    className="inlineLink"
                    onClick={() => navigate("/signup")}
                  >
                    Create an account
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
