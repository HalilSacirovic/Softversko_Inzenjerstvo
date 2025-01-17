import { Container, TextField } from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [product, setProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Provera da li postoji token
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token); // Ako postoji token, postavi isLoggedIn na true
  }, []);

  const getUserFromToken = (token) => {
    if (!token) return null;

    try {
      const decoded = jwtDecode(token); // Dekodira payload iz JWT
      return decoded; // Vraća korisničke podatke (npr. `id`, `username`)
    } catch (error) {
      console.error("Neuspešno dekodiranje tokena:", error);
      return null;
    }
  };

  // Primer upotrebe:
  const token = localStorage.getItem("auth_token"); // Pretpostavka da čuvaš token u localStorage
  const user = getUserFromToken(token);

  return (
    <div className="navbar">
      <Container>
        <div className="nav_container">
          <div className="logo">
            <h1>E-HUB</h1>
          </div>
          <div className="search_bar">
            <TextField
              placeholder="Search for product"
              sx={{ backgroundColor: "white", borderRadius: 3 }}
              onKeyDown={(e) => {
                console.log(e.target.value);
                if (e.key === "Enter") {
                  navigate(`/?keyword=${encodeURIComponent(e.target.value)}`);
                }
              }}
            />
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
                      navigate("/");
                    }}
                  >
                    Home
                  </li>
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
                      navigate(`/profile/${user.userId}`);
                    }}
                  >
                    Profile
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
                      navigate("/cart");
                    }}
                  >
                    Cart
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
