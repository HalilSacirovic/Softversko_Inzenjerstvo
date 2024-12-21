import { Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Provera da li postoji token
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token); // Ako postoji token, postavi isLoggedIn na true
  }, []);

  return (
    <div className="navbar">
      <Container>
        <div className="nav_container">
          <div className="logo">
            <h1>E-HUB</h1>
          </div>
          <div className="search_bar">
            <input placeholder="Search for product"></input>
          </div>
          <div className="icons">
            <ul>
              {!isLoggedIn ? (
                <>
                  <Link to={"/login"}>Login</Link>
                  <li
                    onClick={() => {
                      navigate("/signup");
                    }}
                  >
                    Sign Up
                  </li>
                </>
              ) : (
                <>
                  <li
                    onClick={() => {
                      navigate("/favorites");
                    }}
                  >
                    Favorite
                  </li>
                  <li
                    onClick={() => {
                      navigate("/addproduct");
                    }}
                  >
                    Add Product
                  </li>
                  <li
                    onClick={() => {
                      navigate("/admin");
                    }}
                  >
                    Admin
                  </li>
                  <li
                    onClick={() => {
                      localStorage.removeItem("auth_token"); // Brisanje tokena
                      setIsLoggedIn(false); // Ažuriraj stanje
                      navigate("/login");
                    }}
                  >
                    Logout
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
