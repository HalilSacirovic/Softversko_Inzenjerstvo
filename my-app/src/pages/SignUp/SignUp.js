import React from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();

  return (
    <div className="signupPage">
      <div className="signupCard">
        {/* LEFT BRAND PANEL */}
        <div className="signupLeft">
          <div className="brandTop">
            <div className="brandMark">R</div>
            <div>
              <div className="brandName">RENTIFY</div>
              <div className="brandTag">
                Rent what you need. Earn from what you don’t.
              </div>
            </div>
          </div>

          <h1 className="leftTitle">Create your account</h1>
          <p className="leftSubtitle">
            Futuristički, elegantan onboarding za iznajmljivanje stvari — brzo i
            sigurno.
          </p>

          <div className="leftFeatures">
            <div className="featureItem">
              <span className="featureDot" />
              Verifikovan profil i recenzije
            </div>
            <div className="featureItem">
              <span className="featureDot" />
              Sigurna komunikacija i dogovor
            </div>
            <div className="featureItem">
              <span className="featureDot" />
              Jednostavno dodavanje proizvoda
            </div>
          </div>

          <div className="leftFooter">
            <div className="hint">Already have an account?</div>
            <button className="linkBtn" onClick={() => navigate("/login")}>
              Log in →
            </button>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="signupRight">
          <div className="formHeader">
            <h2>Sign up</h2>
            <p>Please enter your details</p>
          </div>

          <Formik
            initialValues={{
              email: "",
              password: "",
              username: "",
              first_name: "",
              last_name: "",
              phone_number: "",
              address: "",
              city: "",
              postal_code: "",
              country: "",
              date_of_birth: "",
              profile_picture_url: "",
              bio: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Email is required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) errors.password = "Password is required";
              if (!values.username) errors.username = "Username is required";
              if (!values.first_name)
                errors.first_name = "First name is required";
              if (!values.last_name) errors.last_name = "Last name is required";
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              fetch("http://localhost:5000/signup", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" },
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.token) {
                    localStorage.setItem("auth_token", data.token);
                    localStorage.setItem("userId", data.userId);
                  }
                  setSubmitting(false);
                  // navigate("/");
                })
                .catch((error) => {
                  console.error("Greška pri slanju podataka:", error);
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
              <form onSubmit={handleSubmit} className="signupForm">
                {/* SECTION: ACCOUNT */}
                <div className="section">
                  <div className="sectionTitle">Account</div>

                  <div className="grid2">
                    <div className="field">
                      <label>Email</label>
                      <input
                        className={`neoInput ${
                          errors.email && touched.email ? "hasError" : ""
                        }`}
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="email@domain.com"
                      />
                      {errors.email && touched.email && (
                        <div className="errorText">{errors.email}</div>
                      )}
                    </div>

                    <div className="field">
                      <label>Username</label>
                      <input
                        className={`neoInput ${
                          errors.username && touched.username ? "hasError" : ""
                        }`}
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        placeholder="your_username"
                      />
                      {errors.username && touched.username && (
                        <div className="errorText">{errors.username}</div>
                      )}
                    </div>

                    <div className="field">
                      <label>Password</label>
                      <input
                        className={`neoInput ${
                          errors.password && touched.password ? "hasError" : ""
                        }`}
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="••••••••"
                      />
                      {errors.password && touched.password && (
                        <div className="errorText">{errors.password}</div>
                      )}
                    </div>

                    <div className="field">
                      <label>Phone Number</label>
                      <input
                        className="neoInput"
                        type="text"
                        name="phone_number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone_number}
                        placeholder="+381..."
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION: PERSONAL */}
                <div className="section">
                  <div className="sectionTitle">Personal</div>

                  <div className="grid2">
                    <div className="field">
                      <label>First Name</label>
                      <input
                        className={`neoInput ${
                          errors.first_name && touched.first_name
                            ? "hasError"
                            : ""
                        }`}
                        type="text"
                        name="first_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.first_name}
                        placeholder="First name"
                      />
                      {errors.first_name && touched.first_name && (
                        <div className="errorText">{errors.first_name}</div>
                      )}
                    </div>

                    <div className="field">
                      <label>Last Name</label>
                      <input
                        className={`neoInput ${
                          errors.last_name && touched.last_name
                            ? "hasError"
                            : ""
                        }`}
                        type="text"
                        name="last_name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.last_name}
                        placeholder="Last name"
                      />
                      {errors.last_name && touched.last_name && (
                        <div className="errorText">{errors.last_name}</div>
                      )}
                    </div>

                    <div className="field">
                      <label>Date of Birth</label>
                      <input
                        className="neoInput"
                        type="date"
                        name="date_of_birth"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.date_of_birth}
                      />
                    </div>

                    <div className="field">
                      <label>Profile Picture URL</label>
                      <input
                        className="neoInput"
                        type="text"
                        name="profile_picture_url"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.profile_picture_url}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="field" style={{ marginTop: 12 }}>
                    <label>Bio</label>
                    <textarea
                      className="neoTextarea"
                      name="bio"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bio}
                      placeholder="Napiši kratko o sebi…"
                    />
                  </div>
                </div>

                {/* SECTION: ADDRESS */}
                <div className="section">
                  <div className="sectionTitle">Address</div>

                  <div className="grid2">
                    <div className="field">
                      <label>Address</label>
                      <input
                        className="neoInput"
                        type="text"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        placeholder="Street and number"
                      />
                    </div>

                    <div className="field">
                      <label>City</label>
                      <input
                        className="neoInput"
                        type="text"
                        name="city"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                        placeholder="City"
                      />
                    </div>

                    <div className="field">
                      <label>Postal Code</label>
                      <input
                        className="neoInput"
                        type="text"
                        name="postal_code"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.postal_code}
                        placeholder="11000"
                      />
                    </div>

                    <div className="field">
                      <label>Country</label>
                      <input
                        className="neoInput"
                        type="text"
                        name="country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                        placeholder="Serbia"
                      />
                    </div>
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  className="submitBtn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Register"}
                </button>

                <div className="bottomHint">
                  By creating an account you agree to Rentify Terms & Privacy.
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
